const Bullet = (props) => {
  let {className} = props;
  className = className ?? '';

  return (
    <svg className={className} width="11" height="11" viewBox="0 0 11 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle className="path-fill path-stroke" cx="5.5" cy="6" r="5.5" fill="#B5B5B5"/>
    </svg>
  );
};

export default Bullet;

