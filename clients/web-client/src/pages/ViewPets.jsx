// src/pages/ViewPets.jsx
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar.jsx";
import { getPets } from "../api/petsService";

export default function ViewPets() {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPets();

        // ✅ Validar que la respuesta sea un array
        if (Array.isArray(data)) {
          setPets(data);
        } else {
          console.warn("Respuesta inesperada del backend:", data);
          setPets([]);
        }
      } catch (err) {
        console.error("Error al cargar mascotas:", err);
        setError("No se pudieron cargar las mascotas.");
        setPets([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // 🌀 Estado de carga
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-teal-600 font-semibold">
        Cargando mascotas...
      </div>
    );
  }

  // ❌ Estado de error
  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-red-600">
        <Navbar />
        <p className="text-lg font-semibold mb-3">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
        >
          Reintentar
        </button>
      </div>
    );
  }

  // ✅ Render normal
  return (
    <div className="min-h-screen bg-teal-50">
      <Navbar />
      <div className="max-w-5xl mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold text-teal-700 mb-8 text-center">
          Mascotas Registradas
        </h1>

        <div className="bg-white rounded-2xl shadow p-6 overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-teal-100 text-teal-800">
                <th className="p-3">ID</th>
                <th className="p-3">Nombre</th>
                <th className="p-3">Especie</th>
                <th className="p-3">Edad</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(pets) && pets.length > 0 ? (
                pets.map((p) => (
                  <tr key={p.id} className="border-b hover:bg-teal-50">
                    <td className="p-3">{p.id}</td>
                    <td className="p-3">{p.name}</td>
                    <td className="p-3">{p.species}</td>
                    <td className="p-3">{p.age || "N/A"}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center p-6 text-gray-600">
                    No hay mascotas registradas.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
