import check from '../../assets/icons/check-line-blue.svg'

const Checkbox = (props) => {
  let {className, id} = props;
  className = className ?? '';

  return (
    <span className="input-checkbox cursor-pointer inline">
      <input
        {...props}
        id={id}
        className="input-checkbox__input cursor-pointer"
        type="checkbox"
      />
      <label
        className={`
          input-checkbox__lbl flex-center cursor-pointer
          ${className}
        `}
        htmlFor={id}
      >
        <img
          className="input-checkbox__lbl__img"
          src={check}
        />
      </label>
    </span>
  );
};

export default Checkbox;

