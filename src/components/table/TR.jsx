const TR = (props) => {
  let { className, children, head, marginBottom } = props;
  className = className ?? '';

  return (
    <>
      <tr
        {...props}
        className={`
          table__tr
          ${head ? 'table__tr--head' : ''}
          ${className}
        `}
      >
        {children}
      </tr>
      { marginBottom && <tr height={marginBottom}></tr> }
    </>
  );
};

export default TR;

