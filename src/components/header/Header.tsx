import * as actions from "../../store/actions/userActions";
import { useDispatch } from "react-redux";

import "./header.scss";
import { sortAlphabetList } from "../../utils/db";

const Header = (props: any) => {
  const dispatch = useDispatch();

  const handleSearch: React.ChangeEventHandler<HTMLInputElement> = ({
    target,
  }) => {
    dispatch(actions.handleSearchUser(target.value));
  };
  const sortAlphabet: React.ChangeEventHandler<HTMLSelectElement> = ({
    target,
  }) => {
    dispatch(actions.handleSortAlphabet(target.value));
  };
  const sortDate: React.ChangeEventHandler<HTMLSelectElement> = ({
    target,
  }) => {
    dispatch(actions.handleSortDate(target.value));
  };
  return (
    <header className="header" data-testid="header">
      <form action="">
        <div className="header-wrap">
          <div className="search-input">
            <input
              type="text"
              className="form-tag search-textbox"
              data-testid="search-textfield"
              aria-label="search-textfield"
              placeholder="Search User"
              value={props.searchValue}
              onChange={handleSearch}
            />
            <span className="search-icon">
              {" "}
              <i className="fas fa-search"></i>
            </span>
          </div>
          <div className="sort-row">
            <span className="sort-items sort-title">Sort By: </span>

            <div className="select-wrap sort-items">
              <label htmlFor="sortCategory" className="sort-label">
                Order By
              </label>
              <select
                className="select-item"
                aria-label="select"
                onChange={sortAlphabet}
                data-testid="sort-alphabet"
              >
                {sortAlphabetList.map((catgry: any) => {
                  let { id, value } = catgry;
                  return (
                    <option key={id} value={value}>
                      {value}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="select-wrap sort-items">
              <label htmlFor="sortDate" className="sort-label">
                Date
              </label>
              <select
                className="select-item"
                aria-label="select"
                onChange={sortDate}
                data-testid="sort-date"
              >
                <option value="default">Select Date order</option>
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>
          </div>
        </div>
      </form>
    </header>
  );
};

export default Header;
