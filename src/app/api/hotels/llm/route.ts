import { NextResponse } from "next/server";
import OpenAI from "openai";


export async function POST(request: Request) {
    const { prompt } = await request.json();

    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    });

    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
                // {
                //   role: "system",
                //   content:
                //     "You are assistant that will categorize the words that a user gives and give them labels and show an output. Return this response as in the following examples: user: Lake, Cat, Dog, Tree; response: [{label:Nature, words:['Lake', 'Tree']}, {label:Animals, words:['Cat', 'Dog']}] ",
                // },
                { role: "user", content: prompt },
            ],
            store: true,
        });

        return NextResponse.json({
            message: {
                role: "assistant",
                content: completion.choices[0].message.content,
            },
        }, { status: 200 });
    } catch (error) {
        console.error('Error generating message:', error);
        return NextResponse.json(
            { error: 'Failed to generate message', details: error instanceof Error ? error.message : error },
            { status: 500 }
        );
    }
}

