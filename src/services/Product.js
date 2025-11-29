import Api from "@/utils/Api";

class Product
{
  static async index(options = {})
  {
    const endpoint = `/api/products`;

    const res = await Api.get(endpoint);

    return res;
  }

  static async show(id)
  {
    let endpoint = `/api/products/${id}`;

    const res = await Api.get(endpoint);

    return res;
  }


  static async create(data)
  {
    const endpoint = `/api/products`;

    const body = {
      name: data.name,
      price: data.price,
      description: data.description,
      product_storage_type_id: data.product_storage_type_id,
    };

    const res = await Api.post(endpoint, body);

    return res;
  }

  static async edit(id, data)
  {
    let endpoint = `/api/products/${id}`;

    const body = {
      name: data.name,
      price: data.price,
      description: data.description,
      product_storage_type_id: data.product_storage_type_id,
    };

    const res = await Api.put(endpoint, body);

    return res;
  }

  static async delete(id)
  {
    const endpoint = `/api/products/${id}`;

    const res = await Api.delete(endpoint);

    return res;
  }
}

export default Product;

