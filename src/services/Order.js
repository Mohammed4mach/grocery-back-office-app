import Api from "@/utils/Api";

class Order
{
  static async index(options = {})
  {
    const endpoint = `/api/orders`;

    const res = await Api.get(endpoint);

    return res;
  }

  static async show(id)
  {
    let endpoint = `/api/orders/${id}`;

    const res = await Api.get(endpoint);

    return res;
  }

  static async getDeliveryTimes(id)
  {
    let endpoint = `/api/orders/${id}/delivery-times`;

    const res = await Api.get(endpoint);

    return res;
  }

  static async create(data)
  {
    const endpoint = `/api/orders`;

    const body = {
      customer_id: data.customer_id,
      items: data.items ?? [],
    };

    const res = await Api.post(endpoint, body);

    return res;
  }

  static async edit(id, data)
  {
    let endpoint = `/api/orders/${id}`;

    const body = {
      delivery_date: data.delivery_date,
      delivery_time: data.delivery_time,
    };

    const res = await Api.put(endpoint, body);

    return res;
  }

  static async delete(id)
  {
    const endpoint = `/api/orders/${id}`;

    const res = await Api.delete(endpoint);

    return res;
  }
}

export default Order;

