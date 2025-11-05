import icon from '@/assets/icons/checkmark-lg.svg';

const Success = (props) => {
  let {className} = props;
  className = className ?? '';

  return (
    <img
      {...props}
      className={className + ' w-[180px] md:w-[248px]'}
      src={icon}
    />
  );
};

export default Success;

