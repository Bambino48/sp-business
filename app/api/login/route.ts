import { NextResponse } from "next/server"
import { createToken } from "../../lib/auth"

export async function POST(req: Request) {
    try {
        const { email, password } = await req.json()

        const adminEmail = process.env.ADMIN_EMAIL
        const adminPassword = process.env.ADMIN_PASSWORD

        if (email !== adminEmail || password !== adminPassword) {
            return NextResponse.json(
                { error: "Email ou mot de passe incorrect" },
                { status: 401 }
            )
        }

        const token = createToken({ email })

        const response = NextResponse.json(
            { message: "Connexion réussie" },
            { status: 200 }
        )

        response.cookies.set("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            path: "/",
            maxAge: 60 * 60 * 24,
        })

        return response
    } catch (error) {
        console.error(error)

        return NextResponse.json(
            { error: "Erreur serveur" },
            { status: 500 }
        )
    }
}