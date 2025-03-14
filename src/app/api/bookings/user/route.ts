import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import Hotel from "@/server/infrastructure/schemas/Hotel";
import Booking from "@/server/infrastructure/schemas/Booking";
import connectDB from "@/server/infrastructure/db";

export async function GET() {
  try {
    await connectDB();
    await Hotel.exists({});
    const user = await currentUser();

    if (!user || !user.id) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const bookings = await Booking.find({ userId: user.id })
      .populate('hotelId')
      .sort({ checkIn: -1 });

    return NextResponse.json(bookings);
  } catch (error) {
    console.error('Error fetching user bookings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch bookings', details: error instanceof Error ? error.message : error },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    await connectDB();
    const user = await currentUser();

    if (!user || !user.id) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const { bookingId } = await request.json();

    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return NextResponse.json(
        { error: 'Booking not found' },
        { status: 404 }
      );
    }

    if (booking.userId !== user.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 403 }
      );
    }

    await booking.deleteOne();

    return NextResponse.json(
      { message: 'Booking cancelled successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error cancelling booking:', error);
    return NextResponse.json(
      { error: 'Failed to cancel booking', details: error instanceof Error ? error.message : error },
      { status: 500 }
    );
  }
}