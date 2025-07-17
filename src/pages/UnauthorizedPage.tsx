// src/pages/UnauthorizedPage.tsx
import { Link } from 'react-router-dom';

export default function UnauthorizedPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-4">
      <h1 className="text-6xl font-bold text-red-500">403</h1>
      <h2 className="text-3xl font-semibold mt-4">Acesso Negado</h2>
      <p className="mt-2 text-gray-600">Você não tem permissão para visualizar esta página.</p>
      <Link to="/login" className="mt-6 inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors">
        Voltar para o Login
      </Link>
    </div>
  );
}