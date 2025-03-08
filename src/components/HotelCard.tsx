import React, { useState } from 'react'
import { Star, MapPin } from "lucide-react";
import Link from 'next/link';
import Image from 'next/image';

function HotelCard(props: any) {

    return (

        <Link
            href={`/hotel/${props.hotel._id}`}
            key={props.hotel._id}
            className="block group relative"
        >
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                <Image
                    width={1920}
                    height={1080}
                    src={props.hotel.image}
                    alt={props.hotel.name}
                    className="object-cover w-full h-full absolute transition-transform group-hover:scale-105"
                />
            </div>

            <div className="mt-3 space-y-2">
                <h3 className="font-semibold text-lg">{props.hotel.name}</h3>
                <div className="flex items-center text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{props.hotel.location}</span>
                </div>
                <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-primary text-primary" />
                    <span className="font-medium">{props.hotel?.rating ?? "No Ratings"}</span>
                    <span className="text-muted-foreground">
                        ({props.hotel.reviews?.toLocaleString() ?? "No"} Reviews)
                    </span>
                </div>
                <div className="flex items-baseline space-x-2">
                    <span className="text-xl font-bold">${props.hotel.price}</span>
                </div>
            </div>

        </Link>
    )
}

export default HotelCard