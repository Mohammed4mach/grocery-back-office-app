import arrow from '../../assets/icons/arrow-left-line.svg';
import arrowGray1 from '../../assets/icons/arrow-left-line-gray1.svg';

const ArrowLeft = (props) => {
  let {className, gray1} = props;
  className = className ?? '';

  return (
    <img
      {...props}
      className={`cursor-pointer ${className}`}
      src={gray1 ? arrowGray1 : arrow}
    />
  );
};

export default ArrowLeft;

