import menu from '@/assets/icons/menu-3-line.svg';

const MobileMenu = (props) => {
  let {className} = props;
  className = className ?? '';

  return (
    <button
      {...props}
      className="header__mobile-nav__toggler z-20"
      role="button"
      tabIndex='0'
    >
      <img src={menu} alt="menu" />
    </button>
  );
};

export default MobileMenu;

