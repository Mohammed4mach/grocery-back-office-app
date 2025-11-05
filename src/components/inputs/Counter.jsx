import { useState } from 'react';
import { Plus, Minus } from '@/components/icons';

const Counter = (props) => {
  let {className, preChange} = props;
  const [value, setValue]    = useState(props.defaultValue ?? 1);

  const min = props.min === 0 ? 0 : props.min ? props.min : -Infinity;
  const max = props.max === 0 ? 0 : props.max ? props.max : Infinity;

  const isMin = value <= min;
  const isMax = value >= max;

  className = className ?? '';

  const increment = () => {
    setValue(val => {
      if(preChange instanceof Function && !preChange(val + 1))
        return val;

      if(val >= max)
        return val;

      return val + 1;
    });
  }

  const decrement = () => {
    setValue(val => {
      if(preChange instanceof Function && !preChange(val - 1))
        return val;

      if(val <= min)
        return val;

      return val - 1;
    });
  }

  return (
    <div
      className={`
        input-counter
        ${className}
      `}
    >
      <button
        className="input-counter__btn"
        onClick={decrement}
        disabled={isMin}
      >
        <Minus  />
      </button>

      <input
        {...props}
        className="input-counter__input"
        value={value}
        readOnly
      />

      <button
        className="input-counter__btn"
        onClick={increment}
        disabled={isMax}
      >
        <Plus />
      </button>
    </div>
  );
};

export default Counter;

