import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useLoader } from '@/contexts/loaderContext';
import OrderStatus from './OrderStatus';
import { Order as OrderModel } from '@/services';
import { P } from '@/components';
import { OrderStatuses } from '@/enums';

const Order = (props) => {
  let {className, order, last} = props;
  className = className ?? '';

  const [status, setStatus]       = useState(order.status);
  const {showLoader, closeLoader} = useLoader();

  const itemsCount = order.items.reduce((previous, item) => previous + item.quantity, 0);
  const currency   = order.items[0].product.currency;

  const changeStatus = async function(_status)
  {
    showLoader();

    const res = await OrderModel.updateStatus(order.id, _status);

    if(res.status != 204)
    {
      alert(res.data?.detail ?? 'Unkown error')
      closeLoader();
      return;
    }

    setStatus(_status ?? order.status);
    closeLoader();
  };

  return (
    <>
      <div className={`order__cell order__cell--first ${last ? 'order__cell--first--last' : ''}`}>
        <input type="checkbox" name="orders[]" />
      </div>
      <div className="order__cell">
        <NavLink className="w-fit" to={`/dashboard/orders/${order.id}`}>
          #{order.number}
        </NavLink>
      </div>
      <div className="order__cell flex-col gap-[8px] !items-start justify-end">
        <span className="order__strong">{order.customer}</span>
        <P>{order.phone}</P>
        <P className="text-nowrap">Items count: <span className="clr-black">{itemsCount}</span></P>
      </div>
      <div className="order__cell !items-end"></div>
      <div className="order__cell">
        <span className="max-w-[244px]">{order.address}</span>
      </div>
      <div className="order__cell order__strong">{order.total} {currency}</div>
      <div className="order__cell !p-0">
        <OrderStatus
          status={status}
          pend={() => changeStatus(OrderStatuses.PENDING)}
          confirm={() => changeStatus(OrderStatuses.CONFIRMED)}
          done={() => changeStatus(OrderStatuses.DONE)}
          cancel={() => changeStatus(OrderStatuses.CANCELLED)}
        />
      </div>
      <div className={`order__cell flex-center order__cell--last ${last ? 'order__cell--last--last' : ''}`}>
        CHATICON
      </div>
    </>
  );
};

export default Order;

