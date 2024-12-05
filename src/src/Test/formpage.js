import { useRef } from "react";
import styles from "./RegisterPage.module.css";
import { Link } from "react-router-dom";


function FormPage({ onSubmit, onErrorClear }) {
  const username = useRef();
  const password = useRef();
  const name = useRef();
  const phone = useRef();
  const email = useRef();

  function SubmitHandler(e) {
    e.preventDefault();
    onSubmit(
      username.current.value,
      password.current.value,
      name.current.value,
      phone.current.value,
      email.current.value
    );
  }

  return (
    <form className={styles.formBox} onSubmit={SubmitHandler}>
      <h2 className={styles.title}>Register</h2>
      <div className={styles.formGroup}>
        <label htmlFor="userName" className={styles.label}>
          Username
        </label>
        <input
          id="userName"
          type="text"
          ref={username}
          className={styles.input}
          onFocus={onErrorClear} // Clear error on change
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="password" className={styles.label}>
          Password
        </label>
        <input
          id="password"
          type="password"
          ref={password}
          className={styles.input}
          onFocus={onErrorClear} // Clear error on change
          required
        />
         <p className={styles.passwordHint}>Password must have at least one special character, one number, one uppercase letter, and one lowercase letter</p>
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="name" className={styles.label}>
          Name
        </label>
        <input
          id="name"
          type="text"
          ref={name}
          className={styles.input}
          onFocus={onErrorClear} // Clear error on change
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="phone" className={styles.label}>
          Phone
        </label>
        <input
          id="phone"
          type="number"
          ref={phone}
          className={styles.input}
          onFocus={onErrorClear} // Clear error on change
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="email" className={styles.label}>
          Email
        </label>
        <input
          id="email"
          type="email"
          ref={email}
          className={styles.input}
          onFocus={onErrorClear} // Clear error on change
          required
        />
      </div>
      <div className={styles.buttonGroup}>
        <button type="submit" className={styles.btn}>
          Submit
        </button>
        <button  className={styles.btn} onClick={onErrorClear}>
        <Link className={styles.link} to="/login">
                <button className={styles.btn}>Login</button>
              </Link>
        </button>
      </div>
    
    </form>
  );
}

export default FormPage;
