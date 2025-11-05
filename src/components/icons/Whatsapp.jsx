import whatsapp from '../../assets/icons/logos_whatsapp-icon.svg';

const Whatsapp = (props) => {
  let {className} = props;
  className = className ?? '';

  return (
    <img
      {...props}
      className={className}
      src={whatsapp}
    />
  );
};

export default Whatsapp;

