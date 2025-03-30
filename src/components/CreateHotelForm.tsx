"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { ImageIcon, MapPinIcon, DollarSignIcon, FileTextIcon } from "lucide-react";

const formSchema = z.object({
    name: z.string().min(1, { message: "Hotel name is required" }),
    location: z.string().min(1, { message: "Location is required" }),
    image: z.string().url({ message: "Enter a valid image URL" }),
    price: z.preprocess((val) => Number(val) || 0, z.number().min(1, "Price must be greater than 0")),
    description: z.string().min(1, { message: "Description is required" }),
});

const CreateHotelForm = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            location: "",
            image: "",
            price: 0,
            description: "",
        },
    });

    const handleSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            toast.loading("Creating hotel...");
            const response = await fetch("/api/hotels", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            });

            toast.dismiss();

            if (response.ok) {
                toast.success("Hotel created successfully");
                form.reset();
            } else {
                toast.error("Hotel creation failed");
            }
        } catch (error) {
            toast.error("Something went wrong");
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-4">
            <Card className="bg-white shadow-sm border border-gray-100">
                <CardHeader className="bg-gray-50 border-b border-gray-100">
                    <CardTitle className="text-2xl font-semibold text-gray-800">Add New Hotel</CardTitle>
                    <CardDescription>Enter the details of the new hotel property</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="flex items-center gap-2 text-gray-700">
                                                <span>Hotel Name</span>
                                            </FormLabel>
                                            <FormControl>
                                                <Input 
                                                    placeholder="Enter hotel name" 
                                                    className="border-gray-200 focus:border-blue-300 focus:ring-2 focus:ring-blue-100" 
                                                    {...field} 
                                                />
                                            </FormControl>
                                            <FormMessage className="text-red-500" />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="location"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="flex items-center gap-2 text-gray-700">
                                                <MapPinIcon className="h-4 w-4 text-gray-500" />
                                                <span>Location</span>
                                            </FormLabel>
                                            <FormControl>
                                                <Input 
                                                    placeholder="City, Country" 
                                                    className="border-gray-200 focus:border-blue-300 focus:ring-2 focus:ring-blue-100" 
                                                    {...field} 
                                                />
                                            </FormControl>
                                            <FormMessage className="text-red-500" />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <FormField
                                control={form.control}
                                name="image"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="flex items-center gap-2 text-gray-700">
                                            <ImageIcon className="h-4 w-4 text-gray-500" />
                                            <span>Image URL</span>
                                        </FormLabel>
                                        <FormControl>
                                            <Input 
                                                placeholder="https://example.com/image.jpg" 
                                                className="border-gray-200 focus:border-blue-300 focus:ring-2 focus:ring-blue-100" 
                                                {...field} 
                                            />
                                        </FormControl>
                                        <FormDescription className="text-gray-500 text-xs">
                                            Provide a direct link to the hotel image
                                        </FormDescription>
                                        <FormMessage className="text-red-500" />
                                    </FormItem>
                                )}
                            />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <FormField
                                    control={form.control}
                                    name="price"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="flex items-center gap-2 text-gray-700">
                                                <DollarSignIcon className="h-4 w-4 text-gray-500" />
                                                <span>Price Per Night</span>
                                            </FormLabel>
                                            <FormControl>
                                                <div className="relative">
                                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                                                    <Input
                                                        type="number"
                                                        placeholder="199"
                                                        className="pl-8 border-gray-200 focus:border-blue-300 focus:ring-2 focus:ring-blue-100"
                                                        onChange={(e) => field.onChange(e.target.value ? parseFloat(e.target.value) : "")}
                                                        value={field.value || ""}
                                                    />
                                                </div>
                                            </FormControl>
                                            <FormMessage className="text-red-500" />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="flex items-center gap-2 text-gray-700">
                                            <FileTextIcon className="h-4 w-4 text-gray-500" />
                                            <span>Description</span>
                                        </FormLabel>
                                        <FormControl>
                                            <Textarea 
                                                placeholder="Describe the hotel..." 
                                                className="min-h-32 border-gray-200 focus:border-blue-300 focus:ring-2 focus:ring-blue-100" 
                                                {...field} 
                                            />
                                        </FormControl>
                                        <FormMessage className="text-red-500" />
                                    </FormItem>
                                )}
                            />

                            <CardFooter className="flex justify-end px-0 pb-0 pt-6">
                                <Button 
                                    type="submit" 
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition-colors"
                                >
                                    Create Hotel
                                </Button>
                            </CardFooter>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
};

export default CreateHotelForm;