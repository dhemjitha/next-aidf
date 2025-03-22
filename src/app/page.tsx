"use client"

import React from 'react'
import Hero from '@/components/Hero'
import HotelListings from '@/components/HotelListings'
import HotelBookingGrid from '@/components/HotelBookingGrid'
import { SearchProvider } from '@/context/SearchContext'

function Page() {
  return (
    <SearchProvider>
      <Hero />
      <HotelListings />
      <HotelBookingGrid />
    </SearchProvider>
  )
}

export default Page