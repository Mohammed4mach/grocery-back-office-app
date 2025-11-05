import logo from '../assets/Logo.svg'

const Logo = (props) =>
{
  let {className} = props;
  className = className ?? '';

  return (
    <a
      {...props}
      className={`logo ${className}`}
      href="/"
    >
      <img className="w-full" src={logo} />
    </a>
  );
}

export default Logo;

