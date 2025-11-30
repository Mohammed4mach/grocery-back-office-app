import { useState } from 'react';
import { P, ProductCardModal } from '@/components';
import placeholder from '@/assets/images/image-placeholder.svg';

const ProductCard = (props) => {
  let {className, product} = props;
  className = className ?? '';

  const [modalShown, setModalShown] = useState(false);

  return (
    <>
      <section
        {...props}
        className={`
          product-card
          ${className}
        `}
        onClick={() => setModalShown(true)}
      >
        <img
          className="product-card__img"
          src={product.picture ?? placeholder}
          alt={product.name}
          onError={({ target }) => {
            target.onerror = null;
            target.src     = placeholder;
          }}
        />

        <section className="product-card__details flex flex-col gap-[8px]">
          <section className="flex flex-col gap-[4px]">
            <h3 className="product-card__name">{ product.name ?? 'Product Name' }</h3>

            <P className="product-card__description">{product.description}</P>
          </section>

          <section className="flex justify-between">
            <div className="product-card__created_at"></div>

            <section className="flex gap-[4px]">
              <div className={`product-card__price`}>{product.price}$</div>
            </section>
          </section>
        </section>
      </section>

      <ProductCardModal
        shown={modalShown}
        close={() => setModalShown(false)}
        product={product}
      />
    </>
  )
};

export default ProductCard;

