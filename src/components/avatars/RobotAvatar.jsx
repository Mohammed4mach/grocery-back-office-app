import robot from '../../assets/avatars/robot.svg';

const RobotAvatar = (props) => {
  let {className} = props;
  className = className ?? '';

  return (
    <div className={`
          avatar
          ${className}
        `}
    >
      <img
        {...props}
        className="avatar__img"
        src={robot}
      />
    </div>
  );
};

export default RobotAvatar;

