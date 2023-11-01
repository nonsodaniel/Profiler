import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions/userActions";
import "./pagination.scss";
import { AppState } from "../../store/reducers/rootReducer";

const Pagination = () => {
  const dispatch = useDispatch();
  const select = useSelector((state: AppState) => state);
  const { currentPage, totalPages, allUsers } = select.users;
  const prevBtn = () => {
    dispatch(actions.handlePrevBtn());
  };
  const nextBtn = () => {
    dispatch(actions.handleNextBtn());
  };

  return (
    <div className="pagination" data-testid="pagination">
      {allUsers.length > 0 && (
        <div className="pagination-wrap">
          <button
            className="pagination-text pointer"
            data-testid="btn-prev"
            disabled={currentPage === 1}
            onClick={prevBtn}
          >
            Previous
          </button>
          <span>
            <button className="page-btn">{currentPage}</button> of {totalPages}{" "}
          </span>
          <button
            className="pagination-text pointer"
            data-testid="btn-next"
            disabled={currentPage === totalPages}
            onClick={nextBtn}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Pagination;
