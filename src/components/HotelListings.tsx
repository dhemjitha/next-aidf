import { useState, useEffect } from 'react'
import HotelCard from './HotelCard'
import LocationTab from './LocationTab'

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

    const locations = ["ALL", "France", "Italy", "Australia", "Japan"]

    const [selectedLocation, setSelectedLocation] = useState("ALL");

    useEffect(() => {
        const fetchHotels = async () => {
            try {
                const response = await fetch('/api/hotels'); // Adjust the API endpoint as needed
                const data = await response.json();
                setHotels(data);
            } catch (error) {
                console.error('Error fetching hotels:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchHotels();
    }, []);

    const handleSelectLocation = (location: any) => {
        setSelectedLocation(location);
    }

    const filteredHotels = selectedLocation === "ALL" ? hotels : hotels.filter((hotel) => {
        return hotel.location.toLowerCase().includes(selectedLocation.toLowerCase());
    })

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
                        return <LocationTab key={location} selectedLocation={selectedLocation} name={location} onClick={handleSelectLocation}/>
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