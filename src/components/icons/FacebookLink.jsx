import link from '../../assets/icons/facebook-circle-fill.svg';

const FacebookLink = (props) => {
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

export default FacebookLink;

