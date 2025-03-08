import { NextResponse } from 'next/server';
import connectDB from '@/server/infrastructure/db';
import Hotel from '@/server/infrastructure/schemas/Hotel';

export async function GET() {
    try {
        await connectDB();
        const hotels = await Hotel.find({});
        return NextResponse.json(hotels, { status: 200 });
    } catch (error: unknown) {
        console.error('Error fetching hotels:', error);
        return NextResponse.json(
            { error: 'Failed to fetch hotels' },
            { status: 500 }
        );
    }
}

export async function POST(req: Request) {
    try {
      await connectDB();
      const data = await req.json();
  
      console.log("Data is comming properly:", data);
  
      const { name, location, image, price, description, rating, reviews } = data;
  
      const newHotel = new Hotel({
        name,
        location,
        image,
        price,
        description,
        rating: rating ?? undefined,
        reviews: reviews ?? undefined,
      });
  
      await newHotel.save();
  
      return NextResponse.json({ message: "Hotel created successfully!" }, { status: 201 });
    } catch (error: unknown) {
      console.error("Hotel Creation Error:", error);
      return NextResponse.json({ error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
    }
  }
  
