import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Coffee,
  MapPin,
  MenuIcon as Restaurant,
  Star,
  Tv,
  Wifi,
} from "lucide-react";

interface Hotel {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    location: string;
    rating: number;
    reviews: number;
    // Add other properties as needed
}

async function getHotel(id: string): Promise<Hotel> {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/hotels/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            next: { revalidate: 60 },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch hotel: ${response.status}`);
        }

        return response.json();
    } catch (error) {
        console.error('Error fetching hotel:', error);
        throw error;
    }
}

interface PageProps {
    params: {
        id: string;
    };
}

export default async function HotelPage({ params }: PageProps) {
    try {
        const { id } = params;
        const hotel = await getHotel(id);
        
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <div className="relative w-full h-[400px]">
                            <img
                                src={hotel.image}
                                alt={hotel.name}
                                className="absolute object-cover rounded-lg"
                            />
                        </div>
                        <div className="flex space-x-2">
                            <Badge variant="secondary">Rooftop View</Badge>
                            <Badge variant="secondary">French Cuisine</Badge>
                            <Badge variant="secondary">City Center</Badge>
                        </div>
                    </div>
                    <div className="space-y-6">
                        <div className="flex justify-between items-start">
                            <div>
                                <h1 className="text-3xl font-bold">{hotel.name}</h1>
                                <div className="flex items-center mt-2">
                                    <MapPin className="h-5 w-5 text-muted-foreground mr-1" />
                                    <p className="text-muted-foreground">{hotel.location}</p>
                                </div>
                            </div>
                            <Button variant="outline" size="icon">
                                <Star className="h-4 w-4" />
                                <span className="sr-only">Add to favorites</span>
                            </Button>
                        </div>
                        <div className="flex items-center space-x-1">
                            <Star className="h-5 w-5 fill-primary text-primary" />
                            <span className="font-bold">{hotel.rating}</span>
                            <span className="text-muted-foreground">
                                ({hotel.reviews.toLocaleString()} reviews)
                            </span>
                        </div>
                        <p className="text-muted-foreground">{hotel.description}</p>
                        <Card>
                            <CardContent className="p-4">
                                <h2 className="text-xl font-semibold mb-4">Amenities</h2>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="flex items-center">
                                        <Wifi className="h-5 w-5 mr-2" />
                                        <span>Free Wi-Fi</span>
                                    </div>
                                    <div className="flex items-center">
                                        <Restaurant className="h-5 w-5 mr-2" />
                                        <span>Restaurant</span>
                                    </div>
                                    <div className="flex items-center">
                                        <Tv className="h-5 w-5 mr-2" />
                                        <span>Flat-screen TV</span>
                                    </div>
                                    <div className="flex items-center">
                                        <Coffee className="h-5 w-5 mr-2" />
                                        <span>Coffee maker</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-2xl font-bold">${hotel.price}</p>
                                <p className="text-sm text-muted-foreground">per night</p>
                            </div>
                            <Button size="lg">Book Now</Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="text-center">
                    <h1 className="text-2xl text-red-600 mb-4">Error loading hotel</h1>
                    <p>Unable to load hotel details. Please try again later.</p>
                </div>
            </div>
        );
    }
}