import { Cart, CartItem } from '@/services';
import { P, Modal, Button } from '@/components';
import { useCart } from '@/contexts/cartContext';
import editIcon from '@/assets/icons/mingcute_edit-line.svg';
import cartIcon from '@/assets/icons/shopping-cart-2-line-white.svg';
import placeholder from '@/assets/images/image-placeholder.svg';

const ProductCardModal = (props) => {
  let {className, product}       = props;
  const {shown, close, cartView} = props;
  const {refreshCount}           = useCart();

  className = className ?? '';

  const addToCart = () => {
    const cart = new Cart();
    const item = new CartItem(product.id, 1);

    cart.add(item);

    refreshCount();

    if(close instanceof Function)
      close();
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
            <div
              className="product-card-modal__img"
            >
              <img
                src={product.picture ?? placeholder}
                alt={product.name}
                className="object-cover"
                onError={({ target }) => {
                  target.onerror = null;
                  target.src     = placeholder;
                }}
              />
            </div>
          </section>
        </section>

        <section className="flex flex-col self-start gap-[32px] w-full xl:w-[512px] xl:min-h-[508px]">
          <h2 className="product-card-modal__name">{product.name}</h2>

          <section className="flex gap-[16px]">
            <h4 className="product-card-modal__detail-key flex items-end">Price:</h4>
            <span className="product-card-modal__price">{product.price}$</span>
          </section>

          <section className="flex gap-[8px]">
            <h4 className="product-card-modal__detail-key">Storage Type:</h4>
            <P tiny gray4 className="flex items-center">{product.product_storage_type_name}</P>
          </section>

          <section className="flex flex-col">
            <h4 className="product-card-modal__detail-key">Description</h4>
            <P tiny gray4>{product.description}</P>
          </section>

          <section className="flex-center gap-[18px] clr-black mt-[64px] xl:mt-auto">
            {
              !cartView ? (
                <>
                  <Button
                    className="!w-[200px] !h-[60px] flex gap-[8px] text-[24px] font-[500] btn--half-radius pointer"
                    onClick={addToCart}
                  >
                    <img src={cartIcon} alt="cart icon" />
                    Add to cart
                  </Button>

                  <Button
                    onClick={() => alert('Coming Soon!')}
                    className="!w-[200px] !h-[60px] flex gap-[8px] text-[24px] font-[500] btn--half-radius"
                    secondary
                  >
                    <img src={editIcon} alt="edit icon" />
                    <span className="clr-black">Edit</span>
                  </Button>
                </>
              ) : null
            }
          </section>
        </section>
      </section>
    </Modal>
  )
};

export default ProductCardModal;

