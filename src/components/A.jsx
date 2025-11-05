import { NavLink } from "react-router-dom";

const A = (props) => {
  let {
    className, children,
    left, center, right,
    to, nounderline
  } = props;
  className = className ?? '';

  const Element = to ? NavLink : (props) => (<a {...props}>{props.children}</a>);

  return (
    <Element
      {...props}
      className={`
        anchor-link
        ${left ? 'text-left' : ''}
        ${center ? 'text-center' : ''}
        ${right ? 'text-right' : ''}
        ${nounderline ? 'anchor-link--no-underline' : ''}
        ${className}
      `}
    >
      {children}
    </Element>
  );
};

export default A;

