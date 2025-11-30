import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { OrderStatuses } from '@/enums';
import { useDashboardTitle } from '@/hooks';
import { Order as OrderModel } from '@/services';
import {
  P,
  DashboardTitle,
  SelectWithLabel,
  DateWithLabel,
  Order,
} from '@/components';
import { Option, Search } from '@/components/inputs';
import { useLoader } from '@/contexts/loaderContext';

const OrdersPage = () => {
  const [orders, setOrders]           = useState([]);
  const [status, setStatus]           = useState(null);
  const [number, setNumber]           = useState(null);
  const [numberTimer, setNumberTimer] = useState(null);
  const {showLoader, closeLoader}     = useLoader();

  const navigate   = useNavigate();
  const {setTitle} = useDashboardTitle();

  useEffect(() => {
    if(setTitle instanceof Function)
      setTitle(() => <DashboardTitle>Orders</DashboardTitle>);
  }, [setTitle]);

  useEffect(() => {
    showLoader();

    const options = {
      status: status,
      number: number,
      limit: limit,
      offset: offset,
    };

    OrderModel.index(options)
      .then(res => {
        if(res.status != 200)
        {
          alert(res.data?.message ?? 'Unkown error')
          navigate('/dashboard');
        }

        setOrders(res.data.items ?? []);
      })
      .catch(alert)
      .finally(() => closeLoader());
  }, [status, number, limit, offset]);

  return (
    <section className="flex flex-col gap-[48px] mt-[40px]">
      <section className="flex gap-[64px]">
        <section className="flex gap-[16px]">
          <SelectWithLabel
            className="!w-[190px] !h-[56px] !px-[16px] !py-[8px] !border-[#B5B5B5]"
            label="Status"
            onChange={({ target }) => setStatus(target.value)}
          >
            <Option value={null}>All</Option>
            <Option value={OrderStatuses.PENDING}>Pending</Option>
            <Option value={OrderStatuses.CONFIRMED}>Confirmed</Option>
            <Option value={OrderStatuses.DONE}>Done</Option>
            <Option value={OrderStatuses.CANCELLED}>Cancelled</Option>
          </SelectWithLabel>

          <DateWithLabel className="!w-[210px] !h-[56px] !px-[16px] !py-[8px] !border-[#B5B5B5]" label="Date" />
        </section>

        <section>
          <Search
            className="!w-[609px] !h-[56px] font-s gap-[8px]"
            placeholder="Search by ID"
            onChange={({ target }) => {
              clearTimeout(numberTimer);

              if(!target.checkValidity())
                return;

              const timerId = setTimeout(() => setNumber(target.value), 600);

              setNumberTimer(timerId);
            }}
            pattern="[0-9]+"
            min="1"
          />
        </section>
      </section>

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
            <div className="order__cell order__cell--head">Address</div>
            <div className="order__cell order__cell--head">Total</div>
            <div className="order__cell order__cell--head !px-[16px]">Status</div>
            <div className="order__cell order__cell--head order__cell--head--last"></div>
              {
                orders.map((order, index) => {
                  const last = index == orders.length - 1;

                  return (
                    <>
                      <Order
                        key={order.id}
                        order={{
                          id: order.id,
                          number: order.number,
                          createdAt: order.createdAt,
                          customer: order.name,
                          phone: order.phoneNumber,
                          address: order.address,
                          total: order.total ? `${order.total} ${order.currency ?? ''}` : '-',
                          status: order.status,
                          items: order.items,
                          chatId: order.chatId,
                        }}
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

