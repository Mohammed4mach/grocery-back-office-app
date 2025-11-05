import user from '../../assets/avatars/user.svg';

const UserAvatar = (props) => {
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
        src={user}
      />
    </div>
  );
};

export default UserAvatar;

