import check from '../../assets/icons/check-line.svg';

const CheckLine = (props) => {
  let {className} = props;
  className = className ?? '';

  return (
    <img
      {...props}
      className={className}
      src={check}
    />
  );
};

export default CheckLine;

