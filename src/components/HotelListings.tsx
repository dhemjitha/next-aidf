"use client"

import { useState, useEffect } from "react"
import HotelCard from "./HotelCard"
import LocationTab from "./LocationTab"
import { Skeleton } from "./ui/skeleton"
import { AlertCircle, Search } from "lucide-react"
import { useSearchContext } from "@/context/SearchContext"
import { Input } from "./ui/input"

type Hotel = {
  _id: string
  name: string
  location: string
  rating: number
  reviews: number
  image: string
  price: number
  description: string
}

type SearchResult = {
  hotel: Hotel
  confidence: number
}

function HotelListings() {
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [hotels, setHotels] = useState<Hotel[]>([])
  const [loading, setLoading] = useState(true)
  const [isError, setIsError] = useState(false)
  const [error, setError] = useState("")

  const { searchQuery, isSearching, setIsSearching } = useSearchContext()

  const locations = ["ALL", "France", "Italy", "Australia", "Japan"]
  const [selectedLocation, setSelectedLocation] = useState("ALL")

  const [searchTerm, setSearchTerm] = useState('');



  const handleSelectLocation = (location: string) => {
    setSelectedLocation(location)
  }

  const getBaseHotels = () => {
    if (isSearching) {
      return searchResults
    } else {
      return hotels.map((hotel) => ({
        hotel,
        confidence: 1,
      }))
    }
  }

  const getFilteredHotels = () => {
    let hotels = getBaseHotels();

    if (selectedLocation !== "ALL") {
      hotels = hotels.filter((hotel) => hotel.hotel.location.toLowerCase().includes(selectedLocation.toLowerCase()))
    }
    if (searchTerm.trim() !== "") {
      hotels = hotels.filter((hotel) =>
        hotel.hotel.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
    return hotels;
  }

  const filteredHotels = getFilteredHotels()

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };


  useEffect(() => {
    if (!isSearching) {
      fetchHotels()
    }
  }, [isSearching])


  // Effect to perform search when searchQuery changes
  useEffect(() => {
    if (searchQuery && isSearching) {
      setLoading(true)
      getHotelsForSearchQuery(searchQuery)
    }
  }, [searchQuery, isSearching])


  // Function to get hotels based on search query
  const getHotelsForSearchQuery = async (query: string) => {
    try {
      const response = await fetch(`/api/search/retrieve?query=${encodeURIComponent(query)}`)
      if (!response.ok) {
        throw new Error("Failed to fetch hotels")
      }
      const data = await response.json()

      // Save search results with confidence scores
      if (Array.isArray(data)) {
        // Check if data contains objects with 'hotel' property (search results)
        if (data.length > 0 && "hotel" in data[0]) {
          setSearchResults(data)
        } else {
          // If data is already an array of hotels, assign default confidence of 1
          setSearchResults(data.map((hotel: Hotel) => ({ hotel, confidence: 1 })))
        }
      }
    } catch (error) {
      setIsError(true)
      if (error instanceof Error) {
        setError(error.message)
      }
    } finally {
      setLoading(false)
    }
  }


  async function fetchHotels() {
    setLoading(true)
    try {
      const response = await fetch("/api/hotels")
      const data = await response.json()
      setHotels(data)
      setIsError(false)
    } catch (error) {
      setIsError(true)
      if (error instanceof Error) {
        setError(error.message)
      }
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <section id="hotel-listings" className="px-5 py-6 lg:py-16">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {isSearching ? "Search Results" : "Top trending hotels worldwide"}
          </h2>

          <p className="text-lg text-muted-foreground">
            {isSearching
              ? "Finding the perfect accommodations for you..."
              : "Discover the most trending hotels worldwide for an unforgettable experience."}
          </p>
        </div>

        <div className="space-y-8">
          <div>
            <Skeleton className="h-8 w-full max-w-[700px] bg-gray-300/70" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="rounded-xl border bg-card text-card-foreground shadow overflow-hidden">
                <Skeleton className="aspect-[4/3] rounded-t-xl bg-gray-300/70" />
                <div className="p-6 pt-0 mt-3 space-y-2">
                  <Skeleton className="h-6 w-3/4 bg-gray-300/70" />
                  <Skeleton className="h-4 w-1/2 bg-gray-300/70" />
                  <Skeleton className="h-4 w-1/3 bg-gray-300/70" />
                </div>
                <div className="flex items-center p-6 pt-0">
                  <Skeleton className="h-6 w-1/4 bg-gray-300/70" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (isError) {
    return (
      <section id="hotel-listings" className="px-5 py-6 lg:py-16">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {isSearching ? "Search Results" : "Top trending hotels worldwide"}
          </h2>

          <p className="text-lg text-muted-foreground">
            {isSearching
              ? "We encountered a problem with your search."
              : "Discover the most trending hotels worldwide for an unforgettable experience."}
          </p>
        </div>

        <div className="bg-red-50 border border-red-200 rounded-lg p-4 md:p-6  mx-auto">
          <div className="flex items-start space-x-4">
            <div className="bg-red-100 rounded-full p-2 mt-1">
              <AlertCircle className="h-5 w-5 text-red-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-red-700 mb-1">Unable to load hotels</h3>
              <p className="text-red-600 mb-3">We encountered a problem while fetching data from our servers.</p>
              <div className="flex flex-wrap gap-3 mt-2">
                <button
                  type="button"
                  onClick={() => fetchHotels()}
                  className="inline-flex items-center px-4 py-2 text-sm font-medium bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Try again
                </button>
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 text-sm font-medium bg-white text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Contact support
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="hotel-listings" className="px-5 py-6 lg:py-16">
      <div className="mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          {isSearching ? "Search Results" : "Top trending hotels worldwide"}
        </h2>

        <p className="text-lg text-muted-foreground">
          {isSearching
            ? `Here are the hotels that match "${searchQuery}"`
            : "Discover the most trending hotels worldwide for an unforgettable experience."}
        </p>

        {isSearching && (
          <button
            onClick={() => {
              setIsSearching(false)
              setSearchTerm('')
            }}
            className="mt-4 text-blue-600 hover:underline"
          >
            ← Back to all hotels
          </button>
        )}
      </div>

      <div className="relative w-full max-w-md mx-auto md:mx-0 mb-8">
        <div className="flex items-center w-full rounded-lg border border-input shadow-sm focus-within:ring-2 focus-within:ring-blue-400 focus-within:border-blue-400 bg-white overflow-hidden">
          <Search className="h-5 w-5 text-muted-foreground ml-3 flex-shrink-0" />
          <Input
            placeholder="Search hotels by name..."
            value={searchTerm}
            onChange={handleSearch}
            className="pl-2 border-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </div>
        {searchTerm && (
          <button
            type="button"
            onClick={() => setSearchTerm('')}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-500 hover:text-gray-700"
          >
            Clear
          </button>
        )}
      </div>



      {!isSearching && (
        <div className="flex items-center lg:gap-x-2 gap-x-1.5">
          {locations.map((location) => (
            <LocationTab
              key={location}
              selectedLocation={selectedLocation}
              name={location}
              onClick={handleSelectLocation}
            />
          ))}
        </div>
      )}


      {filteredHotels.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-4 cursor-pointer">
          {filteredHotels.map((hotel) => (
            <HotelCard key={hotel.hotel._id} hotel={hotel.hotel} confidence={hotel.confidence} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 px-4">
          <div className="max-w-md mx-auto">
            <div className="mb-6">
              <Search className="h-12 w-12 mx-auto text-gray-300" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No hotels found</h3>
            <p className="text-gray-500 mb-6">
              We couldn&apos;t find any hotels matching your current search criteria.
            </p>
            <div className="text-sm text-gray-600">
              Try adjusting your search or filters to find more options.
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default HotelListings