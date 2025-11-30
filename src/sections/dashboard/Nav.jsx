import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  VisaCard,
  ProductBox,
  ShoppingCart,
} from "@/components/icons";
import { useCart } from '@/contexts/cartContext';
import person from '@/assets/icons/user-line.svg';
import indicator from '@/assets/icons/intersect.svg';

const Nav = (props) => {
  const {closeAside} = props;

  const {count: cartItemsCount} = useCart();

  // Update cart items count
  useEffect(() => {
    const cartCountStr = Number.isInteger(cartItemsCount) && cartItemsCount > 0 ? `(${cartItemsCount})` : ''

    setLinks(prev => {
      const newLinks = prev.slice();

      newLinks[2].name = `Cart ${cartCountStr}`

      return newLinks;
    });
  }, [cartItemsCount]);

  const [links, setLinks] = useState([
    {
      id: 1,
      name: 'Customers',
      icon: () => <img className="w-[24px]" src={person} alt="Person icon" />,
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
      name: `Cart`,
      icon: ShoppingCart,
      to: '/dashboard/cart',
    },
    {
      id: 4,
      name: 'Orders',
      icon: VisaCard,
      to: '/dashboard/orders',
    },
  ]);

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

