import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as userActions from "../../store/actions/userActions";
import "./users.scss";
import UserList from "./UserList";
import { AppState } from "../../store/reducers/rootReducer";
import { IUserInfo } from "../../store/types";

const Users: React.FC = () => {
  const dispatch = useDispatch();
  const { data, loading, errorMessage, searchResults, currentPage } =
    useSelector((state: AppState) => state.users);

  function removeDuplicatesAndFilterNullId(users: IUserInfo[]): IUserInfo[] {
    const uniqueUsers = new Map<string, IUserInfo>();
    const filteredUsers: IUserInfo[] = [];

    for (const user of users) {
      if (user.id && user.id.value) {
        const id = user.id.value;
        if (!uniqueUsers.has(id)) {
          uniqueUsers.set(id, user);
          filteredUsers.push(user);
        }
      }
    }

    return filteredUsers;
  }
  const users =
    searchResults && searchResults.length > 0 ? searchResults : data;
  const isDataLoaded = users && !!users.length;

  useEffect(() => {
    dispatch(userActions.getUsers(currentPage));
  }, [dispatch, currentPage]);
  return (
    <Fragment>
      {loading && <p className="text-center">Loading Data...</p>}
      <div className="users-wrap" data-testid="users-wrap">
        {isDataLoaded &&
          removeDuplicatesAndFilterNullId(users).map((user) => (
            <UserList key={user.id.value} users={user} />
          ))}
      </div>
      {!loading && !isDataLoaded && (
        <p className="text-center">No Data Available</p>
      )}
      {errorMessage && !loading && !isDataLoaded && (
        <p className="text-center">An Error occurred.. Kindly retry</p>
      )}
    </Fragment>
  );
};

export default Users;
