import bell from '../../assets/icons/notification-4-line.svg';

const Bell = (props) => {
  let {className} = props;
  className = className ?? '';

  return (
    <img
      {...props}
      className={`cursor-pointer ${className}`}
      src={bell}
    />
  );
};

export default Bell;

