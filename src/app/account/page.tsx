"use client"

import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { format } from "date-fns";
import { CalendarIcon, MapPinIcon, BedIcon, StarIcon, Bookmark, AlertCircle } from "lucide-react";
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
                <h1 className="text-3xl md:text-4xl font-bold">My Account</h1>
                <div className="mt-8">
                    <h2 className="text-xl md:text-2xl font-semibold mb-4">
                        Personal Information
                    </h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <Skeleton className="h-6 w-48 rounded-md bg-gradient-to-r from-gray-300 via-gray-400 to-gray-300 animate-pulse" />
                            <Skeleton className="h-6 w-64 rounded-md bg-gradient-to-r from-gray-300 via-gray-400 to-gray-300 animate-pulse" />
                        </div>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className="container mx-auto px-4 py-8 min-h-screen">
            <h1 className="text-3xl md:text-4xl font-bold">My Account</h1>

            <div className="mt-8">
                <h2 className="text-xl md:text-2xl font-semibold mb-4">
                    Personal Information
                </h2>
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <p className="text-muted-foreground">Name: {user?.fullName}</p>
                        <p className="text-muted-foreground">Email: {user?.emailAddresses[0].emailAddress}</p>
                    </div>
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
                            <div key={booking._id} className="border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                                    <div>
                                        <h3 className="text-lg font-semibold">{booking.hotelId?.name || 'Hotel'}</h3>

                                        <div className="flex items-center mt-2 text-muted-foreground">
                                            <MapPinIcon className="w-4 h-4 mr-1" />
                                            <span>{booking.hotelId?.location || 'Location unavailable'}</span>
                                        </div>

                                        <div className="flex items-center mt-2 text-muted-foreground">
                                            <BedIcon className="w-4 h-4 mr-1" />
                                            <span>
                                                Luxury Room
                                            </span>

                                        </div>
                                        <div className="flex items-center mt-2 text-muted-foreground">
                                            <StarIcon className="w-4 h-4 mr-1" />
                                            <span>
                                                Rooftop View • French Cuisine
                                            </span>

                                        </div>

                                    </div>

                                    <div className="bg-gray-50 p-3 rounded-md">
                                        <div className="flex items-center">
                                            <CalendarIcon className="w-4 h-4 mr-1 text-muted-foreground" />
                                            <div>
                                                <p>{booking.checkIn && format(new Date(booking.checkIn), 'MMM d, yyyy')}</p>
                                                <p className="text-sm text-muted-foreground">Check-in</p>
                                            </div>
                                        </div>

                                        <div className="h-4 border-l border-gray-300 ml-2"></div>

                                        <div className="flex items-center">
                                            <CalendarIcon className="w-4 h-4 mr-1 text-muted-foreground" />
                                            <div>
                                                <p>{booking.checkOut && format(new Date(booking.checkOut), 'MMM d, yyyy')}</p>
                                                <p className="text-sm text-muted-foreground">Check-out</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-4 pt-4 border-t flex flex-col sm:flex-row sm:justify-between">
                                    <div>
                                        <p className="font-medium">Total: ${booking.hotelId?.price?.toFixed(2) || '0.00'}</p>
                                        <p className="text-sm text-muted-foreground">
                                            Booking ID: {booking._id}
                                        </p>
                                    </div>
                                    <div className="mt-3 sm:mt-0 flex items-center gap-3">
                                        <span className={`px-3 py-1 rounded-full text-sm ${new Date(booking.checkOut) < new Date()
                                            ? 'bg-gray-100 text-gray-700'
                                            : 'bg-green-100 text-green-700'
                                            }`}>
                                            {new Date(booking.checkOut) < new Date() ? 'Completed' : 'Upcoming'}
                                        </span>

                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            onClick={() => openCancelDialog(booking)}
                                        >
                                            Cancel
                                        </Button>

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