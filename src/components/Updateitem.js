import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { deleteItem, editItem } from "../redux/action";
import Header from "./Header";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Slide from "@mui/material/Slide";
import { color } from "framer-motion";

function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Updateitem() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const stateselector = useSelector((state) => state)
  const name = user.name;
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  // const [form, setForm] = useState(state);
  const [form, setForm] = useState({...state,scanner:name});
  useEffect(() => {
    if (user == null) {
      navigate("/");
    }
    if (state==null){
      navigate("/home");  
    }
  }, []);
  const sortedposts = stateselector.posts.sort((a, b) => b.createdAt - a.createdAt);
  function submitform(e) {
    e.preventDefault();
    const filterqrcode = sortedposts.filter(item=>{
      return item["qrcode"].toLowerCase().includes(form.qrcode.toLowerCase())
    })
    dispatch(editItem(form, filterqrcode[0].id));
    setMessage("Your Item has been updated successfully");
    setOpen(true);
  }
  function deleteitemclick() {
    dispatch(deleteItem(form.id));
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
            <h2>Edit Item</h2>
            <form
              className="addnewpost-body-form"
              onSubmit={(e) => submitform(e)}
            >
              {/* <h6>Item ID</h6>
              <input
                value={form.id} disabled style={{color:"white"}}
              ></input> */}
              <h6>Item Code</h6>
              <input
                onChange={(e) => setForm({ ...form, itemcode: e.target.value })}
                value={form.itemcode}
              ></input>
              <h6>QR Code</h6>
              <input
                onChange={(e) => setForm({ ...form, qrcode: e.target.value })}
                value={form.qrcode}
              ></input>
              <h6>Scanner</h6>
              <input
                disabled style={{color:"white"}}
                value={user.name}
              ></input>
              <h6>Status</h6>
              <select
                className="statusselect"
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                value={form.status}
              >
                <option value="IN">IN</option>
                <option value="OUT">OUT</option>
              </select>
              <br></br>
              <div className="button-wrap">
                <button type="submit" className="button-login">
                  Save Item
                </button>
                <button
                  className="button-login"
                  style={{ width: 150 }}
                  onClick={() => deleteitemclick(form.id)}
                >
                  Delete Item
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
export default Updateitem;
