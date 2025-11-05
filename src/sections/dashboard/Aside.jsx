import Nav from './Nav';
import { LogoFullSquared, P } from '@/components';
import closeIcon from '@/assets/icons/close-fill-black-40.svg';

const Aside = (props) => {
  const {className, shown, close} = props;

  return (
    <aside className={`
      dashboard-aside
      ${className ?? ''}
      ${shown ? 'dashboard-aside--mobile-shown' : ''}
    `}>
      <section className="dashboard-aside__container">
        <div className="dashboard-aside__close" onClick={close}>
          <img
            src={closeIcon}
            alt="Close icon"
          />
        </div>

        <section className="dashboard-aside__body">
          <LogoFullSquared className="dashboard-aside__logo" />

          <Nav closeAside={close} />
        </section>

        <section className="dashboard-aside__footer">
          FOOTER
        </section>
      </section>
    </aside>
  );
};

export default Aside;

