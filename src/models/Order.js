import Api from "@/utils/Api";
import { OrderStatuses } from '@/enums';

class Order
{
  static async index(options = {})
  {
    let endpoint = `/api/orders?ord`;

    if(options.status !== null && Object.values(OrderStatuses).includes(+status))
      endpoint += `&status=${options.status}`;

    if(options.number && Number.isInteger(options.number))
      endpoint += `&number=${options.number}`;

    if(options.limit && Number.isInteger(+options.limit))
      endpoint += `&limit=${options.limit}`;

    if(options.offset && Number.isInteger(+options.offset))
      endpoint += `&offset=${options.offset}`;

    const res = await Api.get(endpoint);

    return res;
  }

  static async show(orderId)
  {
    let endpoint = `/api/orders/${orderId}`;

    const res = await Api.get(endpoint);

    return res;
  }

  static async create(data, authed = true)
  {
    const endpoint = `/api/orders`;

    const res = await Api.post(endpoint, data, null, !authed);

    return res;
  }

  static async updateStatus(orderId, status)
  {
    const endpoint = `/api/orders/${orderId}`;
    const body     = {
      status: status,
    };

    const res = await Api.patch(endpoint, body);

    return res;
  }

  static async pend(orderId)
  {
    Order.updateStatus(OrderStatuses.PENDING);
  }

  static async confirm(orderId)
  {
    Order.updateStatus(OrderStatuses.CONFIRMED);
  }

  static async done(orderId)
  {
    Order.updateStatus(OrderStatuses.DONE);
  }

  static async cancel(orderId)
  {
    Order.updateStatus(OrderStatuses.CANCEL);
  }
}

export default Order;

