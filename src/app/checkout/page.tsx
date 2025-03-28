"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import CheckoutPage from "@/components/CheckoutPage"
import convertToSubcurrency from "@/lib/convertToSubcurrency"
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import { useAuth } from "@clerk/nextjs"
import { toast } from "sonner"
import { CalendarDays, CreditCard, Hotel } from "lucide-react"

if (process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY === undefined) {
  throw new Error("Missing Stripe publishable key in environment variables")
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)

export default function Checkout() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { userId } = useAuth()
  const amount = Number.parseFloat(searchParams.get("price") || "0")
  const encodedBookingDetails = searchParams.get("booking")
  const [bookingDetails, setBookingDetails] = useState<any>(null)
  const [isValidPage, setIsValidPage] = useState(true)

  useEffect(() => {
    const validateCheckoutAccess = () => {
      if (!userId) {
        toast.error("Please log in to proceed")
        router.push("/sign-in")
        setIsValidPage(false)
        return false
      }

      if (!encodedBookingDetails) {
        toast.error("No booking details found")
        router.push("/")
        setIsValidPage(false)
        return false
      }

      if (amount <= 0) {
        toast.error("Invalid booking amount")
        router.push("/")
        setIsValidPage(false)
        return false
      }
    }

    if (encodedBookingDetails) {
      try {
        const decodedDetails = JSON.parse(atob(encodedBookingDetails))
        setBookingDetails(decodedDetails)
        console.log("Booking details:", decodedDetails)
      } catch (error) {
        toast.error("Failed to decode booking details")
        console.error(error)
      }
    }

    validateCheckoutAccess()
  }, [encodedBookingDetails, amount, userId, router])

  const handleSuccessfulBooking = async () => {
    if (!bookingDetails || !userId) {
      toast.error("Failed to create booking")
      return
    }

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...bookingDetails,
          userId,
        }),
      })

      if (response.ok) {
        toast.success("Booking created successfully")
      } else {
        toast.error("Failed to create booking")
      }
    } catch (error) {
      toast.error("Failed to create booking")
      router.push("/")
      console.error(error)
    }
  }

  if (!isValidPage) {
    return null
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 md:p-6">
      <div className="w-full  rounded-xl overflow-hidden flex flex-col md:flex-row">
        {/* Left Column - Booking Details */}
        <div className="w-full md:w-1/2 bg-gray-50 p-6 md:p-8 space-y-6">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <Hotel className="h-8 w-8 text-primary mr-3" />
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Horizone</h2>
            </div>
            <p className="text-gray-600 text-base md:text-lg">Booking Summary</p>
          </div>

          {bookingDetails && (
            <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 space-y-4">
              <div className="flex items-center mb-2">
                <CalendarDays className="h-5 w-5 text-primary mr-3" />
                <h3 className="text-lg md:text-xl font-semibold text-gray-700">Trip Details</h3>
              </div>

              <div className="grid grid-cols-2 gap-3 md:gap-4 text-sm">
                <div className="text-gray-600 font-medium text-right">Check-In:</div>
                <div className="text-gray-900 font-semibold">{formatDate(bookingDetails.checkIn)}</div>

                <div className="text-gray-600 font-medium text-right">Check-Out:</div>
                <div className="text-gray-900 font-semibold">{formatDate(bookingDetails.checkOut)}</div>

                <div className="text-gray-600 font-medium text-right">Nights:</div>
                <div className="text-gray-900 font-semibold">{bookingDetails.nights}</div>

                <div className="text-gray-600 font-medium text-right">Total Amount:</div>
                <div className="text-primary font-bold text-base md:text-xl">${amount.toFixed(2)}</div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Payment Information */}
        <div className="w-full md:w-1/2 p-6 md:p-8 bg-white">
          <div className="text-center mb-6">
            <div className="flex items-center justify-center mb-4">
              <CreditCard className="h-5 w-5 md:h-6 md:w-6 text-primary mr-2" />
              <h3 className="text-xl md:text-2xl font-semibold text-gray-800">Payment Information</h3>
            </div>
            <p className="text-gray-600 text-sm md:text-base">Complete your secure payment</p>
          </div>

          <Elements
            stripe={stripePromise}
            options={{
              mode: "payment",
              amount: convertToSubcurrency(amount),
              currency: "usd",
            }}
          >
            <CheckoutPage amount={amount} onSuccessfulPayment={handleSuccessfulBooking} />
          </Elements>
        </div>
      </div>
    </div>
  )
}