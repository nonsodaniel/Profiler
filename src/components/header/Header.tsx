import * as actions from "../../store/actions/userActions";
import { useDispatch } from "react-redux";

import "./header.scss";
import { genderList, sortAlphabetList } from "../../utils/db";
import Input from "../form/Input";
import Select from "../form/Select";

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
            <Input
              type="text"
              className="form-tag search-textbox"
              data-testid="search-textfield"
              aria-label="search-textfield"
              placeholder="Search User name, age, nationality..."
              value={props.searchValue}
              onChange={handleSearch}
              id={"search"}
              required={false}
              dataTestId={"search-box"}
              inputRef={undefined}
            />
          </div>
          <div className="sort-row">
            <span className="sort-items sort-title">Sort By: </span>
            <Select
              className="select-item"
              label="Order By"
              ariaLabel="select"
              onChange={sortAlphabet}
              dataTestId="sort-alphabet"
              list={sortAlphabetList}
              id={"sort-alphabet"}
            />
            <Select
              className="select-item"
              label="Gender"
              ariaLabel="select"
              onChange={sortGender}
              dataTestId="sort-gender"
              list={genderList}
              id={"sort-gender"}
            />
          </div>
        </div>
      </form>
    </header>
  );
};

export default Header;
