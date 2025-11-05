const FormUnit = (props) => {
  let {className, children} = props;
  className = className ?? '';

  return (
    <section
      {...props}
      className={`
        form-unit
        ${className}
      `}
    >
      {children}
    </section>
  );
};

export default FormUnit;

