// ============================================================================================
// IMPORTS
// ============================================================================================

import PropTypes from "prop-types";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

// ============================================================================================
// COMPONENT DEFINITION
// ============================================================================================

/*********************************************************************************************/

function CourseCard({ courseData, onViewClick }) {
  const { userInfo } = useContext(UserContext);
  return (
    <div className="Card">
      <h3>{courseData.title}</h3>
      <p>Instructor: {courseData.instructor}</p>

      <p className="Description">{courseData.description}</p>

      <button onClick={onViewClick}>View</button>
      {!userInfo && <button>Add</button>}
    </div>
  );
}

CourseCard.propTypes = {
  courseData: PropTypes.object.isRequired,
  onViewClick: PropTypes.func.isRequired
};

// ============================================================================================
// EXPORTS
// ============================================================================================

export default CourseCard;
