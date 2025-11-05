import { useState } from 'react';
import eye from '../../assets/icons/eye-line.svg';
import eyeOff from '../../assets/icons/eye-off-line.svg';

const Password = (props) => {
  let {className, half} = props;
  className = className ?? '';

  const [hidden, setHidden] = useState(true);
  const [type, setType]     = useState('password');

  const toggleHidden = function()
  {
    if(hidden)
      setType('text');
    else
      setType('password');

    setHidden(!hidden);
  }

  return (
    <label
      className={`
        input flex-center
        ${half ? 'input--w-half' : ''}
        ${className}
      `}
    >
      <input
        {...props}
        type={type}
        className="input-internal outline-none w-full h-full"
      />

      <img
        className={`cursor-pointer ${hidden ? 'hidden' : ''}`}
        src={eye}
        onClick={toggleHidden}
      />
      <img
        className={`cursor-pointer ${!hidden ? 'hidden' : ''}`}
        src={eyeOff}
        onClick={toggleHidden}
      />
    </label>
  );
};

export default Password;

