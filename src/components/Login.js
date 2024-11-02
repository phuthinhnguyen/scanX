import React, { useEffect, useState } from "react";
import "../App.css";
import { useDispatch, useSelector } from "react-redux";
import { login, signup } from "../redux/action";
import { useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Slide from "@mui/material/Slide";
import Collapse from "@mui/material/Collapse";
import { VscTriangleUp } from "react-icons/vsc";


// used for show snackbar and alert
function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const alrertstylesuccess = {
  width: "100%",
  marginBottom: 4,
  marginRight: 2,
  backgroundColor: "var(--backgroundbody)"
};

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const [alert, setAlert] = useState({ open: false, message: "" });
  const [checked, setChecked] = useState(false);

  const REGEX = {
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
  };

  const [formlogin, setFormlogin] = useState({
    username: "",
    password: "",
    errormessage: { username: "", password: "" }
  });

  const [formsignup, setFormsignup] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    confirmpassword: "",
    admintoken: "",
    errormessage: {
      name: "",
      email: "",
      username: "",
      password: "",
      confirmpassword: "",
      admintoken: ""
    }
  });
  useEffect(() => {
    if (state.user != null) {
      if (state.user.result == "Login successfully") {
        navigate("/home");
      }
      else setAlert({ open: true, message: state.user.result });
    }
  }, [state]);
  const closealert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlert({ ...alert, open: false });
  };

  function handleChangelogin(event) {
    setFormlogin({
      ...formlogin,
      [event.target.name]: event.target.value
    });
  }
  function handleChangesignup(event) {
    setFormsignup({
      ...formsignup,
      [event.target.name]: event.target.value
    });
  }

  function handleSubmitlogin(event, formlogin) {
    event.preventDefault();
    let errors = { username: "", password: "" };
    if (formlogin.username == "") {
      errors.username = "Username is required";
    } else errors.username = "";
    if (formlogin.password == "") {
      errors.password = "Password is required";
    } else errors.password = "";
    setFormlogin({
      ...formlogin,
      errormessage: { username: errors.username, password: errors.password }
    });
    if (formlogin.username != "" && formlogin.password !== "") {
      dispatch(login(formlogin));
    }
  }

  function handleSubmitsignup(event, formsignup) {
    event.preventDefault();
    let errors = {
      name: "",
      email: "",
      username: "",
      password: "",
      confirmpassword: "",
      admintoken: ""
    };
    if (formsignup.name == "") {
      errors.name = "Name is required";
    } else errors.name = "";
    if (formsignup.email == "") {
      errors.email = "Email is required";
    } else if (!REGEX.email.test(formsignup.email)) {
      errors.email = "Invalid email address";
    } else errors.email = "";
    if (formsignup.username == "") {
      errors.username = "Username is required";
    } else errors.username = "";
    if (formsignup.password == "") {
      errors.password = "Password is required";
    } else errors.password = "";
    if (formsignup.confirmpassword == "") {
      errors.confirmpassword = "Confirm password is required";
    } else if (formsignup.password != formsignup.confirmpassword) {
      errors.confirmpassword = "Password and Confirmpassword are not matched";
    } else errors.confirmpassword = "";
    setFormsignup({
      ...formsignup,
      errormessage: {
        name: errors.name,
        email: errors.email,
        username: errors.username,
        password: errors.password,
        confirmpassword: errors.confirmpassword,
        admintoken: errors.admintoken
      }
    });
    if (
      errors.name == "" &&
      errors.email == "" &&
      errors.username == "" &&
      errors.password == "" &&
      errors.confirmpassword == ""
    ) {
      if (!formsignup.admintoken || formsignup.admintoken == "") {
        dispatch(signup({ ...formsignup, role: "user" }));
      } else {
        if (formsignup.admintoken != "@@@") {
          setAlert({ open: true, message: "Admin token is wrong"});
        } else if (formsignup.admintoken == "@@@") {
          dispatch(signup({ ...formsignup, role: "admin" }));
        }
      }
    }
  }
  const showcollapse = () => {
    setChecked(true);
  };
  const hidecollapse = () => {
    setChecked(false);
  };

  return (
    <div>
      <div className="header">
        <img src="../img/logo.png" style={{width:"40px",height:"40px", marginRight:"10px"}}></img>
        <h2 className="logotext">ScanApp</h2>
        <div className="header-form">
          <form
            onSubmit={(e) => handleSubmitlogin(e, formlogin)}
            className="formlogin"
          >
            <div>
              <div
                className={`${formlogin.errormessage.username != ""
                    ? "custom-input-error"
                    : ""
                  } login`}
              >
                <label>Username</label>
                <input
                  type="text"
                  name="username"
                  value={formlogin.username}
                  onChange={(event) => handleChangelogin(event)}
                />
              </div>
              <p className="error">{formlogin.errormessage.username}</p>
            </div>
            <div>
              <div
                className={`${formlogin.errormessage.password != ""
                    ? "custom-input-error"
                    : ""
                  } login`}
              >
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  value={formlogin.password}
                  onChange={(event) => handleChangelogin(event)}
                />
              </div>
              <p className="error">{formlogin.errormessage.password}</p>
            </div>

            <button type="submit" className="button-login">
              Login
            </button>
          </form>
          <button className="button-signup-header-form" onClick={showcollapse}>
            Sign up
          </button>
        </div>
      </div>

      <Collapse in={checked} timeout={1000}>
        <div className="signup-body">
          <form
            onSubmit={(e) => handleSubmitsignup(e, formsignup)}
            className="formsignup"
          >
            <div className="formsignup-wrap">
              <div className="formsignup-items-wrap">
                <div
                  className={`custom-input ${formsignup.errormessage.name != ""
                      ? "custom-input-error"
                      : ""
                    } custom-signup-input `}
                >
                  <div className="group-input-signup">
                    <label>Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formsignup.name}
                      onChange={(event) => handleChangesignup(event)}
                    />
                  </div>
                  <p className="error">{formsignup.errormessage.name}</p>
                </div>
                <div
                  className={`custom-input ${formsignup.errormessage.email ? "custom-input-error" : ""
                    } custom-signup-input`}
                >
                  <div className="group-input-signup">
                    <label>E-mail</label>
                    <input
                      type="text"
                      name="email"
                      value={formsignup.email}
                      onChange={(event) => handleChangesignup(event)}
                    />
                  </div>

                  <p className="error">{formsignup.errormessage.email}</p>
                </div>
                <div
                  className={`custom-input ${formsignup.errormessage.username ? "custom-input-error" : ""
                    } custom-signup-input`}
                >
                  <div className="group-input-signup">
                    <label>Username</label>
                    <input
                      type="text"
                      name="username"
                      value={formsignup.username}
                      onChange={(event) => handleChangesignup(event)}
                    />
                  </div>

                  <p className="error">{formsignup.errormessage.username}</p>
                </div>
              </div>
              <div className="formsignup-items-wrap">
                <div
                  className={`custom-input ${formsignup.errormessage.password ? "custom-input-error" : ""
                    } custom-signup-input`}
                >
                  <div className="group-input-signup">
                    <label>Password</label>
                    <input
                      type="password"
                      name="password"
                      value={formsignup.password}
                      onChange={(event) => handleChangesignup(event)}
                    />
                  </div>

                  <p className="error">{formsignup.errormessage.password}</p>
                </div>
                <div
                  className={`custom-input ${formsignup.errormessage.confirmpassword
                      ? "custom-input-error"
                      : ""
                    } custom-signup-input`}
                >
                  <div className="group-input-signup">
                    <label>Confirm password</label>
                    <input
                      type="password"
                      name="confirmpassword"
                      value={formsignup.confirmpassword || ""}
                      onChange={(event) => handleChangesignup(event)}
                    />
                  </div>
                  <p className="error">
                    {formsignup.errormessage.confirmpassword}
                  </p>
                </div>
                <div className={`custom-input custom-signup-input`}>
                  <div className="group-input-signup">
                    <label style={{ maxWidth: 150 }}>
                      For admin, please input your token
                    </label>
                    <input
                      type="text"
                      name="admintoken"
                      value={formsignup.admintoken || ""}
                      onChange={(event) => handleChangesignup(event)}
                    />
                  </div>
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="button-signup"
              style={{ marginTop: -20 }}
            >
              Sign Up
            </button>
          </form>
          <button onClick={hidecollapse} className="closecollapse">
            <VscTriangleUp
              className="closecollapse-icon"
              style={{ fontSize: 90, color: "var(--boldyellow)" }}
            />
          </button>
        </div>
      </Collapse>

      <div className="login-body">
        {/* <iframe src="creativeScroll.html" style={{ width: "100%", height: "100%" }}></iframe> */}
        <img src="../img/background-3.png" style={{width:"100%",height:"100%"}}></img>
      </div>    

      <Snackbar
        open={alert.open}
        autoHideDuration={2000}
        onClose={closealert}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        TransitionComponent={SlideTransition}
      >
        <Alert
          onClose={closealert}
          severity={
            alert.message.includes("successfully") ? "success" : "error"
          }
          sx={
            alert.message.includes("successfully")
              ? { ...alrertstylesuccess, color: "var(--success)" }
              : { ...alrertstylesuccess, color: "var(--error)" }
          }
        >
          {alert.message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Login;
