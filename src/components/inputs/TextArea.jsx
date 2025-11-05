const TextArea = (props) => {
  let {className, half} = props;
  className = className ?? '';

  return (
    <textarea
      {...props}
      className={`
        input input--text-area
        ${half ? 'input--w-half' : ''}
        ${className}
      `}
    >
    </textarea>
  );
};

export default TextArea;

