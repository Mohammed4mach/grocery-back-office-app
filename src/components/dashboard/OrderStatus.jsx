import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ArrowDropDown } from '@/components/icons';
import { DropMenu } from '@/components';
import { OrderStatuses } from '@/enums';

const Menu = ({ status, pend, confirm, done, cancel }) => {
  return (
    <DropMenu className="order__status__drop-menu">
      {
        status == OrderStatuses.PENDING && (
          <NavLink
            className="user-nav-card__drop-menu__item"
            onClick={confirm}
          >
            <span className="user-nav-card__drop-menu__item__title">
              Confirm
            </span>
          </NavLink>
        )
      }

      {
        status == OrderStatuses.CONFIRMED && (
          <NavLink
            className="user-nav-card__drop-menu__item"
            onClick={done}
          >
            <span className="user-nav-card__drop-menu__item__title">
              Complete
            </span>
          </NavLink>
        )
      }

      {
        status == OrderStatuses.PENDING && (
          <NavLink
            className="user-nav-card__drop-menu__item"
            onClick={cancel}
          >
            <span className="user-nav-card__drop-menu__item__title">
              Cancel
            </span>
          </NavLink>
        )
      }
    </DropMenu>
  );
};

const OrderStatus = (props) => {
  let {className, status} = props;
  className = className ?? '';

  const {pend, confirm, done, cancel} = props;
  const [menuShown, setMenuShown]     = useState(false);

  return (
    <div
      {...props}
      className={`
        order__status
        ${status == OrderStatuses.CONFIRMED ? 'order__status--confirmed' : ''}
        ${status == OrderStatuses.DONE ? 'order__status--done' : ''}
        ${status == OrderStatuses.CANCELLED ? 'order__status--cancelled' : ''}
        ${className}
      `}
      onClick={() => {
        if(status == OrderStatuses.DONE || status == OrderStatuses.CANCELLED)
          return;

        setMenuShown(!menuShown)
      }}
    >
      {
        menuShown &&
        <Menu
          status={status}
          pend={pend}
          confirm={confirm}
          done={done}
          cancel={cancel}
        />
      }

      <div className="flex gap-[8px]">
        {status == OrderStatuses.PENDING ? 'Pending' : ''}
        {status == OrderStatuses.CONFIRMED ? 'Confirmed' : ''}
        {status == OrderStatuses.DONE ? 'Completed' : ''}
        {status == OrderStatuses.CANCELLED ? 'Cancelled' : ''}

        {
          status == OrderStatuses.PENDING ||
          status == OrderStatuses.CONFIRMED ?
          <ArrowDropDown className={`transition-flip ${menuShown ? 'transition-flip--applied' : ''}`} /> :
          null
        }
      </div>
    </div>
  );
};

export default OrderStatus;

