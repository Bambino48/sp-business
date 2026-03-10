type Business = {
    name: string
    category: string
    location: string
}

export default function BusinessCard({ name, category, location }: Business) {
    return (

        <div className="bg-white p-6 rounded shadow">

            <h2 className="text-xl font-bold">
                {name}
            </h2>

            <p className="text-gray-600">
                {category}
            </p>

            <p className="text-gray-500 text-sm">
                {location}
            </p>

        </div>

    )
}