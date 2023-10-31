import { Provider } from "react-redux";
import Container from "./components/container/Container";

import "./";
import { store } from "./store/store";

function App() {
  return (
    <div className="app">
      <Provider store={store}>
        <Container />
      </Provider>
    </div>
  );
}

export default App;
