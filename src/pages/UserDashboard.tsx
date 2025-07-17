// src/pages/UserDashboard.tsx
import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';

// Define a estrutura de um Produto para o TypeScript
interface Produto {
  id: number;
  nome: string;
  quantidade: number;
  descricao: string;
}

export default function UserDashboard() {
  const { user, token, logout } = useAuth();
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!token) return; // Não faz nada se não houver token

    const fetchProdutos = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/produtos', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        if (response.status === 401 || response.status === 403) {
          logout();
          return;
        }
        if (!response.ok) {
          throw new Error('Falha ao carregar os dados do estoque.');
        }
        const data = await response.json();
        setProdutos(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProdutos();
  }, [token, logout]);

  if (loading) {
    return <div className="text-center p-10">Carregando dados do estoque...</div>;
  }

  if (error) {
    return <div className="text-center p-10 text-red-500">Erro: {error}</div>;
  }

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Bem-vindo, <span className="text-blue-600">{user?.nome}</span>!
        </h1>
        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition duration-300"
        >
          Sair
        </button>
      </header>
      
      <p className="text-lg text-gray-600 mb-6">Este é o seu painel de visualização de estoque.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {produtos.map((produto) => (
          <div key={produto.id} className="bg-white border border-gray-200 p-5 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-xl font-semibold text-gray-900 truncate">{produto.nome}</h2>
            <p className="text-gray-500 mt-1 h-12 overflow-hidden">{produto.descricao}</p>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-md font-bold text-gray-700">
                Em Estoque: <span className="text-blue-500 text-lg">{produto.quantidade}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}