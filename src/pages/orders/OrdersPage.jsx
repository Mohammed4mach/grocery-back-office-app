import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDashboardTitle } from '@/hooks';
import { Order as OrderModel } from '@/services';
import {
  P,
  DashboardTitle,
  Order,
} from '@/components';
import { useLoader } from '@/contexts/loaderContext';

const OrdersPage = () => {
  const [orders, setOrders]           = useState([]);
  const {showLoader, closeLoader}     = useLoader();

  const navigate   = useNavigate();
  const {setTitle} = useDashboardTitle();

  useEffect(() => {
    if(setTitle instanceof Function)
      setTitle(() => <DashboardTitle>Orders</DashboardTitle>);
  }, [setTitle]);

  useEffect(() => {
    showLoader();
    OrderModel.index()
      .then(res => {
        if(res.status != 200)
        {
          alert(res.data?.message ?? 'Unkown error')
          navigate('/dashboard');
        }

        setOrders(res.data.data ?? []);
      })
      .catch(alert)
      .finally(() => closeLoader());
  }, []);

  return (
    <section className="flex flex-col gap-[48px] mt-[40px]">
      <section className="mt-[40px]">
        {orders.length ? (
          <section className="orders">
            <div className="order__cell order__cell--head order__cell--head--first col-span-2 flex gap-[16px]">
              <input
                id="in-order-check-all"
                type="checkbox"
                className="border-gray4"
                onClick={({ target }) => {
                  [...document.querySelectorAll('[name="orders[]"]')]
                    .forEach(input => input.checked = target.checked);
                }}
              />

              <label className="cursor-pointer select-none" htmlFor="in-order-check-all">Select All</label>
            </div>
            <div className="order__cell order__cell--head col-span-2">Order Details</div>
            <div className="order__cell order__cell--head">Total</div>
            <div className="order__cell order__cell--head !px-[16px]">Ordered At</div>
            <div className="order__cell order__cell--head order__cell--head--last flex-center">Scheduled At</div>
              {
                orders.map((order, index) => {
                  const last = index == orders.length - 1;

                  return (
                    <>
                      <Order
                        key={order.id}
                        order={order}
                        last={last}
                      />
                    </>
                );
                })
              }
          </section>
        )
          :
        (
          <div className="flex-center min-h-[calc(100vh-467px)]">
            <P large gray0>No Orders Found</P>
          </div>
        )}
      </section>
    </section>
  );
};

export default OrdersPage;

