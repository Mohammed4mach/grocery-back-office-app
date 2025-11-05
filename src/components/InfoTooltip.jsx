import info from '@/assets/icons/information-line.svg';

const InfoTooltip = (props) => {
  let { className, iconClassName, children, size } = props;

  className = className ?? '';
  size = size ?? '12px';

  return (
    <div
      {...props}
      className="info-tooltip"
    >
      <img
        style={{
          width: size,
        }}
        src={info}
        alt="exclamatin mark"
        className={iconClassName ?? ''}
      />

      <div className={`info-tooltip__content ${className}`}>
        {children}
      </div>
    </div>
  );
};

export default InfoTooltip;

