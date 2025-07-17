import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
  allowedRoles: string[];
}

export function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
  const { user, token, isLoading } = useAuth();

  // Se estiver a verificar o token, mostra uma mensagem de carregamento
  if (isLoading) {
    return <div>Verificando autenticação...</div>;
  }

  // Se não houver token, redireciona para o login
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  
  // Se houver token mas o utilizador não foi carregado (caso raro), espera
  if (!user) {
    return <div>Carregando dados do utilizador...</div>;
  }

  // Se o papel do utilizador estiver na lista de permitidos, mostra a página.
  // Senão, redireciona para a página de "Acesso Negado".
  return allowedRoles.includes(user.papel)
    ? <Outlet /> // Renderiza o componente da rota (ex: <AdminDashboard />)
    : <Navigate to="/unauthorized" replace />;
}