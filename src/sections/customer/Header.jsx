import {
  useLocation,
  matchPath,
  NavLink
} from 'react-router-dom';
import { Search } from '@/components/inputs';
import cart from '@/assets/icons/shopping-cart-2-line-black.svg';
import box from '@/assets/icons/fluent-mdl2_product-black.svg';

const Header = () => {
  const location = useLocation();
  const isCartActive = Boolean(matchPath('/cart' , location.pathname));

  return (
    <header className="customer-header">
      <section className="customer-header__header">
        <section className="overflow-hidden w-[120px] h-[104px] rounded-[15px]">
          LOGO
        </section>

        <Search className="customer-header__search" placeholder="Search" />

        {
          isCartActive ? (
            <NavLink
              to={`/products`}
              className={`
                flex justify-center items-center clr-black text-[20px] gap-[8px] pl-[16px]
                min-h-[64px] border-l border-[solid] border-[#B5B5B5] cursor-pointer
              `}
            >
              <img
                src={box}
                alt="Box icon"
              />
              <span>
                Back to Products
              </span>
            </NavLink>
          ) : (
            <NavLink
              to={`/cart`}
              className={`
                flex justify-center items-center clr-black text-[20px] gap-[8px] pl-[16px]
                min-h-[64px] border-l border-[solid] border-[#B5B5B5] cursor-pointer
              `}
            >
              <img
                src={isCartActive ? box : cart}
                alt="Cart icon"
              />
              <span>
                My Cart
              </span>
            </NavLink>
          )
        }
      </section>
    </header>
  )
};

export default Header;

