import BusinessCard from "../components/BusinessCard"
import { prisma } from "../lib/prisma"

export default async function EntreprisesPage() {
    const entreprises = await prisma.business.findMany({
        orderBy: {
            createdAt: "desc",
        },
    })

    return (
        <main className="p-10">
            <h1 className="text-3xl font-bold mb-8">
                Entreprises de San Pedro
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {entreprises.map((entreprise) => (
                    <BusinessCard
                        key={entreprise.id}
                        id={entreprise.id}
                        name={entreprise.name}
                        category={entreprise.category}
                        location={entreprise.location}
                    />
                ))}
            </div>
        </main>
    )
}