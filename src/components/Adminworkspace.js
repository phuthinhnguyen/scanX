import { useDispatch, useSelector } from "react-redux";
import {banuser, deletepost, getallusers, increment, toadmin, deleteItem} from "../redux/action";
import React, { useEffect, useState } from "react";
import { useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "./Header";
import { convertTime } from "./convertTime";
import { convertCreatedAt } from "./convertCreatedAt";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { a11yProps, TabPanel } from "./TabMui";
import { gettoppost } from "./analytic";
import { GrOverview } from "react-icons/gr";
import { BsSearch } from "react-icons/bs";
import Post from "./Post";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Slide from "@mui/material/Slide";
import Pagination from "./Pagination";
import { Helmet } from 'react-helmet';
import $ from 'jquery'
import { wrap } from "framer-motion";


function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
let PageSize = 5;
function Adminworkspace() {
  const [searchradio, setSearchradio] = useState("");
  const [searchtext, setSearchtext] = useState("");
  const [tabvalue, setTabvalue] = useState(0);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [search,setSearch] = useState({qrcode:"",scanner:"",partnumber:"",status:""})
  const handleChangetab = (event, newValue) => {
    setTabvalue(newValue);
  };

  const onChangeradio = (e) => {
    setSearchtext("")
    if (e.target.checked == true){
      setSearchradio(e.target.value); 
    }
    else{
      setSearch({...search,[e.target.value]:""})
    }
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state = useSelector((state) => state);
  const sortedposts = state.posts.sort((a, b) => b.createdAt - a.createdAt); 
  const [currentPage, setCurrentPage] = useState(1);  
  const filterresult = sortedposts.filter((item) => {
    // if (searchradio=="qrcode" || searchradio=="status" | searchradio=="scanner"){
    //   return item[searchradio].toLowerCase().includes(searchtext.toLowerCase());
    // }
    // else if (searchradio=="partnumber"){ 
    //   const itemsqrcodesplit = item["qrcode"].split("/")
    //   return itemsqrcodesplit[4].toLowerCase().includes(searchtext.toLowerCase());
    // }
    const itemsqrcodesplit = item["qrcode"].split("/")
    return item["qrcode"].toLowerCase().includes(search.qrcode.toLowerCase()) && item["scanner"].toLowerCase().includes(search.scanner.toLowerCase()) && itemsqrcodesplit[4].toLowerCase().includes(search.partnumber.toLowerCase()) && item["status"].toLowerCase().includes(search.status.toLowerCase())
  });
  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return sortedposts.slice(firstPageIndex, lastPageIndex);
  }, [currentPage]); 

  function getavatarforpost(id){
    if (state.allusers != null) {
      const allusersfilter = state.allusers.filter(item => item.id == id)
      if (allusersfilter.length==0){
        return "https://res.cloudinary.com/dhva3lwfk/image/upload/v1688131036/gkwlvz6hllbauf7octgk.png"
      }
      return allusersfilter[0].avatar
    }
  }
  useEffect(() => {
    if(state.user==null){
      navigate("/")
    }
    dispatch(getallusers());
  }, []);

  function reactionclick(emojiname, id, currentcount) {
    dispatch(increment(emojiname, id, currentcount));
  }

  function deletepostclick(id) {
    dispatch(deletepost(id));
    setMessage("Your post has been deleted successfully");
    setOpen(true);
  }

  function banuserclick(id) {
    dispatch(banuser(id));
    setMessage("You have banned user successfully");
    setOpen(true);
  }

  function toadminclick(id) {
    dispatch(toadmin(id));
    setMessage("You have made user to admin successfully");
    setOpen(true);
  }

  const handleChangetextsearch = (e) => {
    setSearchtext(e.target.value);
    setSearch({...search,[searchradio]:e.target .value})
  };
  console.log(searchtext)
  console.log(search)
  const closealert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  function gotouserprofile(userId) {
    navigate("/userprofileonline", { state: userId });
  }
  function deleteitem(id) {
    dispatch(deleteItem(id));
  }
  function edititem(item) {
    navigate("/updateitem", { state: item });
  }
 
  return (
    <div>
      {state.user != null && state.user.role=="admin" ? (
        <div>
          <Header />
          <div className="adminworkspace-wrap">
            <div className="filters-container" id="menu">
              <ul className="filters-wrap filters col-lg-12 no-padding">
                <li className="active" data-filter=".itemlist">PRODUCTS</li>
                <li data-filter=".userlist" className="">USERS</li>
                <li data-filter=".chartview" className="">CHART VIEW</li>
              </ul>
              <div className="filters-content">
                <div className="row grid">
                  <div className="col-md-6 all itemlist" style={{position:"absolute",left:"0%", top:"0px"}}>
                    <div className="adminworkspace-posts">
                      <h2>PRODUCTS</h2>
                      <div className="input-search-wrap">
                        <div className="input-group mb-2">
                          <div className="input-group-prepend">
                            <div className="input-group-text icon-search">
                              <BsSearch />
                            </div>
                          </div>
                          <input
                            type="text"
                            className="form-control"
                            id="inlineFormInputGroup"
                            placeholder="Input text search"
                            onChange={handleChangetextsearch}
                            value={searchtext}
                          />
                        </div>
                        <div className="filter-checkbox-wrap">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              name="flexRadioDefault"
                              id="flexRadioDefault1"
                              onChange={onChangeradio}
                              value="qrcode"
                              // checked
                            />
                            <label className="form-check-label">QR Code</label>
                            <div style={{position:"absolute",marginTop:"50px",width:"100px",overflowWrap:"break-word"}}>{search.qrcode==""?search.qrcode:`"${search.qrcode}"`}</div>
                          </div>
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              name="flexRadioDefault"
                              id="flexRadioDefault3"
                              onChange={onChangeradio}
                              value="partnumber"
                            />
                            <label className="form-check-label">Part Number</label>
                            <div style={{position:"absolute",marginTop:"50px",width:"100px",overflowWrap:"break-word"}}>{search.partnumber==""?search.partnumber:`"${search.partnumber}"`}</div>
                          </div>
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              name="flexRadioDefault"
                              id="flexRadioDefault3"
                              onChange={onChangeradio}
                              value="scanner"
                            />
                            <label className="form-check-label">Scanner</label>
                            <div style={{position:"absolute",marginTop:"50px",width:"100px",overflowWrap:"break-word"}}>{search.scanner==""?search.scanner:`"${search.scanner}"`}</div>
                          </div>
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              name="flexRadioDefault"
                              id="flexRadioDefault2"
                              onChange={onChangeradio}
                              value="status"
                            />
                            <label className="form-check-label">Status</label>
                            <div style={{position:"absolute",marginTop:"50px",width:"100px",overflowWrap:"break-word"}}>{search.status==""?search.status:`"${search.status}"`}</div>
                          </div>
                          <div className="form-check">
                            <label className="form-check-label">Total: {filterresult.length} rows</label>
                          </div>
                        </div>
                      </div>
                      <table className="table" style={{marginTop:"50px",marginBottom:"80px"}}>
                        <thead style={{color:"white"}}>
                          <tr>
                            <td style={{fontWeight: "700",fontSize:"18px"}}>Item Code</td>
                            <td style={{fontWeight: "700",fontSize:"18px"}}>QR Code</td>
                            <td style={{fontWeight: "700",fontSize:"18px"}}>PO</td>
                            <td style={{fontWeight: "700",fontSize:"18px"}}>MFG Date</td>
                            <td style={{fontWeight: "700",fontSize:"18px"}}>Size</td>
                            <td style={{fontWeight: "700",fontSize:"18px"}}>Quantity</td>
                            <td style={{fontWeight: "700",fontSize:"18px"}}>Part Number</td>
                            <td style={{fontWeight: "700",fontSize:"18px"}}>Scanner</td>
                            <td style={{fontWeight: "700",fontSize:"18px"}}>Created At</td>
                            <td style={{fontWeight: "700",fontSize:"18px"}}>Status</td>
                            <td style={{fontWeight: "700",fontSize:"18px"}}>Action</td>
                          </tr>
                        </thead>
                        <tbody style={{color:"white"}}>
                            {filterresult.map((item, index)=><tr key={index} >
                              <td>
                                {item.itemcode} 
                              </td>
                              <td>
                                {item.qrcode} 
                              </td>
                              <td>
                                {item.qrcode.split("/")[0]} 
                              </td>
                              <td>
                                {item.qrcode.split("/")[1]} 
                              </td>
                              <td>
                                {item.qrcode.split("/")[2]} 
                              </td>
                              <td>
                                {item.qrcode.split("/")[3]} 
                              </td>
                              <td>
                                {item.qrcode.split("/")[4]} 
                              </td>
                              <td>
                                {item.scanner} 
                              </td>
                              <td>
                                {convertCreatedAt(item.createdAt)} 
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
                                        onClick={(e)=>edititem(item)} className="ms-1 btn btn-info">
                                        Edit
                                    </button>
                                    <button 
                                        style={{padding: "3px 10px",marginLeft:"20px"}}
                                        onClick={(e)=>deleteitem(item.id)} className="btn btn-danger">
                                        Delete
                                    </button>
                                    
                                    {/* </div> */}
                                </td>
                            </tr>)}
                        </tbody>
                      </table>
                      {/* <Pagination
                      className="pagination-bar"
                      currentPage={currentPage}
                      totalCount={sortedposts.length}
                      pageSize={PageSize}   
                      onPageChange={page => setCurrentPage(page)}
                    /> */}
            </div>
                  </div>
                  <div className="col-md-6 all userlist" style={{position:"absolute",left:"0%", top:"0px"}}>
                    <div className="adminworkspace-analytics-users">
                      <h2>USERS</h2>
                      <div className="adminworkspace-analytics-users-table-wrap">
                        <table className="table" style={{marginTop:"20px"}}>
                          <thead style={{color:"white"}}>
                            <tr>
                              <th style={{fontWeight: "700",fontSize:"18px"}}>UserId</th>
                              <th style={{fontWeight: "700",fontSize:"18px"}}>Username</th>
                              <th style={{fontWeight: "700",fontSize:"18px"}}>Password</th>
                              <th style={{fontWeight: "700",fontSize:"18px"}}>Name</th>
                              <th style={{fontWeight: "700",fontSize:"18px"}}>Email</th>
                              <th style={{fontWeight: "700",fontSize:"18px"}}>Role</th>
                              <th style={{fontWeight: "700",fontSize:"18px"}}>Action</th>
                            </tr>
                          </thead>
                          <tbody style={{color:"white"}}>
                            {state.allusers &&
                              state.allusers.map((item, index) => (
                                <tr key={index}>
                                  <td>{item.id}</td>
                                  <td>{item.username}</td>
                                  <td>{item.password}</td>
                                  <td>{item.name}</td>
                                  <td>{item.email}</td>
                                  <td>{item.role}</td>
                                  <td>
                                    {item.id != state.user.id ? (
                                      item.role != "admin" ||
                                      item.email !=
                                        "phuthinhnguyen1101@gmail.com" ? (
                                        <button
                                          className="ms-1 btn btn-danger"
                                          onClick={() => banuserclick(item.id)}
                                        >
                                          Ban user
                                        </button>
                                      ) : (
                                        <button className="button-disabled ms-1 btn btn-secondary disabled">
                                          Ban user
                                        </button>
                                      )
                                    ) : (
                                      <button className="button-disabled ms-1 btn btn-secondary disabled">
                                        Me
                                      </button>
                                    )}

                                    {item.id != state.user.id ? (
                                      item.role != "admin" &&
                                      item.email !=
                                        "phuthinhnguyen1101@gmail.com" ? (
                                        <button
                                          className="ms-1 btn btn-info"
                                          onClick={() => toadminclick(item.id)}
                                        >
                                          To Admin
                                        </button>
                                      ) : (
                                        <button
                                          className="button-disabled ms-1 btn btn-secondary disabled"
                                        >
                                          To Admin
                                        </button>
                                      )
                                    ) : (
                                      <button
                                        className="button-disabled ms-1 btn btn-secondary disabled"
                                      >
                                        Me
                                      </button>
                                    )}
                                  </td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 all chartview" style={{position:"absolute",left:"0%", top:"0px"}}>
                    <div className="adminworkspace-analytics-users">
                      <h2>Chart View</h2>
                      <div className="adminworkspace-chartview">
                            <h4>No Result</h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
             
            </div>
            <Helmet>
              <script src="../js/isotope.pkgd.min.js"></script>
              <script src="../js/filter.js"></script>
            </Helmet>
         
          
    
            <div>
                
            </div>
            
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
        navigate("/")
      )}
    </div>
  );
}
export default Adminworkspace;
