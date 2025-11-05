import { useRef } from 'react';
import copy from '../../assets/icons/file-copy-line.svg';

const InputWithCopy = (props) => {
  let {className, disabled} = props;
  className = className ?? '';

  const input = useRef(null);

  return (
    <label
      className={`
        input flex-center input--double-radius
        ${disabled ? 'input--disabled': ''}
        ${className}
      `}
    >
      <input
        {...props}
        className="input-internal outline-none w-full"
        ref={input}
      />

      <img
        className={`cursor-pointer`}
        src={copy}
        onClick={() => {
          input.current?.select();
          setTimeout(() => input.current?.setSelectionRange(0, 0), 80);
          navigator.clipboard.writeText(input.current?.value);
        }}
      />
    </label>
  );
};

export default InputWithCopy;

