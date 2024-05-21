// ============================================================================================
// IMPORTS
// ============================================================================================

import PropTypes from "prop-types";

// ============================================================================================
// COMPONENT DEFINITION
// ============================================================================================

/*********************************************************************************************/

function CourseCard({ courseData }) {
  return (
    <div className="Card">
      <h3>{courseData.title}</h3>
      <p>Instructor: {courseData.instructor}</p>

      <p style={{ overflow: "hidden" }}>{courseData.description}</p>

      <button onClick={() => window.alert("This button doesn't do anything yet.")}>View</button>
    </div>
  );
}

CourseCard.propTypes = {
  courseData: PropTypes.object.isRequired
};

// ============================================================================================
// EXPORTS
// ============================================================================================

export default CourseCard;
