import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "./Header";

function Userprofileonline() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const stateselector = useSelector((state) => state);
  useEffect(() => {
    if (stateselector.user == null) {
      navigate("/");
    }
  }, []);

  const useronline = stateselector.allusers.filter(item => item.id == state)
  
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
