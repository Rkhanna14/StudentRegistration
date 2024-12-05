import { useRef, useState } from "react";
import "./CourseWrapper.css";
import { useDispatch } from "react-redux";
import { addCourse } from "./Redux/ReduxTlkit";
import classes from  "./login.module.css";
import toggle from "./Redux/ReduxTlkit";

const CourseWrapper = ({ onClose ,refreshCourses}) => {
  const CourseName = useRef();
  const CourseDescription = useRef(null);
  const CoursePrice = useRef(null);
  const [errorMsg, setErrorMsg] = useState("");
  const Dispatch= useDispatch();

  const SubmitHandler = async(e) => {
    e.preventDefault();
    const newCourse = {
      courseName: CourseName.current.value,
      courseDescrp: CourseDescription.current.value,
      coursePrice: CoursePrice.current.value
    };
  
    try {
      const response = await fetch("http://localhost:8081/api/courses/addcourse", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCourse),
      });
  
      const message = await response.text(); // Parse as plain text
  
      if (response.ok) {
  
        setErrorMsg(message);
        onClose(); // Close the modal
        console.log("Course added successfully");
      } else {
        setErrorMsg(message);
        console.error("Error adding course:", message);
      }
    } catch (err) {
      console.log(err.message, "error issssssssssss");
    }
  };
  

  const handleModalClick = (e) => {
    // Prevents the modal from closing if the form or its contents are clicked
    e.stopPropagation();
  };

  return (
    <div className="course-wrapper-overlay" onClick={onClose}>
      <div className="course-wrapper" onClick={handleModalClick}>
        <span className="close-btn" onClick={onClose}>&times;</span> {/* Close button */}
        <form onSubmit={SubmitHandler}>
          <div>
            <label>Course Name:</label>
            <input type="text" ref={CourseName} />
          </div>
          <div>
            <label>Course Description:</label>
            <input type="text" ref={CourseDescription} />
          </div>
          <div>
            <label>Course Price:</label>
            <input type="number" ref={CoursePrice} />
          </div>
          <div>
            <button type="submit">Submit</button>
            {errorMsg && <div className={classes.errorMsg}>{errorMsg}</div>}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CourseWrapper;
