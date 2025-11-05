import Api from "@/utils/Api";

class Product
{
  static async index(options = {}, authed = true)
  {
    let endpoint = `/api/products?prod`;

    if(options.sku)
      endpoint += `&sku=${options.sku}`;

    if(options.limit && Number.isInteger(+options.limit))
      endpoint += `&limit=${options.limit}`;

    if(options.offset && Number.isInteger(+options.offset))
      endpoint += `&offset=${options.offset}`;

    const res = await Api.get(endpoint, null, !authed);

    return res;
  }

  static async create(formdata)
  {
    const endpoint = `/api/products`;
    const headers  = {
      'Content-Type': 'multipart/form-data',
    };

    const res = await Api.post(endpoint, formdata, {headers});

    return res;
  }

  static async show(productId, authed = true)
  {
    let endpoint = `/api/products/${productId}`;

    const res = await Api.get(endpoint, null, !authed);

    return res;
  }

  static async edit(productId, data)
  {
    let endpoint = `/api/products/${productId}`;

    const res = await Api.put(endpoint, data);

    return res;
  }

  static async removePicture(productId, pictureId)
  {
    let endpoint = `/api/products/${productId}/pictures/${pictureId}`;

    const res = await Api.delete(endpoint);

    return res;
  }

  static async addPictures(formdata, productId)
  {
    const endpoint = `/api/products/${productId}/pictures`;
    const headers  = {
      'Content-Type': 'multipart/form-data',
    };

    const res = await Api.post(endpoint, formdata, {headers});

    return res;
  }
}

export default Product;

