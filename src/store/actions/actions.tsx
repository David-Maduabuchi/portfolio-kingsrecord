import { DataTableProps } from "@/interface/general";
import { Profile } from "../../interface/redux-interface";
import * as ACTION_TYPES from "./action_types";

export const SUCCESS = {
  type: ACTION_TYPES.SUCCESS,
};

export const FAILURE = {
  type: ACTION_TYPES.FAILURE,
};

export const success = () => {
  return {
    type: ACTION_TYPES.SUCCESS,
  };
};
export const failure = () => {
  return {
    type: ACTION_TYPES.FAILURE,
  };
};

export const redirect_message = (action: string) => {
  return {
    type: ACTION_TYPES.REDIRECT_MESSAGE,
    payload: action
  };
};

export const add_dataToDB = (action: DataTableProps["rows"]) => {
  return {
    type: ACTION_TYPES.ADD_DATATABLE,
    payload: action
  }
}

export const login_success = () => {
  return {
    type: ACTION_TYPES.LOGIN_SUCCESS,
  };
};

export const login_failure = () => {
  return {
    type: ACTION_TYPES.LOGIN_FAILURE,
  };
};

export const set_user_profile = (profile: Profile) => {
  return {
    type: ACTION_TYPES.ADD_PROFILE,
    payload: profile,
  };
};

export const open_sidebar = () => {
  return {
    type: ACTION_TYPES.OPEN_SIDEBAR,
  };
};

export const close_sidebar = () => {
  return {
    type: ACTION_TYPES.CLOSE_SIDEBAR,
  };
};

// export const remove_profile = () => {
//   return {
//     type: ACTION_TYPES.REMOVE_PROFILE,
//   };
// };

// export const set_db_profile = (profile) => {
//   return {
//     type: ACTION_TYPES.SET_DB_PROFILE,
//     payload: profile,
//   };
// };

// export const remove_db_profile = () => {
//   return {
//     type: ACTION_TYPES.REMOVE_DB_PROFILE,
//   };
// };

// export const fetch_db_posts = (posts) => {
//   return {
//     type: ACTION_TYPES.FETCH_DB_POSTS,
//     payload: posts,
//   };
// };
// export const remove_db_posts = () => {
//   return {
//     type: ACTION_TYPES.REMOVE_DB_POST,
//   };
// };

// export const fetch_post_comments = (comments) => {
//   return {
//     type: ACTION_TYPES.FETCH_POST_COMMENTS,
//     payload: comments,
//   };
// };
// export const remove_post_comments = () => {
//   return {
//     type: ACTION_TYPES.REMOVE_DB_POST,
//   };
// };

// export const fetch_user_posts = (posts) => {
//   return {
//     type: ACTION_TYPES.FETCH_USER_POSTS,
//     payload: posts,
//   };
// };

// export const remove_user_posts = () => {
//   return {
//     type: ACTION_TYPES.REMOVE_USER_POSTS,
//   };
// };
