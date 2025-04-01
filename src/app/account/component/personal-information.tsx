import { User, Mail, Phone, Calendar, CheckCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import type { UserResource } from "@clerk/types"

interface PersonalInformationProps {
  isLoading: boolean
  user: UserResource | null
}

export default function PersonalInformation({ isLoading, user }: PersonalInformationProps) {
  if (isLoading) {
    return (
      <Card className="mb-8 overflow-hidden rounded border hover:shadow-md transition-all duration-300">
        <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 pb-12 relative">
          <CardTitle className="text-white flex items-center gap-2">
            <User className="h-5 w-5" />
            Personal Information
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-12 p-0">
          <div className="grid grid-cols-1 divide-y">
            <div className="p-4 hover:bg-blue-50 transition-colors flex items-center">
              <div className="w-10 text-blue-500">
                <User className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-500">Full Name</p>
                <Skeleton className="w-32 h-4 bg-gray-200 rounded mt-1" />
              </div>
            </div>
            <div className="p-4 hover:bg-blue-50 transition-colors flex items-center">
              <div className="w-10 text-blue-500">
                <Mail className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-500">Email Address</p>
                <Skeleton className="w-40 h-4 bg-gray-200 rounded mt-1" />
              </div>
            </div>
            <div className="p-4 hover:bg-blue-50 transition-colors flex items-center">
              <div className="w-10 text-blue-500">
                <Phone className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-500">Phone Number</p>
                <Skeleton className="w-36 h-4 bg-gray-200 rounded mt-1" />
              </div>
            </div>
            <div className="p-4 hover:bg-blue-50 transition-colors flex items-center">
              <div className="w-10 text-blue-500">
                <Calendar className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-500">Member Since</p>
                <Skeleton className="w-24 h-4 bg-gray-200 rounded mt-1" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="mb-8 overflow-hidden rounded border hover:shadow-md transition-all duration-300">
      <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 pb-12 relative">
        <CardTitle className="text-white flex items-center gap-2">
          <User className="h-5 w-5" />
          Personal Information
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-12 p-0">
        <div className="grid grid-cols-1 divide-y">
          <div className="p-4 hover:bg-blue-50 transition-colors flex items-center">
            <div className="w-10 text-blue-500">
              <User className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-500">Full Name</p>
              <p className="text-gray-800">{user?.fullName || "Not provided"}</p>
            </div>
          </div>
          
          <div className="p-4 hover:bg-blue-50 transition-colors flex items-center">
            <div className="w-10 text-blue-500">
              <Mail className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-500">Email Address</p>
              <div className="flex items-center">
                <p className="text-gray-800">{user?.emailAddresses[0]?.emailAddress || "Not provided"}</p>
                {user?.emailAddresses[0]?.verification?.status === "verified" && (
                  <span className="ml-2 flex items-center text-green-600 text-xs">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Verified
                  </span>
                )}
              </div>
            </div>
          </div>
          
          <div className="p-4 hover:bg-blue-50 transition-colors flex items-center">
            <div className="w-10 text-blue-500">
              <Phone className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-500">Phone Number</p>
              <p className="text-gray-800">{user?.phoneNumbers[0]?.phoneNumber || "Not provided"}</p>
            </div>
          </div>
          
          <div className="p-4 hover:bg-blue-50 transition-colors flex items-center">
            <div className="w-10 text-blue-500">
              <Calendar className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-500">Member Since</p>
              <p className="text-gray-800">
                {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "Unknown"}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}