import { useState } from 'react';
import { getDayOfWeek } from '@/helpers/date';
import { P } from '@/components';
import TimeSlot from './TimeSlot';
import arrow from '@/assets/icons/arrow-drop-down-line-gray3.svg'

const TimeSlots = ({ date, slots, open, choosenDate, choosenTime }) => {
  return (
    <section className={`delivery-time__slots ${open ? 'delivery-time__slots--open' : ''}`}>
      {
        slots?.length > 0 ? (
          slots.map((slot, i) => (
            <TimeSlot
              key={i}
              slot={slot}
              date={date}
              choosenDate={choosenDate}
              choosenTime={choosenTime}
            />
          ))
        ) : (<P large gray0>No valid delivery times to schedule</P>)
      }
    </section>
  );
};

const DeliveryTime = ({ deliveryTime, choosenDate, choosenTime }) => {
  const weekday                   = getDayOfWeek(deliveryTime.date);
  const [slotsOpen, setSlotsOpen] = useState(choosenDate === deliveryTime.date);

  const toggleOpen = () => setSlotsOpen(prev => !prev);

  return (
    <section className="delivery-time">
      <h5
        className="delivery-time__header"
        onClick={() => toggleOpen()}
      >
        <div className="delivery-time__date">
          {weekday} {deliveryTime.date}
        </div>

        <div className="delivery-time__drop-arrow" tabIndex="0">
          <img
            src={arrow}
            className={`delivery-time__drop-arrow__img ${slotsOpen ? 'delivery-time__drop-arrow__img--flip' : ''}`}
          />
        </div>
      </h5>

      <TimeSlots
        open={slotsOpen}
        date={deliveryTime.date}
        slots={deliveryTime.time_slots}
        choosenDate={choosenDate}
        choosenTime={choosenTime}
      />
    </section>
  );
};

export default DeliveryTime;

