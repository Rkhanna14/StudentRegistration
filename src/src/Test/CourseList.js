import { ReduxToolKitStore } from "./Redux/Store";
import { useEffect, useState } from "react";
import CourseWrapper from "./CourseWrapper";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addCourse, setToggleUserCourses } from "./Redux/ReduxTlkit";
import ErrorPage from "./ErrorPage";

function CourseList({ show, showUserc }) {
  const data = new Date();
  const loaderData = useLoaderData() || []; // Default to empty array if no data
  const adminCourse = useSelector((state) => state.Course.courses  || []);
  const { username, _id } = useSelector((state) => state.Course.userDetails);

  const [enrollStatus, setEnrollStatus] = useState({}); // Tracks enrollment statuses
  const [showCourses, setShowCourses] = useState(false); // To toggle visibility of CourseWrapper
  const dispatch = useDispatch();
  const navigate = useNavigate();


  useEffect(()=>{
    if (!username) {
      navigate('/error');
    }
  })

  const getAdminCourses = async () => {
    try {
      const response = await fetch("http://localhost:8081/api/courses/getCourses", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      const data = await response.json();
      dispatch(addCourse(data)); // Correctly dispatch the resolved data
      console.log(data, "loader");
      return data;
    } catch (err) {
      console.error("Error fetching courses:", err);
      return [];
    }
  };
  


  const fetchAndAddCourses = async () => {
    try {
      const courses = await getAdminCourses(); // Await the courses from getAdminCourses
      dispatch(addCourse(courses)); // Dispatch the resolved data
    } catch (error) {
      console.error("Error fetching and adding courses:", error);
    }
  };
  

const flattenAndMergeCourses = () => {
  const flatten = (arr) => (Array.isArray(arr) ? arr.flat(Infinity) : []); // Use Infinity for deeply nested arrays
  const adminCourses = flatten(adminCourse);
  const userCourses = flatten(loaderData || []);

  // Merge and filter for unique courseId
  const mergedCourses = [...adminCourses, ...userCourses].filter(
    (course, index, self) =>
      course && course.courseId && // Ensure valid course
      index === self.findIndex((c) => c.courseId === course.courseId) // Unique courseId
  );

  return mergedCourses;
};

  

  const mergedCourses = flattenAndMergeCourses();


  const enrollInCourse = async (courseId) => {
    console.log("Enrolling in course:", courseId);

  
    setEnrollStatus((prev) => ({ ...prev, [courseId]: "enrolling" }));

    try {
      const response = await fetch(
        `http://localhost:8081/api/users/usercourses/${_id}/${courseId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.ok) {
        setEnrollStatus((prev) => ({ ...prev, [courseId]: "enrolled" })); // Mark as enrolled
        dispatch(setToggleUserCourses(courseId));
      } else {
        console.error("Failed to enroll:", await response.text());
        setEnrollStatus((prev) => ({ ...prev, [courseId]: "failed" })); // Mark as failed
      }
    } catch (error) {
      console.error("Error enrolling in course:", error);
      setEnrollStatus((prev) => ({ ...prev, [courseId]: "failed" })); // Mark as failed
    }
  };


  const isEnrolled = (courseId) => loaderData.some((course) => course.courseId === courseId);


  const getColorForCourse = (index) => {
    const colors = ["blue", "purple", "red", "green", "peach"];
    //const colors = ["lightblue", "lavender", "lightcoral", "lightgreen", "lightyellow"];
    return colors[index % colors.length]; 
  };

  const toggleCourseWrapper = async () => {
    setShowCourses((prev) => !prev);
    fetchAndAddCourses();

    
  };

  return (
    <>
      {showCourses && <CourseWrapper    onClose={toggleCourseWrapper} />}
      <div className="course">
        <div className="chead">
          <h2>Course Activity</h2>
          <p>{`${data.toLocaleString("default", { month: "short" })} ${data.getDate()}rd, ${data.getFullYear()}`}</p>
        </div>
        <div className="buttonDiv">
          <button  className={username !== "admin" ? "disable" :"" } disabled={username !== "admin"} onClick={toggleCourseWrapper}>
            +
          </button>
        </div>

        <div className="subclass">
          <div className="container">
            {show !== "Courses" && (
              <div className="show">
                Welcome to {show.length > 0 ? show : "Performance"} Tab
              </div>
            )}
            {show === "Courses" && mergedCourses.length > 0 ? (
              <div className="course-list">
                {mergedCourses
                  .filter((course) => !isEnrolled(course.courseId)) // Only show unenrolled courses
                  .map((course, index) => (
                    <div key={course.courseId} className="course-card">
                      <div
                        className="grid-container"
                        style={{ backgroundColor: getColorForCourse(index),  opacity:"0.4" } } 
                      >
                        <div className="course-icon" style={{ gridArea: "menu" }}>
                          <span>📘</span>
                        </div>

                        <div className="course-content" style={{ gridArea: "main" }}>
                          <div className="course-name">{course.courseName}</div>
                          <div className="course-descrp">{course.courseDescrp}</div>
                        </div>
                       {username !== "admin" && <>

                        <div className="course-right" style={{ gridArea: "right" }}>
                          <div className="total">10</div>
                          <span
                            className={
                              enrollStatus[course.courseId] === "enrolled" ||
                              isEnrolled(course.courseId)
                                ? "active"
                                : ""
                            }
                          >
                            {enrollStatus[course.courseId] === "enrolled" ||
                            isEnrolled(course.courseId)
                              ? "Enrolled"
                              : "Not Enrolled"}
                          </span>
                        </div>

                        <div className="course-footer" style={{ gridArea: "footer" }}>
                          <div className="bar">
                            <progress value={Math.floor(Math.random() * 101)} max="100"></progress>
                          </div>
                          <div className="bar-button">
                            {!isEnrolled(course.courseId) &&
                              enrollStatus[course.courseId] !== "enrolled" && (
                                <button
                                  onClick={() => enrollInCourse(course.courseId)}
                                  disabled={
                                    enrollStatus[course.courseId] === "enrolling"
                                  }
                                >
                                  {enrollStatus[course.courseId] === "enrolling"
                                    ? "Enrolling..."
                                    : "Enroll"}
                                </button>
                              )}
                            {(enrollStatus[course.courseId] === "enrolled" ||
                              isEnrolled(course?.courseId)) && (
                              <button disabled className="active">
                                Enrolled
                              </button>
                            )}
                          </div>
                        </div>
                        </>} 
                      </div>
                    </div>
                  ))}
              </div>
            ) : (
              show === "Courses" && <p>No courses available</p> // Display if no courses
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default CourseList;






export const GetUserCourses = async () => {
  // const {username,_id}= useSelector((state)=> state.Course.userDetails);

  const state = ReduxToolKitStore.getState();
  const { _id } = state.Course.userDetails;

  if ((!_id)) {
    console.error("User ID is undefined");
    return [];
  }
  else{


  try {
    const response = await fetch(`http://localhost:8081/api/users/courselist/${_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    console.log(data, "loader");
    return data;
  } catch (err) {
    console.error("Error fetching courses:", err);
    return [];
  }}
};
