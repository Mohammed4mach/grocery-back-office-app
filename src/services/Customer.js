import Api from "@/utils/Api";

class Customer
{
  static async index(options = {})
  {
    let endpoint = `/api/customers`;

    const res = await Api.get(endpoint);

    return res;
  }

  static async show(id)
  {
    let endpoint = `/api/customers/${id}`;

    const res = await Api.get(endpoint);

    return res;
  }

  static async create(data)
  {
    const endpoint = `/api/customers`;

    const body = {
      fullname: data.fullname,
      address: data.address
    };

    const res = await Api.post(endpoint, body);

    return res;
  }

  static async edit(id, data)
  {
    let endpoint = `/api/customers/${id}`;

    const body = {
      fullname: data.fullname,
      address: data.address
    };

    const res = await Api.put(endpoint, body);

    return res;
  }

  static async delete(id)
  {
    const endpoint = `/api/customers/${id}`;

    const res = await Api.delete(endpoint);

    return res;
  }
}

export default Customer;

