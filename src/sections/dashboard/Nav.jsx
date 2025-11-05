import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Dashboard,
  ProductBox,
  ShoppingCart,
  Cog,
} from "@/components/icons";
import indicator from '@/assets/icons/intersect.svg';

const Nav = (props) => {
  const {closeAside}      = props;

  const [links, setLinks] = useState([
    {
      id: 1,
      name: 'Dashboard',
      icon: Dashboard,
      to: '/dashboard',
      end: true,
    },
    {
      id: 2,
      name: 'Products',
      icon: ProductBox,
      to: '/dashboard/products',
    },
    {
      id: 3,
      name: 'Orders',
      icon: ShoppingCart,
      to: '/dashboard/orders',
    },
    {
      id: 4,
      name: 'Settings',
      icon: Cog,
      to: '/dashboard/settings',
    },
  ]);

  useEffect(() => {
    const newLinks = [...links];

    // Update links
    newLinks[3].to = `/dashboard/products`;

    setLinks(newLinks);
  }, []);

  return (
    <nav className="dashboard-nav">
      {
        links.map(link => (
          <NavLink
            key={link.id}
            to={link.to}
            className={({ isActive }) => {
              return `
                dashboard-nav__link
                ${ isActive ? 'dashboard-nav__link--active' : '' }
              `;
            }}
            end={link.end}
            onClick={closeAside}
          >
            <div className="dashboard-nav__link__indicator">
              <img
                src={indicator}
                alt="Indicator"
              />
            </div>

            <div className="dashboard-nav__link__content">
              <link.icon className="dashboard-nav__link__icon" />
              <span className="dashboard-nav__link__name">{link.name}</span>
            </div>
          </NavLink>
        ))
      }
    </nav>
  );
};

export default Nav;

