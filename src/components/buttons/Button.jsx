import { useRef } from "react";
import { NavLink } from "react-router-dom";

const Button = (props) => {
  let {children, className, secondary, disabled, to, danger, halfRadius, medium, small} = props;
  const {submit} = props;
  className = className ?? '';

  const btn  = useRef(null);

  const Element = to ? NavLink : (props) => (<a {...props} ref={btn}>{props.children}</a>);
  const disabledMain = !secondary && disabled;
  const disabledSec  = secondary && disabled;

  return (
    <Element
      onClick={() => {
        if(submit instanceof Function)
        {
          const form = btn.current?.closest('form');

          if(!form?.reportValidity())
            return;

          const data = new FormData(form);

          submit(data);
        }
      }}
      {...props}
      className={`
        btn ${secondary ? 'btn--secondary' : ''}
        ${disabledMain ? 'btn--disabled' : disabledSec ? 'btn--secondary--disabled' : ''}
        ${danger ? 'btn--danger' : ''}
        ${halfRadius ? 'btn--half-radius' : ''}
        ${medium ? 'btn--medium' : ''}
        ${small ? 'btn--small' : ''}
        ${className}
      `}
      role="button"
      tabIndex='0'
    >
      {children}
    </Element>
  );
};

export default Button;

