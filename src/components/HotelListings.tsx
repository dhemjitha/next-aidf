import { useState, useEffect } from 'react'
import HotelCard from './HotelCard'
import LocationTab from './LocationTab'
import { Skeleton } from './ui/skeleton'
import { Alert, AlertDescription, AlertTitle } from "./ui/alert"
import { AlertCircle } from "lucide-react";

type Hotel = {
    _id: string;
    name: string;
    location: string;
    rating: number;
    reviews: number;
    image: string;
    price: number;
    description: string;
}


function HotelListings() {

    const [hotels, setHotels] = useState<Hotel[]>([]);
    const [loading, setLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [error, setError] = useState("");

    const locations = ["ALL", "France", "Italy", "Australia", "Japan"]

    const [selectedLocation, setSelectedLocation] = useState("ALL");

    const handleSelectLocation = (location: any) => {
        setSelectedLocation(location);
    }

    const filteredHotels = selectedLocation === "ALL" ? hotels : hotels.filter((hotel) => {
        return hotel.location.toLowerCase().includes(selectedLocation.toLowerCase());
    })

    useEffect(() => {
        const fetchHotels = async () => {
            try {
                const response = await fetch('/api/hotels'); // Adjust the API endpoint as needed
                const data = await response.json();
                setHotels(data);
            } catch (error) {
                setIsError(true);
                if (error instanceof Error) {
                    setError(error.message);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchHotels();
    }, []);



    if (loading) {
        return (
            <section className="px-5 py-6 lg:py-16">
                <div className="mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Top trending hotels worldwide
                    </h2>

                    <p className="text-lg text-muted-foreground">
                        Discover the most trending hotels worldwide for an unforgettable
                        experience.
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
        );
    }

    if (isError) {
        return (
            <section className="px-5 py-6 lg:py-16">
                <div className="mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Top trending hotels worldwide
                    </h2>

                    <p className="text-lg text-muted-foreground">
                        Discover the most trending hotels worldwide for an unforgettable
                        experience.
                    </p>
                </div>

                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>
                        Error while fetching data...
                    </AlertDescription>
                </Alert>

            </section>
        );
    }

    return (
        <section className="px-5 py-6 lg:py-16">
            <div className="mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    Top trending hotels worldwide
                </h2>

                <p className="text-lg text-muted-foreground">
                    Discover the most trending hotels worldwide for an unforgettable
                    experience.
                </p>
            </div>

            <div className="flex items-center lg:gap-x-2 gap-x-1.5">
                {
                    locations.map((location) => {
                        return <LocationTab key={location} selectedLocation={selectedLocation} name={location} onClick={handleSelectLocation} />
                    })
                }
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-4 cursor-pointer">

                {
                    filteredHotels.map((hotel) => {
                        return <HotelCard key={hotel._id} hotel={hotel} />
                    })
                }

            </div>

        </section>
    )
}

export default HotelListings