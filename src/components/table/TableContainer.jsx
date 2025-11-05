const TableContainer = (props) => {
  let { className, children } = props;
  className = className ?? '';

  return (
    <section
      {...props}
      className={`
        table__container
        ${className}
      `}
    >
      <div className="table__container__aux">
        {children}
      </div>
    </section>
  );
};

export default TableContainer;

