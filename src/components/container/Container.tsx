import Header from "../header/Header";
import Users from "../users/Users";
import "./Container.scss";

const Container = () => {
  return (
    <div className="container">
      <Header />
      <Users />
    </div>
  );
};

export default Container;
