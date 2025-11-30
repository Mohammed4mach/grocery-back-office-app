import logo from '../assets/logo.png';

const LogoDivided = (props) =>
{
  let {className} = props;
  className = className ?? '';

  return (
    <a
      {...props}
      className={`logo ${className}`}
      href="/dashboard"
    >
      <img src={logo} className='logo__icon' />
    </a>
  );
}

export default LogoDivided;

