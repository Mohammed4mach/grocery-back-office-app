import add from '@/assets/icons/add-line-blue.svg';

const AddRounded = (props) => {
  let {className} = props;

  className = className ?? '';

  return (
    <button
      {...props}
      className={`
        btn-add-rounded
        ${className}
      `}
    >
      <img className="btn-add-rounded__icon" src={add} alt="Blue plus" />
    </button>
  );
};

export default AddRounded;

