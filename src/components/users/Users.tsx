import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as userActions from "../../store/actions/userActions";
import "./users.scss";
import UserList from "./UserList";
import { AppState } from "../../store/reducers/rootReducer";

const Users: React.FC = () => {
  const dispatch = useDispatch();
  const { data, loading, errorMessage, searchResults, currentPage } =
    useSelector((state: AppState) => state.users);

  const users =
    searchResults && searchResults.length > 0 ? searchResults : data;
  const isDataLoaded = users && !!users.length;

  useEffect(() => {
    dispatch(userActions.getUsers(currentPage));
  }, [dispatch, currentPage]);

  return (
    <div className="users-wrap" data-testid="users-wrap">
      {isDataLoaded ? (
        users.map((user) => <UserList key={user.id.value} users={user} />)
      ) : (
        <p className="text-center">No Data Available!</p>
      )}
    </div>
  );
};

export default Users;
