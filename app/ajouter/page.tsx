"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function AjouterEntreprise() {
    const router = useRouter()

    const [name, setName] = useState("")
    const [category, setCategory] = useState("")
    const [location, setLocation] = useState("")
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (loading) return

        setLoading(true)

        try {
            const response = await fetch("/api/business", {
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

            if (!response.ok) {
                throw new Error("Erreur lors de l'ajout de l'entreprise")
            }

            router.push("/entreprises")
            router.refresh()
        } catch (error) {
            console.error(error)
            alert("Impossible d'ajouter l'entreprise")
        } finally {
            setLoading(false)
        }
    }

    return (
        <main className="p-10 max-w-xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">
                Ajouter une entreprise
            </h1>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                    placeholder="Nom de l'entreprise"
                    className="border p-3 rounded"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />

                <input
                    placeholder="Catégorie"
                    className="border p-3 rounded"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                />

                <input
                    placeholder="Localisation"
                    className="border p-3 rounded"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-600 text-white p-3 rounded disabled:bg-gray-400"
                >
                    {loading ? "Ajout en cours..." : "Ajouter"}
                </button>
            </form>
        </main>
    )
}