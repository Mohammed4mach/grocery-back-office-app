import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Header, Aside } from '@/sections/dashboard';
import { DashboardTitleProvider } from '@/contexts/dashboardHeaderTitleContext';

const DashboardLayout = () => {
  const [asideShown, setAsideShown] = useState(false);

  return (
    <DashboardTitleProvider>
      <main
        className={`
          layout-dashboard
          ${asideShown ? 'layout-dashboard--no-scroll' : ''}
        `}
      >
        <Aside shown={asideShown} close={() => setAsideShown(false)} />

        <section className="layout-dashboard__body">
          <Header openAside={() => setAsideShown(true)} />

          <Outlet />
        </section>
      </main>
    </DashboardTitleProvider>
  );
};

export default DashboardLayout;

