const H3 = (props) => {
  let {children, className} = props;
  className = className ?? '';

  return (
    <h3
      {...props}
      className={`h3 ${className}`}
    >
      {children}
    </h3>
  );
};

export default H3;

