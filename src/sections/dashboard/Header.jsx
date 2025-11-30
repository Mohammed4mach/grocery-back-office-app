import { useDashboardTitle } from '@/hooks';
import {
  UserNavCard,
  NotificationBell
} from '@/components';
import { MobileMenu } from '@/components/icons';

const Header = (props) => {
  const {title}     = useDashboardTitle();
  const {openAside} = props;

  return (
    <header className="dashboard-header">
      {title}

      <section
        className="flex justify-center items-center ml-auto"
      >
        <NotificationBell className="flex-shrink-0 mr-[8px] w-[40px] h-[40px] pointer"/>

        <section className="flex items-center gap-[8px] md:gap-[24px]">
          <UserNavCard />
          <MobileMenu onClick={openAside} />
        </section>
      </section>
    </header>
  )
};

export default Header;

