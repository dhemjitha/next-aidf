"use client"

import { Button } from '@/components/ui/button'
import React from 'react'
import Greeting from './Greeting'
import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import HotelListings from '@/components/HotelListings'

function page() {

  const name = "Dulran";
  const age = 19;

  const handleClick = () => {
    console.log("Button clicked!")
  }

  return (
    <>
    <Navigation/>
    <Hero/>
    <HotelListings/>
    </>
  )
}

export default page