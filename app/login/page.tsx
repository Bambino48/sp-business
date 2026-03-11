"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function LoginPage() {
    const router = useRouter()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (loading) return
        setLoading(true)

        try {
            const response = await fetch("/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            })

            const data = await response.json()

            if (!response.ok) {
                alert(data.error || "Connexion impossible")
                return
            }

            router.push("/entreprises")
            router.refresh()
        } catch (error) {
            console.error(error)
            alert("Erreur de connexion")
        } finally {
            setLoading(false)
        }
    }

    return (
        <main className="p-10 max-w-xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Connexion admin</h1>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                    type="email"
                    placeholder="Email"
                    className="border p-3 rounded"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <input
                    type="password"
                    placeholder="Mot de passe"
                    className="border p-3 rounded"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-600 text-white p-3 rounded disabled:bg-gray-400"
                >
                    {loading ? "Connexion..." : "Se connecter"}
                </button>
            </form>
        </main>
    )
}