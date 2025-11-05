import logo from '@/assets/logo-full-square.svg'

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

