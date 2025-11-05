import magnifier from '../../assets/icons/lets-icons_search-alt.svg';

const Search = (props) => {
  let {className, half, small, iconRight} = props;
  className = className ?? '';

  return (
    <label
      className={`
        input input-search
        input--border-light
        ${half ? 'input--w-half' : ''}
        ${small ? 'input-search--small' : ''}
        ${iconRight ? 'input-search--icon-right' : ''}
        ${className}
      `}
    >
      <img
        src={magnifier}
        className="input-search__icon"
      />

      <input
        {...props}
        type="search"
        className="input-internal outline-none w-full placeholder-light"
      />
    </label>
  );
};

export default Search;

