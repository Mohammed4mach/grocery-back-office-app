import { useState } from 'react';
import subtract from '@/assets/icons/subtract-line-24.svg';

const InputWithMinus = (props) => {
  let {className, half, onIconClick} = props;
  className = className ?? '';

  return (
    <label
      className={`
        input flex-center
        ${half ? 'input--w-half' : ''}
        ${className}
      `}
    >
      <input
        {...props}
        className="input-internal outline-none w-full"
      />

      <img
        className={`cursor-pointer`}
        src={subtract}
        onClick={onIconClick}
      />
    </label>
  );
};

export default InputWithMinus;

