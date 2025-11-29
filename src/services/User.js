import Api from "@/utils/Api";

class User
{
  static async login(username, password)
  {
    const endpoint  = '/api/login';
    const body = {
      username,
      password
    };

    const res = await Api.post(endpoint, body, null, true);

    return res;
  }

  static async logout()
  {
    const endpoint  = '/api/logout';

    const res = await Api.post(endpoint, null, null);

    return res;
  }

  static async index()
  {
    const endpoint = '/api/users';

    const res = await Api.get(endpoint);

    return res;
  }

  static async getMe()
  {
    const endpoint = '/api/users/me';

    const res = await Api.get(endpoint);

    return res;
  }

  static async editMyInfo(data)
  {
    const endpoint = '/api/users/me';

    const body = {
      fullname: data.fullname,
      username: data.username,
      password: data.password,
    };

    const res = await Api.put(endpoint, body);

    return res;
  }

  static async register(fullname, username, password, isSuper)
  {
    const endpoint = '/api/users';
    const body     = {
      fullname,
      username,
      password,
      is_super: isSuper
    };

    const res = await Api.post(endpoint, body, null, true);

    return res;
  }

  static async updatePassword(oldPassword, newPassword)
  {
    const endpoint = '/api/users/me/credentials';

    const body = {
      password: oldPassword,
      new_password: newPassword,
    };

    const res = await Api.put(endpoint, body);

    return res;
  }

  static async delete(id)
  {
    const endpoint = `/api/users/${id}`;

    const res = await Api.delete(endpoint);

    return res;
  }
}

export default User;

