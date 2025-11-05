import { LogoDivided as Logo } from '@/components';
import { Outlet } from 'react-router-dom';

const FormLayout = () => {

  return (
    <main className="layout-form">
      <header className="layout-form__header">
        <Logo />
      </header>

      <section className="layout-form__body">
        <Outlet />
      </section>
    </main>
  );
};

export default FormLayout;

