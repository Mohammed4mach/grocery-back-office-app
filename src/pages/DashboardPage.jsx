import { useState, useEffect, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { useLoader, useUser, useDashboardTitle } from '@/hooks';
import { Customer } from '@/services';
import {
  P,
  DashboardTitle,
} from '@/components';
import person from '@/assets/icons/user-line.svg';
import add from '@/assets/icons/add-line-blue.svg';
import hand from '@/assets/icons/fluent_hand-wave-24-filled.svg';

const DashboardPage = () => {
  const { user }                  = useUser();
  const { setTitle }              = useDashboardTitle();
  const {showLoader, closeLoader} = useLoader();
  const [customers, setCustomers] = useState({});

  useEffect(() => {
    showLoader();

    Customer.index()
      .then(res => {
        if(res.status != 200)
        {
          alert(res.data?.message ?? 'Unkown error')
          navigate('/dashboard');
          return;
        }

        setCustomers(res.data.data ?? {});
      })
      .catch(alert)
      .finally(() => closeLoader());
  }, []);

  useEffect(() => {
    if(setTitle instanceof Function)
      setTitle(() => (
        <section className="flex flex-col gap-[8px] md:gap-[12px]">
          <DashboardTitle className="flex gap-[8px] md:gap-[16px] text-nowrap">
            Hi, {user.fullname?.split(' ')[0] ?? 'User'}!
            <img className="w-[24px] sm:w-[32px] md:w-[48px] lg:w-[56px]" src={hand} alt="Waving hand" />
          </DashboardTitle>

          <P className="text-[18px] sm:max-w-[300px] md:max-w-fit sm:text-[24px] lg:text-[28px] xl:text-[32px] clr-gray-dark">
            Know Your Customers, Grow Your Business
          </P>
        </section>
      ));
  }, [user, setTitle]);

  return (
    <main className="dashboard-page">
      <section className="w-full flex flex-col-reverse md:flex-row md:justify-between gap-[32px] md:gap-[64px]">
        <NavLink
          onClick={() => alert(`Coming Soon!`)}
          className="flex-center gap-[8px] w-fit ml-auto text-[20px] md:text-[24px] clr-main text-center cursor-pointer flex-shrink-0"
        >
          <img src={add} alt="add icon" />
          <span>Add new Customer</span>
        </NavLink>
      </section>

      <section className="w-full customers__table">
        <section className="customers__table__header">
          <div className="customers__icon">
            <img src={person} alt="person" />
          </div>

          <div className="customers__title">
            Customers
          </div>
        </section>

        {
          customers?.length ? (
            <section className="customers__table__body">
              {/* Table headings */}
              <div className="customers__table__cell customers__table__cell--head flex-center max-w-[90px]">#</div>
              <div className="customers__table__cell customers__table__cell--head">Fullname</div>
              <div className="customers__table__cell customers__table__cell--head">Address</div>
              <div className="customers__table__cell customers__table__cell--head"></div>

              {
                customers.map(customer => (
                  <Fragment key={customer.id}>
                    <div className="customers__table__cell flex-center max-w-[90px]">
                      {customer.id}
                    </div>
                    <div className="customers__table__cell">{customer.fullname}</div>
                    <div className="customers__table__cell">{`${customer.address}$`}</div>
                    <div className="customers__table__cell"></div>
                    <div className="customers__table__cell"></div>
                  </Fragment>
                ))
              }
            </section>
          ) : null
        }
      </section>
    </main>
  )
}

export default DashboardPage

