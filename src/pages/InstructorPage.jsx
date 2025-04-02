// IMPORTS
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import ResponsiveGrid from "../components/ResponsiveGrid";
import CourseCard from "../components/CourseCard";
import { UserContext } from "../contexts/UserContext";

// COMPONENT DEFINITION

function InstructorPage() {
  const { userInfo } = useContext(UserContext);
  const [course, setCourse] = useState(null);
  const navigate = useNavigate();

  const userCourses = userInfo ? userInfo.user_data.learnerData.courses : [];

  return (
    <>
      <div className="left-pane">
        <button onClick={() => navigate("/coursecontent")}>Course Creation</button>
        <button>All Content</button>
        <button>Folders</button>
        <button>Playlists</button>
        <button>Credentials</button>
        <button>Notifications</button>
        <button onClick={() => setUserInfo(null)}>Go Back to Login Screen</button>
      </div>
      <div className="content-filter-add">
        <button>Add Content</button>
      </div>
      <div className="courses-content">
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
      </div>
    </>
  );
}
export default InstructorPage;
