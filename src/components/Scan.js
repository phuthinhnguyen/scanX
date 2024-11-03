import { useDispatch, useSelector } from "react-redux";
import { getPost, getallusersforposts, increment, deleteItem, addnewItem } from "../redux/action";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { convertCreatedAt } from "./convertCreatedAt";
import Header from "./Header";
import { convertTime } from "./convertTime";
import Post from "./Post";
import Slide from "@mui/material/Slide";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";


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

function Scan() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { state } = useLocation();
  const [alert, setAlert] = useState({ open: false, message: "" });
  const stateselector = useSelector((state) => state);
  const closealert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlert({ ...alert, open: false });
  };

  if (stateselector.user == null) {
    navigate("/")
  }
  const [sharethinking, setSharethinking] = useState("");
  const [scanitem, setScanitem] = useState([])
  useEffect(() => {
    dispatch(getPost());
    dispatch(getallusersforposts());
  }, []);

  const sharethinkingonChange = (e) => {
    setSharethinking(e.target.value);
  };
  const sortedposts = stateselector.posts.sort((a, b) => b.createdAt - a.createdAt);

  function reactionclick(emojiname, id, currentcount) {
    dispatch(increment(emojiname, id, currentcount));
  }
  function gotouserprofile(userId) {
    navigate("/userprofileonline", { stateselector: userId });
  }

  function getavatarforpost(id) {
    if (stateselector.allusers != null) {
      const allusersfilter = stateselector.allusers.filter(item => item.id == id)
      if (allusersfilter.length==0){
        return "https://res.cloudinary.com/dhva3lwfk/image/upload/v1688131036/gkwlvz6hllbauf7octgk.png"
      }
      return allusersfilter[0].avatar
    }
  }
  function deleteitem(qrcode) {
    const filterqrcode = sortedposts.filter(item => {
      return item["qrcode"].toLowerCase().includes(qrcode.toLowerCase());
    })
    const filternotqrcode = scanitem.filter(item=>item.qrcode!=qrcode)
    setScanitem(filternotqrcode)
    dispatch(deleteItem(filterqrcode[0].id));
  }
  function edititem(item) {
    navigate("/updateitem", { state: item });
  }
  function addnewitem(qrcode,scanner) {
    if (qrcode!=""){
      const filterresult = sortedposts.filter((item) => {
        return item["qrcode"].includes(qrcode);
      });
      if (filterresult.length>0){
        if (state=="IN"){
          setAlert({open:true, message:"QR code already exists in database"})
        }
        else if (state=="OUT"){
          const qrcodesplit = qrcode.split("/")
          const itemcode = qrcodesplit[5]
          setScanitem([...scanitem,{itemcode:itemcode,qrcode:qrcode,status:state,createat:Date.now(),scanner:scanner}])
          dispatch(addnewItem(itemcode,qrcode,scanner,state));
          setSharethinking("")
        }
      }
      else{
        if (state=="IN"){
          const qrcodesplit = qrcode.split("/")
          const itemcode = qrcodesplit[5]
          setScanitem([...scanitem,{itemcode:itemcode,qrcode:qrcode,status:state,createat:Date.now(),scanner:scanner}])
          dispatch(addnewItem(itemcode,qrcode,scanner,state));
          setSharethinking("")
        }
        else if (state=="OUT"){
          setAlert({open:true, message:"QR Code not exists in database"})
        }
      }
    }
  }
  return (
    <div>
      {stateselector.user != null ? (
        <div>
          <Header />
          <div className="home-body">
            <div className="home-body-wrap">
                <div className={state=="IN" ? "statuslabelin" : "statuslabelout"}>{state}</div>
                <div className="share-thinking" >   
                  <input
                    type="text"
                    className="form-control input-share"
                    style={{width:"45%"}}   
                    id="inlineFormInputGroup"
                    placeholder="Scan here..." 
                    onChange={sharethinkingonChange}
                    value={sharethinking}
                  />
                  {/* <Link
                    to="/addnewitem"
                    stateselector={sharethinking}
                    className="button-login share-button"
                  >
                    Scan
                  </Link> */}
                  <button
                    className="button-login share-button"
                    onClick={() => addnewitem(sharethinking.trim(),stateselector.user.name)}
                  >
                    Add
                  </button>
                </div>
            </div>
            
            <table className="table" style={{marginTop:"50px",marginBottom:"80px"}}>
            <thead style={{color:"white"}}>
              <tr>
                <td style={{fontWeight: "700",fontSize:"18px"}}>Item Code</td>
                <td style={{fontWeight: "700",fontSize:"18px"}}>QR Code</td>
                <td style={{fontWeight: "700",fontSize:"18px"}}>Scanner</td>
                <td style={{fontWeight: "700",fontSize:"18px"}}>Created At</td>
                <td style={{fontWeight: "700",fontSize:"18px"}}>Status</td>
                <td style={{fontWeight: "700",fontSize:"18px"}}>Action</td>
              </tr>
            </thead>
            <tbody style={{color:"white"}}>
                {scanitem.map((item)=><tr key={item.id} >
                  <td>
                    {item.itemcode} 
                  </td>
                  <td>
                    {item.qrcode} 
                  </td>
                  <td>
                    {item.scanner} 
                  </td>
                  <td>
                    {convertCreatedAt(item.createat)} 
                  </td>
                  <td>
                    <div style={item.status=="IN"?{background:"#10e96a", padding:"2px", textAlign:"center", maxWidth:"100px", borderRadius:"10px"}:{background:"#e2372b", padding:"2px", textAlign:"center", maxWidth:"100px", borderRadius:"10px"}}>{item.status} </div> 
                  </td>
                    <td>
                        {/* <div style=
                            {{
                                position:"absolute",
                                right:10,
                                top: "50%",
                                transform: "translateY(-50%)",
                            }} > */}
                        <button 
                            style={{padding: "3px 10px"}}
                            onClick={(e)=>edititem(item)} className={stateselector.user.role=="admin" ? "ms-1 btn btn-info" : "ms-1 btn btn-secondary disabled"}>
                            Edit
                        </button>
                        <button 
                            style={{padding: "3px 10px",marginLeft:"20px"}}
                            onClick={(e)=>deleteitem(item.qrcode)} className="btn btn-danger">
                            Delete
                        </button>
                        
                        {/* </div> */}
                    </td>
                </tr>)}
            </tbody>
          
        </table>
        <Link
              className="button-back"  
              to="/home"
            >
              Back
        </Link>
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
      ) : (
        null
      )}
    </div>
  );
}
export default Scan;
