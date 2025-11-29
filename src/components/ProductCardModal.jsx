import { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { Cart, CartItem } from '@/services';
import { P, Modal, Button } from '@/components';
import arrowRight from '@/assets/icons/arrow-drop-right-line.svg';
import arrowLeft from '@/assets/icons/arrow-drop-left-line.svg';
import editIcon from '@/assets/icons/mingcute_edit-line.svg';
import cartIcon from '@/assets/icons/shopping-cart-2-line-white.svg';
import placeholder from '@/assets/images/gray.png';

const ProductCardModal = (props) => {
  const navigate                               = useNavigate();
  let {className, product}                     = props;
  const {shown, close, customerView, cartView} = props;

  className = className ?? '';

  const [activeImg, setActiveImg] = useState(0);

  const addToCart = () => {
    const cart = new Cart();
    const item = new CartItem(product.id, 1);

    cart.add(item);

    navigate(`/cart`);
  };

  return (
    <Modal
      shown={shown}
      close={close}
      className="max-h-[70vh] lg:max-h-[90vh] xl:max-h-[94vh] overflow-auto lg:!px-[64px] lg:!pt-[88px] lg:!pb-[64px]"
    >
      <section className="product-card-modal">
        <section className="product-card-modal__pictures">
          <section className="flex-center gap-[6px]">
            <span>
              <img
                className="product-card-modal__pictures__slider"
                src={arrowLeft}
                alt="left arrow"
                onClick={() => activeImg <= 0 ? setActiveImg(product.pictures.length - 1) : setActiveImg(prev => prev - 1)}
              />
            </span>
            <div
              className="product-card-modal__img"
            >
              <img
                src={product.pictures[activeImg]?.url ?? ''}
                alt={product.name}
                className="object-cover"
                onError={({ target }) => {
                  target.onerror = null;
                  target.src     = placeholder;
                }}
              />
            </div>
            <span>
              <img
                className="product-card-modal__pictures__slider"
                src={arrowRight}
                alt="right arrow"
                onClick={() => activeImg >= product.pictures.length - 1 ? setActiveImg(0) : setActiveImg(prev => prev + 1)}
              />
            </span>
          </section>

          <section className="product-card-modal__imgs">
            {
              product.pictures.map((pic, i) => (
                <img
                  key={i}
                  className={`
                    product-card-modal__imgs__img object-cover
                    ${activeImg == i ? 'product-card-modal__imgs__img--active' : ''}
                  `}
                  src={pic?.url ?? ''}
                  alt={product.name}
                  onError={({ target }) => {
                    target.onerror = null;
                    target.src     = placeholder;
                  }}
                  onClick={() => setActiveImg(i)}
                />
              ))
            }
          </section>
        </section>

        <section className="flex flex-col self-start gap-[16px] w-full xl:w-[512px] xl:min-h-[508px]">
          <h2 className="product-card-modal__name">{product.name}</h2>

          <section className="flex gap-[16px]">
            <h4 className="product-card-modal__detail-key flex items-end">Price:</h4>
            <span className="product-card-modal__price">{product.price} {product.currency}</span>
          </section>

          <section className="flex flex-col gap-[16px]">
            {
              !customerView && product.sku ? (
                <section className="flex gap-[8px]">
                  <h4 className="product-card-modal__detail-key">SKU:</h4>
                  <P tiny gray4 className="flex items-end">{product.sku}</P>
                </section>
              ) : null
            }

            <section className="flex gap-[8px]">
              <h4 className="product-card-modal__detail-key">Stock:</h4>
              <P tiny gray4 className="flex items-end">{product.stock}</P>
            </section>

            <section className="flex flex-col">
              <h4 className="product-card-modal__detail-key">Description</h4>
              <P tiny gray4>{product.description}</P>
            </section>

            <section className="flex flex-col">
              <h4 className="product-card-modal__detail-key">Notes</h4>
              <P tiny gray4>{product.notes}</P>
            </section>
          </section>

          <section className="flex-center clr-black mt-[64px] xl:mt-auto">
            {
              customerView ?
                !cartView ?
                (
                  <Button
                    className="flex gap-[8px] text-[24px] font-[500] btn--half-radius"
                    onClick={addToCart}
                  >
                    <img src={cartIcon} alt="cart icon" />
                    Add to cart
                  </Button>
                ) : null
              :
              (
                <NavLink className="flex gap-[8px] text-[24px]" to={`/products/${product.id}/edit`}>
                  <img src={editIcon} alt="edit icon" />
                  Edit
                </NavLink>
              )
            }
          </section>
        </section>
      </section>
    </Modal>
  )
};

export default ProductCardModal;

