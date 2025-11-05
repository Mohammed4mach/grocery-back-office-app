import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useDashboardTitle } from '@/hooks';
import { DashboardTitle, InfoTooltip } from '@/components';

const OrdersLayout = () => {
  const {setTitle} = useDashboardTitle();

  useEffect(() => {
    setTitle(() => <DashboardTitle>Orders</DashboardTitle>);
  }, []);

  return (
    <Outlet />
  );
};

export default OrdersLayout;

