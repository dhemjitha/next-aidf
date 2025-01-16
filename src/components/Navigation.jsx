import React from 'react'
import { Button } from './ui/button'
import { Globe } from 'lucide-react'

function Navigation() {
  return (
    <nav className="z-10 bg-black flex items-center justify-between px-8 text-white py-4">
        <div className="flex items-center space-x-8">
            <a href="/" className="text-2xl font-bold">
                Horizone
            </a>
        <div className="hidden md:flex space-x-6">
            <a href="/" className="transition-colors">
                Home
            </a>
        </div>
        </div>

        <div className="flex items-center space-x-4">
            <Button variant="ghost">
                <Globe className="h-5 w-5 mr-2" />
                EN
            </Button>
            <Button variant="ghost">Log In</Button>
            <Button>Sign Up</Button>
        </div>

    </nav>
  )
}

export default Navigation