"use client"

import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { format } from "date-fns";
import { CalendarIcon, MapPinIcon, BedIcon, StarIcon, Bookmark, AlertCircle, User, Mail, UtensilsIcon, ImageIcon } from "lucide-react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

export default function AccountPage() {
    const { isLoaded, isSignedIn, user } = useUser();
    const [bookings, setBookings] = useState<any[]>([]);
    const [isLoadingBookings, setIsLoadingBookings] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [open, setOpen] = useState(false);
    const [bookingToCancel, setBookingToCancel] = useState<any>(null);

    const handleCancelBooking = async (bookingId: string) => {
        try {
            toast.loading("Cancelling booking...");
            const response = await fetch(`/api/bookings/user`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ bookingId }),
            });

            if (!response.ok) {
                throw new Error('Failed to cancel booking');
            }

            const data = await response.json();
            setBookings(bookings.filter((booking) => booking._id !== bookingId));
            toast.dismiss();
            toast.success(data.message || "Booking cancelled successfully");
            setOpen(false);
        } catch (err) {
            console.error('Error cancelling booking:', err);
            toast.dismiss();
            toast.error("Failed to cancel booking. Please try again.");
        }
    }

    const openCancelDialog = (booking: any) => {
        setBookingToCancel(booking);
        setOpen(true);
    };

    useEffect(() => {
        if (isSignedIn) {
            fetchUserBookings();
        }
    }, [isSignedIn]);

    const fetchUserBookings = async () => {
        try {
            setIsLoadingBookings(true);
            const response = await fetch('/api/bookings/user');
            if (!response.ok) {
                throw new Error('Failed to fetch bookings');
            }
            const data = await response.json();
            setBookings(data);
        } catch (err) {
            console.error('Error fetching bookings:', err);
            setError('Unable to load your bookings. Please try again later.');
        } finally {
            setIsLoadingBookings(false);
        }
    };


    if (!isLoaded) {
        return (
            <main className="container mx-auto px-4 py-8 min-h-screen">
                <div>
                    <div className="py-12">
                        <div className="container mx-auto">
                            <h1 className="text-3xl md:text-4xl font-bold">My Account</h1>
                            <p className="mt-2">Loading your profile...</p>
                        </div>
                    </div>
                    <div className="container mx-auto -mt-6">
                        <Card className="mb-8">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <User className="h-5 w-5" />
                                    Personal Information
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-blue-100 p-3 rounded-full">
                                            <User className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Full Name</p>
                                            <Skeleton className="w-32 h-4 bg-gray-300 rounded" />
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="bg-blue-100 p-3 rounded-full">
                                            <Mail className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Email Address</p>
                                            <Skeleton className="w-40 h-4 bg-gray-300 rounded" />
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                </div>
            </main>
        );
    }


    return (
        <main className="container mx-auto px-4 py-8 min-h-screen">
            <div>
                <div className="py-12">
                    <div className="container mx-auto">
                        <h1 className="text-3xl md:text-4xl font-bold">My Account</h1>
                        <p className="mt-2">Welcome back, {user?.firstName || 'Guest'} !</p>
                    </div>
                </div>

                <div className="container mx-auto -mt-6">
                    <Card className="mb-8">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <User className="h-5 w-5" />
                                Personal Information
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="flex items-center gap-3">
                                    <div className="bg-blue-100 p-3 rounded-full">
                                        <User className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Full Name</p>
                                        <p className="font-medium">{user?.fullName}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="bg-blue-100 p-3 rounded-full">
                                        <Mail className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Email Address</p>
                                        <p className="font-medium">{user?.emailAddresses[0].emailAddress}</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <div className="mt-12">
                <h2 className="text-xl md:text-2xl font-semibold mb-6">My Bookings</h2>

                {isLoadingBookings ? (
                    <div className="space-y-6">
                        {[1, 2, 3].map((item) => (
                            <div key={item} className="border rounded-lg p-4">
                                <Skeleton className="h-6 w-64 mb-4 rounded-md bg-gradient-to-r from-gray-300 via-gray-400 to-gray-300 animate-pulse" />
                                <Skeleton className="h-4 w-48 mb-3 rounded-md bg-gradient-to-r from-gray-300 via-gray-400 to-gray-300 animate-pulse" />
                                <Skeleton className="h-4 w-32 rounded-md bg-gradient-to-r from-gray-300 via-gray-400 to-gray-300 animate-pulse" />
                            </div>
                        ))}
                    </div>
                ) : error ? (
                    <div className="text-red-600 font-semibold p-4 border border-red-300 rounded-lg bg-red-100">
                        <AlertCircle className="inline-block mr-2 w-5 h-5 text-red-600" />
                        {error}
                    </div>


                ) : bookings.length === 0 ? (
                    <div className="text-center py-8 border rounded-lg">
                        <Bookmark className="mx-auto mb-4 w-12 h-12 text-gray-500" />
                        <p className="text-muted-foreground">You haven&apos;t made any bookings yet.</p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {bookings.map((booking) => (
                            <div key={booking._id} className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
                                <div className="flex flex-col md:flex-row">
                                    {/* Hotel Image Section */}
                                    <div className="md:w-1/3 h-48 md:h-auto relative">
                                        {booking.hotelId?.image ? (
                                            <Image
                                            src={booking.hotelId.image}
                                            alt={booking.hotelId?.name || 'Hotel'}
                                            fill
                                            sizes="(max-width: 768px) 100vw, 33vw"
                                            className="object-cover"
                                            priority={false}
                                        />
                                        ) : (
                                            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                                <ImageIcon className="w-12 h-12 text-gray-400" />
                                            </div>
                                        )}
                                        <div className="absolute top-4 left-4">
                                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${new Date(booking.checkOut) < new Date()
                                                ? 'bg-gray-800 text-white'
                                                : 'bg-blue-500 text-white'
                                                }`}>
                                                {new Date(booking.checkOut) < new Date() ? 'Completed' : 'Upcoming'}
                                            </span>
                                            <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-500 text-white ml-2">
                                                Paid
                                            </span>
                                        </div>
                                    </div>

                                    {/* Content Section */}
                                    <div className="p-6 md:w-2/3 flex flex-col justify-between">
                                        <div className="flex flex-col md:flex-row md:justify-between gap-4">
                                            <div>
                                                <h3 className="text-xl font-bold text-gray-800">{booking.hotelId?.name || 'Hotel'}</h3>

                                                <div className="flex items-center mt-2 text-gray-600">
                                                    <MapPinIcon className="w-4 h-4 mr-1 text-blue-500" />
                                                    <span>{booking.hotelId?.location || 'Location unavailable'}</span>
                                                </div>

                                                <div className="flex flex-wrap gap-2 mt-3">
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                                                        <BedIcon className="w-3 h-3 mr-1" />
                                                        Luxury Room
                                                    </span>
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-700">
                                                        <StarIcon className="w-3 h-3 mr-1" />
                                                        Rooftop View
                                                    </span>
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700">
                                                        <UtensilsIcon className="w-3 h-3 mr-1" />
                                                        French Cuisine
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="bg-gray-50 p-4 rounded-lg flex flex-row md:flex-col gap-4 md:gap-6 justify-between">
                                                <div className="flex items-center">
                                                    <CalendarIcon className="w-5 h-5 mr-2 text-blue-500" />
                                                    <div>
                                                        <p className="font-medium">{booking.checkIn && format(new Date(booking.checkIn), 'MMM d, yyyy')}</p>
                                                        <p className="text-xs text-gray-500">Check-in</p>
                                                    </div>
                                                </div>

                                                <div className="hidden md:block h-px w-full bg-gray-200"></div>
                                                <div className="md:hidden h-10 border-l border-gray-200"></div>

                                                <div className="flex items-center">
                                                    <CalendarIcon className="w-5 h-5 mr-2 text-red-500" />
                                                    <div>
                                                        <p className="font-medium">{booking.checkOut && format(new Date(booking.checkOut), 'MMM d, yyyy')}</p>
                                                        <p className="text-xs text-gray-500">Check-out</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-6 pt-4 border-t border-gray-100 flex flex-col sm:flex-row sm:justify-between sm:items-center">
                                            <div>
                                                <p className="text-2xl font-bold text-gray-800">${booking.amount?.toFixed(2) || '0.00'}</p>
                                                <p className="text-xs text-gray-500">
                                                    Booking ID: <span className="font-mono">{booking._id}</span>
                                                </p>
                                            </div>

                                            <div className="mt-4 sm:mt-0">
                                                <Button
                                                    variant="destructive"
                                                    size="sm"
                                                    onClick={() => openCancelDialog(booking)}
                                                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
                                                >
                                                    Cancel Booking
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <AlertDialog open={open} onOpenChange={setOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Cancel Booking</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to cancel your booking at{" "}
                            <span className="font-medium">{bookingToCancel?.hotelId?.name || 'this hotel'}</span>?
                            This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={() => bookingToCancel && handleCancelBooking(bookingToCancel._id)}
                            className="bg-red-600 hover:bg-red-700 text-white"
                        >
                            Confirm Cancellation
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </main>
    );
}