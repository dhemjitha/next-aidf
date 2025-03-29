import { ConfettiFireworks } from "@/components/magicui/ConfettiFireworks"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { redirect } from "next/navigation"
import { AnimatedSuccessIcon } from "@/components/animated-success-icon"

export default function PaymentSuccess({
  searchParams: { amount },
}: {
  searchParams: { amount: string }
}) {
  if (!amount) {
    redirect("/")
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-md text-center">
        <div className="flex justify-center mb-4">
          <AnimatedSuccessIcon />
        </div>

        <h1 className="text-2xl font-bold text-green-600 mb-3">Payment Successful!</h1>

        <p className="text-gray-600 mb-4">Thank you for your purchase.</p>

        <span className="block text-xl font-semibold mb-5">Amount Paid ${amount}</span>

        <div className="bg-blue-50 border border-blue-200 rounded-md p-3 mb-4 text-blue-700">
          Your Hotel Reserved Successfully!
        </div>

        <div className="text-gray-600 mb-4">
          Have questions? Contact us at:
          <br />
          <Link href="mailto:dhemjitha@gmail.com" className="text-blue-600 hover:underline">
            dhemjitha@gmail.com
          </Link>
        </div>

        <ConfettiFireworks />

        <Button asChild className="w-full">
          <Link href="/">Return to Home</Link>
        </Button>
      </div>
    </div>
  )
}