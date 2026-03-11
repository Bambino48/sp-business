/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import toast from "react-hot-toast"

export default function LogoutButton() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    const handleLogout = async () => {
        if (loading) return
        setLoading(true)

        try {
            const response = await fetch("/api/logout", {
                method: "POST",
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || "Erreur lors de la déconnexion")
            }

            toast.success("Déconnexion réussie")
            router.push("/login")
            router.refresh()
        } catch (error: any) {
            toast.error(error.message || "Impossible de se déconnecter")
        } finally {
            setLoading(false)
        }
    }

    return (
        <button
            onClick={handleLogout}
            disabled={loading}
            className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-black disabled:bg-gray-400"
        >
            {loading ? "Déconnexion..." : "Déconnexion"}
        </button>
    )
}