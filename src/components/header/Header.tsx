import * as actions from "../../store/actions/userActions";
import { useDispatch } from "react-redux";

import "./header.scss";
import { genderList, sortAlphabetList } from "../../utils/db";
import { IDropDownList } from "../../store/types";

interface HeaderProps {
  searchValue?: string;
}

const Header = (props: HeaderProps) => {
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
  const sortGender: React.ChangeEventHandler<HTMLSelectElement> = ({
    target,
  }) => {
    dispatch(actions.handleSortGender(target.value));
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
              placeholder="Search User name, age, nationality..."
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
              <label htmlFor="sortGender" className="sort-label">
                Gender
              </label>
              <select
                className="select-item"
                aria-label="select"
                onChange={sortGender}
                data-testid="sort-date"
              >
                {genderList.map((item: IDropDownList) => {
                  let { id, value } = item;
                  return (
                    <option key={id} value={value}>
                      {value}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        </div>
      </form>
    </header>
  );
};

export default Header;
