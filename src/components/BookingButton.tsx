"use client"

import React, { useState, useEffect } from 'react';
import { Button } from "./ui/button";
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@clerk/nextjs';
import { toast } from 'sonner';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { format, addDays } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

interface BookingButtonProps {
    price: number;
}

const BookingButton: React.FC<BookingButtonProps> = ({ price }) => {
    const { id } = useParams();
    const router = useRouter();
    const { userId } = useAuth();

    const [isLoading, setIsLoading] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [checkInDate, setCheckInDate] = useState(new Date());
    const [checkOutDate, setCheckOutDate] = useState(addDays(new Date(), 1));
    const [roomNumber, setRoomNumber] = useState(201);

    const [isCreateBookingLoading, setIsCreateBookingLoading] = useState(false);
    const [isCheckInCalendarOpen, setIsCheckInCalendarOpen] = useState(false);
    const [isCheckOutCalendarOpen, setIsCheckOutCalendarOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkIfMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkIfMobile();

        window.addEventListener('resize', checkIfMobile);

        return () => window.removeEventListener('resize', checkIfMobile);
    }, []);

    const nights = Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24));
    const totalPrice = price * nights;

    const handleBookingClick = () => {
        setIsDialogOpen(true);
    }

    const handleCheckInClick = () => {
        setIsCheckInCalendarOpen(true);
    }

    const handleCheckOutClick = () => {
        setIsCheckOutCalendarOpen(true);
    }

    const handleConfirmBooking = async () => {
        if (!userId) {
            toast.error("Please sign in to book a room");
            router.push("/sign-in");
            return;
        }

        try {
            setIsCreateBookingLoading(true);

            const response = await fetch('/api/bookings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    hotelId: id,
                    checkIn: checkInDate.toISOString(),
                    checkOut: checkOutDate.toISOString(),
                    roomNumber: roomNumber,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to create booking');
            }

            toast.success('Booking created successfully!');
            setIsDialogOpen(false);
        } catch (error) {
            console.error('Booking error:', error);
            toast.error(error instanceof Error ? error.message : 'Failed to create booking');
        } finally {
            setIsCreateBookingLoading(false);
        }
    };

    return (
        <div>
            <Button
                className="w-full lg:w-auto"
                onClick={handleBookingClick}
            >
                Book Now
            </Button>


            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Book Your Stay</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="flex flex-col space-y-2">
                                <label htmlFor="check-in" className="text-sm font-medium">
                                    Check-in
                                </label>
                                <Button
                                    id="check-in"
                                    variant="outline"
                                    className="w-full justify-start text-left font-normal"
                                    onClick={handleCheckInClick}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {checkInDate ? format(checkInDate, "PPP") : "Select date"}
                                </Button>
                            </div>

                            <div className="flex flex-col space-y-2">
                                <label htmlFor="check-out" className="text-sm font-medium">
                                    Check-out
                                </label>
                                <Button
                                    id="check-out"
                                    variant="outline"
                                    className="w-full justify-start text-left font-normal"
                                    onClick={handleCheckOutClick}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {checkOutDate ? format(checkOutDate, "PPP") : "Select date"}
                                </Button>
                            </div>
                        </div>

                        <div className="mt-4 space-y-2">
                            <h3 className="font-medium">Stay Summary</h3>
                            <div className="text-sm">
                                <div className="flex justify-between">
                                    <span>Price per night:</span>
                                    <span>${price}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Nights:</span>
                                    <span>{nights}</span>
                                </div>
                                <div className="flex justify-between font-medium mt-2 pt-2 border-t">
                                    <span>Total:</span>
                                    <span>${totalPrice}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            onClick={handleConfirmBooking}
                            disabled={isCreateBookingLoading}
                        >
                            {isCreateBookingLoading ? "Booking..." : "Confirm Booking"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog open={isCheckInCalendarOpen} onOpenChange={setIsCheckInCalendarOpen}>
                <DialogContent className="sm:max-w-[350px] p-0">
                    <DialogHeader className="p-4 pb-0">
                        <DialogTitle>Select Check-in Date</DialogTitle>
                    </DialogHeader>
                    <div className="p-4">
                        <Calendar
                            mode="single"
                            selected={checkInDate}
                            onSelect={(date) => {
                                if (date) {
                                    setCheckInDate(date);
                                    setIsCheckInCalendarOpen(false);

                                    if (date >= checkOutDate) {
                                        setCheckOutDate(addDays(date, 1));
                                    }
                                }
                            }}
                            disabled={(date) => date < new Date()}
                            initialFocus
                            className="rounded-md border"
                        />
                    </div>
                    <DialogFooter className="px-4 pb-4">
                        <Button onClick={() => setIsCheckInCalendarOpen(false)}>Done</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog open={isCheckOutCalendarOpen} onOpenChange={setIsCheckOutCalendarOpen}>
                <DialogContent className="sm:max-w-[350px] p-0">
                    <DialogHeader className="p-4 pb-0">
                        <DialogTitle>Select Check-out Date</DialogTitle>
                    </DialogHeader>
                    <div className="p-4">
                        <Calendar
                            mode="single"
                            selected={checkOutDate}
                            onSelect={(date) => {
                                if (date) {
                                    setCheckOutDate(date);
                                    setIsCheckOutCalendarOpen(false);
                                }
                            }}
                            disabled={(date) => date <= checkInDate || date < new Date()}
                            initialFocus
                            className="rounded-md border"
                        />
                    </div>
                    <DialogFooter className="px-4 pb-4">
                        <Button onClick={() => setIsCheckOutCalendarOpen(false)}>Done</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default BookingButton;