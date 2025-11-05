import Auth from '@/utils/Auth';
import { Navigate, Outlet } from 'react-router-dom';

const UnauthedRoute = () => {
  if(Auth.authed())
    return <Navigate to="/dashboard" />

  return <Outlet />;
};

export default UnauthedRoute;

