import logo from '@/assets/icons/google-play-logo.svg';

const GooglePlayCard = (props) => {
  let {className} = props;
  className = className ?? '';

  return (
    <div
      {...props}
      className={`
        google-play-card
        ${className}
      `}
    >
      <img className="google-play-card__logo" src={logo} />

      <div className="google-play-card__text">
        <span className="google-play-card__text__get-it">
          GET IT ON
        </span>

        <span className="google-play-card__text__name">
          Google Play
        </span>
      </div>
    </div>
  );
};

export default GooglePlayCard;

