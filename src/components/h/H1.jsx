const H1 = (props) => {
  let {children, className} = props;
  className = className ?? '';

  return (
    <h1
      {...props}
      className={`h1 ${className}`}
    >
      {children}
    </h1>
  );
};

export default H1;

