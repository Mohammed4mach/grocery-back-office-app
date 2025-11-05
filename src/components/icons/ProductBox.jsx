const ProductBox = (props) => {
  let {className} = props;
  className = className ?? '';

  return (
    <svg className={className} width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g id="fluent-mdl2:product" clipPath="url(#clip0_1050_6203)">
        <path className="path-fill" id="Vector" d="M9.375 2.15479L17.5 6.21729V16.3735L9.375 20.4263L1.25 16.3735V6.21729L9.375 2.15479ZM15.4785 6.60791L9.375 3.56104L7.02148 4.73291L13.0859 7.79932L15.4785 6.60791ZM9.375 9.65479L11.6992 8.50244L5.625 5.43604L3.27148 6.60791L9.375 9.65479ZM2.5 7.62354V15.5923L8.75 18.7173V10.7485L2.5 7.62354ZM10 18.7173L16.25 15.5923V7.62354L10 10.7485V18.7173Z" fill="#636363"/>
      </g>
      <defs>
        <clipPath id="clip0_1050_6203">
          <rect width="20" height="20" fill="white" transform="translate(0 0.98291)"/>
        </clipPath>
      </defs>
    </svg>
  );
};

export default ProductBox;

