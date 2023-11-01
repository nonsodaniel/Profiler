import Header from "../header/Header";
import Pagination from "../pagination/Pagination";
import Users from "../users/Users";
import "./Container.scss";

const Container = () => {
  return (
    <div className="container">
      <Header />
      <Users />
      <footer className="footer" data-testid="footer">
        <Pagination />
      </footer>
    </div>
  );
};

export default Container;
