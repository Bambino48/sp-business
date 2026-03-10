import { prisma } from "../../lib/prisma"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
    try {
        const data = await req.json()

        const name = data.name?.trim()
        const category = data.category?.trim()
        const location = data.location?.trim()

        if (!name || !category || !location) {
            return NextResponse.json(
                { error: "Tous les champs sont obligatoires" },
                { status: 400 }
            )
        }

        const existingBusiness = await prisma.business.findFirst({
            where: {
                name,
                category,
                location,
            },
        })

        if (existingBusiness) {
            return NextResponse.json(
                { error: "Cette entreprise existe déjà" },
                { status: 409 }
            )
        }

        const business = await prisma.business.create({
            data: {
                name,
                category,
                location,
            },
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