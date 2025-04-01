"use client"

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
import type { Booking } from "../../../../types/booking"
interface CancelBookingDialogProps {
  open: boolean
  setOpen: (open: boolean) => void
  booking: Booking | null
  onConfirm: (bookingId: string) => void
}

export function CancelBookingDialog({ open, setOpen, booking, onConfirm }: CancelBookingDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Cancel Booking</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to cancel your booking at{" "}
            <span className="font-medium">{booking?.hotelId?.name || "this hotel"}</span>? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => booking && onConfirm(booking._id)}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            Confirm Cancellation
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

