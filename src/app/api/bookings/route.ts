import { CreateBookingDTO } from "@/server/domain/dtos/booking";
import Booking from "../../../server/infrastructure/schemas/Booking";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
    try {
        const requestBody = await req.json();

        const booking = CreateBookingDTO.safeParse(requestBody);

        if (!booking.success) {
            console.error('Validation Errors:', booking.error.errors);

            return NextResponse.json(
                { error: 'Invalid Hotel Data', details: booking.error.errors },
                { status: 400 }
            );
        }

        const user = req.headers.get('Authorization') ? JSON.parse(req.headers.get('Authorization')!) : null;
        
        if (!user || !user.userId) {
            return NextResponse.json(
                { error: 'Authentication required', details: 'User is not authenticated' },
                { status: 401 }
            );
        }

        await Booking.create({
            hotelId: booking.data.hotelId,
            userId: user.userId,
            checkIn: booking.data.checkIn,
            checkOut: booking.data.checkOut,
            roomNumber: booking.data.roomNumber,
        });

        return NextResponse.json({ status: 201 });

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

