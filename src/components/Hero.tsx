import React from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Sparkles } from 'lucide-react'
import Image from 'next/image'

function Hero() {
    return (
        <div className="relative min-h-screen">

            <div className="relative z-10 flex flex-col items-center text-white justify-center px-8 pt-32 pb-32">
                <h1 className="text-4xl md:text-6xl font-bold mb-8 text-center">
                    Find Your Best Staycation
                </h1>
                <p className="text-xl mb-12 text-center max-w-2xl">
                    Describe your dream destination and experience, and we&apos;ll find the
                    perfect place for you.
                </p>

                <form className="w-full max-w-3xl bg-black/10 backdrop-blur-md lg:h-16 rounded-full p-2 flex items-center">
                    <Input
                        type="text"
                        placeholder="Describe your destination, experience, or hotel..."
                        className="flex-grow bg-transparent lg:text-lg text-white placeholder:text-white/50 border-none outline-none ring-0 ring-offset-0 focus:border-none focus:outline-none focus:ring-0 focus:ring-offset-0 focus-visible:border-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                    <Button
                        type="submit"
                        className="rounded-full w-48 flex items-center gap-x-2 lg:h-12"
                    >
                        <Sparkles
                            style={{ width: "20px", height: "20px" }}
                            className="mr-2 animate-pulse text-sky-400"
                        />
                        <span className="lg:text-lg">AI Search</span>
                    </Button>
                </form>

            </div>

            {/* Hero Image */}
            <Image
                width={1920}
                height={1080}
                src="/assets/hero/hero_1.jpg"
                alt=""
                className="absolute top-0 left-0 w-full h-full object-cover -z-10"
            />

        </div>
    )
}

export default Hero