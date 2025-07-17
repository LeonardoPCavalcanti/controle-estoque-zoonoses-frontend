// src/pages/UserDashboard.tsx

import { Link } from 'react-router-dom';

// 1. Criamos dados de exemplo estáticos. Não precisamos mais da interface 'Produto'.
const produtosDeExemplo = [
  { id: 1, nome: 'Seringa Descartável', descricao: 'Caixa com 100 unidades.', quantidade: 250 },
  { id: 2, nome: 'Gaze Estéril', descricao: 'Pacote com 50 unidades.', quantidade: 150 },
  { id: 3, nome: 'Luva Cirúrgica (Par)', descricao: 'Tamanho M, estéril.', quantidade: 300 },
  { id: 4, nome: 'Álcool 70%', descricao: 'Frasco de 1 litro.', quantidade: 80 },
];

export default function UserDashboard() {
  // 2. Removemos toda a lógica de 'useState', 'useEffect' e 'fetch'.
  //    O componente agora é muito mais simples.

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Bem-vindo, <span className="text-blue-600">(Nome do Utilizador)</span>!
        </h1>
        {/* Usamos um Link para simular o botão de sair em modo de desenvolvimento */}
        <Link 
          to="/login"
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition duration-300"
        >
          Sair (Voltar para Login)
        </Link>
      </header>
      
      <p className="text-lg text-gray-600 mb-6">Este é o seu painel de visualização de estoque.</p>

      {/* 3. Usamos os dados de exemplo para renderizar os cartões. */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {produtosDeExemplo.map((produto) => (
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
