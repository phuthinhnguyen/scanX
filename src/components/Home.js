import { useDispatch, useSelector } from "react-redux";
import { getPost, getallusersforposts, increment, deleteItem, addnewItem } from "../redux/action";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "./Header";
import { convertTime } from "./convertTime";
import Post from "./Post";


function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  if (state.user == null) {
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
 
  const sortedposts = state.posts.sort((a, b) => b.createdAt - a.createdAt);

  function reactionclick(emojiname, id, currentcount) {
    dispatch(increment(emojiname, id, currentcount));
  }
  function gotouserprofile(userId) {
    navigate("/userprofileonline", { state: userId });
  }

  function getavatarforpost(id) {
    if (state.allusers != null) {
      const allusersfilter = state.allusers.filter(item => item.id == id)
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
  function addnewitem(itemcode,scanner) {
    if (itemcode!=""){
      dispatch(addnewItem(itemcode,scanner));
      setSharethinking("")
    }
  }
  return (
    <div>
      {state.user != null ? (
        <div>
          <Header />
          <div className="home-body">
            <div className="share-thinking">
              <input
                type="text"
                className="form-control input-share"
                id="inlineFormInputGroup"
                placeholder="Scan everything you want with scanX..."
                onChange={sharethinkingonChange}
                value={sharethinking}
              />
              {/* <Link
                to="/addnewitem"
                state={sharethinking}
                className="button-login share-button"
              >
                Scan
              </Link> */}
              <button
                className="button-login share-button"
                onClick={() => addnewitem(sharethinking,state.user.name)}
              >
                Scan
              </button>
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
                          state={item}
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
            <table className="table" style={{marginTop:"20px"}}>
            <thead style={{color:"white"}}>
              <tr>
                <td>Item Code</td>
                <td>Scanner</td>
                <td>Action</td>
              </tr>
            </thead>
            <tbody style={{color:"white"}}>
                {sortedposts.map((item)=><tr key={item.id} >
                  <td>
                    {item.itemcode} 
                  </td>
                  <td>
                    {item.scanner} 
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
        </div>
      ) : (
        null
      )}
    </div>
  );
}
export default Home;
