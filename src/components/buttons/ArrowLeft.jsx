import Arrow from '@/components/icons/ArrowLeft.jsx'

const ArrowLeft = (props) => {
  let {className, gray1} = props;
  className = className ?? '';

  return (
    <div
      {...props}
      className={`
        btn-icon w-[42px] h-[42px] md:w-[56px] md:h-[56px] flex-shrink-0
        ${className}
      `}
      role="button"
      tabIndex='0'
    >
      <Arrow gray1 />
    </div>
  );
};

export default ArrowLeft;

