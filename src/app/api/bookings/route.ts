import { CreateBookingDTO } from "@/server/domain/dtos/booking";
import Booking from "../../../server/infrastructure/schemas/Booking";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import connectDB from "@/server/infrastructure/db";

export async function POST(req: Request) {
    try {
        await connectDB();
        const authResult = await auth();
        const userId = authResult.userId;
        
        if (!userId) {
            return NextResponse.json(
                { error: 'Authentication required', details: 'User is not authenticated' },
                { status: 401 }
            );
        }

        const requestBody = await req.json();

        const booking = CreateBookingDTO.safeParse(requestBody);

        if (!booking.success) {
            console.error('Validation Errors:', booking.error.errors);

            return NextResponse.json(
                { error: 'Invalid Booking Data', details: booking.error.errors },
                { status: 400 }
            );
        }

        await Booking.create({
            hotelId: booking.data.hotelId,
            userId: userId,
            checkIn: booking.data.checkIn,
            checkOut: booking.data.checkOut,
            roomNumber: booking.data.roomNumber,
            amount: booking.data.amount,
        });

        return NextResponse.json({ status: 201, message: 'Booking created successfully' });

    } catch (error: unknown) {
        console.error('Error creating booking:', error);
        return NextResponse.json(
            { error: 'Failed to create booking', details: error instanceof Error ? error.message : error },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        await connectDB();
        const bookings = await Booking.find();
        return NextResponse.json(bookings, { status: 200 });
    } catch (error: unknown) {
        console.error('Error fetching bookings:', error);
        return NextResponse.json(
            { error: 'Failed to fetch bookings' },
            { status: 500 }
        );
    }
}

