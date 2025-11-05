import { useEffect } from 'react';
import { useUser, useDashboardTitle } from '@/hooks';
import {
  A,
  P,
  DashboardTitle,
  AddRounded,
  InfoTooltip,
} from '@/components';
import hand from '@/assets/icons/fluent_hand-wave-24-filled.svg';
import pending from '@/assets/icons/Pending.svg';
import confirmed from '@/assets/icons/Confirmed.svg';
import opened from '@/assets/icons/Opened.svg';
import closed from '@/assets/icons/Done.svg';

const DashboardPage = () => {
  const { user }     = useUser();
  const { setTitle } = useDashboardTitle();

  useEffect(() => {
    setTitle(() => (
      <section className="flex flex-col gap-[8px] md:gap-[12px]">
        <DashboardTitle className="flex gap-[8px] md:gap-[16px] text-nowrap">
          Hi, {user.name?.split(' ')[0] ?? 'User'}!
          <img className="w-[24px] sm:w-[32px] md:w-[48px] lg:w-[56px]" src={hand} alt="Waving hand" />
        </DashboardTitle>

        <P className="text-[18px] max-w-[180px] sm:max-w-[300px] md:max-w-fit sm:text-[24px] lg:text-[28px] xl:text-[32px] clr-gray-dark">
          Let’s Manage Your Business Smarter
        </P>
      </section>
    ));
  }, [user]);

  return (
    <main className="dashboard-page">
      <section className="dashboard-page__analytics max-w-[920px]">
          <section className="dashboard-page__analytics__box__body">
          </section>
      </section>

      {/* Orders */}
      <section className="dashboard-page__analytics__box dashboard-page__analytics__box--compact">
        <section className="dashboard-page__analytics__box__header">
          <h6 className="dashboard-page__analytics__box__title flex gap-[8px]">
            Orders
          </h6>

          <A
            to="/dashboard/orders"
            className="text-[12px] md:text-[14px]"
            nounderline
          >
            Manage
          </A>
        </section>

        <section className="dashboard-page__analytics__box__body">
          <section className="w-full flex justify-between">
            <section className="dashboard-page__analytics__card">
              <div className="dashboard-page__analytics__card__img">
                <img src={pending} alt="pending" />
              </div>

              <section className="dashboard-page__analytics__card__content">
                <span className="dashboard-page__analytics__card__content__strong">
                </span>
                <span>Pending</span>
              </section>
            </section>

            <section className="dashboard-page__analytics__card">
              <div className="dashboard-page__analytics__card__img">
                <img src={confirmed} alt="confirmed" />
              </div>

              <section className="dashboard-page__analytics__card__content">
                <span className="dashboard-page__analytics__card__content__strong">
                </span>
                <span>Confirmed</span>
              </section>
            </section>
          </section>
        </section>
      </section>
    </main>
  )
}

export default DashboardPage

