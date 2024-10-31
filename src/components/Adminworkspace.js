import { useDispatch, useSelector } from "react-redux";
import {banuser, deletepost, getallusers, increment, toadmin, deleteItem} from "../redux/action";
import React, { useEffect, useState } from "react";
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

function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Adminworkspace() {
  const [searchradio, setSearchradio] = useState("qrcode");
  const [searchtext, setSearchtext] = useState("");
  const [tabvalue, setTabvalue] = useState(0);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const handleChangetab = (event, newValue) => {
    setTabvalue(newValue);
  };

  const onChangeradio = (e) => {
    setSearchradio(e.target.value);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state = useSelector((state) => state);
  const sortedposts = state.posts.sort((a, b) => b.createdAt - a.createdAt);

  const filterresult = sortedposts.filter((item) => {
    return item[searchradio].includes(searchtext);
  });

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
  };

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
            <div className="adminworkspace-posts">
              <h2>Item List</h2>
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
                  />
                </div>
                <div className="filter-checkbox-wrap">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id="flexRadioDefault1"
                      onChange={onChangeradio}
                      value="qrcode"
                      checked
                    />
                    <label class="form-check-label">QR Code</label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id="flexRadioDefault2"
                      onChange={onChangeradio}
                      value="status"
                    />
                    <label className="form-check-label">Status</label>
                  </div>
                  <div class="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id="flexRadioDefault3"
                      onChange={onChangeradio}
                      value="scanner"
                    />
                    <label className="form-check-label">Scanner</label>
                  </div>
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
                {filterresult.map((item, index)=><tr key={index} >
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
                    {convertCreatedAt(item.createdAt)} 
                  </td>
                  <td>
                    {item.status} 
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
            </div>
            <div>
                <div className="adminworkspace-analytics-users">
                  <h2>User List</h2>
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
            {/* <Post
              item={
                <div className="adminworkspace-analytics-reviews">
                  <h2>Analytic Top Reviews</h2>
                  <div className="adminworkspace-analytics-reviews-wrap">
                    <Box
                      sx={{
                        flexGrow: 0.5,
                        bgcolor: "var(--backgroundbody)",
                        display: "flex",
                        height: "100%",
                        width: "300px",
                        justifyContent: "space-between"
                      }}
                    >
                      <Tabs
                        orientation="vertical"
                        variant="scrollable"
                        value={tabvalue}
                        onChange={handleChangetab}
                        aria-label="Vertical tabs example"
                        sx={{
                          borderRight: 1,
                          borderColor: "divider",
                          width: "100px"
                        }}
                      >
                        <Tab
                          label={<GrOverview fontSize={40} />}
                          {...a11yProps(0)}
                        />
                        <Tab
                          label="👍"
                          {...a11yProps(1)}
                          style={{ color: "white", fontSize: 35 }}
                        />
                        <Tab
                          label="😮"
                          {...a11yProps(2)}
                          style={{ color: "white", fontSize: 35 }}
                        />
                        <Tab
                          label="❤️"
                          {...a11yProps(3)}
                          style={{ color: "white", fontSize: 35 }}
                        />
                        <Tab
                          label="🚀"
                          {...a11yProps(4)}
                          style={{ color: "white", fontSize: 35 }}
                        />
                        <Tab
                          label="☕"
                          {...a11yProps(5)}
                          style={{ color: "white", fontSize: 35 }}
                        />
                      </Tabs>
                      <TabPanel value={tabvalue} index={0}>
                        {gettoppost(state.posts, "view")[0] != undefined &&
                          gettoppost(state.posts, "view").map((item, index) => (
                            <div className="adminworkspace-posts-wrap tabpanel">
                              <div
                                className="home-body-item tabpanel-item"
                                key={index}
                              >
                                <div
                                  className="home-body-item-head"
                                  style={{ fontFamily: "var(--fonttext)" }}
                                >
                                  <div className="home-body-item-avatar">
                                    <img
                                      src={getavatarforpost(item.userId)}
                                      alt="Image link not found"
                                      className="avatar"
                                      onClick={() =>
                                        gotouserprofile(item.userId)
                                      }
                                    ></img>
                                  </div>
                                  <h5
                                    style={{ fontSize: 16, color: "lightgray" }}
                                    onClick={() => gotouserprofile(item.userId)}
                                  >
                                    {item.name}
                                  </h5>
                                </div>
                                <div className="home-body-item-post">
                                  <h3 style={{ fontSize: 24, marginTop: 0 }}>
                                    {item.title}
                                  </h3>
                                  <p
                                    style={{
                                      fontStyle: "italic",
                                      marginTop: 15
                                    }}
                                  >
                                    {item.body}
                                  </p>
                                  <div>
                                    <Link
                                      to="/viewpost"
                                      state={item}
                                      onClick={() => {
                                        reactionclick(
                                          "view",
                                          item.id,
                                          item.view
                                        );
                                      }}
                                    >
                                      View Post
                                    </Link>
                                    <a style={{ marginLeft: 10 }}> by </a>
                                    <a style={{ fontWeight: 500 }}>
                                      {item.author}
                                    </a>
                                    <a
                                      style={{
                                        marginLeft: 10,
                                        fontStyle: "italic",
                                        fontSize: 14
                                      }}
                                    >
                                      {" "}
                                      {convertTime(item.createdAt)}
                                    </a>
                                  </div>
                                  <div className="reaction-wrap">
                                    <a
                                      className="reaction"
                                      onClick={() =>
                                        reactionclick(
                                          "thumbsUp",
                                          item.id,
                                          item.thumbsUp
                                        )
                                      }
                                    >
                                      👍 {item.thumbsUp}
                                    </a>
                                    <a
                                      className="reaction"
                                      onClick={() =>
                                        reactionclick("wow", item.id, item.wow)
                                      }
                                    >
                                      😮 {item.wow}
                                    </a>
                                    <a
                                      className="reaction"
                                      onClick={() =>
                                        reactionclick(
                                          "heart",
                                          item.id,
                                          item.heart
                                        )
                                      }
                                    >
                                      ❤️ {item.heart}
                                    </a>
                                    <a
                                      className="reaction"
                                      onClick={() =>
                                        reactionclick(
                                          "rocket",
                                          item.id,
                                          item.rocket
                                        )
                                      }
                                    >
                                      🚀 {item.rocket}
                                    </a>
                                    <a
                                      className="reaction"
                                      onClick={() =>
                                        reactionclick(
                                          "coffee",
                                          item.id,
                                          item.coffee
                                        )
                                      }
                                    >
                                      ☕ {item.coffee}
                                    </a>
                                  </div>
                                </div>
                              </div>
                              <div className="adminworkspace-posts-action">
                                <div>
                                  <Link
                                    to="/updatepost"
                                    state={item}
                                    className="button-back"
                                  >
                                    Edit
                                  </Link>
                                </div>
                                <div style={{ marginTop: 20 }}>
                                  <button
                                    className="button-back"
                                    onClick={() => deletepostclick(item.id)}
                                  >
                                    Delete
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                      </TabPanel>
                      <TabPanel value={tabvalue} index={1}>
                        {gettoppost(state.posts, "thumbsUp")[0] != undefined &&
                          gettoppost(state.posts, "thumbsUp").map(
                            (item, index) => (
                              <div className="adminworkspace-posts-wrap tabpanel">
                                <div
                                  className="home-body-item tabpanel-item"
                                  key={index}
                                >
                                  <div
                                    className="home-body-item-head"
                                    style={{ fontFamily: "var(--fonttext)" }}
                                  >
                                    <div className="home-body-item-avatar">
                                      <img
                                        src={getavatarforpost(item.userId)}
                                        alt="Image link not found"
                                        className="avatar"
                                        onClick={() =>
                                          gotouserprofile(item.userId)
                                        }
                                      ></img>
                                    </div>
                                    <h5
                                      style={{
                                        fontSize: 16,
                                        color: "lightgray"
                                      }}
                                      onClick={() =>
                                        gotouserprofile(item.userId)
                                      }
                                    >
                                      {item.name}
                                    </h5>
                                  </div>
                                  <div className="home-body-item-post">
                                    <h3 style={{ fontSize: 24, marginTop: 0 }}>
                                      {item.title}
                                    </h3>
                                    <p
                                      style={{
                                        fontStyle: "italic",
                                        marginTop: 15
                                      }}
                                    >
                                      {item.body}
                                    </p>
                                    <div>
                                      <Link
                                        to="/viewpost"
                                        state={item}
                                        onClick={() => {
                                          reactionclick(
                                            "view",
                                            item.id,
                                            item.view
                                          );
                                        }}
                                      >
                                        View Post
                                      </Link>
                                      <a style={{ marginLeft: 10 }}> by </a>
                                      <a style={{ fontWeight: 500 }}>
                                        {item.author}
                                      </a>
                                      <a
                                        style={{
                                          marginLeft: 10,
                                          fontStyle: "italic",
                                          fontSize: 14
                                        }}
                                      >
                                        {" "}
                                        {convertTime(item.createdAt)}
                                      </a>
                                    </div>
                                    <div className="reaction-wrap">
                                      <a
                                        className="reaction"
                                        onClick={() =>
                                          reactionclick(
                                            "thumbsUp",
                                            item.id,
                                            item.thumbsUp
                                          )
                                        }
                                      >
                                        👍 {item.thumbsUp}
                                      </a>
                                      <a
                                        className="reaction"
                                        onClick={() =>
                                          reactionclick(
                                            "wow",
                                            item.id,
                                            item.wow
                                          )
                                        }
                                      >
                                        😮 {item.wow}
                                      </a>
                                      <a
                                        className="reaction"
                                        onClick={() =>
                                          reactionclick(
                                            "heart",
                                            item.id,
                                            item.heart
                                          )
                                        }
                                      >
                                        ❤️ {item.heart}
                                      </a>
                                      <a
                                        className="reaction"
                                        onClick={() =>
                                          reactionclick(
                                            "rocket",
                                            item.id,
                                            item.rocket
                                          )
                                        }
                                      >
                                        🚀 {item.rocket}
                                      </a>
                                      <a
                                        className="reaction"
                                        onClick={() =>
                                          reactionclick(
                                            "coffee",
                                            item.id,
                                            item.coffee
                                          )
                                        }
                                      >
                                        ☕ {item.coffee}
                                      </a>
                                    </div>
                                  </div>
                                </div>
                                <div className="adminworkspace-posts-action">
                                  <div>
                                    <Link
                                      to="/updatepost"
                                      state={item}
                                      className="button-back"
                                    >
                                      Edit
                                    </Link>
                                  </div>
                                  <div style={{ marginTop: 20 }}>
                                    <button
                                      className="button-back"
                                      onClick={() => deletepostclick(item.id)}
                                    >
                                      Delete
                                    </button>
                                  </div>
                                </div>
                              </div>
                            )
                          )}
                      </TabPanel>
                      <TabPanel value={tabvalue} index={2}>
                        {gettoppost(state.posts, "wow")[0] != undefined &&
                          gettoppost(state.posts, "wow").map((item, index) => (
                            <div className="adminworkspace-posts-wrap tabpanel">
                              <div
                                className="home-body-item tabpanel-item"
                                key={index}
                              >
                                <div
                                  className="home-body-item-head"
                                  style={{ fontFamily: "var(--fonttext)" }}
                                >
                                  <div className="home-body-item-avatar">
                                    <img
                                      src={getavatarforpost(item.userId)}
                                      alt="Image link not found"
                                      className="avatar"
                                      onClick={() =>
                                        gotouserprofile(item.userId)
                                      }
                                    ></img>
                                  </div>
                                  <h5
                                    style={{ fontSize: 16, color: "lightgray" }}
                                    onClick={() => gotouserprofile(item.userId)}
                                  >
                                    {item.name}
                                  </h5>
                                </div>
                                <div className="home-body-item-post">
                                  <h3 style={{ fontSize: 24, marginTop: 0 }}>
                                    {item.title}
                                  </h3>
                                  <p
                                    style={{
                                      fontStyle: "italic",
                                      marginTop: 15
                                    }}
                                  >
                                    {item.body}
                                  </p>
                                  <div>
                                    <Link
                                      to="/viewpost"
                                      state={item}
                                      onClick={() => {
                                        reactionclick(
                                          "view",
                                          item.id,
                                          item.view
                                        );
                                      }}
                                    >
                                      View Post
                                    </Link>
                                    <a style={{ marginLeft: 10 }}> by </a>
                                    <a style={{ fontWeight: 500 }}>
                                      {item.author}
                                    </a>
                                    <a
                                      style={{
                                        marginLeft: 10,
                                        fontStyle: "italic",
                                        fontSize: 14
                                      }}
                                    >
                                      {" "}
                                      {convertTime(item.createdAt)}
                                    </a>
                                  </div>
                                  <div className="reaction-wrap">
                                    <a
                                      className="reaction"
                                      onClick={() =>
                                        reactionclick(
                                          "thumbsUp",
                                          item.id,
                                          item.thumbsUp
                                        )
                                      }
                                    >
                                      👍 {item.thumbsUp}
                                    </a>
                                    <a
                                      className="reaction"
                                      onClick={() =>
                                        reactionclick("wow", item.id, item.wow)
                                      }
                                    >
                                      😮 {item.wow}
                                    </a>
                                    <a
                                      className="reaction"
                                      onClick={() =>
                                        reactionclick(
                                          "heart",
                                          item.id,
                                          item.heart
                                        )
                                      }
                                    >
                                      ❤️ {item.heart}
                                    </a>
                                    <a
                                      className="reaction"
                                      onClick={() =>
                                        reactionclick(
                                          "rocket",
                                          item.id,
                                          item.rocket
                                        )
                                      }
                                    >
                                      🚀 {item.rocket}
                                    </a>
                                    <a
                                      className="reaction"
                                      onClick={() =>
                                        reactionclick(
                                          "coffee",
                                          item.id,
                                          item.coffee
                                        )
                                      }
                                    >
                                      ☕ {item.coffee}
                                    </a>
                                  </div>
                                </div>
                              </div>
                              <div className="adminworkspace-posts-action">
                                <div>
                                  <Link
                                    to="/updatepost"
                                    state={item}
                                    className="button-back"
                                  >
                                    Edit
                                  </Link>
                                </div>
                                <div style={{ marginTop: 20 }}>
                                  <button
                                    className="button-back"
                                    onClick={() => deletepostclick(item.id)}
                                  >
                                    Delete
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                      </TabPanel>
                      <TabPanel value={tabvalue} index={3}>
                        {gettoppost(state.posts, "heart")[0] != undefined &&
                          gettoppost(state.posts, "heart").map(
                            (item, index) => (
                              <div className="adminworkspace-posts-wrap tabpanel">
                                <div
                                  className="home-body-item tabpanel-item"
                                  key={index}
                                >
                                  <div
                                    className="home-body-item-head"
                                    style={{ fontFamily: "var(--fonttext)" }}
                                  >
                                    <div className="home-body-item-avatar">
                                      <img
                                        src={getavatarforpost(item.userId)}
                                        alt="Image link not found"
                                        className="avatar"
                                        onClick={() =>
                                          gotouserprofile(item.userId)
                                        }
                                      ></img>
                                    </div>
                                    <h5
                                      style={{
                                        fontSize: 16,
                                        color: "lightgray"
                                      }}
                                      onClick={() =>
                                        gotouserprofile(item.userId)
                                      }
                                    >
                                      {item.name}
                                    </h5>
                                  </div>
                                  <div className="home-body-item-post">
                                    <h3 style={{ fontSize: 24, marginTop: 0 }}>
                                      {item.title}
                                    </h3>
                                    <p
                                      style={{
                                        fontStyle: "italic",
                                        marginTop: 15
                                      }}
                                    >
                                      {item.body}
                                    </p>
                                    <div>
                                      <Link
                                        to="/viewpost"
                                        state={item}
                                        onClick={() => {
                                          reactionclick(
                                            "view",
                                            item.id,
                                            item.view
                                          );
                                        }}
                                      >
                                        View Post
                                      </Link>
                                      <a style={{ marginLeft: 10 }}> by </a>
                                      <a style={{ fontWeight: 500 }}>
                                        {item.author}
                                      </a>
                                      <a
                                        style={{
                                          marginLeft: 10,
                                          fontStyle: "italic",
                                          fontSize: 14
                                        }}
                                      >
                                        {" "}
                                        {convertTime(item.createdAt)}
                                      </a>
                                    </div>
                                    <div className="reaction-wrap">
                                      <a
                                        className="reaction"
                                        onClick={() =>
                                          reactionclick(
                                            "thumbsUp",
                                            item.id,
                                            item.thumbsUp
                                          )
                                        }
                                      >
                                        👍 {item.thumbsUp}
                                      </a>
                                      <a
                                        className="reaction"
                                        onClick={() =>
                                          reactionclick(
                                            "wow",
                                            item.id,
                                            item.wow
                                          )
                                        }
                                      >
                                        😮 {item.wow}
                                      </a>
                                      <a
                                        className="reaction"
                                        onClick={() =>
                                          reactionclick(
                                            "heart",
                                            item.id,
                                            item.heart
                                          )
                                        }
                                      >
                                        ❤️ {item.heart}
                                      </a>
                                      <a
                                        className="reaction"
                                        onClick={() =>
                                          reactionclick(
                                            "rocket",
                                            item.id,
                                            item.rocket
                                          )
                                        }
                                      >
                                        🚀 {item.rocket}
                                      </a>
                                      <a
                                        className="reaction"
                                        onClick={() =>
                                          reactionclick(
                                            "coffee",
                                            item.id,
                                            item.coffee
                                          )
                                        }
                                      >
                                        ☕ {item.coffee}
                                      </a>
                                    </div>
                                  </div>
                                </div>
                                <div className="adminworkspace-posts-action">
                                  <div>
                                    <Link
                                      to="/updatepost"
                                      state={item}
                                      className="button-back"
                                    >
                                      Edit
                                    </Link>
                                  </div>
                                  <div style={{ marginTop: 20 }}>
                                    <button
                                      className="button-back"
                                      onClick={() => deletepostclick(item.id)}
                                    >
                                      Delete
                                    </button>
                                  </div>
                                </div>
                              </div>
                            )
                          )}
                      </TabPanel>
                      <TabPanel value={tabvalue} index={4}>
                        {gettoppost(state.posts, "rocket")[0] != undefined &&
                          gettoppost(state.posts, "rocket").map(
                            (item, index) => (
                              <div className="adminworkspace-posts-wrap tabpanel">
                                <div
                                  className="home-body-item tabpanel-item"
                                  key={index}
                                >
                                  <div
                                    className="home-body-item-head"
                                    style={{ fontFamily: "var(--fonttext)" }}
                                  >
                                    <div className="home-body-item-avatar">
                                      <img
                                        src={getavatarforpost(item.userId)}
                                        alt="Image link not found"
                                        className="avatar"
                                        onClick={() =>
                                          gotouserprofile(item.userId)
                                        }
                                      ></img>
                                    </div>
                                    <h5
                                      style={{
                                        fontSize: 16,
                                        color: "lightgray"
                                      }}
                                      onClick={() =>
                                        gotouserprofile(item.userId)
                                      }
                                    >
                                      {item.name}
                                    </h5>
                                  </div>
                                  <div className="home-body-item-post">
                                    <h3 style={{ fontSize: 24, marginTop: 0 }}>
                                      {item.title}
                                    </h3>
                                    <p
                                      style={{
                                        fontStyle: "italic",
                                        marginTop: 15
                                      }}
                                    >
                                      {item.body}
                                    </p>
                                    <div>
                                      <Link
                                        to="/viewpost"
                                        state={item}
                                        onClick={() => {
                                          reactionclick(
                                            "view",
                                            item.id,
                                            item.view
                                          );
                                        }}
                                      >
                                        View Post
                                      </Link>
                                      <a style={{ marginLeft: 10 }}> by </a>
                                      <a style={{ fontWeight: 500 }}>
                                        {item.author}
                                      </a>
                                      <a
                                        style={{
                                          marginLeft: 10,
                                          fontStyle: "italic",
                                          fontSize: 14
                                        }}
                                      >
                                        {" "}
                                        {convertTime(item.createdAt)}
                                      </a>
                                    </div>
                                    <div className="reaction-wrap">
                                      <a
                                        className="reaction"
                                        onClick={() =>
                                          reactionclick(
                                            "thumbsUp",
                                            item.id,
                                            item.thumbsUp
                                          )
                                        }
                                      >
                                        👍 {item.thumbsUp}
                                      </a>
                                      <a
                                        className="reaction"
                                        onClick={() =>
                                          reactionclick(
                                            "wow",
                                            item.id,
                                            item.wow
                                          )
                                        }
                                      >
                                        😮 {item.wow}
                                      </a>
                                      <a
                                        className="reaction"
                                        onClick={() =>
                                          reactionclick(
                                            "heart",
                                            item.id,
                                            item.heart
                                          )
                                        }
                                      >
                                        ❤️ {item.heart}
                                      </a>
                                      <a
                                        className="reaction"
                                        onClick={() =>
                                          reactionclick(
                                            "rocket",
                                            item.id,
                                            item.rocket
                                          )
                                        }
                                      >
                                        🚀 {item.rocket}
                                      </a>
                                      <a
                                        className="reaction"
                                        onClick={() =>
                                          reactionclick(
                                            "coffee",
                                            item.id,
                                            item.coffee
                                          )
                                        }
                                      >
                                        ☕ {item.coffee}
                                      </a>
                                    </div>
                                  </div>
                                </div>
                                <div className="adminworkspace-posts-action">
                                  <div>
                                    <Link
                                      to="/updatepost"
                                      state={item}
                                      className="button-back"
                                    >
                                      Edit
                                    </Link>
                                  </div>
                                  <div style={{ marginTop: 20 }}>
                                    <button
                                      className="button-back"
                                      onClick={() => deletepostclick(item.id)}
                                    >
                                      Delete
                                    </button>
                                  </div>
                                </div>
                              </div>
                            )
                          )}
                      </TabPanel>
                      <TabPanel value={tabvalue} index={5}>
                        {gettoppost(state.posts, "coffee")[0] != undefined &&
                          gettoppost(state.posts, "coffee").map(
                            (item, index) => (
                              <div className="adminworkspace-posts-wrap tabpanel">
                                <div
                                  className="home-body-item tabpanel-item"
                                  key={index}
                                >
                                  <div
                                    className="home-body-item-head"
                                    style={{ fontFamily: "var(--fonttext)" }}
                                  >
                                    <div className="home-body-item-avatar">
                                      <img
                                        src={getavatarforpost(item.userId)}
                                        alt="Image link not found"
                                        className="avatar"
                                        onClick={() =>
                                          gotouserprofile(item.userId)
                                        }
                                      ></img>
                                    </div>
                                    <h5
                                      style={{
                                        fontSize: 16,
                                        color: "lightgray"
                                      }}
                                      onClick={() =>
                                        gotouserprofile(item.userId)
                                      }
                                    >
                                      {item.name}
                                    </h5>
                                  </div>
                                  <div className="home-body-item-post">
                                    <h3 style={{ fontSize: 24, marginTop: 0 }}>
                                      {item.title}
                                    </h3>
                                    <p
                                      style={{
                                        fontStyle: "italic",
                                        marginTop: 15
                                      }}
                                    >
                                      {item.body}
                                    </p>
                                    <div>
                                      <Link
                                        to="/viewpost"
                                        state={item}
                                        onClick={() => {
                                          reactionclick(
                                            "view",
                                            item.id,
                                            item.view
                                          );
                                        }}
                                      >
                                        View Post
                                      </Link>
                                      <a style={{ marginLeft: 10 }}> by </a>
                                      <a style={{ fontWeight: 500 }}>
                                        {item.author}
                                      </a>
                                      <a
                                        style={{
                                          marginLeft: 10,
                                          fontStyle: "italic",
                                          fontSize: 14
                                        }}
                                      >
                                        {" "}
                                        {convertTime(item.createdAt)}
                                      </a>
                                    </div>
                                    <div className="reaction-wrap">
                                      <a
                                        className="reaction"
                                        onClick={() =>
                                          reactionclick(
                                            "thumbsUp",
                                            item.id,
                                            item.thumbsUp
                                          )
                                        }
                                      >
                                        👍 {item.thumbsUp}
                                      </a>
                                      <a
                                        className="reaction"
                                        onClick={() =>
                                          reactionclick(
                                            "wow",
                                            item.id,
                                            item.wow
                                          )
                                        }
                                      >
                                        😮 {item.wow}
                                      </a>
                                      <a
                                        className="reaction"
                                        onClick={() =>
                                          reactionclick(
                                            "heart",
                                            item.id,
                                            item.heart
                                          )
                                        }
                                      >
                                        ❤️ {item.heart}
                                      </a>
                                      <a
                                        className="reaction"
                                        onClick={() =>
                                          reactionclick(
                                            "rocket",
                                            item.id,
                                            item.rocket
                                          )
                                        }
                                      >
                                        🚀 {item.rocket}
                                      </a>
                                      <a
                                        className="reaction"
                                        onClick={() =>
                                          reactionclick(
                                            "coffee",
                                            item.id,
                                            item.coffee
                                          )
                                        }
                                      >
                                        ☕ {item.coffee}
                                      </a>
                                    </div>
                                  </div>
                                </div>
                                <div className="adminworkspace-posts-action">
                                  <div>
                                    <Link
                                      to="/updatepost"
                                      state={item}
                                      className="button-back"
                                    >
                                      Edit
                                    </Link>
                                  </div>
                                  <div style={{ marginTop: 20 }}>
                                    <button
                                      className="button-back"
                                      onClick={() => deletepostclick(item.id)}
                                    >
                                      Delete
                                    </button>
                                  </div>
                                </div>
                              </div>
                            )
                          )}
                      </TabPanel>
                    </Box>
                  </div>
                </div>
              }
            /> */}
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
