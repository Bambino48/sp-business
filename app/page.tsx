export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100">

      {/* HEADER */}
      <header className="bg-white shadow p-4 flex justify-between">
        <h1 className="text-xl font-bold text-blue-600">
          SP-Business
        </h1>

        <nav className="space-x-4">
          <a href="#">Accueil</a>
          <a href="#">Entreprises</a>
          <a href="#">Ajouter entreprise</a>
        </nav>
      </header>


      {/* HERO SECTION */}

      <section className="text-center mt-20">

        <h2 className="text-4xl font-bold">
          Trouvez les entreprises de San Pedro
        </h2>

        <p className="mt-4 text-gray-600">
          Restaurants, hôtels, transport, services…
        </p>

        <button className="mt-6 bg-blue-600 text-white px-6 py-3 rounded">
          Explorer les entreprises
        </button>

      </section>

    </main>
  )
}