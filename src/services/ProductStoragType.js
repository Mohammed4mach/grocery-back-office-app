import Api from "@/utils/Api";

class ProductStorageType
{
  static async index(options = {})
  {
    let endpoint = `/api/product-storage-types`;

    const res = await Api.get(endpoint);

    return res;
  }

  static async show(id)
  {
    let endpoint = `/api/product-storage-types/${id}`;

    const res = await Api.get(endpoint);

    return res;
  }

  static async create(data)
  {
    const endpoint = `/api/product-storage-types`;

    const body = {
      name: data.name,
      delivery_time_rule_id: data.delivery_time_rule_id
    };

    const res = await Api.post(endpoint, body);

    return res;
  }

  static async edit(id, data)
  {
    let endpoint = `/api/product-storage-types/${id}`;

    const body = {
      name: data.name,
      delivery_time_rule_id: data.delivery_time_rule_id
    };

    const res = await Api.put(endpoint, body);

    return res;
  }

  static async delete(id)
  {
    const endpoint = `/api/product-storage-types/${id}`;

    const res = await Api.delete(endpoint);

    return res;
  }
}

export default ProductStorageType;

