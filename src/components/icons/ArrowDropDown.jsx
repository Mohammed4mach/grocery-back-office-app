const ArrowDropDown = (props) => {
  let {className} = props;
  className = className ?? '';

  return (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_1698_2555)">
        <path className="path-fill" d="M12.0008 15L7.75781 10.757L9.17281 9.34302L12.0008 12.172L14.8288 9.34302L16.2438 10.757L12.0008 15Z" fill="#49B719"/>
      </g>
      <defs>
        <clipPath id="clip0_1698_2555">
          <rect width="24" height="24" fill="white"/>
        </clipPath>
      </defs>
    </svg>
  );
};

export default ArrowDropDown;

