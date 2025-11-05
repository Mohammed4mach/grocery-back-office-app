import axios from "axios";
import Auth from "./Auth";

class Api
{
  static #host = import.meta.env.VITE_API_URL;

  static async #send(url, method, body = null, conf = null)
  {
    let res;

    switch(method.toLowerCase())
    {
      case 'get':
        res = await axios.get(url, conf);
        break;
      case 'post':
        res = await axios.post(url, body, conf);
        break;
      case 'put':
        res = await axios.put(url, body, conf);
        break;
      case 'patch':
        res = await axios.patch(url, body, conf);
        break;
      case 'delete':
        res = await axios.delete(url, conf);
        break;
    }

    return res;
  }

  static async #request(endpoint, method, body = null, config = null)
  {
    const url = Api.#host + endpoint;

    const headers = {
      'Content-Type': 'application/json;charset=utf-8',
      'Access-Control-Allow-Credentials': 'true',
      ...(config?.headers ?? {})
    };

    const conf = {
      ...config,
      headers,
      validateStatus: () => true,
    };

    let res = await Api.#send(url, method, body, conf);

    if(res.status == 401)
    {
      Auth.logout();

      return window.location.href = '/login';
    }

    return res;
  }

  static async get(endpoint, config = null, skipAuth = false)
  {
    return await Api.#request(endpoint, 'GET', null, config, skipAuth);
  }

  static async post(endpoint, body = null, config = null, skipAuth = false)
  {
    return await Api.#request(endpoint, 'POST', body, config, skipAuth);
  }

  static async put(endpoint, body = null, config = null, skipAuth = false)
  {
    return await Api.#request(endpoint, 'PUT', body, config, skipAuth);
  }

  static async patch(endpoint, body = null, config = null, skipAuth = false)
  {
    return await Api.#request(endpoint, 'PATCH', body, config, skipAuth);
  }

  static async delete(endpoint, body = null, config = null, skipAuth = false)
  {
    return await Api.#request(endpoint, 'DELETE', body, config, skipAuth);
  }
}

export default Api;

