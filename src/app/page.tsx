"use client"

import React from 'react'
import Hero from '@/components/Hero'
import HotelListings from '@/components/HotelListings'
import HotelBookingGrid from '@/components/HotelBookingGrid'

function page() {
  return (
    <>
    <Hero/>
    <HotelListings/>
    <HotelBookingGrid/>
    </>
  )
}

export default page