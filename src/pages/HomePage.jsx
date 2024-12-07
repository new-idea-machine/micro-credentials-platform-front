// ============================================================================================
// IMPORTS
// ============================================================================================

import { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { UserContext } from "../contexts/UserContext";
import ResponsiveGrid from "../components/ResponsiveGrid";
import Course from "../components/Course";
import CourseCard from "../components/CourseCard";
import { CoursesContext } from "../contexts/CoursesContext";

// ============================================================================================
// COMPONENT DEFINITION
// ============================================================================================

function HomePage() {
  const { coursesInfo, setCoursesInfo } = useContext(CoursesContext);
  const { userInfo, setUserInfo } = useContext(UserContext);
  const [course, setCourse] = useState(null);
  const [searchText, setSearchText] = useState("");

  const userCourses = userInfo?.user_data?.learnerData?.map
    ? userInfo.user_data.learnerData
    : [];

  const allCourses = coursesInfo?.Courses_data ? coursesInfo.Courses_data : [];

  const [coursesDisplay, setCoursesDisplay] = useState(allCourses);

  useEffect(() => {
    setCoursesDisplay(allCourses);
  }, [coursesInfo]);

  function searchInCourses(searchString) {
    let loweredString = searchString.trim().toLowerCase();
    const filteredCourses = allCourses.filter((course) => {
      return (
        course.title.toLowerCase().includes(loweredString) ||
        course.description.toLowerCase().includes(loweredString)
      );
    });
    setCoursesDisplay(filteredCourses);
  }

  function resetCourses() {
    setCoursesDisplay(allCourses);
  }

  if (course !== null) {
    return (
      <>
        <Course courseData={course} />
        <br />

        <button onClick={() => setCourse(null)}>Close</button>
      </>
    );
  } else {
    return (
      <>
        <h1>Your Courses</h1>
        <ResponsiveGrid minColumnWidth="329px" rowGap="43px">
          {userCourses.map((course, index) => {
            return (
              <CourseCard
                courseData={course}
                onViewClick={() => setCourse(course)}
                key={index}
              />
            );
          })}
        </ResponsiveGrid>
        <button onClick={() => setUserInfo(null)}>Go Back to Login Screen</button>
        <h2>Explore</h2>
        <input
          type="text"
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
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
            <div>No Courses Found</div>
          )}
        </ResponsiveGrid>
      </>
    );
  }
}

HomePage.propTypes = {
  children: PropTypes.oneOf([undefined])
};

// ============================================================================================
// EXPORTS
// ============================================================================================

export default HomePage;
