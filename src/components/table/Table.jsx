const Table = (props) => {
  let { className, children } = props;
  className = className ?? '';

  return (
    <table
      {...props}
      className={`
        table
        ${className}
      `}
    >
      <tbody>
        {children}
      </tbody>
    </table>
  );
};

export default Table;

