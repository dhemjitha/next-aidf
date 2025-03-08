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
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

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
        <Form {...form}>
            <form className="lg:w-1/2" onSubmit={form.handleSubmit(handleSubmit)}>
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Hotel Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Hotel Name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Hotel Location</FormLabel>
                            <FormControl>
                                <Input placeholder="Hotel Location" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Hotel Image (URL)</FormLabel>
                            <FormControl>
                                <Input placeholder="Hotel Image URL" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Hotel Price</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    placeholder="Hotel Price"
                                    onChange={(e) => field.onChange(e.target.value ? parseFloat(e.target.value) : "")}
                                    value={field.value || ""}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Hotel Description</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Hotel Description" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="mt-4">
                    <Button type="submit" className="w-full sm:w-auto">Create Hotel</Button>
                </div>
            </form>
        </Form>
    );
};

export default CreateHotelForm;
