export interface Booking {
    _id: string
    checkIn: string
    checkOut: string
    amount?: number
    hotelId?: {
      _id: string
      name: string
      location: string
      image: string
    }
  }
  
  