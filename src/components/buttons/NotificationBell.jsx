import Bell from '@/components/icons/Bell.jsx'

const NotificationBell = (props) => {
  let {className} = props;
  className = className ?? '';

  return (
    <a
      {...props}
      className={`
        btn-icon
        ${className}
      `}
      role="button"
      tabIndex='0'
    >
      <Bell className="w-[60%]" />
    </a>
  );
};

export default NotificationBell;

