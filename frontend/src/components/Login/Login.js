import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import img from "../../assets/GenX.png"; // Adjust the image path based on your project structure
import InputControl from "./InputControl";
import { auth} from "../../firebase";
import styles from "./Login.css";


function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    pass: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

  const handleSubmission = () => {
    if (!values.email || !values.pass) {
      setErrorMsg("Fill in all fields");
      return;
    }
    setErrorMsg("");

    setSubmitButtonDisabled(true);
    auth.signInWithEmailAndPassword(values.email, values.pass)
      .then(async (res) => {
        setSubmitButtonDisabled(false);
        navigate("/dashboard"); // Redirect to AdminPage1 after successful login
      })
      .catch((err) => {
        setSubmitButtonDisabled(false);
        setErrorMsg(err.message);
      });
  };

  return (
    <div className={styles.adminPage}>
      <header className={styles.header}></header>

      <div className={styles.container}>
        <div>
          <img src={img} alt="Login" className={styles.loginImage} />
        </div>

        <div className={styles.innerBox}>
          <h1 className={styles.heading}>Login</h1>

          <InputControl
            label="Email"
            onChange={(event) =>
              setValues((prev) => ({ ...prev, email: event.target.value }))
            }
            placeholder="Enter email address"
          />
          <InputControl
            label="Password"
            onChange={(event) =>
              setValues((prev) => ({ ...prev, pass: event.target.value }))
            }
            placeholder="Enter Password"
          />

          <div className={styles.footer}>
            <b className={styles.error}>{errorMsg}</b>
            <button
              disabled={submitButtonDisabled}
              onClick={handleSubmission}
              className={styles.loginButton}
            >
              Login
            </button>
            <p className={styles.forgetPassword}>
              <span>
                <Link to="/signup">Forget Password </Link>
              </span>
            </p>
          </div>
        </div>
      </div>

      <footer className={styles.footer1}>
        <p>Footer content goes here.</p>
      </footer>
    </div>
  );
}

export default Login;
