import instagram from '@/assets/icons/logos_instagram.svg';

const Instagram = (props) => {
  let {className} = props;
  className = className ?? '';

  return (
    <img
      {...props}
      className={className}
      src={instagram}
    />
  );
};

export default Instagram;

