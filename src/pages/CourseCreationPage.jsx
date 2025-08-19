import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import CourseForm from "../components/CourseForm.jsx";
import { Course, Module, Assessment, Question } from "../scripts/databaseSchemas.js";
// import { sendRequest } from "../scripts/sendrequest.js"; // Import sendRequest

// const serverURL = import.meta.env.VITE_SERVER_URL_ROOT; // Import the server URL from environment variables

function CourseCreationPage() {
  const navigate = useNavigate();
  const { userInfo } = useContext(UserContext);
  const [courseData, setCourseData] = useState(
    new Course({
      title: "",
      description: "",
      instructor: userInfo,
      components: []
    })
  );

  function onFieldChange(event) {
    event.preventDefault();

    const newCourseData = structuredClone(courseData);
    newCourseData[event.target.name] = event.target.value;

    setCourseData(newCourseData);
  }

  // Function to add a new module
  function addModule() {
    const newCourseData = structuredClone(courseData);

    const newModule = new Module({
      title: "",
      description: "",
      type: "Markdown", // Default type
      url: ""
    });

    newModule.id = Date.now(); // Temporary ID for React key

    newCourseData.components.push(newModule);
    setCourseData(newCourseData);

    console.log(newCourseData.components);
  }

  // Function to add a new assessment
  function addAssessment() {
    const newCourseData = structuredClone(courseData);

    const newAssessment = new Assessment({
      title: "",
      questions: []
    });

    newAssessment.id = Date.now(); // Temporary ID for React key

    newCourseData.components.push(newAssessment);
    setCourseData(newCourseData);
  }
  // Function to remove a component
  function removeComponent(componentId) {
    const newCourseData = structuredClone(courseData);

    newCourseData.components = newCourseData.components.filter(
      (component) => component.id !== componentId
    );

    setCourseData(newCourseData);
  }

  // Function to update a specific component
  function updateComponent(componentId, newComponent) {
    const newCourseData = structuredClone(courseData);
    const componentIndex = newCourseData.components.findIndex(
      (component) => component.id === componentId
    );

    if (componentIndex !== -1) {
      newCourseData.components[componentIndex] = { ...newComponent, id: componentId };

      setCourseData(newCourseData);
    }
  }

  return (
    <>
      <h1>Course Creation</h1>

      <CourseForm
        courseData={courseData}
        onChange={onFieldChange}
        onAddModule={addModule}
        onAddAssessment={addAssessment}
        onRemoveComponent={removeComponent}
        onUpdateComponent={updateComponent}
      />

      <button type="submit" onClick={() => {console.log(courseData); window.alert("Not implemented yet!");}}>
        Save
      </button>
      <button type="cancel" onClick={() => navigate("/homepage")}>
        Cancel
      </button>
    </>
  );
}

export default CourseCreationPage;
