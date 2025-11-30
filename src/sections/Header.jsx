import { useState } from 'react';
import NavBar from './NavBar';
import {
  LogoDivided,
  UserNavCard,
  NotificationBell
} from '@/components';
import { MobileMenu } from '@/components/icons';

const Header = () => {
  const [mobileNavShown, setMobileNavShown] = useState(false);

  return (
    <header className="header">
      <LogoDivided className="header__logo" />
      <NavBar shown={mobileNavShown} close={() => setMobileNavShown(false)} />

      <section className="flex items-center gap-[8px] md:gap-[24px]">
        <section
          className="flex justify-center items-center"
        >
          <NotificationBell className="flex-shrink-0 mr-[8px] md:mr-[16px] w-[24px] h-[24px] md:w-[32px] md:h-[32px] lg:w-[40px] lg:h-[40px]"/>
          <UserNavCard />
        </section>

        <MobileMenu onClick={() => setMobileNavShown(true)} />
      </section>
    </header>
  )
};

export default Header;

