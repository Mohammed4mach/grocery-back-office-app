import LogoIcon from '../assets/logo-bot-icon.svg';
import LogoBotLight from '../assets/logo-bot.svg';
import LogoBotDark from '../assets/logo-bot-dark.svg';
import LogoCart from '../assets/logo-cart.svg';

const LogoDivided = (props) =>
{
  let {className, dark} = props;
  className = className ?? '';

  const LogoBot = dark ? LogoBotDark : LogoBotLight;

  return (
    <a
      {...props}
      className={`logo ${className}`}
      href="/"
    >
      <img src={LogoIcon} className='logo__icon' />
      <img src={LogoBot} className='logo__bot' />
      <img src={LogoCart} className='logo__cart' />
    </a>
  );
}

export default LogoDivided;

