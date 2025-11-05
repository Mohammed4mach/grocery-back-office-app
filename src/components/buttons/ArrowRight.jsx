import Arrow from '@/components/icons/ArrowRight'

const ArrowRight = (props) => {
  let {className} = props;
  className = className ?? '';

  return (
    <div
      {...props}
      className={`
        btn-icon
        ${className}
      `}
      role="button"
      tabIndex='0'
    >
      <Arrow />
    </div>
  );
};

export default ArrowRight;

