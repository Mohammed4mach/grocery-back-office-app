import hand from '../../assets/icons/fluent_hand-wave-24-filled.svg';

const WavingHand = (props) => {
  let {className} = props;
  className = className ?? '';

  return (
    <img
      {...props}
      className={className + ' w-[24px] md:w-[32px] lg:w-[56px]'}
      src={hand}
    />
  );
};

export default WavingHand;

