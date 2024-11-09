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
      return item["itemcode"].toLowerCase().includes(form.itemcode.toLowerCase()) && item["status"]=="IN"
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
              <h6>Position</h6>
              <div style={{display:'flex',justifyContent:"center",alignItems:"center",width:"100%",columnGap:"10px"}}>
                <select
                  className="statusselect"
                  onChange={(e) => setForm({ ...form, position:{...form.position,char:e.target.value}})}
                  value={form.position.char}
                >
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="D">D</option>
                    <option value="E">E</option>
                    <option value="F">F</option>
                    <option value="G">G</option>
                    <option value="H">H</option>
                    <option value="I">I</option>
                    <option value="K">K</option>
                </select>
                <select
                  className="statusselect"
                  onChange={(e) => setForm({ ...form, position:{...form.position,number:e.target.value}})}
                  value={form.position.number}
                >
                    <option value="1.1">1.1</option>
                    <option value="1.2">1.2</option>
                    <option value="2.1">2.1</option>
                    <option value="2.2">2.2</option>
                    <option value="3.1">3.1</option>
                    <option value="3.2">3.2</option>
                    <option value="4.1">4.1</option>
                    <option value="4.2">4.2</option>
                    <option value="5.1">5.1</option>
                    <option value="5.2">5.2</option>
                </select>    
              </div>
              <h6>Item Code</h6>
              <input
                onChange={(e) => setForm({ ...form, itemcode: e.target.value })} disabled style={{color:"white"}}
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
                style={{color:"white",backgroundColor:"rgb(89, 90, 90)"}}
                disabled
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
