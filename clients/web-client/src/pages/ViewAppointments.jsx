// src/pages/ViewAppointments.jsx
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar.jsx";
import { getAppointments } from "../api/appointmentsService";

export default function ViewAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAppointments();
        // ✅ Asegura que sea un array
        if (Array.isArray(data)) {
          setAppointments(data);
        } else {
          console.warn("Respuesta inesperada:", data);
          setAppointments([]); // Evita el error de .map
        }
      } catch (err) {
        console.error("Error al cargar citas:", err);
        setError("No se pudieron cargar las citas.");
        setAppointments([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-teal-600 font-semibold">
        Cargando citas...
      </div>
    );
  }

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

  return (
    <div className="min-h-screen bg-teal-50">
      <Navbar />
      <div className="max-w-5xl mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold text-teal-700 mb-8 text-center">
          Citas Registradas
        </h1>

        <div className="bg-white rounded-2xl shadow p-6 overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-teal-100 text-teal-800">
                <th className="p-3">ID</th>
                <th className="p-3">Mascota</th>
                <th className="p-3">Fecha</th>
                <th className="p-3">Motivo</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(appointments) && appointments.length > 0 ? (
                appointments.map((a) => (
                  <tr key={a.id} className="border-b hover:bg-teal-50">
                    <td className="p-3">{a.id}</td>
                    <td className="p-3">{a.pet_name || "N/A"}</td>
                    <td className="p-3">{a.date}</td>
                    <td className="p-3">{a.reason}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center p-6 text-gray-600">
                    No hay citas registradas.
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
