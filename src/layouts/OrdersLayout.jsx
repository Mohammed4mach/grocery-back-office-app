import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useDashboardTitle } from '@/hooks';
import { DashboardTitle, InfoTooltip } from '@/components';

const OrdersLayout = () => {
  const {setTitle} = useDashboardTitle();

  useEffect(() => {
    if(setTitle instanceof Function)
      setTitle(() => <DashboardTitle>Orders</DashboardTitle>);
  }, [setTitle]);

  return (
    <Outlet />
  );
};

export default OrdersLayout;

