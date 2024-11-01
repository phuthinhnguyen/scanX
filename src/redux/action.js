import axios from "axios";
export const FETCH_POST_SUCCESS = "FETCH_POST_SUCCESS";
export const FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS";
export const ADD_NEW_POST_SUCCESS = "ADD_NEW_POST_SUCCESS";
export const UPDATE_POST_SUCCESS = "UPDATE_POST_SUCCESS";
export const DELETE_POST_SUCCESS = "DELETE_POST_SUCCESS";
export const UPDATE_EMOJI_SUCCESS = "UPDATE_EMOJI_SUCCESS";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const GET_USERPROFILE_SUCCESS = "GET_USERPROFILE_SUCCESS";
export const BAN_USER_SUCCESS = "BAN_USER_SUCCESS";
export const TO_ADMIN_SUCCESS = "TO_ADMIN_SUCCESS";
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS"
export const UPLOAD_AVATAR_SUCCESS = "UPLOAD_AVATAR_SUCCESS"
export const DELETE_ITEM_SUCCESS = "DELETE_ITEM_SUCCESS";
export const UPDATE_ITEM_SUCCESS = "UPDATE_ITEM_SUCCESS";
export const ADD_NEW_ITEM_SUCCESS = "ADD_NEW_ITEM_SUCCESS";

// user 2 api, first one includes information about users (id,username,password,avatar,coverphoto...)
// last one includes information about posts (id,title,body,author...) 
const apiurlusers = "https://649117572f2c7ee6c2c7b99a.mockapi.io/users";
const apiurlblogs = "https://67221aae2108960b9cc2ea5b.mockapi.io/scanXdata";

// get all posts to load in home page
export const getPost = () => {
  return async (dispatch) => {
    const response = await axios.get(apiurlblogs);
    dispatch({
      type: FETCH_POST_SUCCESS,
      payload: response.data
    });
  };
};

// call api when user add new post/update/delete post
export const addnewpost = (form, user) => {
  return async (dispatch) => {
    const response = await axios.post(`${apiurlblogs}`, {
      createdAt: Date.now(),
      userId: user.id,
      title: form.title,
      body: form.body,
      author: form.author,
      thumbsUp: 0,
      wow: 0,
      heart: 0,
      rocket: 0,
      coffee: 0,
      view: 0,
      name: user.name,
    });
    dispatch({
      type: ADD_NEW_POST_SUCCESS,
      payload: response.data
    });
  };
};

export const updatepost = (form) => {
  return async (dispatch) => {
    const response = await axios.put(`${apiurlblogs}/${form.id}`, {
      title: form.title,
      body: form.body,
      author: form.author,
      createdAt: Date.now()
    });
    dispatch({
      type: UPDATE_POST_SUCCESS,
      payload: response.data
    });
  };
};


export const deletepost = (id) => {
  return async (dispatch) => {
    const response = await axios.delete(`${apiurlblogs}/${id}`);
    dispatch({
      type: DELETE_POST_SUCCESS,
      payload: id
    });
  };
};


// call api when user click to reactions in post
export const increment = (emojiname, id, currentcount) => {
  return async (dispatch) => {
    const response = await axios.put(`${apiurlblogs}/${id}`, {
      [emojiname]: currentcount + 1
    });
    dispatch({
      type: UPDATE_EMOJI_SUCCESS,
      payload: response.data
    });
  };
};

// call api when user click to login
export const login = (form) => {
  return async (dispatch) => {
    let checkloginresult = "";
    const response = await axios.get(apiurlusers);

    // when user click login button, check whether username is existed on database
    const getusername = response.data.filter(
      (item) => item.username == form.username
    );

    // clone all users database with delete username and password when change them to store
    const allusersprofile = structuredClone(response.data);
    for (let item of allusersprofile) {
      delete item.username;
      delete item.password
    }
    
    // if no username exists, store error to variable and do dispatch
    if (getusername.length == 0) {
      checkloginresult = "Username is not exists"
      dispatch({
        type: LOGIN_SUCCESS,
        payload: [{ userblogs: [], checktype: "login", result: checkloginresult }, null]
      });
    }
    // if username exists but password not matched, store error to variable and do dispatch
    else if (getusername[0].password != form.password) {
      checkloginresult = "Username and password are not matched"
      dispatch({
        type: LOGIN_SUCCESS,
        payload: [{ userblogs: [], checktype: "login", result: checkloginresult }, null]
      });
    }
    // if username exists and password matched
    else if (getusername[0].password == form.password) {
      checkloginresult = "Login successfully"
      dispatch({
        type: LOGIN_SUCCESS,
        // checktype : login is used for distinguishing between login or signup information 
        payload: [{ ...allusersprofile.filter(item => item.id == getusername[0].id)[0], userblogs: [], checktype: "login", result: checkloginresult }, allusersprofile]
      });
    }
  };
};

// get information of loginning user to load on profile page
export const getUserprofile = (posts, user) => {
  return async (dispatch) => {
    const userblogs = posts.filter((item) => item.userId == user.id);
    dispatch({
      type: GET_USERPROFILE_SUCCESS,
      payload: userblogs
    });
  };
};

// call api when user click to signup
export const signup = (form) => {
  return async (dispatch) => {
    let checksignupresult = "";
    const responsegetuser = await axios.get(apiurlusers)

    // check whether username and email is existed on database
    const checkusername = responsegetuser.data.filter(item => item.username == form.username)
    const checkemail = responsegetuser.data.filter(item => item.email == form.email)

    // if exist, store error to variable checksignupresult
    if (checkusername.length != 0) {
      checksignupresult = "Username already exists"
    }
    else if (checkemail.length != 0) {
      checksignupresult = "Email already exists"
    }
    // if not exist, process to call api and dispatch
    else {
      const response = await axios.post(apiurlusers, {
        name: form.name,
        email: form.email,
        username: form.username,
        password: form.password,
        role: form.role,
        // new user have default avatar and coverphoto as link below
        avatar: "https://res.cloudinary.com/dhva3lwfk/image/upload/v1688131036/gkwlvz6hllbauf7octgk.png",
        coverphoto: "https://res.cloudinary.com/dhva3lwfk/image/upload/v1687881220/Asset_5_pakypu.png"
      })
      checksignupresult = "Sign up successfully"
    }
    dispatch({
      type: SIGNUP_SUCCESS,
      payload: { checktype: "signup", result: checksignupresult }
    });
  }
}

// get all users information (includes username,password,email,name...) for showing in admin page (only role admin can see it)
export const getallusers = () => {
  return async dispatch => {
    const response = await axios.get(apiurlusers)
    dispatch({
      type: FETCH_USER_SUCCESS,
      payload: response.data
    })
  }
}

// get all users information for loading posts (includes avatar,name,title,body,author,time...) in home page
export const getallusersforposts = () => {
  return async dispatch => {
    const response = await axios.get(apiurlusers)
    // to hide users's username and password when storing them
    for (let item of response.data) {
      delete item.username;
      delete item.password;
    }
    dispatch({
      type: FETCH_USER_SUCCESS,
      payload: response.data
    })
  }
}

// delete specific user (only root admin and admin can do this)
export const banuser = (id) => {
  return async dispatch => {
    const response = await axios.delete(`${apiurlusers}/${id}`)
    dispatch({
      type: BAN_USER_SUCCESS,
      payload: id
    })
  }
}

// change role from user to admin
export const toadmin = (id) => {
  return async dispatch => {
    const response = await axios.put(`${apiurlusers}/${id}`, {
      role: "admin"
    })
    dispatch({
      type: TO_ADMIN_SUCCESS,
      payload: response.data
    })
  }
}

// use cloudinary api to host uploaded image and retrieve url of image
export const uploadavatar = (image, id, type) => {
  return async dispatch => {
    fetch("https://api.cloudinary.com/v1_1/dhva3lwfk/image/upload", {
      method: "post",
      body: image
    })
      .then((resp) => resp.json())
      .then((data) => {
        axios.put(`${apiurlusers}/${id}`, {
          [type]: data.url
        })
        dispatch({
          type: UPLOAD_AVATAR_SUCCESS,
          payload: [data.url, type]
        });
      })
      .catch((err) => console.log(err));
  }
}

export const deleteItem= (id) => {
  return async (dispatch) => {
    const response = await axios.delete(`${apiurlblogs}/${id}`);
    dispatch({
      type: DELETE_ITEM_SUCCESS,
      payload: id
    });
  };
};

export const editItem = (form,id) => {
  return async (dispatch) => {
    const response = await axios.put(`${apiurlblogs}/${id}`, {
      scanner: form.scanner,
      itemcode: form.itemcode,
      qrcode: form.qrcode,
      status: form.status,
      createdAt: Date.now()
    });
    dispatch({
      type: UPDATE_ITEM_SUCCESS,
      payload: response.data
    });
  };
};

export const addnewItem = (itemcode,qrcode,scanner,status) => {
  return async (dispatch) => {
    const response = await axios.post(`${apiurlblogs}`, {
      createdAt: Date.now(),
      // userId: user.id,
      itemcode:itemcode,
      qrcode: qrcode,
      scanner: scanner, 
      status:status
    });
    dispatch({
      type: ADD_NEW_ITEM_SUCCESS,
      payload: response.data
    });
  };
};

