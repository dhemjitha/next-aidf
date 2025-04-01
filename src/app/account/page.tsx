"use client"

import { useEffect, useState } from "react"
import { useUser } from "@clerk/nextjs"
import { toast } from "sonner"
import AccountHeader from "./component/account-header" 
import PersonalInformation from "./component/personal-information" 
import AccountActivity from "./component/account-activity" 
import BookingsList from "./component/bookings-list" 
import { CancelBookingDialog } from "./component/cancel-booking-dialog" 
import type { Booking } from "../../../types/booking" 

export default function AccountPage() {
  const { isLoaded, isSignedIn, user } = useUser()
  const [bookings, setBookings] = useState<Booking[]>([])
  const [isLoadingBookings, setIsLoadingBookings] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [open, setOpen] = useState(false)
  const [bookingToCancel, setBookingToCancel] = useState<Booking | null>(null)

  const handleCancelBooking = async (bookingId: string) => {
    try {
      toast.loading("Cancelling booking...")
      const response = await fetch(`/api/bookings/user`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ bookingId }),
      })

      if (!response.ok) {
        throw new Error("Failed to cancel booking")
      }

      const data = await response.json()
      setBookings(bookings.filter((booking) => booking._id !== bookingId))
      toast.dismiss()
      toast.success(data.message || "Booking cancelled successfully")
      setOpen(false)
    } catch (err) {
      console.error("Error cancelling booking:", err)
      toast.dismiss()
      toast.error("Failed to cancel booking. Please try again.")
    }
  }

  const openCancelDialog = (booking: Booking) => {
    setBookingToCancel(booking)
    setOpen(true)
  }

  useEffect(() => {
    if (isSignedIn) {
      fetchUserBookings()
    }
  }, [isSignedIn])

  const fetchUserBookings = async () => {
    try {
      setIsLoadingBookings(true)
      const response = await fetch("/api/bookings/user")
      if (!response.ok) {
        throw new Error("Failed to fetch bookings")
      }
      const data = await response.json()
      setBookings(data)
    } catch (err) {
      console.error("Error fetching bookings:", err)
      setError("Unable to load your bookings. Please try again later.")
    } finally {
      setIsLoadingBookings(false)
    }
  }

  if (!isLoaded) {
    return (
      <main className="container mx-auto px-4 py-8 min-h-screen">
        <AccountHeader isLoading={true} user={null} />
        <PersonalInformation isLoading={true} user={null} />
      </main>
    )
  }

  return (
    <main className="container mx-auto px-4 py-8 min-h-screen">
      <AccountHeader isLoading={false} user={user} />
      
        <PersonalInformation isLoading={false} user={user} />
        <AccountActivity bookingsCount={bookings.length} />


      <div className="mt-12">
        <h2 className="text-xl md:text-2xl font-semibold mb-6">My Bookings</h2>
        <BookingsList
          bookings={bookings}
          isLoading={isLoadingBookings}
          error={error}
          onCancelBooking={openCancelDialog}
        />
      </div>

      <CancelBookingDialog open={open} setOpen={setOpen} booking={bookingToCancel} onConfirm={handleCancelBooking} />
    </main>
  )
}