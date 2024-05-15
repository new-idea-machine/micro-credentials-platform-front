// ============================================================================================
// IMPORTS
// ============================================================================================

import PropTypes from "prop-types";
import Module from "./Module.jsx";
import Assessment from "./Assessment.jsx";

// ============================================================================================
// COMPONENT DEFINITION
// ============================================================================================

/*********************************************************************************************/

function Course({ courseData }) {
  return (
    <div>
      <h2>{courseData.title}</h2>
      <p>Instructor:  {courseData.instructor}</p>

      <p>{courseData.description}</p>

      <div>
        {courseData.components.map((component, index) => {
          return (
            <p key={index}>
              {component?.questions ? (
                <Assessment assessmentData={component} />
              ) : (
                <Module moduleData={component} />
              )}
            </p>
          );
        })}
      </div>
    </div>
  );
}

Course.propTypes = {
  courseData: PropTypes.object.isRequired
};

// ============================================================================================
// EXPORTS
// ============================================================================================

export default Course;
