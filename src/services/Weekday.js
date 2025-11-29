import Api from "@/utils/Api";

class Weekday
{
  static async index(options = {})
  {
    let endpoint = `/api/weekdays`;

    const res = await Api.get(endpoint);

    return res;
  }

  static async show(id)
  {
    let endpoint = `/api/weekdays/${id}`;

    const res = await Api.get(endpoint);

    return res;
  }

  static async create(data)
  {
    const endpoint = `/api/weekdays`;

    const body = {
      name: data.name,
      code: data.code
    };

    const res = await Api.post(endpoint, body);

    return res;
  }

  static async edit(id, data)
  {
    let endpoint = `/api/weekdays/${id}`;

    const body = {
      name: data.name,
      code: data.code
    };

    const res = await Api.put(endpoint, body);

    return res;
  }

  static async delete(id)
  {
    const endpoint = `/api/weekdays/${id}`;

    const res = await Api.delete(endpoint);

    return res;
  }
}

export default Weekday;

