"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { CheckCircle, Mail, MapPin, Clock, Send, Twitter, Linkedin, Facebook, Instagram } from "lucide-react"
import Link from "next/link"

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
})

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  })

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsSubmitting(true)

    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitSuccess(true)
      form.reset()

      setTimeout(() => setSubmitSuccess(false), 5000)
    }, 1500)
  }

  return (
    <div className="bg-gradient-to-b from-slate-50 to-slate-100 min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block bg-blue-100 text-blue-600 rounded-full px-4 py-1.5 text-sm font-medium mb-4">
              Contact Us
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-blue-500">Get in Touch</h1>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Have questions or feedback? We&apos;d love to hear from you. Our team is ready to assist you with any
              inquiries.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
            <Card className="lg:col-span-2 border-0 shadow-lg shadow-slate-200/50 overflow-hidden">
              <div className="bg-blue-500 text-white p-8">
                <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <Mail className="w-5 h-5 mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium mb-1">Email</h3>
                      <p className="text-indigo-100">dhemjitha@gmail.com</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <MapPin className="w-5 h-5 mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium mb-1">Headquarters</h3>
                      <p className="text-indigo-100">
                        123 AI Boulevard
                        <br />
                        Tech District
                        <br />
                        San Francisco, CA 94105
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Clock className="w-5 h-5 mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium mb-1">Hours</h3>
                      <p className="text-indigo-100">Monday - Sunday: Open 24h</p>
                    </div>
                  </div>
                </div>

                <div className="mt-12 pt-8 border-t border-blue-400/30">
                  <h3 className="font-medium mb-3">Connect with us</h3>
                  <div className="flex space-x-4">
                    <Link
                      href="https://x.com/DulranDev"
                      className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                    >
                      <span className="sr-only">Twitter</span>
                      <Twitter className="w-5 h-5 text-white" />
                    </Link>
                    <Link
                      href="https://www.linkedin.com/in/dulran-hemjitha/"
                      className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                    >
                      <span className="sr-only">LinkedIn</span>
                      <Linkedin className="w-5 h-5 text-white" />
                    </Link>
                    <Link
                      href="https://web.facebook.com/dulran.hemjitha.1"
                      className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                    >
                      <span className="sr-only">Facebook</span>
                      <Facebook className="w-5 h-5 text-white" />
                    </Link>
                    <Link
                      href="https://www.instagram.com/_.dulran._/"
                      className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                    >
                      <span className="sr-only">Instagram</span>
                      <Instagram className="w-5 h-5 text-white" />
                    </Link>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="lg:col-span-3 border-0 shadow-lg shadow-slate-200/50">
              <CardContent className="p-8">
                {submitSuccess ? (
                  <div className="text-center py-12 px-4">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="w-10 h-10 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold mb-3">Message Sent!</h3>
                    <p className="text-slate-600 mb-8">Thank you for reaching out. We&apos;ll get back to you soon.</p>
                    <Button variant="outline" onClick={() => setSubmitSuccess(false)} className="px-6">
                      Send another message
                    </Button>
                  </div>
                ) : (
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-slate-700">Your Name</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="John Doe"
                                  {...field}
                                  className="border-slate-200 focus-visible:ring-blue-500"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-slate-700">Email Address</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="you@example.com"
                                  {...field}
                                  className="border-slate-200 focus-visible:ring-blue-500"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="subject"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-slate-700">Subject</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="How can we help you?"
                                {...field}
                                className="border-slate-200 focus-visible:ring-blue-500"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-slate-700">Message</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Tell us more about your inquiry..."
                                className="min-h-[150px] border-slate-200 focus-visible:ring-blue-500"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="pt-2">
                        <Button
                          type="submit"
                          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-6"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <span className="flex items-center">
                              <span className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                              Sending...
                            </span>
                          ) : (
                            <span className="flex items-center">
                              Send Message
                              <Send className="ml-2 h-4 w-4" />
                            </span>
                          )}
                        </Button>
                      </div>
                    </form>
                  </Form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact

