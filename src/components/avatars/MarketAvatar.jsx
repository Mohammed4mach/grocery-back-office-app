import market from '../../assets/avatars/market.svg';

const MarketAvatar = (props) => {
  let {className} = props;
  className = className ?? '';

  return (
    <div className={`
          avatar
          ${className}
        `}
    >
      <img
        {...props}
        className="avatar__img"
        src={market}
      />
    </div>
  );
};

export default MarketAvatar;

