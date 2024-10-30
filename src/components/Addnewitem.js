import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addnewpost, addnewItem } from "../redux/action";
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

function Addnewitem() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    itemcode: state || "",
    itemname: ""
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
    if (form.itemcode != "" && form.itemname != "") {
      dispatch(addnewitem(form, user));
      setForm({itemcode: "", itemname: "" });
      setOpen(true);
    }
  }
  return (
    <>
      {user != null ? (
        <div>
          <Header />
          <div className="addnewpost-body">
            <h2>Add a New Item</h2>
            <form
              className="addnewpost-body-form"
              onSubmit={(e) => submitform(e)}
            >
              <h6>Item Code</h6>
              <input
                onChange={(e) => setForm({ ...form, itemcode: e.target.value })}
                value={form.itemcode}
              ></input>
              <h6>Item Name</h6>
              <input
                onChange={(e) => setForm({ ...form, itemname: e.target.value })}
                value={form.itemname}
              ></input>
              <br></br>
              <button
                type="submit"
                className="button-login"
              >
                Add Item
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
export default Addnewitem;
