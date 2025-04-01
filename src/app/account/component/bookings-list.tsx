"use client"

import { format } from "date-fns"
import Image from "next/image"
import Link from "next/link"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import type { Booking } from "../../../../types/booking"
import {
  AlertCircle,
  Bookmark,
  Search,
  X,
  ImageIcon,
  MapPinIcon,
  BedIcon,
  StarIcon,
  UtensilsIcon,
  CalendarIcon,
} from "lucide-react"

interface BookingsListProps {
  bookings: Booking[]
  isLoading: boolean
  error: string | null
  onCancelBooking: (booking: Booking) => void
}

export default function BookingsList({ bookings, isLoading, error, onCancelBooking }: BookingsListProps) {
  if (isLoading) {
    return <BookingsListSkeleton />
  }

  if (error) {
    return (
      <div className="flex items-center p-4 border border-red-200 rounded-lg bg-red-50 shadow-sm">
        <div className="flex-shrink-0 mr-3">
          <AlertCircle className="w-6 h-6 text-red-500" />
        </div>
        <div className="flex-1">
          <h4 className="font-medium text-red-700">Something went wrong</h4>
          <p className="text-red-600 text-sm mt-0.5">{error}</p>
        </div>
        <button className="ml-3 p-1 rounded-full hover:bg-red-100 text-red-500 transition-colors">
          <X className="w-4 h-4" />
        </button>
      </div>
    )
  }

  if (bookings.length === 0) {
    return (
      <div className="text-center py-12 px-6 border border-gray-200 rounded-xl bg-gray-50 shadow-sm">
        <div className="bg-white p-3 rounded-full inline-flex items-center justify-center mb-5 shadow-sm">
          <Bookmark className="w-8 h-8 text-blue-500" />
        </div>
        <h3 className="text-lg font-medium text-gray-800 mb-2">No Bookings Found</h3>
        <p className="text-gray-500 max-w-md mx-auto mb-6">
          You haven&apos;t made any bookings yet. Start exploring hotels to book your next adventure.
        </p>
        <Button variant="outline" className="border-blue-200 hover:bg-blue-50 text-blue-600">
          <Link href="/#hotel-listings" className="flex items-center">
            <Search className="w-4 h-4 mr-2" />
            Browse Hotels
          </Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {bookings.map((booking) => (
        <BookingCard key={booking._id} booking={booking} onCancelBooking={onCancelBooking} />
      ))}
    </div>
  )
}

function BookingsListSkeleton() {
  return (
    <div className="space-y-6">
      {[1, 2, 3].map((item) => (
        <div
          key={item}
          className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
        >
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/3 h-48 md:h-auto relative bg-gray-100">
              <Skeleton className="absolute inset-0 bg-gray-200" />
              <div className="absolute top-4 left-4 flex">
                <Skeleton className="w-24 h-6 rounded-full bg-blue-200" />
                <Skeleton className="w-16 h-6 rounded-full ml-2 bg-green-200" />
              </div>
            </div>

            <div className="p-6 md:w-2/3 flex flex-col justify-between">
              <div className="flex flex-col md:flex-row md:justify-between gap-4">
                <div className="space-y-3 w-full md:w-2/3">
                  <Skeleton className="h-8 w-3/4 rounded" />
                  <div className="flex items-center mt-1">
                    <div className="w-4 h-4 mr-1 rounded-full bg-blue-100"></div>
                    <Skeleton className="w-1/2 h-5 rounded" />
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <Skeleton className="w-24 h-6 rounded-full bg-blue-50" />
                    <Skeleton className="w-28 h-6 rounded-full bg-amber-50" />
                    <Skeleton className="w-32 h-6 rounded-full bg-emerald-50" />
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg flex flex-row md:flex-col gap-4 md:gap-2 justify-between md:w-1/3">
                  <div className="flex items-center">
                    <div className="w-5 h-5 mr-2 rounded-full bg-blue-100"></div>
                    <div>
                      <Skeleton className="w-24 h-5 rounded bg-gray-300" />
                      <Skeleton className="w-16 h-3 mt-1 rounded bg-gray-200" />
                    </div>
                  </div>

                  <div className="hidden md:block h-px w-full bg-gray-200 my-2"></div>
                  <div className="md:hidden h-10 border-l border-gray-200"></div>

                  <div className="flex items-center">
                    <div className="w-5 h-5 mr-2 rounded-full bg-red-100"></div>
                    <div>
                      <Skeleton className="w-24 h-5 rounded bg-gray-300" />
                      <Skeleton className="w-16 h-3 mt-1 rounded bg-gray-200" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100 flex flex-col sm:flex-row sm:justify-between sm:items-center">
                <div>
                  <Skeleton className="h-9 w-28 rounded bg-gray-300" />
                  <Skeleton className="h-3 w-40 mt-1 rounded bg-gray-200" />
                </div>

                <div className="mt-4 sm:mt-0">
                  <Skeleton className="h-10 w-36 rounded-md bg-red-100" />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

interface BookingCardProps {
  booking: Booking
  onCancelBooking: (booking: Booking) => void
}

function BookingCard({ booking, onCancelBooking }: BookingCardProps) {
  return (
    <div className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
      <div className="flex flex-col md:flex-row">
        {/* Hotel Image Section */}
        <div className="md:w-1/3 h-48 md:h-auto relative">
          {booking.hotelId?.image ? (
            <Image
              src={booking.hotelId.image || "/placeholder.svg"}
              alt={booking.hotelId?.name || "Hotel"}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover"
              priority={false}
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <ImageIcon className="w-12 h-12 text-gray-400" />
            </div>
          )}
          <div className="absolute top-4 left-4">
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                new Date(booking.checkOut) < new Date() ? "bg-gray-800 text-white" : "bg-blue-500 text-white"
              }`}
            >
              {new Date(booking.checkOut) < new Date() ? "Completed" : "Upcoming"}
            </span>
            <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-500 text-white ml-2">Paid</span>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6 md:w-2/3 flex flex-col justify-between">
          <div className="flex flex-col md:flex-row md:justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold text-gray-800">{booking.hotelId?.name || "Hotel"}</h3>

              <div className="flex items-center mt-2 text-gray-600">
                <MapPinIcon className="w-4 h-4 mr-1 text-blue-500" />
                <span>{booking.hotelId?.location || "Location unavailable"}</span>
              </div>

              <div className="flex flex-wrap gap-2 mt-3">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                  <BedIcon className="w-3 h-3 mr-1" />
                  Luxury Room
                </span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-700">
                  <StarIcon className="w-3 h-3 mr-1" />
                  Rooftop View
                </span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700">
                  <UtensilsIcon className="w-3 h-3 mr-1" />
                  French Cuisine
                </span>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg flex flex-row md:flex-col gap-4 md:gap-6 justify-between">
              <div className="flex items-center">
                <CalendarIcon className="w-5 h-5 mr-2 text-blue-500" />
                <div>
                  <p className="font-medium">{booking.checkIn && format(new Date(booking.checkIn), "MMM d, yyyy")}</p>
                  <p className="text-xs text-gray-500">Check-in</p>
                </div>
              </div>

              <div className="hidden md:block h-px w-full bg-gray-200"></div>
              <div className="md:hidden h-10 border-l border-gray-200"></div>

              <div className="flex items-center">
                <CalendarIcon className="w-5 h-5 mr-2 text-red-500" />
                <div>
                  <p className="font-medium">{booking.checkOut && format(new Date(booking.checkOut), "MMM d, yyyy")}</p>
                  <p className="text-xs text-gray-500">Check-out</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-100 flex flex-col sm:flex-row sm:justify-between sm:items-center">
            <div>
              <p className="text-2xl font-bold text-gray-800">${booking.amount?.toFixed(2) || "0.00"}</p>
              <p className="text-xs text-gray-500">
                Booking ID: <span className="font-mono">{booking._id}</span>
              </p>
            </div>

            <div className="mt-4 sm:mt-0">
              <Button
                variant="destructive"
                size="sm"
                onClick={() => onCancelBooking(booking)}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
              >
                Cancel Booking
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

