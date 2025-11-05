const DropMenu = (props) => {
  let {className, children} = props;
  className = className ?? '';

  return (
    <div
      {...props}
      className={`
        user-nav-card__drop-menu
        ${className}
      `}
    >
      {children}
    </div>
  )
};

export default DropMenu;

