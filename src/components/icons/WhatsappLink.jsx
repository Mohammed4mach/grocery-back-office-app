import link from '../../assets/icons/whatsapp-fill.svg';

const WhatsappLink = (props) => {
  let {className} = props;
  className = className ?? '';

  return (
    <img
      {...props}
      className={className}
      src={link}
    />
  );
};

export default WhatsappLink;

