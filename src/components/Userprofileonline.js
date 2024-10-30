import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link, useLocation } from "react-router-dom";
import Header from "./Header";
import { convertTime } from "./convertTime";
import { increment } from "../redux/action";
import Post from "./Post";

function Userprofileonline() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const stateselector = useSelector((state) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    if (stateselector.user == null) {
      navigate("/");
    }
  }, []);

  const useronline = stateselector.allusers.filter(item => item.id == state)
  const userblogs = stateselector.posts.filter(item => item.userId == state)
  var sortedposts =userblogs.sort((a, b) => b.createdAt - a.createdAt);

  function reactionclick(emojiname, id, currentcount) {
    dispatch(increment(emojiname, id, currentcount));
  }
  function gotouserprofile(userId) {
    navigate("/userprofileonline", { state: userId });
  }
  return (
    <div>
      {stateselector.user != null ? (
        <div>
          <Header />
          {useronline != undefined && useronline.length!=0 ? (
            <div className="home-body userprofile-body">
              <div className="home-body-coverphoto">
                <img
                  src={useronline[0].coverphoto}
                  alt="Image link not found"
                  className="coverphoto"
                ></img>
              </div>
              <div className="home-body-avatar">
                <img
                  src={useronline[0].avatar}
                  alt="Image link not found"
                  className="avatar avataruserprofile"
                ></img>
              </div>
              <h1 className="home-body-name">
                {useronline[0].name}
              </h1>
              {useronline != null &&
                sortedposts != false &&
                sortedposts.map((item, index) => (
                  <Post
                    item={
                      <div className="home-body-item" key={index}>
                        <div className="home-body-item-head">
                          <div className="home-body-item-avatar">
                            <img
                              src={useronline[0].avatar}
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
                              to="/viewpost"
                              state={item}
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
                ))}
            </div>
          ) : <div className="userdeleted">This user is deleted</div>}
        </div>
      ) : (
        navigate("/")
      )}
    </div>
  );
}
export default Userprofileonline;
