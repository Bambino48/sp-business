import { prisma } from "../../lib/prisma"
import { NextResponse } from "next/server"
import { businessSchema } from "../../lib/validation"
import { cookies } from "next/headers"
import { verifyToken } from "../../lib/auth"

export async function POST(req: Request) {
    try {

        const cookieStore = await cookies()
        const token = cookieStore.get("token")?.value

        if (!token || !verifyToken(token)) {
            return NextResponse.json(
                { error: "Non autorisé" },
                { status: 401 }
            )
        }

        const data = await req.json()

        const result = businessSchema.safeParse(data)

        if (!result.success) {
            return NextResponse.json(
                { error: result.error.flatten() },
                { status: 400 }
            )
        }

        const business = await prisma.business.create({
            data: result.data
        })

        return NextResponse.json(business, { status: 201 })
    } catch (error) {
        console.error(error)

        return NextResponse.json(
            { error: "Erreur serveur" },
            { status: 500 }
        )
    }
}