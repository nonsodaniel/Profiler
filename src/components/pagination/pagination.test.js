import { render, cleanup, screen, fireEvent } from "@testing-library/react";
import store from "../../store/store";
import { Provider } from "react-redux";
import Pagination from "./Pagination";

afterEach(cleanup);

render(
  <Provider store={store}>
    <Pagination />
  </Provider>
);

describe("Completely render <Pagination />", () => {
  test("render the Pagination component without crashing", () => {
    expect(screen.getAllByTestId("pagination")).toHaveLength(1);
  });
});
