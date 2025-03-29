"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { loadStripe } from "@stripe/stripe-js"
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from "@stripe/react-stripe-js"
import { Loader2 } from "lucide-react"

// Initialize Stripe with your publishable key
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

export default function CheckoutPage() {
  const searchParams = useSearchParams()
  const [clientSecret, setClientSecret] = useState<string>("")
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCheckoutSession = async () => {
      try {
        setIsLoading(true)
        const bookingParam = searchParams.get("booking")
        const price = searchParams.get("price")

        if (!bookingParam || !price) {
          throw new Error("Missing booking details or price")
        }

        // Decode the booking details
        const bookingDetails = JSON.parse(atob(bookingParam))

        // Create a checkout session on the server
        const response = await fetch("/api/payments/create-checkout-session", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            bookingDetails,
            amount: Number.parseFloat(price),
          }),
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.message || "Failed to create checkout session")
        }

        const data = await response.json()
        setClientSecret(data.clientSecret)
      } catch (err: any) {
        console.error("Error creating checkout session:", err)
        setError(err.message || "Something went wrong")
      } finally {
        setIsLoading(false)
      }
    }

    fetchCheckoutSession()
  }, [searchParams])

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="mt-4 text-muted-foreground">Preparing your checkout...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="bg-destructive/10 text-destructive p-4 rounded-md max-w-md">
          <h2 className="font-semibold mb-2">Error</h2>
          <p>{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto p-4 md:p-6">
      <h1 className="text-2xl font-bold mb-6">Complete Your Booking</h1>

      {clientSecret && (
        <div className="bg-card border rounded-lg p-1 shadow-sm">
          <EmbeddedCheckoutProvider stripe={stripePromise} options={{ clientSecret }}>
            <EmbeddedCheckout />
          </EmbeddedCheckoutProvider>
        </div>
      )}
    </div>
  )
}

