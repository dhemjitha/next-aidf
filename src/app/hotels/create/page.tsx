import CreateHotelForm from "@/components/CreateHotelForm";
import { checkRole } from "../../../../utils/roles";
import { redirect } from 'next/navigation'

export default async function CreateHotelPage() {

    const isAdmin = await checkRole('admin')
    if (!isAdmin) {
        redirect('/')
    }

    return (
        <main className="container mx-auto px-4 py-8 min-h-screen">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Create a Hotel
            </h2>
            <CreateHotelForm />
        </main>
    )
}