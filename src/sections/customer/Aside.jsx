import Nav from './Nav';

const Aside = () => {

  return (
    <aside className="customer-aside">
      <section className="customer-aside__container">
        <section className="customer-aside__body">
          <section className="overflow-hidden w-[154px] h-[133px] rounded-[20px]">
            COMPANY_LOGO
          </section>

          <Nav />
        </section>
      </section>
    </aside>
  );
};

export default Aside;

