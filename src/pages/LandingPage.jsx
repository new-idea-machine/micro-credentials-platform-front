// ============================================================================================
// IMPORTS
// ============================================================================================

import { useContext, useState } from "react";
import ResponsiveGrid from "../components/ResponsiveGrid";
import { CourseContext } from "../contexts/CoursesContext";
import CourseCard from "../components/CourseCard";
import Course from "../components/Course";
const serverURL = import.meta.env.VITE_SERVER_URL_ROOT;

console.assert(
  serverURL?.length > 0,
  'Server URL not specified -- add "VITE_SERVER_URL_ROOT=<url>" to .env'
);

function LandingPage() {
  const { coursesInfo, setCoursesInfo } = useContext(CourseContext);
  const [course, setCourse] = useState(null);

  const courses = coursesInfo?.Courses_data ? coursesInfo.Courses_data : [];

  return (
    <>
      <div></div>
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
