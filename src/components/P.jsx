const P = (props) => {
  let {
    className, medium, large, xlarge,
    gray0, gray1, gray2, gray3, gray4, grayDark,
    left, center, right,
    children, tiny, error
  } = props;
  className = className ?? '';

  return (
    <p
      {...props}
      className={`
        paragraph
        ${tiny ? 'paragraph--tiny' : ''}
        ${medium ? 'paragraph--medium' : ''}
        ${large ? 'paragraph--large' : ''}
        ${xlarge ? 'paragraph--xlarge' : ''}
        ${gray0 ? 'paragraph--gray0' : ''}
        ${gray1 ? 'paragraph--gray1' : ''}
        ${gray2 ? 'paragraph--gray2' : ''}
        ${gray3 ? 'paragraph--gray3' : ''}
        ${gray4 ? 'paragraph--gray4' : ''}
        ${grayDark ? 'paragraph--gray-dark' : ''}
        ${left ? 'text-left' : ''}
        ${center ? 'text-center' : ''}
        ${right ? 'text-right' : ''}
        ${error ? 'clr-rejected w-full font-medium' : ''}
        ${className}
      `}
    >
      {children}
    </p>
  );
};

export default P;

