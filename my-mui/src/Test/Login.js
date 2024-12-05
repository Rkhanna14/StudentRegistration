import { useRef, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import styles from "./RegisterPage.module.css"
import classes from "./login.module.css";
import { useDispatch } from "react-redux";
import { setUserDetails } from "./Redux/ReduxTlkit";
import { addCourse } from "./Redux/ReduxTlkit";


function LoginPage() {
  const loaderData = useLoaderData();


  const userName = useRef();
  const password = useRef();
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();
  const Dispatch= useDispatch();
  

  // Reset error message on focus
  function resetErrorMsg() {
    setErrorMsg("");
  }

  async function submitHandler(e) {
    e.preventDefault();

    const loginCredentials = {
      username: userName.current.value,
      password: password.current.value,
    };

    try {
      const response = await fetch("http://localhost:8081/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginCredentials),
      });

      console.log()

      if (!response.ok) {
        throw new Error("Failed to login. Please check your credentials.");
      }

      const data = await response.json();
      Dispatch(setUserDetails(data.user));
      console.log(data.user, "Login response");

      if (data.message === "Old User") {
        console.log("Old user. Navigating to profile...");
        Dispatch(addCourse(loaderData));
        // navigate('./');
        navigate("/course");
      } else {
        setErrorMsg(data.message || "Unexpected error occurred.");
      }
    } catch (error) {
      console.error("Login failed:", error.message);
      setErrorMsg("An error occurred. Please try again later.");
    }
  }

  return (
    <div className={classes.pageContain}>
      <form className={styles.formBox} onSubmit={submitHandler}>
        <h2 className={styles.title}>Login</h2>
        <div className={styles.formGroup}>
          <label htmlFor="userName" className={styles.label}>
            Username
          </label>
          <input
            onFocus={resetErrorMsg}
            id="userName"
            type="text"
            ref={userName}
            className={styles.input}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password" className={styles.label}>
            Password
          </label>
          <input
            onFocus={resetErrorMsg}
            id="password"
            type="password"
            ref={password}
            className={styles.input}
            required
          />
        </div>

        {errorMsg && <div className={classes.errorMsg}>{errorMsg}</div>}

        <div className={classes.buttonGroup}>
          <button type="submit" className={classes.btn}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;



export const GetAllCourses = async () => {
  try {
    const response = await fetch("http://localhost:8081/api/courses/getCourses", {
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
    return [];
  }
};