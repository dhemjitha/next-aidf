"use client"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Sparkles, MapPin, Plane, Compass } from 'lucide-react'
import { useSearchContext } from "@/context/SearchContext"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import Image from "next/image"

const formSchema = z.object({
  search: z.string().min(1, {
    message: "Please enter a search term",
  }),
})

function Hero() {
  const { setSearchQuery, setIsSearching } = useSearchContext()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      search: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (values.search.trim() !== "") {
      setIsSearching(true)
      setSearchQuery(values.search)
    }
  }

  return (
    <main className="min-h-[90vh] bg-white font-sans overflow-hidden relative">
      <div className="absolute top-20 left-10 w-32 h-32 bg-blue-50 rounded-full opacity-70 blur-2xl"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-orange-50 rounded-full opacity-70 blur-3xl"></div>

      <div className="container mx-auto px-4 py-8 md:py-12 flex flex-col md:flex-row items-center">
        <div className="w-full md:w-1/2 mb-8 md:mb-0 md:pr-6 lg:pr-12 relative z-10">
          <div className="inline-block bg-orange-100 text-orange-600 px-4 py-1 rounded-full text-sm font-medium mb-4">
            Discover the world with AI
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-4 leading-tight">
            <span className="block">Let&apos;s</span>
            <span className="block border-b-4 border-orange-500 pb-2 w-fit">travel</span>
            <span className="block">the world</span>
          </h1>

          <p className="text-gray-600 mb-6 max-w-md text-lg">
            Enjoy breathtaking views of nature. Relax and cherish your dreams to the fullest.
          </p>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full max-w-3xl bg-black/10 backdrop-blur-md lg:h-16 rounded-2xl p-2 flex items-center"
            >
              <FormField
                control={form.control}
                name="search"
                render={({ field }) => (
                  <FormItem className="flex-grow">
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Describe your dream destination, experience or hotel..."
                        className="flex-grow bg-transparent lg:text-lg text-gray-800 placeholder:text-gray-500 border-none outline-none ring-0 ring-offset-0 focus:border-none focus:outline-none focus:ring-0 focus:ring-offset-0 focus-visible:border-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="rounded-xl w-auto md:w-48 flex items-center gap-x-2 lg:h-12 bg-blue-500 hover:bg-blue-600"
              >
                <Sparkles className="w-5 h-5 animate-pulse text-sky-100" />
                <span className="lg:text-lg">AI Search</span>
              </Button>
            </form>
          </Form>

          <p className="text-xs text-gray-500 mt-3 italic">
            Try: &quot;I need to go to Kyoto in my weekend and I want to stay in a hotel with a pool&quot;
          </p>
        </div>


        <div className="w-full md:w-1/2 relative">
          <div className="relative w-full h-[400px] sm:h-[450px] md:h-[500px] mx-auto">
            <div className="absolute left-[5%] top-[5%] w-[45%] h-[45%] rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:scale-105 z-10">
              <Image
                src="https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
                alt="Santorini white and blue buildings"
                fill
                className="object-cover"
                priority
              />
            </div>

            <div className="absolute right-[5%] top-[15%] w-[40%] h-[60%] rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:scale-105 z-20">
              <Image
                src="https://images.unsplash.com/photo-1527631746610-bca00a040d60?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
                alt="Person looking at ocean view"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute bottom-4 right-4 bg-white text-blue-500 text-xs font-medium px-3 py-1 rounded-full shadow-sm">
                Best Packages
              </div>
            </div>

            <div className="absolute left-[5%] bottom-[0%] w-[45%] h-[45%] rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:scale-105 z-10">
              <Image
                src="https://images.unsplash.com/photo-1533105079780-92b9be482077?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
                alt="Colorful Mediterranean street"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Hero
