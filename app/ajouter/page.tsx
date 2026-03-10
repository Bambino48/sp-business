"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function AjouterEntreprise() {

    const router = useRouter()

    const [name, setName] = useState("")
    const [category, setCategory] = useState("")
    const [location, setLocation] = useState("")

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        await fetch("/api/business", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name,
                category,
                location,
            }),
        })

        router.push("/entreprises")
    }

    return (
        <main className="p-10 max-w-xl mx-auto">

            <h1 className="text-3xl font-bold mb-6">
                Ajouter une entreprise
            </h1>

            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-4"
            >

                <input
                    placeholder="Nom de l'entreprise"
                    className="border p-3 rounded"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <input
                    placeholder="Catégorie"
                    className="border p-3 rounded"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                />

                <input
                    placeholder="Localisation"
                    className="border p-3 rounded"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                />

                <button className="bg-blue-600 text-white p-3 rounded">
                    Ajouter
                </button>

            </form>

        </main>
    )
}