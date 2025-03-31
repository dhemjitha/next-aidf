"use client"

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Users, Search, Calendar, Star, Building, Globe } from 'lucide-react'


const About = () => {
  return (
    <div className="bg-gradient-to-b from-slate-50 to-slate-100 min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-16">
            <div className="inline-block bg-blue-100 text-blue-600 rounded-full px-4 py-1.5 text-sm font-medium mb-4">
              About Horizone
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-blue-500">
              Revolutionizing Hotel Booking with AI
            </h1>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">
              We&apos;re on a mission to simplify travel planning, making it easier to discover the perfect 
              accommodations while saving you time and effort.
            </p>
          </div>
          
          {/* Hero Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20 items-center">
            <div className="order-2 lg:order-1">
              <div className="space-y-6">
                <p className="text-lg text-slate-700">
                  Horizone is an innovative hotel booking platform powered by AI, designed to enhance 
                  the search and booking experience for travelers worldwide.
                </p>
                <p className="text-lg text-slate-700">
                  By leveraging OpenAI&apos;s LLM technology, our platform enables users to input natural language 
                  preferences and receive highly personalized hotel recommendations that match their unique needs.
                </p>
                <div className="pt-4">
                  <Button className="bg-blue-500 hover:bg-blue-600 text-white">
                    Start Your Journey
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="relative aspect-[2/1] w-full rounded-xl overflow-hidden shadow-2xl shadow-blue-900/10">
                <Image 
                  src="https://echoinnovateit.com/wp-content/uploads/2021/06/Artificial-Intellgence-in-the-Hotel-Industry-1.jpg" 
                  alt="AI-powered hotel search" 
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-transparent"></div>
              </div>
            </div>
          </div>
          
          {/* Vision Section */}
          <div className="mb-20 bg-white rounded-2xl p-8 md:p-12 shadow-lg shadow-slate-200/50">
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                <Globe className="w-6 h-6 text-blue-600" />
              </div>
              <h2 className="text-3xl font-bold text-slate-800">Our Vision</h2>
            </div>
            
            <div className="space-y-6">
              <p className="text-lg text-slate-700">
                At Horizone, we envision a world where finding the perfect hotel is effortless and intuitive. 
                We believe that technology should adapt to human needs, not the other way around.
              </p>
              <p className="text-lg text-slate-700">
                Our AI-powered platform understands your preferences in natural language, so you can express exactly 
                what you&apos;re looking for - whether it&apos;s &quot;a beachfront hotel with a pool in Japan&quot; or &quot;a quiet boutique 
                hotel near the museums in Paris.&quot;
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10">
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-3">
                  <Building className="w-6 h-6 text-blue-600" />
                </div>
                <span className="text-3xl font-bold text-blue-500">5000+</span>
                <span className="text-slate-600">Hotels</span>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-3">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <span className="text-3xl font-bold text-blue-500">25K+</span>
                <span className="text-slate-600">Happy Users</span>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-3">
                  <Globe className="w-6 h-6 text-blue-600" />
                </div>
                <span className="text-3xl font-bold text-blue-500">120+</span>
                <span className="text-slate-600">Countries</span>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-3">
                  <Star className="w-6 h-6 text-blue-600" />
                </div>
                <span className="text-3xl font-bold text-blue-500">4.9</span>
                <span className="text-slate-600">Average Rating</span>
              </div>
            </div>
          </div>
          
          {/* Features Section */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-slate-800">Why Choose Horizone</h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Our platform combines cutting-edge AI technology with a user-friendly interface to deliver 
                an unparalleled hotel booking experience.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="border-0 shadow-lg shadow-slate-200/50 hover:shadow-blue-100/50 transition-shadow overflow-hidden group">
                <CardContent className="p-8">
                  <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center mb-6 group-hover:bg-blue-500 transition-colors">
                    <Search className="w-7 h-7 text-blue-600 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-slate-800">Personalized Recommendations</h3>
                  <p className="text-slate-600">Our AI analyzes your preferences and matches them with the perfect accommodations for your unique needs and travel style.</p>
                </CardContent>
              </Card>
              
              <Card className="border-0 shadow-lg shadow-slate-200/50 hover:shadow-blue-100/50 transition-shadow overflow-hidden group">
                <CardContent className="p-8">
                  <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center mb-6 group-hover:bg-blue-500 transition-colors">
                    <Users className="w-7 h-7 text-blue-600 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-slate-800">Natural Language Search</h3>
                  <p className="text-slate-600">Simply tell us what you&apos;re looking for in your own words, and our advanced AI will understand and deliver relevant results.</p>
                </CardContent>
              </Card>
              
              <Card className="border-0 shadow-lg shadow-slate-200/50 hover:shadow-blue-100/50 transition-shadow overflow-hidden group">
                <CardContent className="p-8">
                  <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center mb-6 group-hover:bg-blue-500 transition-colors">
                    <Calendar className="w-7 h-7 text-blue-600 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-slate-800">Seamless Booking</h3>
                  <p className="text-slate-600">From search to confirmation, enjoy a smooth booking process designed with user experience at the forefront.</p>
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* CTA Section */}
          <div className="text-center bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-12 shadow-lg shadow-blue-500/20">
            <h2 className="text-3xl font-bold mb-4 text-white">Ready to transform your travel experience?</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied travelers who have discovered their perfect accommodations through Horizone.
            </p>
            <Link href="/contact" passHref>
              <Button className="bg-white text-blue-600 hover:bg-blue-50">
                Get in Touch
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About