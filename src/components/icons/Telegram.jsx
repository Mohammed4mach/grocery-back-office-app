import telegram from '../../assets/icons/logos_telegram.svg';

const Telegram = (props) => {
  let {className} = props;
  className = className ?? '';

  return (
    <img
      {...props}
      className={className}
      src={telegram}
    />
  );
};

export default Telegram;

