import { User } from '@/models';
import Auth from '@/utils/Auth';

class AuthController
{
  static async login(military_id, password, remember)
  {
    const res = await User.login(military_id, password);

    if(res.status != 200)
      return {
        error: res.data?.message ?? 'Unkown error, try again later',
      };

    const userRes = res.data;

    Auth.setUser(userRes.data);

    return {
      data: userRes.data
    };
  }

  static async register(name, military_id, password, phone)
  {
    const res = await User.register(name, military_id, password, phone);

    if(res.status != 201)
      return {
        error: res.data?.detail ?? 'Unkown error, try again later',
      };

    return await AuthController.login(military_id, password);
  }
}

export default AuthController;

