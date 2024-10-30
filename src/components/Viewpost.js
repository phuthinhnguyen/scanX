import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { convertTime } from "./convertTime";
import Header from "./Header";
import { useDispatch, useSelector } from "react-redux";
import { increment } from "../redux/action";
import { useState } from "react";

function Viewpost() {

  const stateselector = useSelector(state => state)
  const { state } = useLocation();
  useEffect(() => {
    if (stateselector.user == null) {
      navigate("/");
    }
    if (state == null) {
      navigate("/home")
    }
  }, []);

  const [iteminfo, setIteminfo] = useState(state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (state != null) {
    var useronline = stateselector.allusers.filter(item => item.id == state.userId)
  }

  function reactionclick(emojiname, id, currentcount) {
    setIteminfo({ ...iteminfo, [emojiname]: currentcount + 1 });
    dispatch(increment(emojiname, id, currentcount));
  }
  function gotouserprofile(userId) {
    navigate("/userprofileonline", { state: userId });
  }
  return (
    <>
      {state != null ? (
        <div>
          <Header />
          <div className="home-body">
            <div className="home-body-item">
              <div className="home-body-item-head">
                <div className="home-body-item-avatar">
                  <img
                    src={useronline.length != 0 ? useronline[0].avatar : "https://res.cloudinary.com/dhva3lwfk/image/upload/v1688131036/gkwlvz6hllbauf7octgk.png"}
                    alt="Image link not found"
                    className="avatar"
                    onClick={() => gotouserprofile(iteminfo.userId)}
                  ></img>
                </div>
                <h5
                  style={{ fontSize: 16, color: "lightgray" }}
                  onClick={() => gotouserprofile(iteminfo.userId)}
                >
                  {iteminfo.name}
                </h5>
              </div>
              <div className="home-body-item-post">
                <h3 style={{ fontSize: 24, marginTop: 0 }}>{iteminfo.title}</h3>
                <p style={{ fontStyle: "italic", marginTop: 15 }}>
                  {iteminfo.body}
                </p>
                <div>
                  {iteminfo.userId == stateselector.user.id ? (
                    <Link to="/updatepost" state={iteminfo}>
                      Edit post
                    </Link>
                  ) : (
                    <p
                      style={{
                        display: "inline",
                        color: "gray",
                        fontStyle: "italic"
                      }}
                    >
                      Edit post
                    </p>
                  )}
                  <a style={{ marginLeft: 10 }}> by </a>
                  <a style={{ fontWeight: 500 }}>{iteminfo.author}</a>
                  <a
                    style={{
                      marginLeft: 10,
                      fontStyle: "italic",
                      fontSize: 14
                    }}
                  >
                    {" "}
                    {convertTime(iteminfo.createdAt)}
                  </a>
                </div>
                <div className="reaction-wrap">
                  <a
                    className="reaction"
                    onClick={() =>
                      reactionclick("thumbsUp", iteminfo.id, iteminfo.thumbsUp)
                    }
                  >
                    👍 {iteminfo.thumbsUp}
                  </a>
                  <a
                    className="reaction"
                    onClick={() =>
                      reactionclick("wow", iteminfo.id, iteminfo.wow)
                    }
                  >
                    😮 {iteminfo.wow}
                  </a>
                  <a
                    className="reaction"
                    onClick={() =>
                      reactionclick("heart", iteminfo.id, iteminfo.heart)
                    }
                  >
                    ❤️ {iteminfo.heart}
                  </a>
                  <a
                    className="reaction"
                    onClick={() =>
                      reactionclick("rocket", iteminfo.id, iteminfo.rocket)
                    }
                  >
                    🚀 {iteminfo.rocket}
                  </a>
                  <a
                    className="reaction"
                    onClick={() =>
                      reactionclick("coffee", iteminfo.id, iteminfo.coffee)
                    }
                  >
                    ☕ {iteminfo.coffee}
                  </a>
                </div>
              </div>
            </div>
            <Link
              className="button-back"
              style={{ marginTop: 100 }}
              to="/home"
            >
              Back
            </Link>
          </div>
        </div>
      ) : (
        navigate("/home")
      )}
    </>
  );
}
export default Viewpost;
