const Option = (props) => {
  let {className, children} = props;
  className = className ?? '';

  return (
    <option
      {...props}
      className={`
        ${className}
      `}
    >
      {children}
    </option>
  );
};

export default Option;

