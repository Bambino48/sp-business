import BusinessCard from "../components/BusinessCard"
import LogoutButton from "../components/LogoutButton"
import { prisma } from "../lib/prisma"

export default async function EntreprisesPage() {
    const entreprises = await prisma.business.findMany({
        orderBy: {
            createdAt: "desc",
        },
    })

    return (
        <main className="p-10">
            <div className="mb-8 border-4 border-red-500 p-4 bg-yellow-100">
                <h1 className="text-3xl font-bold mb-4">
                    Entreprises de San Pedro
                </h1>

                <div className="bg-black text-white p-4 inline-block">
                    TEST LOGOUT
                </div>

                <div className="mt-4">
                    <LogoutButton />
                </div>
            </div>

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