import React from 'react'
import { Star, MapPin, Percent } from "lucide-react";
import Link from 'next/link';
import Image from 'next/image';

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

type HotelCardProps = {
    hotel: Hotel;
    confidence?: number;
}

function HotelCard({ hotel, confidence }: HotelCardProps) {
    // Calculate match percentage for display
    const matchPercentage = confidence ? Math.round(confidence * 100) : null;
    
    return (
        <Link
            href={`/hotel/${hotel._id}`}
            key={hotel._id}
            className="block group relative"
        >
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                <Image
                    width={1920}
                    height={1080}
                    src={hotel.image}
                    alt={hotel.name}
                    className="object-cover w-full h-full absolute transition-transform group-hover:scale-105"
                />
                
                {/* Confidence badge - only show if confidence is provided and not default value */}
                {matchPercentage && matchPercentage < 100 && (
                    <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center">
                        {/* <Percent className="h-3 w-3 mr-1" /> */}
                        {matchPercentage}% match
                    </div>
                )}
            </div>

            <div className="mt-3 space-y-2">
                <h3 className="font-semibold text-lg">{hotel.name}</h3>
                <div className="flex items-center text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{hotel.location}</span>
                </div>
                <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-primary text-primary" />
                    <span className="font-medium">{hotel?.rating ?? "No Ratings"}</span>
                    <span className="text-muted-foreground">
                        ({hotel.reviews?.toLocaleString() ?? "No"} Reviews)
                    </span>
                </div>
                <div className="flex items-baseline space-x-2">
                    <span className="text-xl font-bold">${hotel.price}</span>
                </div>
            </div>
        </Link>
    )
}

export default HotelCard