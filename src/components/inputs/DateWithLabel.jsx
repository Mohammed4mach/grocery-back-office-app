import { useRef, useEffect } from 'react';
import arrowDown from '../../assets/icons/arrow-drop-down-line-gray3.svg';

const SelectWithLabel = (props) => {
  let {
    className,
    half,
    id,
    label,
    required,
    name,
    value,
    defaultValue
  } = props;
  className = className ?? '';

  const input = useRef(null);
  const arrow = useRef(null);

  useEffect(() => {
    const showPicker = () => {
      input.current?.showPicker();
    }

    input.current?.addEventListener('click', showPicker);
    arrow.current?.addEventListener('click', showPicker);

    return () => {
      input.current?.removeEventListener('click', showPicker);
      arrow.current?.removeEventListener('click', showPicker);
    };
  }, []);

  return (
    <div
        className={`
          input flex-center relative !bg-transparent !cursor-default
          ${half ? 'input--w-half' : ''}
          ${className}
        `}
    >
      <div className="clr-gray1 mr-[3px]">
        {label}:
      </div>
      <input
        id={id} name={name} value={value} defaultValue={defaultValue}
        type="date"
        className="input--pointer input-select outline-none w-full bg-transparent clr-gray4"
        required={required}
        ref={input}
      />

      <img
        className={`cursor-pointer input-select__arrow !z-[100] !bg-white`} src={arrowDown}
        ref={arrow}
      />
    </div>
  );
};

export default SelectWithLabel;

