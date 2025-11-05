import Auth from '@/utils/Auth';
import { Navigate, Outlet } from 'react-router-dom';

const AuthRoute = () => {
  if(!Auth.authed())
    return <Navigate to="/login" />

  return <Outlet />;
};

export default AuthRoute;

