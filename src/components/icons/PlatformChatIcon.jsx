import telegram from '../../assets/icons/logos_telegram.svg';

const PlatformChatIcon = (props) => {
  let {className} = props;
  className = className ?? '';

  return (
    <div
      className={`platform-chat-icon ${className}`}
    >
      <img
        {...props}
        className="platform-chat-icon__platform"
        src={telegram}
      />
    </div>
  );
};

export default PlatformChatIcon;

