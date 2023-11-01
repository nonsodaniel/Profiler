import Header from "./Header";
import { render, cleanup, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";

import configureStore from "redux-mock-store"; // Import redux-mock-store
import { mockedUsers } from "../../utils/db";

const mockStore = configureStore();

const store = mockStore({
  allUsers: mockedUsers,
  data: mockedUsers,
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
});

afterEach(cleanup);

render(
  <Provider store={store}>
    <Header />
  </Provider>
);

const setup = () => {
  const input = render(
    <Provider store={store}>
      <Header />
    </Provider>
  ).getAllByTestId("search-box");
  return {
    input,
  };
};

describe("Completely render <Header />", () => {
  test("render the Header component without crashing", () => {
    expect(screen.getAllByTestId("header")).toHaveLength(1);
    expect(screen.getAllByTestId("search-box")).toHaveLength(1);
    expect(
      screen.getByPlaceholderText("Search User name, age, nationality...")
    );
    expect(screen.getAllByTestId("sort-alphabet")).toHaveLength(1);
    expect(screen.getAllByTestId("sort-gender")).toHaveLength(1);
  });
});
