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