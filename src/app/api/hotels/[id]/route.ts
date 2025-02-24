import { NextResponse } from 'next/server';
import connectDB from '@/server/infrastructure/db';
import Hotel from '@/server/infrastructure/schemas/Hotel';

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        await connectDB();
        const hotel = await Hotel.findById(params.id);
        
        if (!hotel) {
            return NextResponse.json(
                { error: 'Hotel not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(hotel, { status: 200 });
    } catch (error) {
        console.error('Error fetching hotel:', error);
        return NextResponse.json(
            { error: 'Failed to fetch hotel' },
            { status: 500 }
        );
    }
}

export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        await connectDB();
        const body = await request.json();
        
        const hotel = await Hotel.findByIdAndUpdate(
            params.id,
            body,
            { new: true, runValidators: true }
        );

        if (!hotel) {
            return NextResponse.json(
                { error: 'Hotel not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(hotel, { status: 200 });
    } catch (error) {
        console.error('Error updating hotel:', error);
        return NextResponse.json(
            { error: 'Failed to update hotel' },
            { status: 500 }
        );
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        await connectDB();
        const hotel = await Hotel.findByIdAndDelete(params.id);

        if (!hotel) {
            return NextResponse.json(
                { error: 'Hotel not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ message: 'Hotel deleted successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error deleting hotel:', error);
        return NextResponse.json(
            { error: 'Failed to delete hotel' },
            { status: 500 }
        );
    }
}
