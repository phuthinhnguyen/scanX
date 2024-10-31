import { useDispatch, useSelector } from "react-redux";
import { getPost, getallusersforposts, increment, deleteItem, addnewItem } from "../redux/action";
import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Header from "./Header";
import { convertTime } from "./convertTime";
import Post from "./Post";


function Scan() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { state } = useLocation();

  const stateselector = useSelector((state) => state);

  if (stateselector.user == null) {
    navigate("/")
  }
  const [sharethinking, setSharethinking] = useState("");

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
  function deleteitem(id) {
    dispatch(deleteItem(id));
  }
  function edititem(item) {
    navigate("/updateitem", { state: item });
  }
  function addnewitem(qrcode,scanner) {
    if (qrcode!=""){
      const qrcodesplit = qrcode.split("/")
      const itemcode = qrcodesplit[5]
      dispatch(addnewItem(itemcode,qrcode,scanner,state));
      setSharethinking("")
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
                    onClick={() => addnewitem(sharethinking,stateselector.user.name)}
                  >
                    Add
                  </button>
                </div>
            </div>
            
            {/* {sortedposts.map((item, index) => (
              <Post
                item={
                  <div className="home-body-item" key={index}>
                    <div className="home-body-item-head">
                      <div className="home-body-item-avatar">
                        <img
                          src={getavatarforpost(item.userId)}
                          alt="Image link not found"
                          className="avatar"
                          onClick={() => gotouserprofile(item.userId)}
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
                      <p style={{ fontStyle: "italic", marginTop: 15 }}>
                        {item.body}
                      </p>
                      <div>
                        <Link
                          stateselector={item}
                          to="/viewpost"
                          onClick={() => {
                            reactionclick("view", item.id, item.view);
                          }}
                        >
                          View Post
                        </Link>
                        <a style={{ marginLeft: 10 }}> by </a>
                        <a style={{ fontWeight: 500 }}>{item.author}</a>
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
                            reactionclick("thumbsUp", item.id, item.thumbsUp)
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
                            reactionclick("heart", item.id, item.heart)
                          }
                        >
                          ❤️ {item.heart}
                        </a>
                        <a
                          className="reaction"
                          onClick={() =>
                            reactionclick("rocket", item.id, item.rocket)
                          }
                        >
                          🚀 {item.rocket}
                        </a>
                        <a
                          className="reaction"
                          onClick={() =>
                            reactionclick("coffee", item.id, item.coffee)
                          }
                        >
                          ☕ {item.coffee}
                        </a>
                      </div>
                    </div>
                  </div>
                }
              />
            ))} */}
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
                {sortedposts.map((item)=><tr key={item.id} >
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
                    {item.createdAt} 
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
        <Link
              className="button-back"  
              to="/home"
            >
              Back
        </Link>
        </div>

        </div>
      ) : (
        null
      )}
    </div>
  );
}
export default Scan;
