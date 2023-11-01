import { IUserInfo } from "../../store/types";
interface IUserListProps {
  users: IUserInfo;
}

const UserList = ({ users }: IUserListProps) => {
  const { id, name, phone, picture, dob, email, location, gender } = users;
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

          <p>{email}</p>
          <p className="">
            <i className="far fa-clock"> </i>
            {phone}
          </p>
          <p className="capitalize">{gender}</p>
          <p className="">
            {location.city}, {location.country}
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
