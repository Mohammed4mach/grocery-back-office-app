import arrowDown from '../../assets/icons/arrow-drop-down-line-gray3.svg';

const SelectWithLabel = (props) => {
  let {
    className,
    children,
    half,
    id,
    label,
    required,
    name,
    value,
    defaultValue,
    onChange,
  } = props;
  className = className ?? '';

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
      <select
        id={id} name={name} value={value} defaultValue={defaultValue}
        className="input--pointer input-select outline-none w-full bg-transparent clr-gray4"
        onChange={onChange}
        required={required}
      >
        {children}
      </select>

      <img
        className={`cursor-pointer input-select__arrow`} src={arrowDown}
      />
    </div>
  );
};

export default SelectWithLabel;

