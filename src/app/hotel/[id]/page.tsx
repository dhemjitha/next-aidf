import BookingButton from "@/components/BookingButton";
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
import Image from "next/image";
import { notFound } from "next/navigation";

interface Hotel {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    location: string;
    rating: number;
    reviews: number;
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Image & Tags Section */}
                <div className="space-y-4">
                    <div className="relative w-full h-[300px] sm:h-[350px] md:h-[400px]">
                        <Image
                            width={1920}
                            height={1080}
                            src={hotel.image}
                            alt={hotel.name}
                            className="absolute w-full h-full object-cover rounded-lg"
                        />
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary">Rooftop View</Badge>
                        <Badge variant="secondary">French Cuisine</Badge>
                        <Badge variant="secondary">City Center</Badge>
                    </div>
                </div>


                <div className="space-y-6">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold">{hotel.name}</h1>
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
                        <span className="font-bold">{hotel?.rating ?? "No Ratings"}</span>
                        <span className="text-muted-foreground">
                            ({hotel.reviews?.toLocaleString() ?? "No"} reviews)
                        </span>
                    </div>

                    <p className="text-muted-foreground text-sm md:text-base">{hotel.description}</p>


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


                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                            <p className="text-xl md:text-2xl font-bold">${hotel.price}</p>
                            <p className="text-sm text-muted-foreground">per night</p>
                        </div>
                        <BookingButton price={hotel.price} />
                    </div>
                </div>
            </div>
        </div>
        );
    } catch (error) {
        notFound();
    }
}