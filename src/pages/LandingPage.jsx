// ============================================================================================
// IMPORTS
// ============================================================================================

import { useContext, useState } from "react";
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
  const { coursesInfo, setCoursesInfo } = useContext(CoursesContext);
  const [course, setCourse] = useState(null);
  const navigate = useNavigate();

  const courses = coursesInfo?.Courses_data ? coursesInfo.Courses_data : [];

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
      <ResponsiveGrid minColumnWidth="329px" rowGap="43px">
        {courses.map((course, index) => {
          return (
            <CourseCard courseData={course} key={index} onViewClick={() => setCourse(course)} />
          );
        })}
      </ResponsiveGrid>
    </>
  );
}
export default LandingPage;
