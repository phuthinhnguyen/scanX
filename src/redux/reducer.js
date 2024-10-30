import { BAN_USER_SUCCESS, FETCH_USER_SUCCESS, GET_USERPROFILE_SUCCESS, LOGOUT_SUCCESS, SIGNUP_SUCCESS, TO_ADMIN_SUCCESS, UPLOAD_AVATAR_SUCCESS } from "./action";
import { ADD_NEW_POST_SUCCESS, DELETE_POST_SUCCESS, FETCH_POST_SUCCESS, UPDATE_EMOJI_SUCCESS, UPDATE_POST_SUCCESS, LOGIN_SUCCESS, DELETE_ITEM_SUCCESS } from "./action";

const initialState = {
  // used for loading all posts on home page
  posts: [],
  // used for loading user info on profile page
  user: null,
  // used for loading name and avatar of every post on home page and when user click to see another user'profile
  allusersprofile: null
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {

    case FETCH_POST_SUCCESS:
      return { ...state, posts: action.payload };

    case ADD_NEW_POST_SUCCESS:
      return {
        ...state,
        posts: [...state.posts, action.payload],
        user: {
          ...state.user,
          userblogs: [...state.user.userblogs, action.payload]
        }
      };

    case UPDATE_POST_SUCCESS:
      return {
        ...state,
        posts: [
          ...state.posts.filter((item) => item.id != action.payload.id),
          action.payload
        ],
        user: {
          ...state.user,
          userblogs: [
            ...state.user.userblogs.filter(
              (item) => item.id != action.payload.id
            ),
            action.payload
          ]
        }
      };

    case DELETE_POST_SUCCESS:
      return {
        ...state,
        posts: [...state.posts.filter((item) => item.id != action.payload)],
        user: {
          ...state.user,
          userblogs: [
            ...state.user.userblogs.filter((item) => item.id != action.payload)
          ]
        }
      };

    case UPDATE_EMOJI_SUCCESS:
      return {
        ...state,
        posts: [
          ...state.posts.filter((item) => item.id != action.payload.id),
          action.payload
        ],
        user: { ...state.user, userblogs: [...state.user.userblogs.filter(item => item.id != action.payload.id), state.user.id == action.payload.userId && action.payload] }
      };

    case FETCH_USER_SUCCESS:
      return {
        ...state,
        allusers: action.payload
      };

    case LOGIN_SUCCESS:
      return { ...state, user: action.payload[0], allusersprofile: action.payload[1] };

    case SIGNUP_SUCCESS:
      return { ...state, user: { ...state.user, checktype: action.payload.checktype, result: action.payload.result } }

    case LOGOUT_SUCCESS:
      return {
        posts: [],
        user: null,
        allusersprofile: null
      };

    case GET_USERPROFILE_SUCCESS:
      return { ...state, user: { ...state.user, userblogs: action.payload } };

    case BAN_USER_SUCCESS:
      return { ...state, allusers: [...state.allusers.filter(item => item.id != action.payload)] };

    case TO_ADMIN_SUCCESS:
      return { ...state, allusers: [...state.allusers.filter(item => item.id != action.payload.id), action.payload] }
   
    case UPLOAD_AVATAR_SUCCESS:
      return { ...state, user: { ...state.user, [action.payload[1]]: action.payload[0] } }
    
    case DELETE_ITEM_SUCCESS:
      return {
        ...state,
        posts: [...state.posts.filter((item) => item.id != action.payload)],
        // user: {
        //   ...state.user,
        //   userblogs: [
        //     ...state.user.userblogs.filter((item) => item.id != action.payload)
        //   ]
        // }
      };

    default:
      return state;
  }
};

export default rootReducer;
