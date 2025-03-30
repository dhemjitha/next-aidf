import CreateHotelForm from "@/components/CreateHotelForm";
import { checkRole } from "../../../../utils/roles";
import { redirect } from 'next/navigation';
import { PlusCircleIcon } from "lucide-react";

export default async function CreateHotelPage() {
    const isAdmin = await checkRole('admin')
    if (!isAdmin) {
        redirect('/')
    }

    return (
        <main className="bg-gray-50 min-h-screen">
            <div className="container mx-auto px-4 py-8">
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <PlusCircleIcon className="h-8 w-8 text-blue-600" />
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
                            Create a Hotel
                        </h1>
                    </div>
                    <p className="text-gray-600 max-w-2xl">
                        Add a new hotel to your system. Fill in all the required details below to create a complete hotel listing.
                    </p>
                </div>
                
                <CreateHotelForm />
            </div>
        </main>
    )
}