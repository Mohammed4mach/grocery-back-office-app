const Input = (props) => {
  let {className, half} = props;
  className = className ?? '';

  return (
    <input
      {...props}
      className={`
        input
        ${half ? 'input--w-half' : ''}
        ${className}
      `}
    />
  );
};

export default Input;

