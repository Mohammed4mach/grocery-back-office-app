import pencil from '../../assets/icons/edit-2-line.svg';

const Pencil = (props) => {
  let {className} = props;
  className = className ?? '';

  return (
    <img
      {...props}
      className={`cursor-pointer ${className}`}
      src={pencil}
    />
  );
};

export default Pencil;

