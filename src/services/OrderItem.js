import Api from "@/utils/Api";

class OrderItem
{
  static async index(orderId)
  {
    const endpoint = `/api/orders/${orderId}/items`;

    const res = await Api.get(endpoint);

    return res;
  }

  static async show(id)
  {
    let endpoint = `/api/order-items/${id}`;

    const res = await Api.get(endpoint);

    return res;
  }

  static async getDeliveryTimes(id)
  {
    let endpoint = `/api/orders/${id}/delivery-times`;

    const res = await Api.get(endpoint);

    return res;
  }

  static async create(orderId, data)
  {
    const endpoint = `/api/orders/${orderId}/items`;

    const body = {
      quantity: data.quantity,
      product_id: data.product_id,
    };

    const res = await Api.post(endpoint, body);

    return res;
  }

  static async edit(id, data)
  {
    let endpoint = `/api/order-items/${id}`;

    const body = {
      quantity: data.quantity,
    };

    const res = await Api.put(endpoint, body);

    return res;
  }

  static async delete(id)
  {
    const endpoint = `/api/order-items/${id}`;

    const res = await Api.delete(endpoint);

    return res;
  }
}

export default OrderItem;

