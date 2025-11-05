import { useState } from 'react';
import { Cart } from '@/models';
import { P, A, ProductCardModal } from '@/components';
import placeholder from '@/assets/images/gray.png';
import Counter from './inputs/Counter';

const CartItem = (props) => {
  let {className, item, refresh, addToTotal} = props;
  const img                                              = item.product.pictures[0]?.url;
  const [qty, setQty]                                    = useState(item.quantity);
  const [modalShown, setModalShown]                      = useState(false);

  className = className ?? '';

  const remove = () => {
    const cart = new Cart();
    cart.remove(item.product.id);

    if(refresh instanceof Function)
      refresh();
  };

  const updateQty = newQty => {
    const cart       = new Cart();
    const difference = newQty - qty;
    const change     = item.product.price * difference;

    cart.update(item.product.id, {quantity: newQty})

    if(addToTotal instanceof Function)
      addToTotal(change);

    setQty(newQty);

    return true;
  }

  return (
    <>
      <section
        {...props}
        className={`
          cart-item
          ${className}
        `}
      >
        <div className="cart-item__img">
          <img
            src={img}
            alt={item.product.name}
            onError={({ target }) => {
              target.onerror = null;
              target.src     = placeholder;
            }}
          />
        </div>

        <section className="cart-item__info">
          <section className="cart-item__info__header">
            <h5 className="cart-item__product-name cart-item__strong">{item.product.name}</h5>

            <Counter
              min={1}
              max={item.product.stock}
              defaultValue={item.quantity}
              preChange={updateQty}
            />

            <section className="flex flex-col items-end gap-[16px]">
              <div className="cart-item__product-price cart-item__strong">
                {item.product.price} {item.product.currency}
              </div>

              <button
                className="clr-rejected"
                onClick={remove}
              >
                Remove
              </button>
            </section>
          </section>

          <section className="cart-item__info__body">
            <section className="max-w-[587px] flex flex-col gap-[8px]">
              <P className="cart-item__product-description">{item.product.description}</P>
              <A
                className="w-fit"
                onClick={() => setModalShown(true)}
                nounderline
              >
                Learn More
              </A>
            </section>
          </section>
        </section>
      </section>

      <ProductCardModal
        shown={modalShown}
        close={() => setModalShown(false)}
        product={item.product}
        customerView={true}
        cartView={true}
      />
    </>
  )
};

export default CartItem;

