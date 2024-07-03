// ============================================================================================
// IMPORTS
// ============================================================================================

import PropTypes from "prop-types";

// ============================================================================================
// COMPONENT DEFINITION
// ============================================================================================

/*********************************************************************************************/

function CourseCard({ courseData, onViewClick }) {
  return (
    <div className="Card">
      <h3>{courseData.title}</h3>
      <p>Instructor: {courseData.instructor}</p>

      <p className="Description">{courseData.description}</p>

      <button onClick={onViewClick}>View</button>
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
