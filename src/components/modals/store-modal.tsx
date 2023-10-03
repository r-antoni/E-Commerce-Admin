"use client"

import * as z from "zod"

import { useStoreModal } from "@/hooks/use-store-modal"
import { Modal } from "@/components/ui/modal"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import axios from "axios"
import toast from "react-hot-toast"

const formSchema = z.object({
    name: z.string().min(1),
})

export const StoreModal = () =>{
    const storeModal = useStoreModal();

    const [loading, setLoading] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: ""
        }
    })

    const onSubmit =async (values: z.infer<typeof formSchema>) => {
        try {
            setLoading(true)
            const response = await axios.post("/api/stores", values)
            toast.success("Store created.")
        } catch (error) {
            toast.error("Something went wrong.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <Modal
            title="Create Store"
            desc="Add a new store to manage your products"
            isOpen={storeModal.isOpen}
            onClose={storeModal.onClose}
        >
            <div>
                <div className="py-2 px-2">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField 
                            control={form.control}
                            name="name"
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel>Store Name</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder="E-Commerce" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                            />
                            <div className="flex justify-end items-center gap-2 pt-8 w-full">
                                <Button disabled={loading} variant="outline" onClick={storeModal.onClose}>Cancel</Button>
                                <Button disabled={loading} type="submit">Continue</Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
        </Modal>
    )
}

