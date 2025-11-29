import Api from "@/utils/Api";

class DeliveryTimeRule
{
  static async index(options = {})
  {
    let endpoint = `/api/delivery-rules`;

    const res = await Api.get(endpoint);

    return res;
  }

  static async show(id)
  {
    let endpoint = `/api/delivery-rules/${id}`;

    const res = await Api.get(endpoint);

    return res;
  }

  static async create(data)
  {
    const endpoint = `/api/delivery-rules`;

    const body = {
      name: data.name,
      in_advance_days: data.in_advance_days,
      same_day_deadline: data.same_day_deadline
    };

    const res = await Api.post(endpoint, body);

    return res;
  }

  static async edit(id, data)
  {
    let endpoint = `/api/delivery-rules/${id}`;

    const body = {
      name: data.name,
      in_advance_days: data.in_advance_days,
      same_day_deadline: data.same_day_deadline
    };

    const res = await Api.put(endpoint, body);

    return res;
  }

  static async delete(id)
  {
    const endpoint = `/api/delivery-rules/${id}`;

    const res = await Api.delete(endpoint);

    return res;
  }

  static async addOffday(id, weekdayId)
  {
    const endpoint = `/api/delivery-rules/${id}/off-days`;

    const body = {
      weekday_id: weekdayId
    };

    const res = await Api.post(endpoint, body);

    return res;
  }

  static async removeOffday(offdayId)
  {
    const endpoint = `/api/delivery-rule-off-days/${offdayId}`;

    const res = await Api.delete(endpoint);

    return res;
  }
}

export default DeliveryTimeRule;

