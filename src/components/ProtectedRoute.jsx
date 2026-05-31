import { Navigate } from 'react-router-dom';

/**
 * ProtectedRoute — Bảo vệ route yêu cầu đăng nhập
 * Nếu chưa đăng nhập → chuyển hướng về /login
 */
function ProtectedRoute({ children }) {
  const user = window.localStorage.getItem('authUser');
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

export default ProtectedRoute;
