import bin from '../../assets/icons/delete-bin-5-line.svg';

const Trash = (props) => {
  let {className} = props;
  className = className ?? '';

  return (
    <img
      {...props}
      className={`cursor-pointer ${className}`}
      src={bin}
    />
  );
};

export default Trash;

