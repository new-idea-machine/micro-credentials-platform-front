// ============================================================================================
// IMPORTS
// ============================================================================================

import { useContext, useEffect, useState } from "react";
import ResponsiveGrid from "../components/ResponsiveGrid";
import { CoursesContext } from "../contexts/CoursesContext";
import CourseCard from "../components/CourseCard";
import Course from "../components/Course";
import { useNavigate } from "react-router-dom";

const serverURL = import.meta.env.VITE_SERVER_URL_ROOT;

console.assert(
  serverURL?.length > 0,
  'Server URL not specified -- add "VITE_SERVER_URL_ROOT=<url>" to .env'
);

function LandingPage() {
  // CONTEXT AND STATE
  // context will have all the courses that will be displayed in the landing page
  const { coursesInfo, setCoursesInfo } = useContext(CoursesContext);
  // Course has the information for the course that would like to be displayed
  const [course, setCourse] = useState(null);
  // controlled input state that will help to filter the courses that are displayed
  const [searchText, setSearchText] = useState("");
  // state for the courses that will alter the courses displayed
  const courses = coursesInfo?.Courses_data ? coursesInfo.Courses_data : [];
  const [coursesDisplay, setCoursesDisplay] = useState(courses);

  useEffect(() => {
    setCoursesDisplay(courses);
  }, [coursesInfo]);

  // FUNCTIONS
  function searchInCourses(searchString) {
    let loweredString = searchString.trim().toLowerCase();
    const filteredCourses = courses.filter((c) => {
      return (
        c.title.toLowerCase().includes(loweredString) ||
        c.description.toLowerCase().includes(loweredString)
      );
    });
    setCoursesDisplay(filteredCourses);
  }

  function resetCourses() {
    setCoursesDisplay(courses);
  }

  const navigate = useNavigate();

  return (
    <>
      <div>
        <button
          onClick={() => {
            navigate("/login");
          }}
        >
          Login / SignUp
        </button>
      </div>
      <div></div>
      {course && (
        <>
          <Course courseData={course} />
          <br />
          <button onClick={() => setCourse(null)}>Close</button>
        </>
      )}
      <h1>Discover Our Courses</h1>
      <input
        value={searchText}
        onChange={(e) => {
          setSearchText(e.target.value);
        }}
        type="text"
      />
      <button onClick={() => searchInCourses(searchText)}>Search</button>
      <button
        onClick={() => {
          resetCourses();
          setSearchText("");
        }}
      >
        Reset
      </button>
      <ResponsiveGrid minColumnWidth="329px" rowGap="43px">
        {coursesDisplay.length > 0 ? (
          coursesDisplay.map((course, index) => {
            return (
              <CourseCard
                courseData={course}
                key={index}
                onViewClick={() => setCourse(course)}
              />
            );
          })
        ) : (
          <h3>No Courses Found</h3>
        )}
      </ResponsiveGrid>
    </>
  );
}
export default LandingPage;
