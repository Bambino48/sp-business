import { prisma } from "../../../lib/prisma"
import EditForm from "./EditForm"

type Props = {
    params: Promise<{
        id: string
    }>
}

export default async function EditPage({ params }: Props) {
    const { id } = await params
    const businessId = Number(id)

    if (Number.isNaN(businessId)) {
        return <div>Entreprise introuvable</div>
    }

    const business = await prisma.business.findUnique({
        where: { id: businessId }
    })

    if (!business) {
        return <div>Entreprise introuvable</div>
    }

    return <EditForm business={business} />
}