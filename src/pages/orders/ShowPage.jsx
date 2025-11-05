import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Order } from '@/models';
import { OrderStatuses } from '@/enums';
import { formatDate } from '@/helpers/date';
import { Button } from '@/components';
import { useLoader } from '@/hooks';
import arrow from '@/assets/icons/arrow-left-line-black.svg';
import user from '@/assets/icons/user-3-line.svg';
import cart from '@/assets/icons/shopping-cart-2-line-gray1.svg';
import todo from '@/assets/icons/todo-line.svg';
import cube from '@/assets/icons/fluent-mdl2_product-gray1.svg';

const ShowPage = () =>
{
  const navigate                  = useNavigate();
  const [order, setOrder]         = useState({});
  const {orderId}                 = useParams();
  const {showLoader, closeLoader} = useLoader();

  useEffect(() => {
    showLoader();

    Order.show(orderId)
      .then(res => {
        if(res.status != 200)
        {
          alert(res.data?.detail ?? 'Unkown error')
          navigate('/dashboard');
          return;
        }

        res.data.currency = res.data.items[0].product.currency;

        setOrder(res.data ?? {});
      })
      .catch(alert)
      .finally(() => closeLoader());
  }, []);

  const changeStatus = async function(status)
  {
    showLoader();

    const res = await Order.updateStatus(order.id, status);

    if(res.status != 204)
    {
      alert(res.data?.detail ?? 'Unkown error')
      closeLoader();
      return;
    }

    setOrder({...order, status: status ?? order.status});
    closeLoader();
  };

  return (
    <section className="order-show">
      <section className="order-show__header">
        <section className="w-fit flex-center gap-[25px] clr-gray4 text-[32px]">
          <button
            className="flex-center rounded-full w-[56px] h-[56px] border-black border-[1px] border-[solid] cursor-pointer"
            onClick={() => window.history.back()}
          >
            <img
              src={arrow}
              alt="arrow left"
            />
          </button>
          #{order.number}
        </section>

        <section className="flex-center gap-[16px]">
          {
            order.status == OrderStatuses.PENDING ? (
              <>
                <Button
                  className="w-[180px] h-[56px] flex-center !text-[16px]"
                  onClick={() => changeStatus(OrderStatuses.CANCELLED)}
                  secondary
                >
                  Cancel
                </Button>

                <Button
                  className="w-[180px] h-[56px] !text-[16px]"
                  onClick={() => changeStatus(OrderStatuses.CONFIRMED)}
                >
                  Confirm
                </Button>
              </>
            ) : order.status == OrderStatuses.CONFIRMED ? (
              <Button
                className="w-[180px] h-[56px] !text-[16px]"
                onClick={() => changeStatus(OrderStatuses.DONE)}
              >
                Complete
              </Button>
            ) : null
          }
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
              <p className="order-show__info-card__info__value">{order.name ?? '-'}</p>

              <div className="order-show__info-card__info__key">Phone:</div>
              <p className="order-show__info-card__info__value">{order.phoneNumber ?? '-'}</p>

              <div className="order-show__info-card__info__key">Address:</div>
              <p className="order-show__info-card__info__value">{order.address ?? '-'}</p>
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
              <div className="order-show__info-card__info__key">Created:</div>
              <p className="order-show__info-card__info__value">{formatDate(order.createdAt) ?? '-'}</p>

              <div className="order-show__info-card__info__key">Status:</div>
              <p
                className={
                  `order-show__info-card__info__value ` +
                  (
                    order.status == OrderStatuses.PENDING ? 'clr-main' :
                    order.status == OrderStatuses.CONFIRMED ? 'clr-active' :
                    order.status == OrderStatuses.CANCELLED ? 'clr-rejected' :
                    order.status == OrderStatuses.DONE ? 'clr-black' : ''
                  )
                }
              >{OrderStatuses.title(order.status) ?? '-'}</p>

              <div className="order-show__info-card__info__key">Total:</div>
              <p className="order-show__info-card__info__value">{(order.total + ' ' + order.currency)}</p>
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
            order.items?.length ? (
              <section className="order-show__products__body">
                {/* Table headings */}
                <div className="order-show__products__cell order-show__products__cell--head flex-center max-w-[90px]">#</div>
                <div className="order-show__products__cell order-show__products__cell--head">SKU</div>
                <div className="order-show__products__cell order-show__products__cell--head">Product Name</div>
                <div className="order-show__products__cell order-show__products__cell--head">Price</div>
                <div className="order-show__products__cell order-show__products__cell--head">Quantity</div>
                <div className="order-show__products__cell order-show__products__cell--head">Total</div>

                {
                  order.items.map(item => (
                    <>
                      <div className="order-show__products__cell flex-center max-w-[90px]">
                        <div className="order-show__products__img">
                          <img
                            src={item.product.pictures[0]}
                            alt={item.product.name}
                          />
                        </div>
                      </div>
                      <div className="order-show__products__cell clr-gray-dark">{item.product.sku ?? '-'}</div>
                      <div className="order-show__products__cell">{item.product.name}</div>
                      <div className="order-show__products__cell">{`${item.product.price} ${order.currency}`}</div>
                      <div className="order-show__products__cell">{item.quantity}</div>
                      <div className="order-show__products__cell">{`${item.total} ${order.currency}`}</div>
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

