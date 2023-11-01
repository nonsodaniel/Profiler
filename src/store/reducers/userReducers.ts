import { sortUsersByFirstName } from "../../utils/helpers";
import {
  START_FETCH_USER,
  SET_USER_DATA,
  USER_FETCH_FAILED,
  SEARCH_USER,
  SORT_DATE,
  PREV_PAGE,
  NEXT_PAGE,
  DELETE_USER,
  SORT_ALPHABET,
} from "../actions/types";
import { userReducerState } from "../types";

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
};

//@ts-ignore

export const reducer = (state = INTIAL_STATE, actions) => {
  switch (actions.type) {
    case START_FETCH_USER:
      return { ...state, loading: true };
    case SET_USER_DATA:
      let data = actions.payload.users;
      return {
        ...state,
        error: false,
        loading: false,
        errorMessage: "",
        allUsers: data,
        data: data,
        totalPages: Math.ceil(data.length / state.pageLength),
        pageData: paginate(data, state.currentPage, state.pageLength),
      };
    case DELETE_USER:
      const { id } = actions.payload;
      let newData = state.allUsers.filter((data_: any) => data_.id !== id);
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
      let searchData = state.allUsers;

      if (searchValue !== "") {
        searchData = state.allUsers.filter((user) => {
          const name = user.name;
          const age = user.dob;
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
      let sortedUsers =
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
    case SORT_DATE:
      const { activeDate } = actions.payload;
      let sortDateData =
        activeDate === "Default"
          ? state.allUsers
          : activeDate === "Asc"
          ? [...state.allUsers].sort((a, b) =>
              //@ts-ignore
              a.created.localeCompare(b.created)
            )
          : activeDate === "Desc"
          ? [...state.allUsers].sort((a, b) =>
              //@ts-ignore
              b.created.localeCompare(a.created)
            )
          : null;
      return {
        ...state,
        search: false,
        currentPage: 1,
        searchValue: "",
        data: sortDateData,
        activeOrder: activeDate,
        pageData: paginate(sortDateData, 1, state.pageLength),
      };

    case PREV_PAGE:
      let prevPage = state.currentPage - 1;
      return {
        ...state,
        currentPage: prevPage,
        pageData: paginate(state.data, prevPage, state.pageLength),
      };

    case NEXT_PAGE:
      let nextPage = state.currentPage + 1;
      return {
        ...state,
        currentPage: nextPage,
        pageData: paginate(state.data, nextPage, state.pageLength),
      };
    default:
      return { ...state };
  }
};
//@ts-ignore
const paginate = (arr, currentPage, pagelength) => {
  return arr.slice((currentPage - 1) * pagelength, pagelength * currentPage);
};

export default reducer;
