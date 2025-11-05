class Cart
{
  static #key = '#$YUE%dwSRJKTwdqYRxTElT#R@@#%@Qofew:cart';

  get()
  {
    const key  = `${Cart.#key}`;
    const json = localStorage.getItem(key);

    if(json)
      return JSON.parse(json);
    else
      return {};
  }

  set(cart)
  {
    const key = `${Cart.#key}`;
    localStorage.setItem(key, JSON.stringify(cart))
  }

  clear()
  {
    this.set({});
  }

  add(item)
  {
    const cart = this.get();

    cart[item.productId] = item.getProperties();

    this.set(cart);

    return cart;
  }

  remove(id)
  {
    const cart = this.get();

    delete cart[id];

    this.set(cart);

    return cart;
  }

  update(id, item)
  {
    const cart = this.get();

    if(item?.quantity)
      cart[id].quantity = item.quantity;

    this.set(cart);

    return cart[id];
  }
}

export default Cart;

