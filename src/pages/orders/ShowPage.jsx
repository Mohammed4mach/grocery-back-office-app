import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Order, OrderItem, Customer } from '@/services';
import { Button } from '@/components';
import { useLoader } from '@/hooks';
import { formatDate } from '@/helpers';
import placeholder from '@/assets/images/image-placeholder.svg';
import arrow from '@/assets/icons/arrow-left-line-black.svg';
import user from '@/assets/icons/user-3-line.svg';
import cart from '@/assets/icons/shopping-cart-2-line-gray1.svg';
import todo from '@/assets/icons/todo-line.svg';
import cube from '@/assets/icons/fluent-mdl2_product-gray1.svg';

const ShowPage = () =>
{
  const navigate                  = useNavigate();
  const [order, setOrder]         = useState({});
  const [items, setItems]         = useState([]);
  const [customer, setCustomer]   = useState({});
  const {orderId}                 = useParams();
  const {showLoader, closeLoader} = useLoader();

  useEffect(() => {
    showLoader();

    Order.show(orderId)
      .then(res => {
        if(res.status != 200)
        {
          alert(res.data?.message ?? 'Unkown error')
          navigate('/dashboard');
          return;
        }

        setOrder(res.data.data ?? {});
      })
      .catch(alert)
      .finally(() => closeLoader());
  }, []);

  useEffect(() => {
    if(!order.id)
      return;

    showLoader();

    OrderItem.index(orderId)
      .then(res => {
        if(res.status != 200)
        {
          alert(res.data?.message ?? 'Unkown error')
          navigate('/dashboard');
          return;
        }

        setItems(res.data.data ?? {});
      })
      .catch(alert)
      .finally(() => closeLoader());
  }, [order.id]);

  useEffect(() => {
    if(!order.customer_id)
      return;

    showLoader();

    Customer.show(order.customer_id)
      .then(res => {
        if(res.status != 200)
        {
          alert(res.data?.message ?? 'Unkown error')
          navigate('/dashboard');
          return;
        }

        setCustomer(res.data.data ?? {});
      })
      .catch(alert)
      .finally(() => closeLoader());
  }, [order.customer_id]);

  return (
    <section className="order-show">
      <section className="order-show__header">
        <section className="w-fit flex-center gap-[25px] clr-gray4 text-[32px]">
          <button
            className="flex-center bg-transparent rounded-full w-[56px] h-[56px] border-black border-[1px] border-[solid] cursor-pointer"
            onClick={() => window.history.back()}
          >
            <img
              src={arrow}
              alt="arrow left"
            />
          </button>
          #{order.id}
        </section>

        <section className="flex-center gap-[16px]">
          <Button
            className="!w-[180px] !h-[56px] !text-[16px]"
            onClick={() => 1}
          >
            Confirm
          </Button>
        </section>
      </section>

      <section className="order-show__body">
        <section className="order-show__info-cards">
          {/* Customer info */}
          <section className="order-show__info-card">
            <section className="order-show__info-card__header">
              <div className="order-show__icon">
                <img src={user} alt="Person icon" />
              </div>

              <h5 className="order-show__title">
                Customer info
              </h5>
            </section>

            <section className="order-show__info-card__body">
              <div className="order-show__info-card__info__key">Name:</div>
              <p className="order-show__info-card__info__value">{customer?.fullname ?? '-'}</p>

              <div className="order-show__info-card__info__key">Address:</div>
              <p className="order-show__info-card__info__value">{customer?.address ?? '-'}</p>
            </section>
          </section>

          {/* Order info */}
          <section className="order-show__info-card">
            <section className="order-show__info-card__header">
              <div className="order-show__icon">
                <img src={cart} alt="Shopping cart icon" />
              </div>

              <h5 className="order-show__title">
                Order info
              </h5>
            </section>

            <section className="order-show__info-card__body">
              <div className="order-show__info-card__info__key">Ordered at:</div>
              <p className="order-show__info-card__info__value">{formatDate(order.order_time)}</p>

              <div className="order-show__info-card__info__key">Total Cost:</div>
              <p className="order-show__info-card__info__value">{order.total_cost}$</p>
            </section>
          </section>

          {/* Order notes */}
          <section className="order-show__info-card">
            <section className="order-show__info-card__header">
              <div className="order-show__icon">
                <img src={todo} alt="Shopping cart icon" />
              </div>

              <h5 className="order-show__title">
                Order Notes
              </h5>
            </section>

            <section className="order-show__info-card__body col-span-2">
              <p className="order-show__info-card__info__value">
                {order.notes}
              </p>
            </section>
          </section>
        </section>

        <section className="order-show__products">
          <section className="order-show__products__header">
            <div className="order-show__icon">
              <img src={cube} alt="Cube" />
            </div>

            <div className="order-show__title">
              Products
            </div>
          </section>

          {
            items?.length ? (
              <section className="order-show__products__body">
                {/* Table headings */}
                <div className="order-show__products__cell order-show__products__cell--head flex-center max-w-[90px]">#</div>
                <div className="order-show__products__cell order-show__products__cell--head">Product Name</div>
                <div className="order-show__products__cell order-show__products__cell--head">Price</div>
                <div className="order-show__products__cell order-show__products__cell--head">Quantity</div>
                <div className="order-show__products__cell order-show__products__cell--head">Total</div>

                {
                  items.map(item => (
                    <>
                      <div className="order-show__products__cell flex-center max-w-[90px]">
                        <div className="order-show__products__img">
                          <img
                            src={placeholder}
                            alt={item.product_name}
                          />
                        </div>
                      </div>
                      <div className="order-show__products__cell">{item.product_name}</div>
                      <div className="order-show__products__cell">{`${item.cost_per_item}$`}</div>
                      <div className="order-show__products__cell">{item.quantity}</div>
                      <div className="order-show__products__cell">
                        {`${Math.round(((item.cost_per_item * item.quantity) + Number.EPSILON) * 100) / 100}$`}
                      </div>
                    </>
                  ))
                }
              </section>
            ) : null
          }
        </section>
      </section>
    </section>
  );
};

export default ShowPage;

