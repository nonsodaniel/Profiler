import { IUserInfo } from "../types";
import { sortUsersByFirstName } from "../../utils/helpers";
import {
  START_FETCH_USER,
  SET_USER_DATA,
  USER_FETCH_FAILED,
  SEARCH_USER,
  SORT_GENDER,
  PREV_PAGE,
  NEXT_PAGE,
  DELETE_USER,
  SORT_ALPHABET,
} from "../actions/types";
import { userReducerState } from "../types";

interface Action {
  type: string;
  payload: any;
}

const INTIAL_STATE: userReducerState = {
  allUsers: [],
  data: [],
  error: false,
  loading: false,
  errorMessage: "",
  searchValue: "",
  ageValue: 0,
  search: true,
  totalPages: 1,
  currentPage: 1,
  pageLength: 6,
  pageData: [],
  searchResults: [],
  activeOrder: "",
  activeGender: "",
};

const reducer = (state = INTIAL_STATE, actions: Action): userReducerState => {
  switch (actions.type) {
    case START_FETCH_USER:
      return { ...state, loading: true };
    case SET_USER_DATA:
      const userData: IUserInfo[] = actions.payload.users;
      return {
        ...state,
        error: false,
        loading: false,
        errorMessage: "",
        allUsers: userData,
        data: userData,
        totalPages: Math.ceil(userData.length / state.pageLength),
        pageData: paginate(userData, state.currentPage, state.pageLength),
      };
    case DELETE_USER:
      const { id } = actions.payload;
      const newData = state.allUsers.filter(
        (data: IUserInfo) => data.id !== id
      );
      localStorage.setItem("users", JSON.stringify(newData));
      return {
        ...state,
        search: false,
        currentPage: 1,
        searchValue: "",
        totalPages: Math.ceil(newData.length / state.pageLength),
        data: newData,
        pageData: paginate(newData, 1, state.pageLength),
      };

    case USER_FETCH_FAILED:
      return {
        ...state,
        error: true,
        errorMessage: actions.payload.errorMsg,
        loading: false,
      };
    case SEARCH_USER: {
      const { searchValue } = actions.payload;
      let searchData: IUserInfo[] = state.allUsers;

      if (searchValue !== "") {
        searchData = state.allUsers.filter((user) => {
          const name = user.name;
          const location = user.location;

          const nameMatches =
            name.first.toLowerCase().includes(searchValue.toLowerCase()) ||
            name.last.toLowerCase().includes(searchValue.toLowerCase());

          const locationMatches =
            location.city.toLowerCase().includes(searchValue.toLowerCase()) ||
            location.country.toLowerCase().includes(searchValue.toLowerCase());

          const ageMatches = user.dob.age.toString() === searchValue;

          return nameMatches || locationMatches || ageMatches;
        });
      }

      const totalPages = Math.ceil(searchData.length / state.pageLength);
      const pageData = paginate(searchData, 1, state.pageLength);

      return {
        ...state,
        search: true,
        currentPage: 1,
        searchValue,
        totalPages,
        data: searchData,
        pageData,
      };
    }
    case SORT_ALPHABET:
      const { activeOrder } = actions.payload;
      let sortedUsers: IUserInfo[] =
        activeOrder === "Default"
          ? state.allUsers
          : sortUsersByFirstName(state.allUsers, activeOrder);
      return {
        ...state,
        search: false,
        currentPage: 1,
        searchValue: "",
        data: sortedUsers,
        totalPages: Math.ceil(sortedUsers.length / state.pageLength),
        activeOrder,
        pageData: paginate(sortedUsers, 1, state.pageLength),
      };
    case SORT_GENDER:
      const { activeGender } = actions.payload;
      let sortGenderData: IUserInfo[] =
        activeGender === "Default"
          ? state.allUsers
          : activeGender === "Male"
          ? state.allUsers.filter((user) => user.gender === "male")
          : state.allUsers.filter((user) => user.gender === "female");
      return {
        ...state,
        search: false,
        currentPage: 1,
        searchValue: "",
        data: sortGenderData,
        activeGender,
        pageData: paginate(sortGenderData, 1, state.pageLength),
      };

    case PREV_PAGE:
      const prevPage = state.currentPage - 1;
      return {
        ...state,
        currentPage: prevPage,
        pageData: paginate(state.data, prevPage, state.pageLength),
      };

    case NEXT_PAGE:
      const nextPage = state.currentPage + 1;
      return {
        ...state,
        currentPage: nextPage,
        pageData: paginate(state.data, nextPage, state.pageLength),
      };
    default:
      return { ...state };
  }
};

const paginate = (
  arr: IUserInfo[],
  currentPage: number,
  pageLength: number
): IUserInfo[] => {
  return arr.slice((currentPage - 1) * pageLength, pageLength * currentPage);
};

export default reducer;
