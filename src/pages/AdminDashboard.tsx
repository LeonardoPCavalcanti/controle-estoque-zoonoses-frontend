// src/pages/AdminDashboard.tsx
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function AdminDashboard() {
  const { logout } = useAuth();

  return (
    <div className="container mx-auto p-6">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Painel do Administrador</h1>
        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition duration-300"
        >
          Sair
        </button>
      </header>
      <p className="text-lg text-gray-600">
        Esta é a área restrita para o administrador gerir o sistema (utilizadores, categorias, etc.).
      </p>
    </div>
  );
}