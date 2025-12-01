import { NavLink } from 'react-router-dom';
import { formatDate } from '@/helpers/date';
import { P } from '@/components';

const Order = (props) => {
  let {className, order, last} = props;
  className = className ?? '';

  const orderedAt      = formatDate(order.order_time);
  const orderScheduled = order.delivery_date && order.delivery_time;
  const scheduledAt    = orderScheduled ? formatDate(`${order.delivery_date} ${order.delivery_time}`) : '-';

  return (
    <>
      <div className={`order__cell order__cell--first ${last ? 'order__cell--first--last' : ''}`}>
        <input type="checkbox" name="orders[]" />
      </div>
      <div className="order__cell">
        <NavLink className="w-fit" to={`/dashboard/orders/${order.id}`}>
          <span className="clr-gray4">#{order.id}</span>
        </NavLink>
      </div>
      <div className="order__cell flex-col gap-[8px] !items-start justify-end">
        <span className="order__strong">{order.customer_name}</span>
        <P>{order.user_name}</P>
        <P>{order.notes}</P>
      </div>
      <div className="order__cell !items-end"></div>
      <div className="order__cell order__strong">{order.total_cost}$</div>
      <div className="order__cell !p-0">
        {orderedAt}
      </div>
      <div className={`order__cell flex-center order__cell--last ${orderScheduled && order.is_green_delivery ? 'clr-main' : ''} ${last ? 'order__cell--last--last' : ''}`}>
        {scheduledAt}
      </div>
    </>
  );
};

export default Order;

