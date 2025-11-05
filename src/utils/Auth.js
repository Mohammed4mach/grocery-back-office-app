class Auth
{
  static #key     = '#$YUE%dwSRJKTwdqYRxTElT#R@@#%@Qofew';
  static #idKey   = Auth.#key + ':userid';
  static #userKey = Auth.#key + ':user';

  static setUser(user)
  {
    const userStr = JSON.stringify(user);

    localStorage.setItem(Auth.#userKey, userStr);
    localStorage.setItem(Auth.#idKey, user.id);
  }

  static getUser()
  {
    return JSON.parse(localStorage.getItem(Auth.#userKey));
  }

  static removeUser()
  {
    localStorage.removeItem(Auth.#userKey);
    localStorage.removeItem(Auth.#idKey);
  }

  static id()
  {
    const id = localStorage.getItem(Auth.#idKey);

    if(!id)
      return false;

    return id;
  }

  static authed()
  {
    if(Auth.id())
      return true;

    return false
  }

  static logout()
  {
    Auth.removeUser();
  }
}

export default Auth;

