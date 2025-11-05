import cross from '../../assets/icons/add-line-gray-dark.svg';

const AddCross = (props) => {
  let {className} = props;
  className = className ?? '';

  return (
    <img
      {...props}
      className={`cursor-pointer ${className}`}
      src={cross}
    />
  );
};

export default AddCross;

