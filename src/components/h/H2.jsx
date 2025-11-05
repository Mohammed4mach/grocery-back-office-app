const H2 = (props) => {
  let {children, className} = props;
  className = className ?? '';

  return (
    <h2
      {...props}
      className={`h2 ${className}`}
    >
      {children}
    </h2>
  );
};

export default H2;

