'use client'

import React, { useState } from 'react'
import { Button } from './ui/button'
import { ChevronDown, Globe, Menu, X } from 'lucide-react'
import Link from 'next/link'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { useUser } from '@clerk/nextjs'

function Navigation() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const { user } = useUser();

    return (
        <nav className="z-50 bg-white flex items-center justify-between px-4 md:px-8 py-4 shadow-sm">
            <div className="flex items-center space-x-8">
                <Link href="/" className="text-2xl ">
                    <span className="text-gray-800 font-bold">Hori</span>
                    <span className="text-blue-500 font-bold">zone</span>
                </Link>

                <div className="hidden md:flex space-x-8">
                    <Link href="/" className="text-gray-600 hover:text-gray-800 font-medium">
                        Home
                    </Link>
                    {user?.publicMetadata?.role === "admin" && (
                        <Link href="/hotels/create" className="text-gray-600 hover:text-gray-800 transition-colors">
                            Create Hotel
                        </Link>
                    )}
                </div>
            </div>

            <div className="md:hidden">
                <button onClick={toggleMenu} className="text-gray-800">
                    {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
            </div>

            <div className="hidden md:flex items-center space-x-4">
                <Button variant="ghost">
                    <Globe className="h-5 w-5 mr-2" />
                    EN
                </Button>
                <SignedOut>
                    <Button variant="ghost" asChild>
                        <Link href="/sign-in">Login</Link>
                    </Button>
                    <Button asChild className="bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-lg text-sm">
                        <Link href="/sign-up">Sign up</Link>
                    </Button>
                </SignedOut>
                <SignedIn>
                    <UserButton appearance={{
                        elements: {
                            rootBox: "w-full text-center"
                        }
                    }} />
                    <Button asChild className="bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-lg text-sm">
                        <Link href="/account">My Account</Link>
                    </Button>
                </SignedIn>
            </div>

            {isOpen && (
                <div className="md:hidden absolute top-16 left-0 right-0 flex flex-col bg-white p-4 z-50 shadow-md">
                    <Link href="/" onClick={toggleMenu} className="text-gray-600 hover:text-gray-800 font-medium flex items-center justify-center py-3">
                        Home
                    </Link>
                    {user?.publicMetadata?.role === "admin" && (
                        <Link href="/hotels/create" onClick={toggleMenu} className="text-gray-600 hover:text-gray-800 flex items-center justify-center py-3 mb-2">
                            Create Hotel
                        </Link>
                    )}

                    <Button variant="ghost" className="mb-3" onClick={toggleMenu}>
                        <Globe className="h-5 w-5 mr-2" />
                        EN
                    </Button>

                    <SignedOut>
                        <Button variant="ghost" asChild className="mb-3 text-gray-600" onClick={toggleMenu}>
                            <Link href="/sign-in">Login</Link>
                        </Button>
                        <Button asChild onClick={toggleMenu} className="bg-gray-900 hover:bg-gray-800 text-white">
                            <Link href="/sign-up">Sign up</Link>
                        </Button>
                    </SignedOut>
                    <SignedIn>
                        <UserButton appearance={{
                            elements: {
                                rootBox: "w-full items-center justify-center flex mt-4 mb-4"
                            }
                        }} />
                        <Button asChild onClick={toggleMenu} className="bg-gray-900 hover:bg-gray-800 text-white">
                            <Link href="/account">My Account</Link>
                        </Button>
                    </SignedIn>
                </div>
            )}
        </nav>
    );
}

export default Navigation;