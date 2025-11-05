const TD = (props) => {
  let { className, children, head, noBorder, center } = props;
  className = className ?? '';

  return (
    <td
      {...props}
      className={`
        table__td
        ${head ? 'table__td--head' : ''}
        ${noBorder ? 'table__td--no_border' : ''}
        ${center ? 'table__td--text_center' : ''}
        ${className}
      `}
    >
      {children}
    </td>
  );
};

export default TD;

