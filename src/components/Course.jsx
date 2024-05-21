// ============================================================================================
// IMPORTS
// ============================================================================================

import PropTypes from "prop-types";
import Module from "./Module.jsx";
import Assessment from "./Assessment.jsx";

import "./Course.css";

// ============================================================================================
// COMPONENT DEFINITION
// ============================================================================================

/*********************************************************************************************/

function Course({ courseData }) {
  return (
    <div id="Course">
      <h1>{courseData.title}</h1>
      <p>
        <aside style={{ float: "inline-end" }}>
          <b>Instructor:</b>
          <br />
          {courseData.instructor}
        </aside>

        {courseData.description}
      </p>

      <section style={{ clear: "both" }}>
        {courseData.components.map((component, index) => {
          return (
            <>
              {index === 0 || <hr />}
              <article key={index}>
                {component?.questions ? (
                  <Assessment assessmentData={component} />
                ) : (
                  <Module moduleData={component} />
                )}
              </article>
            </>
          );
        })}
      </section>
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
