import { useState } from 'react';
import arrowDown from '../../assets/icons/arrow-drop-down-line.svg';

const Select = (props) => {
  let {className, children, half} = props;
  className = className ?? '';

  const [selected, setSelected] = useState(false);

  return (
    <div className={`relative w-fit cursor-pointer ${className}`}>
      <select
        {...props}
        className={`
          input flex-center input--pointer max-w-full
          ${half ? 'input--w-half' : ''}
          ${!selected ? 'input-select--not-selected' : ''}
          input-select outline-none w-full cursor-pointer
        `}
        onChange={() => setSelected(true)}
      >
        {children}
      </select>

      <img
        className={`cursor-pointer input-select__arrow`} src={arrowDown}
      />
    </div>
  );
};

export default Select;

