import { useState } from 'react';
import { Cart } from '@/services';
import { P, A, ProductCardModal } from '@/components';
import Counter from './inputs/Counter';
import { useCart } from '@/contexts/cartContext';
import placeholder from '@/assets/images/image-placeholder.svg';

const CartItem = (props) => {
  let {className, item, refresh, addToTotal} = props;
  const img                         = placeholder;
  const [qty, setQty]               = useState(item.quantity);
  const [modalShown, setModalShown] = useState(false);

  const {refreshCount} = useCart();

  className = className ?? '';

  const remove = () => {
    const cart = new Cart();
    cart.remove(item.product.id);

    if(refresh instanceof Function)
      refresh();

    refreshCount();
  };

  const updateQty = newQty => {
    const cart            = new Cart();
    const difference      = newQty - qty;
    const change          = item.product.price * difference;

    cart.update(item.product.id, {quantity: newQty})

    if(addToTotal instanceof Function)
      addToTotal(change);

    setQty(newQty);

    refreshCount();

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
              max={99}
              defaultValue={item.quantity}
              preChange={updateQty}
            />

            <section className="flex flex-col items-end gap-[16px]">
              <div className="cart-item__product-price cart-item__strong">
                {item.product.price}$
              </div>

              <button
                className="clr-rejected border-0 bg-transparent pointer"
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

