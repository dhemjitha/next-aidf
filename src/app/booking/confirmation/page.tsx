"use client"

import { useEffect, useState, useRef } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Loader2, CheckCircle, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ConfettiFireworks } from "@/components/magicui/ConfettiFireworks"
import { toast } from "sonner"
import { useAuth } from "@clerk/nextjs"

export default function ConfirmationPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading")
  const [bookingDetails, setBookingDetails] = useState<any>(null)
  const { userId } = useAuth()
  const isBookingCreated = useRef(false);

  useEffect(() => {
    const checkSessionStatus = async () => {
      try {
        const sessionId = searchParams.get("session_id")

        if (!sessionId) {
          setStatus("error")
          return
        }

        const response = await fetch(`/api/payments/check-session-status?session_id=${sessionId}`)

        if (!response.ok) {
          throw new Error("Failed to verify payment")
        }

        const data = await response.json()

        if (data.status === "complete") {
          setStatus("success")
          setBookingDetails(data.bookingDetails)
        } else {
          setStatus("error")
        }
        
      } catch (error) {
        console.error("Error checking session status:", error)
        setStatus("error")
      }
    }

    checkSessionStatus()
  }, [searchParams])

  useEffect(() => {

    const handleCreateBooking = async () => {
      try {
        const sanitizedBookingDetails = {
          ...bookingDetails,
          roomNumber: Number(bookingDetails.roomNumber),
        };

        const response = await fetch("/api/bookings", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...sanitizedBookingDetails,
            userId,
          }),
        });

        if (response.ok) {
          toast.success("Booking created successfully");
        } else {
          toast.error("Failed to create booking");
        }
      } catch (error) {
        toast.error("Failed to create booking");
        console.error(error);
      }
    };

    if (status === "success" && bookingDetails && !isBookingCreated.current) {
      isBookingCreated.current = true;
      handleCreateBooking();
    }
  }, [status, bookingDetails, userId]);

  return (
    <div className="max-w-2xl mx-auto p-6 flex flex-col items-center justify-center min-h-screen h-screen">
      {status === "loading" && (
        <div className="flex flex-col justify-center items-center py-12">
          <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
          <h2 className="text-xl font-semibold">Verifying your payment...</h2>
          <p className="text-muted-foreground mt-2">Please wait while we confirm your booking</p>
        </div>
      )}

      {status === "success" && (
        <div className="w-full text-center py-8">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Booking Confirmed!</h1>
          <p className="text-muted-foreground mb-8">Your payment was successful and your booking is now confirmed.</p>

          {bookingDetails && (
            <div className="bg-card border rounded-lg p-6 mb-8 text-left">
              <h2 className="text-lg font-semibold mb-4">Booking Details</h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Room:</span>
                  <span className="font-medium">#{bookingDetails.roomNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Check-in:</span>
                  <span className="font-medium">{new Date(bookingDetails.checkIn).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Check-out:</span>
                  <span className="font-medium">{new Date(bookingDetails.checkOut).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Nights:</span>
                  <span className="font-medium">{bookingDetails.nights}</span>
                </div>
                <div className="flex justify-between pt-2 mt-2 border-t">
                  <span className="font-medium">Total Paid:</span>
                  <span className="font-bold">${bookingDetails.amount}</span>
                </div>
              </div>
            </div>
          )}
          <ConfettiFireworks />
          <Button onClick={() => router.push("/")}>Return to Home</Button>
        </div>
      )}

      {status === "error" && (
        <div className="w-full text-center py-8">
          <AlertCircle className="h-16 w-16 text-destructive mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Payment Verification Failed</h1>
          <p className="text-muted-foreground mb-8">
            We couldn&apos;t verify your payment. If you believe this is an error, please contact customer support.
          </p>
          <Button onClick={() => router.push("/")}>Return to Home</Button>
        </div>
      )}
    </div>
  )
}

