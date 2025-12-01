import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useDashboardTitle } from '@/hooks';
import { P, DashboardTitle } from '@/components';

const OrdersLayout = () => {
  const {setTitle} = useDashboardTitle();

  useEffect(() => {
    if(setTitle instanceof Function)
      setTitle(() => (
        <section className="flex flex-col gap-[8px] md:gap-[12px]">
          <DashboardTitle>Orders </DashboardTitle>

          <P className="text-[18px] sm:max-w-[300px] md:max-w-fit sm:text-[24px] lg:text-[28px] xl:text-[32px] clr-gray-dark">
            Where Orders Turn into Action
          </P>
        </section>
      ));
  }, [setTitle]);

  return (
    <Outlet />
  );
};

export default OrdersLayout;

