import { useDispatch, useSelector } from "react-redux";
import { getItem, getallusersforposts} from "../redux/action";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";


function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  if (state.user == null) {
    navigate("/")
  }

  useEffect(() => {
    dispatch(getItem());
    dispatch(getallusersforposts());
  }, []);

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
            <span>Scanner:</span>
            <h3>{state.user.name}</h3>
            <div className="template1-container">
              <div className="img" style={{backgroundImage: "url()"}}>
                <div className="text-content p-4 text-center">
                  <p>
                       <button className="hombody-in btn-custom mb-2 p-4 text-center popup-vimeo"  onClick={()=>buttonInClick("IN")}>
                        SCAN IN
                        </button>
                        <button className="hombody-out btn-custom mb-2 p-4 text-center popup-vimeo" onClick={()=>buttonOutClick("OUT")}> 
                      SCAN OUT
                      </button>
                  </p>
                </div>
              </div>
         
		        </div>
           
            
          </div>
        </div>
      ) : (
        null
      )}
    </div>
  );
}
export default Home;
