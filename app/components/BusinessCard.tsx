/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import Link from "next/link"
import toast from "react-hot-toast"

type BusinessCardProps = {
    id: number
    name: string
    category: string
    location: string
}

export default function BusinessCard({
    id,
    name,
    category,
    location,
}: BusinessCardProps) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    const handleDelete = async () => {
        const confirmed = window.confirm(
            `Voulez-vous vraiment supprimer l'entreprise "${name}" ?`
        )

        if (!confirmed) return
        if (loading) return

        setLoading(true)

        try {
            const response = await fetch(`/api/business/${id}`, {
                method: "DELETE",
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || "Erreur lors de la suppression")
            }

            router.refresh()
        } catch (error: any) {
            console.error(error)
            toast.error(error.message || "Impossible de supprimer l'entreprise")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition">
            <h2 className="text-xl font-bold text-gray-900 mb-2">
                {name}
            </h2>

            <p className="text-blue-600 font-medium mb-1">
                {category}
            </p>

            <p className="text-gray-500 text-sm mb-4">
                {location}
            </p>

            <div className="flex gap-3">

                <Link
                    href={`/entreprises/${id}/edit`}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Modifier
                </Link>

                <button
                    onClick={handleDelete}
                    disabled={loading}
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 disabled:bg-gray-400"
                >
                    {loading ? "Suppression..." : "Supprimer"}
                </button>

            </div>
        </div>
    )
}