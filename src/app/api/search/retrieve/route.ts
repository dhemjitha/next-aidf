import Hotel from "@/server/infrastructure/schemas/Hotel";
import { OpenAIEmbeddings } from "@langchain/openai";
import { MongoDBAtlasVectorSearch } from "@langchain/mongodb";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import connectDB from "@/server/infrastructure/db";

export async function GET(req: Request) {
    try {
        
        await connectDB();
        const url = new URL(req.url);
        const query = url.searchParams.get('query');

        if (!query || query === "") {
            const hotels = (await Hotel.find()).map((hotel) => ({
                hotel: hotel,
                confidence: 1,
            }));

            return NextResponse.json(hotels);
        }

        const embeddings = new OpenAIEmbeddings({
            model: "text-embedding-ada-002",
            apiKey: process.env.OPENAI_API_KEY,
        });

        const vectorIndex = new MongoDBAtlasVectorSearch(
            embeddings,  // First parameter should be the embeddings
            {
                collection: mongoose.connection.collection("hotelVector"),
                indexName: "vector_index",
            }
        );

        // First, convert your text query to an embedding vector
        const queryEmbedding = await embeddings.embedQuery(query as string);

        // Then perform the similarity search with the vector and specify how many results to return
        const results = await vectorIndex.similaritySearchVectorWithScore(queryEmbedding, 5); // Return top 5 results
        console.log(results);

        const matchedHotels = await Promise.all(
            results.map(async (result) => {
                const hotel = await Hotel.findById(result[0].metadata._id);
                return {
                    hotel: hotel,
                    confidence: result[1],
                };
            })
        );

        return NextResponse.json(
            matchedHotels.length > 3 ? matchedHotels.slice(0, 4) : matchedHotels
          );

    } catch (error) {
        return NextResponse.json({ error: "Failed to search for hotels" }, { status: 500 });
    }
}