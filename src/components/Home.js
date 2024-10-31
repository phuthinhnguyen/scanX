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
  function buttonInClick(status) {
    navigate("/scan", { state: status });
  }
  function buttonOutClick(status) {
    navigate("/scan", { state: status });
  }
  return (
    <div>
      {state.user != null ? (
        <div>
          <Header />
          <div className="home-body hombody-in-out">
          <button className="hombody-in"  onClick={()=>buttonInClick("IN")}>
            IN
          </button>
          <button className="hombody-out" onClick={()=>buttonOutClick("OUT")}> 
            OUT
          </button>
          </div>
        </div>
      ) : (
        null
      )}
    </div>
  );
}
export default Home;
