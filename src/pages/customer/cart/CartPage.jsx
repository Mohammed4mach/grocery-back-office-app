import { useEffect, useState } from 'react';
import { useDashboardTitle } from '@/hooks';
import { H2, P, Button, CartItem, Modal, InfoTooltip, DashboardTitle } from '@/components';
import { FormUnit, Label, Input, TextArea, Select, Option } from '@/components/inputs';
import { Product as ProductModel, Cart, Order, Customer } from '@/services';
import { useCart } from '@/contexts/cartContext';
import { useLoader } from '@/contexts/loaderContext';
import { Success } from '@/components/icons';

const CartPage = () => {
  const [total, setTotal]         = useState(0);
  const [items, setItems]         = useState([]);
  const [customers, setCustomers] = useState([]);
  const [_refresh, setRefresh]    = useState(false);
  const {showLoader, closeLoader} = useLoader();
  const {refreshCount}            = useCart();

  const [orderId, setOrderId]                               = useState(1);
  const [orderError, setOrderError]                         = useState('');
  const [orderModalShown, setOrderModalShown]               = useState(false);
  const [orderSuccessModalShown, setOrderSuccessModalShown] = useState(false);

  const {setTitle} = useDashboardTitle();

  const refresh = () => setRefresh(old => !old);

  useEffect(() => {
    showLoader();

    Customer.index()
      .then(res => {
        if(res.status != 200)
        {
          alert(res.data?.message ?? 'Unkown error')
          navigate('/dashboard');
          return;
        }

        setCustomers(res.data.data ?? {});
      })
      .catch(alert)
      .finally(() => closeLoader());
  }, []);

  useEffect(() => {
    if(setTitle instanceof Function)
      setTitle(() => <DashboardTitle>Cart</DashboardTitle>);
  }, [setTitle]);

  useEffect(() => {
    showLoader();

    setItems([]);
    setTotal(0);

    const cartObj = new Cart();
    const cart     = cartObj.get();
    const requests = [];

    for(const productId in cart)
      requests.push(ProductModel.show(productId, false));

    Promise.all(requests)
      .then(responses => {
        responses.forEach(res => {
          if(res.status != 200)
          {
            alert(res.data?.message ?? 'Unkown error')
            return;
          }

          const item = {
            product: res.data.data,
            quantity: cart[res.data.data.id].quantity,
          };

          const subtotal = item.product.price * item.quantity;

          setTotal(total => total + subtotal);
          setItems(items => [...items, item]);
        });
      })
      .catch(alert)
      .finally(closeLoader);
  }, [_refresh]);

  const submitOrder = async (data) => {
    const cartObj = new Cart();
    const cart    = cartObj.get();
    const items   = Object.values(cart).map(item => ({ product_id: item.productId, quantity: item.quantity }));
    const body    = {
      customer_id: data.get('customer_id'),
      notes: data.get('notes'),
      items: items,
    };

    if(!body.customer_id)
    {
      setOrderError("Please, choose a customer");
      return;
    }

    showLoader();
    const res = await Order.create(body);
    closeLoader();

    if(res.status != 200)
    {
      setOrderError(res.data?.message ?? 'Unkown error, try again later');
      return;
    }

    cartObj.clear();
    setOrderId(res.data.data.id);
    setOrderModalShown(false);
    setOrderSuccessModalShown(true);
    refreshCount();
  }

  return (
    <section className="flex flex-col gap-[88px] mt-[72px] pb-[111px]">
      {
        items.length ? (
          <section className="flex-center flex-col gap-[40px]">
            <H2 className="">
              Your bag Total is {Math.round((total + Number.EPSILON) * 100) / 100}$
            </H2>

            <Button
              className="w-[528px] h-[64px]"
              onClick={() => setOrderModalShown(true)}
            >
              Confirm Order
            </Button>
          </section>
        ) : null
      }

      <section className="flex-center">
        {items.length ? (
          <section className="w-[85%] flex-center flex-col gap-[32px] flex-wrap">
            {
              items.map(item => {
                return (
                  <CartItem
                    className="w-full"
                    key={item.product.id}
                    item={item}
                    refresh={refresh}
                    addToTotal={value => setTotal(total => total + value)}
                  />
                )
              })
            }
          </section>
        )
          :
        (
          <h3 className="font-m clr-gray2 flex-center">No items in the cart</h3>
        )}
      </section>

      {/* Order modal */}
      <Modal shown={orderModalShown} close={() => setOrderModalShown(false)}>
        <form className="flex flex-col gap-[40px]">
          <section className="flex justify-between">
            <div className="clr-black text-[36px] font-[500] leading-[44px]">
              Order Now
            </div>

            <section className="flex gap-[8px] items-end">
              <span className="clr-gray4 font-[500]">Total:</span>
              <span className="clr-black text-[32px] font-[500] leading-[32px]">{Math.round((total + Number.EPSILON) * 100) / 100}$</span>
            </section>
          </section>

          {orderError && <P className="clr-rejected w-full font-medium">{orderError}</P>}
          <section className="flex-center flex-col gap-[16px]">
            <section className="flex flex-col gap-[16px]">
              <FormUnit>
                <Label>Customer</Label>

                <Select
                  name="customer_id"
                  type="text"
                  required
                >
                  <Option selected disabled>Choose a customer</Option>
                  {
                    customers.map(customer =>(
                      <Option value={customer.id}>{customer.fullname} ─ {customer.address}</Option>
                    ))
                  }
                </Select>
              </FormUnit>
            </section>

            <section className="flex flex-col h-[319px] justify-between">
              <FormUnit className="pt-[6px]">
                <span className="flex gap-[8px]">
                  <Label>Notes (optional)</Label>

                  <InfoTooltip>
                    <p>
                      Add any specific instructions or preferences for your order here (e.g., size, color, special requests).
                    </p>
                  </InfoTooltip>
                </span>

                <TextArea
                  name="notes"
                  className="!h-[178px]"
                ></TextArea>
              </FormUnit>

              <Button
                className="h-[64px]"
                submit={submitOrder}
                halfRadius
              >
                Submit
              </Button>
            </section>
          </section>
        </form>
      </Modal>

      {/* Order success modal */}
      <Modal
        className="m-w-fit !py-[110px] !px-[160px]"
        shown={orderSuccessModalShown}
        close={() => setOrderSuccessModalShown(false)}
        noClose
        hideClose
      >
        <section className="flex-center flex-col gap-[40px]">
          <section className="flex-center flex-col gap-[24px]">
            <Success />

            <h4 className="clr-black text-[36px] font-[500] leading-[44px]">
              Order ID: #{orderId}
            </h4>

            <P grayDark center large>
              Order has been submitted! Follow-up to schedule delivery.
            </P>
          </section>

          <Button className="w-[554px] h-[64px]" to={`/dashboard/orders/${orderId}`}>
            Follow-up Order
          </Button>
        </section>
      </Modal>
    </section>
  );
};

export default CartPage;

