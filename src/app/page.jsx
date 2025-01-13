"use client"

import { Button } from '@/components/ui/button'
import React from 'react'
import Greeting from './Greeting'

function page() {

  const name = "Dulran";
  const age = 19;

  const handleClick = () => {
    console.log("Button clicked!")
  }

  return (
    <>
    <h1 className="text-2xl text-red-500 font-bold">Hello World</h1>
    <Greeting name={name} age={age} />
    <Button onClick={handleClick}>Click me</Button>
    </>
  )
}

export default page