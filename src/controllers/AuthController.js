import { User } from '@/services';
import Auth from '@/utils/Auth';

class AuthController
{
  static async login(username, password, remember)
  {
    const res = await User.login(username, password);

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

  static async logout()
  {
    const res = await User.logout()

    if(res.status != 204)
      return {
        error: res.data?.message ?? 'Unkown error, try again later',
      };

    Auth.logout();
  }

  static async register(fullname, username, password, isSuper)
  {
    const res = await User.register(fullname, username, password, isSuper);

    if(res.status != 201)
      return {
        error: res.data?.detail ?? 'Unkown error, try again later',
      };

    return await AuthController.login(username, password);
  }
}

export default AuthController;

