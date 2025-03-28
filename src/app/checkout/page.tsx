"use client"

import { Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { useAuth } from "@clerk/nextjs"
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import { toast } from "sonner"
import { CalendarDays, CreditCard, Hotel } from "lucide-react"

import CheckoutPage from "@/components/CheckoutPage"
import convertToSubcurrency from "@/lib/convertToSubcurrency"

const stripePromise = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  ? loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
  : null

function CheckoutContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { userId } = useAuth()

  const price = searchParams.get("price")
  const bookingParam = searchParams.get("booking")

  if (!price || !bookingParam) {
    router.push("/")
    return null
  }

  const amount = Number.parseFloat(price)
  let bookingDetails = null

  try {
    bookingDetails = JSON.parse(atob(bookingParam))
  } catch (error) {
    toast.error("Failed to decode booking details")
    router.push("/")
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
        router.push("/bookings")
      } else {
        toast.error("Failed to create booking")
      }
    } catch (error) {
      toast.error("Failed to create booking")
      router.push("/")
      console.error(error)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 md:p-6">
      <div className="w-full rounded-xl overflow-hidden flex flex-col md:flex-row">
        {/* Left Column - Booking Details */}
        <div className="w-full md:w-1/2 bg-white p-6 md:p-8">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-2 mb-2">
                <h2 className="text-2xl font-bold text-gray-800">
                  <span className="text-gray-800 font-bold">Hori</span>
                  <span className="text-blue-500 font-bold">zone</span>
                </h2>
              </div>
              <p className="text-gray-500">Booking Summary</p>
            </div>

            {bookingDetails && (
              <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                <div className="flex items-center gap-3 mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                    <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                    <line x1="16" x2="16" y1="2" y2="6" />
                    <line x1="8" x2="8" y1="2" y2="6" />
                    <line x1="3" x2="21" y1="10" y2="10" />
                    <path d="M8 14h.01" />
                    <path d="M12 14h.01" />
                    <path d="M16 14h.01" />
                    <path d="M8 18h.01" />
                    <path d="M12 18h.01" />
                    <path d="M16 18h.01" />
                  </svg>
                  <h3 className="text-xl font-semibold text-gray-700">Trip Details</h3>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-500">Check-In:</span>
                    <span className="font-medium text-gray-800">{formatDate(bookingDetails.checkIn)}</span>
                  </div>

                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-500">Check-Out:</span>
                    <span className="font-medium text-gray-800">{formatDate(bookingDetails.checkOut)}</span>
                  </div>

                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-500">Nights:</span>
                    <span className="font-medium text-gray-800">{bookingDetails.nights}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-500">Total Amount:</span>
                    <span className="font-bold text-blue-600 text-xl">${amount.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
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

          {stripePromise && bookingDetails && (
            <Elements
              stripe={stripePromise}
              options={{
                mode: "payment",
                amount: convertToSubcurrency(amount),
                currency: "usd",
              }}
            >
              <CheckoutPage
                amount={amount}
                onSuccessfulPayment={handleSuccessfulBooking}
              />
            </Elements>
          )}
        </div>
      </div>
    </div>
  )
}

export default function Checkout() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CheckoutContent />
    </Suspense>
  )
}