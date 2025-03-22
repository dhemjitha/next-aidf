import { NextResponse } from "next/server";
import { OpenAIEmbeddings } from "@langchain/openai";
import { MongoDBAtlasVectorSearch } from "@langchain/mongodb";
import mongoose from "mongoose";
import Hotel from "@/server/infrastructure/schemas/Hotel";
import { Document } from "@langchain/core/documents";

export async function POST(req: Request) {
    try {

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

        const hotels = await Hotel.find({});

        const docs = hotels.map((hotel) => {
            const { _id, location, price, description } = hotel;
            const doc = new Document({
                pageContent: `${description} Located in ${location}. Price per night: ${price}`,
                metadata: {
                    _id,
                },
            });
            return doc;
        });

        await vectorIndex.addDocuments(docs);

        return NextResponse.json({ message: "Embeddings created successfully" });

    } catch {

    }

}