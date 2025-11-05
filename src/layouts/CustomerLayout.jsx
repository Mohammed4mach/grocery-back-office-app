import { NavLink, Outlet } from 'react-router-dom';
import { Header } from '@/sections/customer';

const CustomerLayout = () => {

  return (
    <main className="flex flex-col pt-[40px] pb-[64px] px-[5%]">
      <Header />

      <Outlet />
    </main>
  );
};

export default CustomerLayout;

