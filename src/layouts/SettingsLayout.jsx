import { useEffect } from 'react';
import {
  Outlet,
  useLocation,
  useNavigate,
  matchPath,
} from 'react-router-dom';
import { useDashboardTitle } from '@/hooks';
import { DashboardTitle } from '@/components';

const SettingsLayout = () =>
{
  const {setTitle} = useDashboardTitle();
  const navigate   = useNavigate();
  const location   = useLocation();
  const isSettings = Boolean(matchPath('/dashboard/settings' , location.pathname));

  useEffect(() => {
    setTitle(() => <DashboardTitle>Settings</DashboardTitle>);
  }, []);

  if(isSettings)
    navigate('/dashboard/settings');

  return (
    <section className="settings-page">
      <section>
        <Outlet />
      </section>
    </section>
  );
};

export default SettingsLayout;

