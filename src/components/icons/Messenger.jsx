import messenger from '../../assets/icons/logos_messenger.svg';

const Messenger = (props) => {
  let {className} = props;
  className = className ?? '';

  return (
    <img
      {...props}
      className={className}
      src={messenger}
    />
  );
};

export default Messenger;

