import React, { useState } from "react";
import styles from "./RegisterPage.module.css";
import FormPage from "./formpage";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    error: false,
    errorMsg: "",
  });

  // const [profileUrl, setProfileUrl] = useState("");

  function showProfileHandler(){
    setTimeout(()=>{
      navigate("/login"); 
    },1000)
  }


  function clearErrorHandler() {
    setFormState((prev) => ({ ...prev, error: false, errorMsg: "" }));
  }

  async function submitHandler(username, password, name, phone, email) {
    const registrationData = { username, password, name, phone, email };
    setProfileUrl(`http://localhost:8081/api/users/${username}`);


    try {
      const response = await fetch("http://localhost:8081/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registrationData),
      });

      const data = await response.json();

      if (response.ok) {
        setFormState({ error: true, errorMsg: "User Registered Successfully",  });
        showProfileHandler();
      } else {
        setFormState({ error: true, errorMsg: data.message || "Registration failed.",});
      }
    } catch (error) {
      setFormState({
        error: true,
        errorMsg: error.message || "Something went wrong! Please try again later.",
        isLoading: false,
      });
    }
  }

  return (
    <div className={styles.pageContainer}>
      {/* Show error message */}
      {formState.error && <div className={styles.errorBox}>{formState.errorMsg}</div>}

      <FormPage onSubmit={submitHandler} onErrorClear={clearErrorHandler} />
    </div>
  );
}

export default RegisterPage;

