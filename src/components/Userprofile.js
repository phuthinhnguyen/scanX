import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link, useLocation } from "react-router-dom";
import Header from "./Header";
import { convertTime } from "./convertTime";
import { uploadavatar } from "../redux/action";
import { increment } from "../redux/action";
import Post from "./Post";
import Avatar from "@mui/material/Avatar";

function Userprofile() {
  const navigate = useNavigate();
  const stateselector = useSelector((state) => state);
  const [sharethinking, setSharethinking] = useState("");
  const [image, setImage] = useState({ file: "", type: "" });
  const [url, setUrl] = useState("");
  const dispatch = useDispatch();

  if (stateselector.user != null) {
    const blogs = stateselector.user.userblogs;
    var sortedposts =
      blogs != undefined && blogs.sort((a, b) => b.createdAt - a.createdAt);
  }

  const sharethinkingonChange = (e) => {
    setSharethinking(e.target.value);
  };

  function reactionclick(emojiname, id, currentcount) {
    dispatch(increment(emojiname, id, currentcount));
  }
  useEffect(() => {
    if (stateselector.user == null) {
      navigate("/");
    }
    if (image.file != "") {
      const data = new FormData();
      data.append("file", image.file);
      data.append("upload_preset", "phuthinhnguyen1101");
      data.append("cloud_name", "dhva3lwfk");
      dispatch(uploadavatar(data, stateselector.user.id, image.type));
    }
  }, [image.file]);

  return (
    <div>
      {stateselector.user != null ? (
        <div>
          <Header />
          <div className="home-body userprofile-body">
            <div className="home-body-coverphoto">
              <div className="parent-coverphoto">
                <img src={stateselector.user.coverphoto} alt=""></img>
                <div className="file-upload">
                  <input
                    type="file"
                    onChange={(e) =>
                      setImage({ file: e.target.files[0], type: "coverphoto" })
                    }
                  ></input>
                </div>
              </div>
            </div>
            <div className="home-body-avatar">
              <div className="parent">
                <div>
                  <Avatar
                    alt={stateselector.user.name}
                    src={stateselector.user.avatar}
                  />
                </div>
                <div className="file-upload">
                  <input
                    type="file"
                    onChange={(e) =>
                      setImage({ file: e.target.files[0], type: "avatar" })
                    }
                  ></input>
                </div>
              </div>
            </div>
            <h1 className="home-body-name">{stateselector.user.name}</h1>
            {/* <div className="share-thinking" style={{ marginTop: 80 }}>
              <input
                type="text"
                className="form-control input-share"
                id="inlineFormInputGroup"
                placeholder="Scan everything you want with scanX..."
                onChange={sharethinkingonChange}
                value={sharethinking}
              />
              <Link
                to="/addnewitem"
                state={sharethinking}
                className="button-login share-button"
              >
                Scan
              </Link>
            </div> */}
            {stateselector.user != null &&
              sortedposts != false &&
              sortedposts.map((item, index) => (
                <Post
                  item={
                    <div className="home-body-item" key={index}>
                      <div className="home-body-item-head">
                        <div className="home-body-item-avatar">
                          <img
                            src={stateselector.user.avatar}
                            alt="Image link not found"
                            className="avatar"
                          ></img>
                        </div>
                        <h5 style={{ fontSize: 16, color: "lightgray" }}>
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
              ))}
          </div>
        </div>
      ) : (
        navigate("/")
      )}
    </div>
  );
}
export default Userprofile;
