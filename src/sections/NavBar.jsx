import closeIcon from '@/assets/icons/close-fill-black-40.svg';

const navbarLinks = [
  {
    id: 1,
    name: 'Home',
    active: true,
    to: '/',
  },
  {
    id: 2,
    name: 'Features',
    to: '#features',
  },
  {
    id: 3,
    name: 'Subscription',
    to: '#subscription',
  },
  {
    id: 4,
    name: 'FAQs',
    to: '#faqs',
  },
  {
    id: 5,
    name: 'Contact Us',
    to: '#contact-us',
  },
];

const NavBar = (props) => {
  const {shown, close} = props;

  return (
    <nav className={`navbar ${shown ? 'navbar--mobile-shown' : ''}`}>
      <div className="navbar__close" onClick={close}>
        <img
          src={closeIcon}
          alt="Close icon"
        />
      </div>

      <ul className="navbar__links-container">
        {
          navbarLinks.map(link => (
            <li
              key={link.id}
            >
              <a
                href={link.to}
                className={`
                  navbar__link
                  ${link.active ? 'navbar__link--active' : ''}
                `}
                onClick={close}
              >
                {link.name}
              </a>
            </li>
          ))
        }
      </ul>
    </nav>
  )
};

export default NavBar;

