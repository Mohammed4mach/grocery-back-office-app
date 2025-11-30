import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import AuthController from '@/controllers/AuthController.js';
import { User } from '@/services';
import { useLoader, useUser } from '@/hooks';
import arrow from '@/assets/icons/arrow-drop-down-line-gray3.svg'
import user from '@/assets/icons/user-line.svg';
import logoutIcon from '@/assets/icons/logout-box-r-line.svg';
import store from '@/assets/icons/store-2-line.svg';

const Menu = ({ close, logout }) => {
  return (
    <div className="user-nav-card__drop-menu" onClick={close}>
      <NavLink to="/dashboard/my-account" className="user-nav-card__drop-menu__item">
        <img src={user} alt="user icon" className="user-nav-card__drop-menu__item__image" />
        <span className="user-nav-card__drop-menu__item__title">
          My Account
        </span>
      </NavLink>

      <NavLink
        to={`/products`}
        className="user-nav-card__drop-menu__item"
      >
        <img src={store} alt="store icon" className="user-nav-card__drop-menu__item__image" />
        <span className="user-nav-card__drop-menu__item__title">
          My Store
        </span>
      </NavLink>

      <NavLink onClick={logout} className="user-nav-card__drop-menu__item">
        <img src={logoutIcon} alt="logout icon" className="user-nav-card__drop-menu__item__image" />
        <span className="user-nav-card__drop-menu__item__title">
          Logout
        </span>
      </NavLink>
    </div>
  );
};

const UserNavCard = (props) => {
  let {className} = props;
  className = className ?? '';

  const {user, setUser}           = useUser();
  const [menuShown, setMenuShown] = useState(false);
  const {showLoader, closeLoader} = useLoader();

  const logout = async () => {
    await AuthController.logout();
    window.location.href = '/login';
  };

  useEffect(() => {
    if(user)
      return;

    showLoader();

    User.getMe()
      .then(res => {
        if(res.status != 200)
          return logout();

        setUser(res.data.data ?? {});
      })
      .catch(alert)
      .finally(closeLoader());
  }, []);

  return (
    <section
      {...props}
      className={`
        user-nav-card
        ${className}
      `}
    >
      {menuShown ? <Menu close={() => setMenuShown(false)} logout={logout} /> : null }

      <NavLink to="/dashboard" className="user-nav-card__info">
        <div className="user-nav-card__info__name">
          {user.fullname}
        </div>
        <div className="user-nav-card__info__username">
          {user.username}
        </div>
      </NavLink>
      <div className="user-nav-card__drop-arrow" tabIndex="0">
        <img
          src={arrow}
          className={`user-nav-card__drop-arrow__img ${menuShown ? 'user-nav-card__drop-arrow__img--flip' : ''}`}
          onClick={() => setMenuShown(!menuShown)}
        />
      </div>
    </section>
  );
};

export default UserNavCard;

