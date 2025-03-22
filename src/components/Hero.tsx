import React from 'react'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Sparkles } from 'lucide-react'
import Image from 'next/image'
import { useSearchContext } from '@/context/SearchContext'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@/components/ui/form"
import { Input } from './ui/input'
import { Button } from './ui/button'

const formSchema = z.object({
  search: z.string().min(1, {
    message: "Please enter a search term",
  }),
})

function Hero() {
    const { setSearchQuery, setIsSearching } = useSearchContext();
    
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        search: "",
      },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
      if (values.search.trim() !== '') {
        setIsSearching(true);
        setSearchQuery(values.search);
      }
    }

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

                <Form {...form}>
                  <form 
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="w-full max-w-3xl bg-black/10 backdrop-blur-md lg:h-16 rounded-full p-2 flex items-center">
                      <FormField
                        control={form.control}
                        name="search"
                        render={({ field }) => (
                          <FormItem className="flex-grow">
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="Describe your destination, experience, or hotel..."
                                className="flex-grow bg-transparent lg:text-lg text-white placeholder:text-white/50 border-none outline-none ring-0 ring-offset-0 focus:border-none focus:outline-none focus:ring-0 focus:ring-offset-0 focus-visible:border-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                              />
                            </FormControl>
                          </FormItem>
                        )}
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
                </Form>
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