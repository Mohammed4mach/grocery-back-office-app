const Label = (props) => {
  let {className, children} = props;
  className = className ?? '';

  return (
    <label
      {...props}
      className={`
        lbl
        ${className}
      `}
    >
      {children}
    </label>
  );
};

export default Label;

