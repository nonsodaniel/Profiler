import { IUserInfo } from "../../store/types";
import { AiOutlineMail, AiOutlinePhone } from "react-icons/ai";
import { IoPersonOutline } from "react-icons/io5";
import { FiMapPin } from "react-icons/fi";

interface IUserListProps {
  users: IUserInfo;
}

const UserList = ({ users }: IUserListProps) => {
  const { name, phone, picture, dob, email, location, gender } = users;
  return (
    <>
      <div className="card user-card">
        <div className="user-details">
          <div className="top-detail flex">
            <div className="img-wrap">
              <img
                src={picture.thumbnail}
                alt={`${name.first}-image`}
                className="img"
              />
            </div>
            <h3>
              {name.first} {name.last}
            </h3>
          </div>

          <p className="user__detail">
            <span>
              <AiOutlineMail />
            </span>{" "}
            <span>{email}</span>
          </p>
          <p className="user__detail">
            <span>
              {" "}
              <AiOutlinePhone />
            </span>
            <span>{phone}</span>
          </p>
          <p className="capitalize user__detail">
            <span>
              <IoPersonOutline />
            </span>
            <span>{gender}</span>
          </p>
          <p className="user__detail">
            <span>
              {" "}
              <FiMapPin />
            </span>

            <span>
              {location.city}, {location.country}
            </span>
          </p>
          <br />
          <div className="category-status">
            <span className="category">
              <i className="far fa-clock"> </i>
              {new Date(dob.date).toDateString()}
            </span>
            <span className={"category"}>{dob.age} years</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserList;
