import minus from '../../assets/icons/subtract-line-gray-dark.svg';

const CloseMinus = (props) => {
  let {className} = props;
  className = className ?? '';

  return (
    <img
      {...props}
      className={`cursor-pointer ${className}`}
      src={minus}
    />
  );
};

export default CloseMinus;

