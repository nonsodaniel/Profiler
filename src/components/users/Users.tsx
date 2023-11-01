import { useEffect } from "react";
import { connect, useSelector } from "react-redux";
import * as actions from "../../store/actions/userActions";
import "./users.scss";
import UserList from "./UserList";
import { IUserInfo } from "../../store/types";
import { AppState } from "../../store/reducers/rootReducer";
import { useDispatch } from "react-redux";

interface IUsersProps {
  data: IUserInfo[];
  loading: boolean;
  errorMessage: string;
  getUsers: () => void;
  searchResults: IUserInfo[] | null;
}

const Users = ({
  data,
  getUsers,
  loading,
  errorMessage,
  searchResults,
}: IUsersProps) => {
  const dispatch = useDispatch();
  const viewData: IUserInfo[] = !searchResults?.length ? data : searchResults;
  const isDataLoaded = viewData && viewData.length > 0;
  useEffect(() => {
    dispatch(actions.getUsers());
  }, [getUsers]);

  return (
    <div className="users-wrap" data-testid="users-wrap">
      {isDataLoaded ? (
        viewData.map((user: any) => {
          return (
            <UserList
              key={Math.floor(Math.random() * Date.now())}
              users={user}
            />
          );
        })
      ) : (
        <p className="text-center">No Data Available!</p>
      )}
    </div>
  );
};

const mapStateToProps = (state: AppState) => {
  const { data, loading, errorMessage, searchResults } = state.users;

  return {
    data,
    loading,
    errorMessage,
    searchResults,
  };
};
export default connect(mapStateToProps, actions)(Users);
