import { useEffect, useState } from 'react';
import { Order } from '@/services';
import { useLoader } from '@/contexts/loaderContext';
import { P, Modal, Button, DeliveryTime } from '@/components';

const ScheduleModal = (props) => {
  const {shown, close, order, refresh}     = props;
  const {showLoader, closeLoader} = useLoader();

  const [errorMessage, setErrorMessage]   = useState('');
  const [deliveryTimes, setDeliveryTimes] = useState([]);

  useEffect(() => {
    if(!order.id)
      return;

    showLoader();

    Order.getDeliveryTimes(order.id)
      .then(res => {
        if(res.status != 200)
        {
          alert(res.data?.message ?? 'Unkown error')

          if(close instanceof Function)
            close();

          return;
        }

        setDeliveryTimes(res.data.data ?? []);
      })
      .catch(alert)
      .finally(() => closeLoader());
  }, [order.id]);

  const submitTime = async (data) => {
    if(!order.id)
    {
      setErrorMessage('Order is not set properly. Try refresh the page');
      return;
    }

    const timeSlot = data.get('time_slot');

    if(timeSlot === undefined)
      throw new Error('Time slot can not be undefined');

    let [__, date, time] = timeSlot.match(/(\d{4}-\d{2}-\d{2}) (\d{2}:\d{2})/);

    const body = {
      delivery_date: date,
      delivery_time: `${time}:00`,
    };

    showLoader();
    const res = await Order.edit(order.id, body);
    closeLoader();

    if(res.status != 200)
    {
      setErrorMessage(res.data?.message ?? 'Unkown error, try again later');
      return;
    }

    if(close instanceof Function)
      close();

    if(refresh instanceof Function)
      refresh();
  }

  return (
    <Modal shown={shown} close={close}>
      <form className="flex flex-col gap-[40px] max-h-[74vh] py-[20px] px-[32px] overflow-auto">
        <section className="flex flex-col gap-[24px]">
          <div className="clr-black text-[36px] font-[500] leading-[44px]">
            Pick a Time Slot
          </div>
        </section>

        {errorMessage && <P className="clr-rejected w-full font-medium">{errorMessage}</P>}
        <section className="flex-center flex-col gap-[48px]">
          {/* Delivery Dates & Times */}
          <section className="min-h-[150px] flex flex-col gap-[18px]">
            {
              deliveryTimes?.length > 0 ? (
                deliveryTimes.map((time, i) => (
                  <DeliveryTime
                    key={i}
                    deliveryTime={time}
                    choosenDate={order.delivery_date}
                    choosenTime={order.delivery_time}
                  />
                ))
              ) : <P large gray0 center>No valid delivery times to schedule</P>
            }
          </section>

          <section className="flex flex-col justify-between">
            <Button
              className="h-[64px]"
              submit={submitTime}
              halfRadius
            >
              Submit
            </Button>
          </section>
        </section>
      </form>
    </Modal>
  );
};

export default ScheduleModal

