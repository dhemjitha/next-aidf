"use client"

import { useState, useEffect } from "react"
import HotelCard from "./HotelCard"
import LocationTab from "./LocationTab"
import { Skeleton } from "./ui/skeleton"
import { Alert, AlertDescription, AlertTitle } from "./ui/alert"
import { AlertCircle } from "lucide-react"
import { useSearchContext } from "@/context/SearchContext"

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

  const handleSelectLocation = (location: string) => {
    setSelectedLocation(location)
  }

  const filteredItems =
    selectedLocation === "ALL"
      ? isSearching
        ? searchResults
        : hotels.map((hotel) => ({ hotel, confidence: 1 }))
      : isSearching
        ? searchResults.filter((item) => item.hotel.location.toLowerCase().includes(selectedLocation.toLowerCase()))
        : hotels
            .filter((hotel) => hotel.location.toLowerCase().includes(selectedLocation.toLowerCase()))
            .map((hotel) => ({ hotel, confidence: 1 }))

  // Effect to fetch hotels on initial load
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

  // Function to fetch all hotels
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

        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>Error while fetching data...</AlertDescription>
        </Alert>
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
            }}
            className="mt-4 text-blue-600 hover:underline"
          >
            ← Back to all hotels
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

      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-4 cursor-pointer">
          {filteredItems.map((item) => (
            <HotelCard key={item.hotel._id} hotel={item.hotel} confidence={item.confidence} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-lg">No hotels found matching your criteria.</p>
        </div>
      )}
    </section>
  )
}

export default HotelListings

