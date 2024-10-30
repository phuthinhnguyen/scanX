import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { deletepost, updatepost } from "../redux/action";
import Header from "./Header";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Slide from "@mui/material/Slide";

function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Updatepost() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [form, setForm] = useState(state);
  useEffect(() => {
    if (user == null) {
      navigate("/");
    }
    if (state==null){
      navigate("/home");
    }
  }, []);
  function submitform(e) {
    e.preventDefault();
    dispatch(updatepost(form));
    setMessage("Your post has been updated successfully");
    setOpen(true);
  }
  function deletepostclick() {
    dispatch(deletepost(form.id));
    navigate("/");
  }

  const closealert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <>
      {state!=null ? (
        <div>
          <Header />
          <div className="addnewpost-body">
            <h2>Edit Post</h2>
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
              <div className="button-wrap">
                <button type="submit" className="button-login">
                  Save Post
                </button>
                <button
                  className="button-login"
                  style={{ width: 150 }}
                  onClick={() => deletepostclick(form.id)}
                >
                  Delete Post
                </button>
              </div>
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
              {message}
            </Alert>
          </Snackbar>
        </div>
      ) : (
        null
      )}
    </>
  );
}
export default Updatepost;
