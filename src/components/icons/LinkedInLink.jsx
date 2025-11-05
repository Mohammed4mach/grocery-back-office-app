import link from '../../assets/icons/linkedin-box-fill.svg';

const LinkedInLink = (props) => {
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

export default LinkedInLink;

