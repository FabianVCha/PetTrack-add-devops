import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';  

export default function DashboardCliente() {
  const { token } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [pets, setPets] = useState([]);
  const navigate = useNavigate();
  

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const data = await getPets();
        setPets(data);
      } catch (err) {
        console.error("Error al obtener mascotas:", err);
      }
    };
    fetchPets();
  }, [token]);

return (
    <div className="flex h-screen w-full overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Overlay para móvil */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar desplegable */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-30 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="p-6 h-full overflow-y-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-teal-700">Mi Panel</h2>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-gray-600 hover:text-gray-900 text-2xl"
            >
              ✕
            </button>
          </div>
          
          <nav className="space-y-2">
            <a href="#" className="block px-4 py-3 rounded-lg bg-teal-50 text-teal-700 font-medium">
              Dashboard
            </a>
            <a href="#" className="block px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
              Mis Mascotas
            </a>
            <a href="#" className="block px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
              Historial
            </a>
            <a href="#" className="block px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
              Configuración
            </a>
          </nav>
        </div>
      </aside>

      {/* Contenido principal */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Header con botón de menú */}
        <header className="lg:hidden bg-white shadow-sm p-4 flex-shrink-0">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-gray-600 hover:text-gray-900 text-2xl"
          >
            ☰
          </button>
        </header>

        {/* Main content con scroll */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          {/* Tarjeta de bienvenida centrada */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center border-t-4 border-teal-600">
              <h1 className="text-4xl font-bold text-teal-700 mb-3">
                ¡Bienvenido a tu panel!
              </h1>
              <p className="text-gray-600 text-lg">
                Aquí puedes gestionar tus mascotas y acceder a todos los servicios
              </p>
            </div>
          </div>

          {/* Tarjetas de acciones */}
          <div className="max-w-4xl mx-auto mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Tarjeta de Recompensas */}
              <button
                onClick={() => navigate("/user/rewards")}
                className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 text-left border-2 border-transparent hover:border-teal-500"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-teal-100 rounded-lg group-hover:bg-teal-600 transition-colors w-14 h-14 flex items-center justify-center">
                    <span className="text-3xl group-hover:scale-110 transition-transform">🎁</span>
                  </div>
                  <span className="text-gray-400 group-hover:text-teal-600 transition-colors text-2xl">→</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Ver Recompensas</h3>
                <p className="text-gray-600 text-sm">
                  Descubre premios y beneficios exclusivos para ti y tus mascotas
                </p>
              </button>

              {/* Tarjeta de Post-Consulta */}
              <button
                onClick={() => navigate("/user/post-consultation")}
                className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 text-left border-2 border-transparent hover:border-purple-500"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-purple-100 rounded-lg group-hover:bg-purple-600 transition-colors w-14 h-14 flex items-center justify-center">
                    <span className="text-3xl group-hover:scale-110 transition-transform">📋</span>
                  </div>
                  <span className="text-gray-400 group-hover:text-purple-600 transition-colors text-2xl">→</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Post-Consulta</h3>
                <p className="text-gray-600 text-sm">
                  Revisa el seguimiento y recomendaciones después de tu consulta veterinaria
                </p>
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}