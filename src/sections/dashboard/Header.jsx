import { useDashboardTitle } from '@/hooks';
import {
  UserNavCard,
  NotificationBell
} from '@/components';
import { MobileMenu } from '@/components/icons';

const Header = (props) => {
  const {openAside} = props;
  const {title}     = useDashboardTitle();

  return (
    <header className="dashboard-header">
      {title}

      <section
        className="flex justify-center items-center ml-auto"
      >
        <NotificationBell className="flex-shrink-0 !hidden sm:!flex mr-[8px] md:mr-[16px] w-[24px] h-[24px] md:w-[32px] md:h-[32px] lg:w-[40px] lg:h-[40px]"/>

        <section className="flex items-center gap-[8px] md:gap-[24px]">
          <UserNavCard />
          <MobileMenu onClick={openAside} />
        </section>
      </section>
    </header>
  )
};

export default Header;

