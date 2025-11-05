import Nav from './Nav';
import company from '@/assets/icons/company-logo-example-large.svg';

const Aside = () => {

  return (
    <aside className="customer-aside">
      <section className="customer-aside__container">
        <section className="customer-aside__body">
          <section className="overflow-hidden w-[154px] h-[133px] rounded-[20px]">
            <img
              src={company}
              alt=""
              className=""
            />
          </section>

          <Nav />
        </section>
      </section>
    </aside>
  );
};

export default Aside;

