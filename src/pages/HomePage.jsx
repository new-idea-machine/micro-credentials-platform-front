// ============================================================================================
// IMPORTS
// ============================================================================================

import { useContext, useState } from "react";
import PropTypes from "prop-types";
import { UserContext } from "../contexts/UserContext";
import ResponsiveGrid from "../components/ResponsiveGrid";
import Course from "../components/Course";
import CourseCard from "../components/CourseCard";

// ============================================================================================
// COMPONENT DEFINITION
// ============================================================================================

function HomePage() {
  const { userInfo, setUserInfo } = useContext(UserContext);
  const [course, setCourse] = useState(null);

  const userCourses = userInfo?.user_data?.learnerData?.map
    ? userInfo.user_data.learnerData
    : [];

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
