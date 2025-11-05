import link from '../../assets/icons/google-play-fill.svg';

const GooglePlayLink = (props) => {
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

export default GooglePlayLink;

