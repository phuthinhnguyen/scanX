import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addnewpost } from "../redux/action";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Header from "./Header";
import "../App.css";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Slide from "@mui/material/Slide";

function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Addnewpost() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    body: state || "",
    author: ""
  });
  const user = useSelector((state) => state.user);

  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    if(user==null){
      navigate("/")
    }
  }, []);

  const closealert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  function submitform(e) {
    e.preventDefault();
    if (form.title != "" && form.body != "" && form.author != "") {
      dispatch(addnewpost(form, user));
      setForm({ title: "", body: "", author: "" });
      setOpen(true);
    }
  }
  return (
    <>
      {user != null ? (
        <div>
          <Header />
          <div className="addnewpost-body">
            <h2>Add a New Post</h2>
            <form
              className="addnewpost-body-form"
              onSubmit={(e) => submitform(e)}
            >
              <h6>Post Title</h6>
              <input
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                value={form.title}
              ></input>
              <h6>Author</h6>
              <input
                onChange={(e) => setForm({ ...form, author: e.target.value })}
                value={form.author}
              ></input>
              <h6>Content</h6>
              <textarea
                rows={8}
                style={{ resize: "none" }}
                onChange={(e) => setForm({ ...form, body: e.target.value })}
                value={form.body}
              ></textarea>
              <br></br>
              <button
                type="submit"
                className="button-login"
              >
                Save Post
              </button>
            </form>
            <Link
              className="button-back"
              to="/home"
            >
              Back
            </Link>
          </div>
          <Snackbar
            open={open}
            autoHideDuration={4000}
            onClose={closealert}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            TransitionComponent={SlideTransition}
          >
            <Alert
              onClose={closealert}
              severity="success"
              sx={{
                width: "100%",
                marginBottom: 4,
                marginRight: 2,
                backgroundColor: "var(--backgroundbody)",
                color: "var(--success)"
              }}
            >
              Your post has been uploaded successfully
            </Alert>
          </Snackbar>
        </div>
      ) : (
        navigate("/")
      )}
    </>
  );
}
export default Addnewpost;
