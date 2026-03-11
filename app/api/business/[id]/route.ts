/* eslint-disable @typescript-eslint/no-unused-vars */
import { prisma } from "../../../lib/prisma"
import { NextResponse } from "next/server"

type Params = {
    params: Promise<{
        id: string
    }>
}

export async function DELETE(req: Request, { params }: Params) {
    try {
        const { id } = await params
        const businessId = Number(id)

        if (isNaN(businessId)) {
            return NextResponse.json(
                { error: "ID invalide" },
                { status: 400 }
            )
        }

        const existingBusiness = await prisma.business.findUnique({
            where: { id: businessId },
        })

        if (!existingBusiness) {
            return NextResponse.json(
                { error: "Entreprise introuvable" },
                { status: 404 }
            )
        }

        await prisma.business.delete({
            where: { id: businessId },
        })

        return NextResponse.json(
            { message: "Entreprise supprimée avec succès" },
            { status: 200 }
        )
    } catch (error) {
        console.error(error)

        return NextResponse.json(
            { error: "Erreur serveur" },
            { status: 500 }
        )
    }
}

export async function PUT(req: Request, { params }: Params) {

    try {

        const { id } = await params
        const businessId = Number(id)

        const data = await req.json()

        const updatedBusiness = await prisma.business.update({
            where: { id: businessId },
            data: {
                name: data.name,
                category: data.category,
                location: data.location
            }
        })

        return NextResponse.json(updatedBusiness)

    } catch (error) {

        return NextResponse.json(
            { error: "Erreur modification" },
            { status: 500 }
        )

    }

}