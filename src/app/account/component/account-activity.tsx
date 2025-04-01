import { Activity, CreditCard, Calendar, Heart, Star } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface AccountActivityProps {
  bookingsCount: number
}

export default function AccountActivity({ bookingsCount }: AccountActivityProps) {
  return (
    <Card className="mb-8 rounded shadow-sm hover:shadow-md transition-shadow duration-300">
      <CardHeader className="border-b bg-gray-50">
        <CardTitle className="flex items-center gap-2 text-gray-800">
          <Activity className="h-5 w-5 text-blue-500" />
          Account Activity
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-lg bg-blue-50 border border-blue-100">
            <div className="flex justify-between items-start">
              <p className="text-sm text-gray-500">All Bookings</p>
              <CreditCard className="h-4 w-4 text-blue-500" />
            </div>
            <p className="text-2xl font-bold text-gray-800 mt-2">{bookingsCount}</p>
          </div>

          <div className="p-4 rounded-lg bg-green-50 border border-green-100">
            <div className="flex justify-between items-start">
              <p className="text-sm text-gray-500">Upcoming</p>
              <Calendar className="h-4 w-4 text-green-500" />
            </div>
            <p className="text-2xl font-bold text-gray-800 mt-2">Soon</p>
          </div>

          <div className="p-4 rounded-lg bg-purple-50 border border-purple-100">
            <div className="flex justify-between items-start">
              <p className="text-sm text-gray-500">Favorites</p>
              <Heart className="h-4 w-4 text-purple-500" />
            </div>
            <p className="text-2xl font-bold text-gray-800 mt-2">Soon</p>
          </div>

          <div className="p-4 rounded-lg bg-amber-50 border border-amber-100">
            <div className="flex justify-between items-start">
              <p className="text-sm text-gray-500">Reviews</p>
              <Star className="h-4 w-4 text-amber-500" />
            </div>
            <p className="text-2xl font-bold text-gray-800 mt-2">Soon</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

