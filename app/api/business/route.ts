import { prisma } from "../../lib/prisma"
import { NextResponse } from "next/server"

export async function POST(req: Request) {

    const data = await req.json()

    const business = await prisma.business.create({
        data: {
            name: data.name,
            category: data.category,
            location: data.location,
        },
    })

    return NextResponse.json(business)
}