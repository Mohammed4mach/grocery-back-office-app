import logo from '@/assets/logo-icon.png'

const LogoFullSquared = (props) =>
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

export default LogoFullSquared;

