import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import Stripe from "stripe"

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-02-24.acacia",
})

export async function POST(req: Request) {
  try {
    const authResult = await auth();
    const userId = authResult.userId;

    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()
    const { bookingDetails, amount } = body

    if (!bookingDetails || !amount) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 })
    }

    // Format the amount for Stripe (convert to cents)
    const amountInCents = Math.round(amount * 100)

    // Create a checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      ui_mode: "embedded",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `Room Booking #${bookingDetails.roomNumber}`,
              description: `${bookingDetails.nights} night(s) stay from ${new Date(bookingDetails.checkIn).toLocaleDateString()} to ${new Date(bookingDetails.checkOut).toLocaleDateString()}`,
            },
            unit_amount: amountInCents,
          },
          quantity: 1,
        },
      ],
      client_reference_id: userId,
      // customer_email: null, // You can add user's email here if available
      metadata: {
        hotelId: bookingDetails.hotelId,
        roomNumber: bookingDetails.roomNumber,
        checkIn: bookingDetails.checkIn,
        checkOut: bookingDetails.checkOut,
        nights: bookingDetails.nights.toString(),
        amount: amount.toString(),
      },
      return_url: `${process.env.NEXT_PUBLIC_API_URL}/booking/confirmation?session_id={CHECKOUT_SESSION_ID}`,
    })

    return NextResponse.json({ clientSecret: session.client_secret })
  } catch (error: any) {
    console.error("Error creating checkout session:", error)
    return NextResponse.json({ message: error.message || "Something went wrong" }, { status: 500 })
  }
}

