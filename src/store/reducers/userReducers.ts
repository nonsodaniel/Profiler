import {
  START_FETCH_USER,
  SET_USER_DATA,
  USER_FETCH_FAILED,
  SEARCH_USER,
  SORT_CATEGORY,
  SORT_DATE,
  PREV_PAGE,
  NEXT_PAGE,
  SORT_PRIORITY,
  DELETE_USER,
} from "../actions/types";
import { userReducerState } from "../types";

const INTIAL_STATE: userReducerState = {
  allUsers: [],
  data: [],
  error: false,
  loading: false,
  errorMessage: "",
  searchValue: "",
  search: true,
  totalPages: 1,
  currentPage: 1,
  pageLength: 6,
  pageData: [],
  currentCategory: "All",
  currentPriority: "All",
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
    case SEARCH_USER:
      const { searchValue } = actions.payload;
      let searchData =
        searchValue === ""
          ? state.allUsers
          : state.allUsers.filter(
              ({ name }) =>
                //@ts-ignore
                name.first.toLowerCase().includes(searchValue.toLowerCase()) ||
                //@ts-ignore
                name.last.toLowerCase().includes(searchValue.toLowerCase())
            );
      return {
        ...state,
        search: true,
        currentPage: 1,
        searchValue: searchValue,
        totalPages: Math.ceil(searchData.length / state.pageLength),
        data: searchData,
        pageData: paginate(searchData, 1, state.pageLength),
      };
    case SORT_CATEGORY:
      const { activeCategory } = actions.payload;
      let sortCatData =
        activeCategory === "All"
          ? state.allUsers
          : //@ts-ignore
            state.allUsers.filter(({ category }) =>
              //@ts-ignore
              category.includes(activeCategory)
            );
      return {
        ...state,
        search: false,
        currentPage: 1,
        searchValue: "",
        data: sortCatData,
        totalPages: Math.ceil(sortCatData.length / state.pageLength),
        activeCategory: activeCategory,
        currentCategory: activeCategory,
        pageData: paginate(sortCatData, 1, state.pageLength),
      };
    case SORT_PRIORITY:
      const { activePriority } = actions.payload;
      let sortPrtyData =
        activePriority === "All"
          ? state.allUsers
          : //@ts-ignore
            state.allUsers.filter(({ priority }) =>
              //@ts-ignore
              priority.includes(activePriority)
            );
      return {
        ...state,
        search: false,
        currentPage: 1,
        searchValue: "",
        data: sortPrtyData,
        totalPages: Math.ceil(sortPrtyData.length / state.pageLength),
        activePriority: activePriority,
        currentPriority: activePriority,
        pageData: paginate(sortPrtyData, 1, state.pageLength),
      };
    case SORT_DATE:
      const { activeDate } = actions.payload;
      let sortDateData =
        activeDate === "default"
          ? state.allUsers
          : activeDate === "asc"
          ? [...state.allUsers].sort((a, b) =>
              //@ts-ignore
              a.created.localeCompare(b.created)
            )
          : activeDate === "desc"
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
