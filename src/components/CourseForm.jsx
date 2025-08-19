// ===============================================================================================
// IMPORTS
// ===============================================================================================

import PropTypes from "prop-types";
import ModuleForm from "./ModuleForm.jsx";
import AssessmentForm from "./AssessmentForm.jsx";

// ===============================================================================================
// COMPONENT DEFINITION
// ===============================================================================================

/************************************************************************************************/

function CourseForm({
  courseData,
  onChange,
  onAddModule,
  onAddAssessment,
  onRemoveComponent,
  onUpdateComponent
}) {
  return (
    <form>
      <label htmlFor="title">Title</label>
      <br />
      <input
        name="title"
        type="text"
        value={courseData.title}
        onChange={onChange}
      />
      <br />

      <label htmlFor="description">Description</label>
      <br />
      <textarea
        name="description"
        value={courseData.description}
        onChange={onChange}
      />
      <br />

      {courseData.components.map((component) => {
        return (
          <section key={component.id}>
            {component?.questions ? (
              <AssessmentForm
                assessmentData={component}
                onChange={(updatedAssessment) =>
                  onUpdateComponent(component.id, updatedAssessment)
                }
                onDelete={() => onRemoveComponent(component.id)}
              />
            ) : (
              <ModuleForm
                moduleData={component}
                onChange={(updatedModule) => onUpdateComponent(component.id, updatedModule)}
                onDelete={() => onRemoveComponent(component.id)}
              />
            )}
          </section>
        );
      })}

      <button type="button" onClick={onAddModule}>
        Add Module
      </button>

      <button type="button" onClick={onAddAssessment}>
        Add Assessment
      </button>
    </form>
  );
}
CourseForm.propTypes = {
  courseData: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onAddModule: PropTypes.func.isRequired,
  onAddAssessment: PropTypes.func.isRequired,
  onRemoveComponent: PropTypes.func.isRequired,
  onUpdateComponent: PropTypes.func.isRequired
};

// ===============================================================================================
// EXPORTS
// ===============================================================================================

export default CourseForm;
