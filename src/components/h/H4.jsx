const H4 = (props) => {
  let {children, className} = props;
  className = className ?? '';

  return (
    <h4
      {...props}
      className={`h4 ${className}`}
    >
      {children}
    </h4>
  );
};

export default H4;

