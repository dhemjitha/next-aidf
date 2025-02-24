import { NextResponse } from 'next/server';
import connectDB from '@/server/infrastructure/db';
import Hotel from '@/server/infrastructure/schemas/Hotel';

export async function GET() {
    try {
        await connectDB();
        const hotels = await Hotel.find({});
        return NextResponse.json(hotels, { status: 200 });
    } catch (error) {
        console.error('Error fetching hotels:', error);
        return NextResponse.json(
            { error: 'Failed to fetch hotels' },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        await connectDB();
        const body = await request.json();
        
        const hotel = new Hotel(body);
        await hotel.save();

        return NextResponse.json(hotel, { status: 201 });
    } catch (error) {
        console.error('Error creating hotel:', error);
        return NextResponse.json(
            { error: 'Failed to create hotel' },
            { status: 500 }
        );
    }
}
