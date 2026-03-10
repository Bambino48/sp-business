import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
    throw new Error("DATABASE_URL est manquant dans le fichier .env");
}

const pool = new Pool({
    connectionString,
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
    await prisma.business.createMany({
        data: [
            {
                name: "Hotel Palm Beach",
                category: "Hotel",
                location: "San Pedro",
            },
            {
                name: "Restaurant Lagoon",
                category: "Restaurant",
                location: "San Pedro",
            },
            {
                name: "Supermarché Azito",
                category: "Supermarché",
                location: "San Pedro",
            },
        ],
        skipDuplicates: true,
    });

    console.log("Seed terminé");
}

main()
    .catch((error) => {
        console.error("Erreur seed :", error);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
        await pool.end();
    });