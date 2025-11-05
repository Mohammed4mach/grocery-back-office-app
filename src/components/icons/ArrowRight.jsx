import arrow from '../../assets/icons/arrow-right-line.svg';

const ArrowRight = (props) => {
  let {className} = props;
  className = className ?? '';

  return (
    <img
      {...props}
      className={`cursor-pointer ${className}`}
      src={arrow}
    />
  );
};

export default ArrowRight;

