import pole from '../assets/images/pole.svg';

const Pole = (props) => {
  let {className} = props;
  className = className ?? '';

  return (
    <img
      {...props}
      className={className}
      src={pole}
    />
  );
};

export default Pole;

