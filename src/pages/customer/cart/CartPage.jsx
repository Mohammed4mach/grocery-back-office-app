import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { H2, P, Button, CartItem, Modal, InfoTooltip } from '@/components';
import { FormUnit, Label, Input, TextArea } from '@/components/inputs';
import { Product as ProductModel, Cart, Order } from '@/models';
import { useLoader } from '@/contexts/loaderContext';
import { Success } from '@/components/icons';

const CartPage = () => {
  const [total, setTotal]         = useState(0);
  const [currency, setCurrency]   = useState(null);
  const [items, setItems]         = useState([]);
  const [_refresh, setRefresh]    = useState(false);
  const {showLoader, closeLoader} = useLoader();

  const [orderNumber, setOrderNumber]                       = useState(1);
  const [orderError, setOrderError]                         = useState('');
  const [orderModalShown, setOrderModalShown]               = useState(false);
  const [orderSuccessModalShown, setOrderSuccessModalShown] = useState(false);

  const refresh = () => setRefresh(old => !old);

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
            alert(res.data?.detail ?? 'Unkown error')
            return;
          }

          if(!currency)
            setCurrency(res.data.currency);

          const item = {
            product: res.data,
            quantity: cart[res.data.id].quantity,
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
    const body    = {
      name: data.get('name'),
      address: data.get('address'),
      phoneNumber: data.get('phoneNumber'),
      notes: data.get('notes'),
      items: Object.values(cart),
    };

    showLoader();
    const res = await Order.create(body, false);
    closeLoader();

    if(res.status != 201)
    {
      setOrderError(res.data?.detail ?? 'Unkown error, try again later');
      return;
    }

    cartObj.clear();
    setOrderNumber(res.data.number);
    setOrderModalShown(false);
    setOrderSuccessModalShown(true);
  }

  return (
    <section className="flex flex-col gap-[88px] mt-[72px] pb-[111px]">
      {
        items.length ? (
          <section className="flex-center flex-col gap-[40px]">
            <H2 className="">
              Your bag Total is {total} {currency}
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
              <span className="clr-black text-[32px] font-[500] leading-[32px]">{total} {currency}</span>
            </section>
          </section>

          {orderError && <P className="clr-rejected w-full font-medium">{orderError}</P>}
          <section className="flex-center gap-[16px]">
            <section className="flex flex-col h-[320px] gap-[16px]">
              <FormUnit>
                <Label>Name</Label>

                <Input
                  name="name"
                  type="text"
                  required
                />
              </FormUnit>

              <FormUnit>
                <Label>Phone</Label>

                <Input
                  name="phoneNumber"
                  type="text"
                  required
                />
              </FormUnit>

              <FormUnit>
                <Label>Address</Label>

                <Input
                  name="address"
                  type="text"
                  required
                />
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
        className="m-w-fit !py-[60px] !px-[250px]"
        shown={orderSuccessModalShown}
        close={() => setOrderSuccessModalShown(false)}
        noClose
        hideClose
      >
        <section className="flex-center flex-col gap-[40px]">
          <section className="flex-center flex-col gap-[24px]">
            <Success />

            <h4 className="clr-black text-[36px] font-[500] leading-[44px]">
              Order ID: #{orderNumber}
            </h4>

            <P
              className="max-w-[558px]"
              grayDark center large
            >
              Thank you for your order! Rest assured, it's confirmed, and we'll be in touch with you shortly.
            </P>
          </section>

          <Button className="w-[554px] h-[64px]" to={`/products`}>
            Explore more products
          </Button>
        </section>
      </Modal>
    </section>
  );
};

export default CartPage;

