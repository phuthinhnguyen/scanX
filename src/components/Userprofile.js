import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import { uploadavatar } from "../redux/action";
import Avatar from "@mui/material/Avatar";

function Userprofile() {
  const navigate = useNavigate();
  const stateselector = useSelector((state) => state);
  const [image, setImage] = useState({ file: "", type: "" });
  const dispatch = useDispatch();

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
          </div>
        </div>
      ) : (
        navigate("/")
      )}
    </div>
  );
}
export default Userprofile;
