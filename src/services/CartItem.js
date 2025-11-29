class CartItem
{
  #productId;
  #quantity;

  constructor(productId, quantity)
  {
    if(!Number.isInteger(quantity))
      throw new Error('Quantity should be an integer');

    this.#productId = productId;
    this.#quantity  = quantity;
  }

  get productId()
  {
    return this.#productId;
  }

  get quantity()
  {
    return this.#quantity;
  }

  getProperties()
  {
    const obj = {
      productId: this.productId,
      quantity: this.quantity,
    };

    return obj;
  }
}

export default CartItem;

