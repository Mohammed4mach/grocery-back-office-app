import { genId, formatTime } from '@/helpers';
import leaf from '@/assets/icons/leaf.svg';
import clock from '@/assets/icons/clock.svg';

const TimeSlot = ({ date, slot, choosenDate, choosenTime }) => {
  const id              = genId();
  const dateTime        = `${date} ${slot.time}`;
  const choosenDateTime = `${choosenDate} ${choosenTime}`;
  const checked         = dateTime === choosenDateTime;

  return (
    <div>
      <input
        id={id}
        type="radio"
        name="time_slot"
        value={dateTime}
        className="delivery-time__slot__input"
        defaultChecked={checked}
      />

      <label
        for={id}
        className={`delivery-time__slot ${slot.is_green ? 'delivery-time__slot--green' : ''}`}
      >
        <div className="delivery-time__slot__icon">
          {
            slot.is_green ? (
              <img
                src={leaf}
                alt="White leaf"
              />
            ) : (
              <img
                src={clock}
                alt="Clock"
              />
            )
          }
        </div>

        {formatTime(slot.time)}
      </label>
    </div>
  );
};

export default TimeSlot;

