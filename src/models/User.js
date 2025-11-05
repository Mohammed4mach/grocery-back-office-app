import Api from "@/utils/Api";

class User
{
  static async login(military_id, password)
  {
    const endpoint  = '/api/login';
    const body = {
      military_id,
      password
    };

    const res = await Api.post(endpoint, body, null, true);

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
    const body     = {};

    if(data.name)
      body.name = data.name;
    if(data.phone)
      body.phone = data.phone;

    const res = await Api.patch(endpoint, body);

    return res;
  }

  static async register(name, military_id, password, phone)
  {
    const endpoint = '/api/users';
    const body     = {
      name, military_id,
      password, phone,
    };

    const res = await Api.post(endpoint, body, null, true);

    return res;
  }

  static async updatePassword(newPassword, oldPassword)
  {
    const endpoint = '/api/users/me/password';
    const body     = {
      oldPassword: oldPassword,
      newPassword: newPassword,
    };

    const res = await Api.put(endpoint, body);

    return res;
  }

  static async delete()
  {
    const endpoint = '/api/users/me';

    const res = await Api.delete(endpoint);

    return res;
  }
}

export default User;

