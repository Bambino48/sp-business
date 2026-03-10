import BusinessCard from "../components/BusinessCard"

export default function Entreprises() {

    const entreprises = [
        {
            name: "Restaurant Chez Ali",
            category: "Restaurant",
            location: "San Pedro Centre"
        },
        {
            name: "Hotel Atlantic",
            category: "Hotel",
            location: "Quartier Balmer"
        },
        {
            name: "Transport Express",
            category: "Transport",
            location: "Zone portuaire"
        }
    ]

    return (

        <main className="p-10">

            <h1 className="text-3xl font-bold mb-8">
                Entreprises de San Pedro
            </h1>

            <div className="grid grid-cols-3 gap-6">

                {entreprises.map((entreprise, index) => (

                    <BusinessCard
                        key={index}
                        name={entreprise.name}
                        category={entreprise.category}
                        location={entreprise.location}
                    />

                ))}

            </div>

        </main>

    )

}