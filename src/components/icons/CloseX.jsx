import x from '../../assets/icons/close-fill.svg';

const CloseX = (props) => {
  let {className} = props;
  className = className ?? '';

  return (
    <img
      {...props}
      className={`cursor-pointer ${className}`}
      src={x}
    />
  );
};

export default CloseX;

