/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

export default function EditForm({ business }: any) {

    const router = useRouter()

    const [name, setName] = useState(business.name)
    const [category, setCategory] = useState(business.category)
    const [location, setLocation] = useState(business.location)

    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: any) => {

        e.preventDefault()

        setLoading(true)

        await fetch(`/api/business/${business.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                category,
                location
            })
        })

        router.push("/entreprises")
        router.refresh()
    }

    return (

        <main className="p-10 max-w-xl mx-auto">

            <h1 className="text-3xl font-bold mb-6">
                Modifier entreprise
            </h1>

            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-4"
            >

                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border p-3 rounded"
                />

                <input
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="border p-3 rounded"
                />

                <input
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="border p-3 rounded"
                />

                <button className="bg-blue-600 text-white p-3 rounded">

                    {loading ? "Modification..." : "Modifier"}

                </button>

            </form>

        </main>
    )
}