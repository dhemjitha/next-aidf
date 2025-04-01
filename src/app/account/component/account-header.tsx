import { User, Settings, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import type { UserResource } from "@clerk/types"
import Image from "next/image"

interface AccountHeaderProps {
  isLoading: boolean
  user: UserResource | null
}

export default function AccountHeader({ isLoading, user }: AccountHeaderProps) {
  if (isLoading) {
    return (
      <div className="py-12 bg-white">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <Skeleton className="h-16 w-16 rounded-full bg-gray-200" />
              <div>
                <Skeleton className="h-8 w-48 bg-gray-200" />
                <Skeleton className="mt-2 h-4 w-36 bg-gray-200" />
              </div>
            </div>
            <div className="mt-4 md:mt-0 flex gap-3">
              <Skeleton className="h-9 w-32 bg-gray-200" />
              <Skeleton className="h-9 w-40 bg-gray-200" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="py-12 bg-white">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-white p-1 shadow-md relative">
              {user?.imageUrl ? (
                <Image
                  width={64}
                  height={64}
                  src={user.imageUrl || "/placeholder.svg"}
                  alt={user?.fullName || "User"}
                  className="h-full w-full object-cover rounded-full"
                />
              ) : (
                <div className="h-full w-full rounded-full bg-blue-100 flex items-center justify-center">
                  <User className="h-8 w-8 text-blue-500" />
                </div>
              )}
              <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white"></div>
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800">My Account</h1>
              <p className="mt-1 text-gray-600 flex items-center">
                Welcome back, <span className="font-semibold ml-1">{user?.firstName || "Guest"}</span>
              </p>
            </div>
          </div>

          <div className="mt-4 md:mt-0 flex gap-3">
            <Button variant="outline" size="sm" className="flex items-center gap-2 border-gray-200 bg-white shadow-sm hover:bg-gray-50">
              <Settings className="h-4 w-4" />
              Edit Profile
            </Button>
            <Button size="sm" className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 shadow-sm">
              <CreditCard className="h-4 w-4" />
              Manage Payments
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}