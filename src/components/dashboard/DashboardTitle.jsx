const DashboardTitle = (props) => {
  let { className, children } = props;

  className = className ?? '';

  return (
    <h1
      {...props}
      className={`
        dashboard-title
        ${className}
      `}
    >
      {children}
    </h1>
  );
};

export default DashboardTitle;

