"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function HotelBookingGrid() {
  return (
    <div className="mx-auto px-8 py-8 lg:py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-6">
          <div className="relative rounded-3xl overflow-hidden h-[300px]">
            <Image
              src="/assets/grid/308797093.jpg"
              alt="Rooftop dining area with city view"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b flex flex-col justify-end p-8">
              <div className="absolute top-7 left-8 bg-black/20 backdrop-blur-sm p-2 rounded-xl">
                <Globe className="h-6 w-6 text-white" />
              </div>
              <div className="text-white space-y-2">
                <h2 className="text-3xl md:text-3xl font-bold leading-tight">Explore more to get your comfort zone</h2>
                <p className="text-white/80">Book your perfect stay with us.</p>
                <Button variant="default" className="mt-4 bg-white text-black hover:bg-white/90 rounded-full" asChild>
                  <Link href="#">
                    Booking Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          <div className="relative rounded-3xl overflow-hidden h-[300px]">
            <Image
              src="/assets/grid/215355701.jpg"
              alt="Modern hotel building with glass facade"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b flex flex-col justify-end p-8">
              <div className="text-white space-y-2">
                <p className="text-white/80 text-lg">Hotels Available</p>
                <h3 className="text-4xl md:text-5xl font-bold">1,764,980</h3>
              </div>
            </div>
          </div>
        </div>

        <div className="min-h-[620px]">
          <div className="relative rounded-3xl overflow-hidden h-full">
            <Image src="/assets/grid/489672294.jpg" alt="Luxury hotel room interior" fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b flex flex-col justify-center items-center p-8">
              <div className="text-white text-center max-w-md">
                <h2 className="text-3xl md:text-4xl font-bold leading-tight">
                  Beyond accommodation, creating memories of a lifetime
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}