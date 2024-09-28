import * as ACTION_TYPES from "../store/actions/action_types";
import { DataTableProps } from "./general";
export interface Profile {
  uid: string | number;
  job_description: string;
  email: string;
  username: string;
}

// Define interfaces for each action
interface LoginSuccessAction {
  type: typeof ACTION_TYPES.LOGIN_SUCCESS;
}

interface LoginFailureAction {
  type: typeof ACTION_TYPES.LOGIN_FAILURE;
}

interface AddProfileAction {
  type: typeof ACTION_TYPES.ADD_PROFILE;
  payload: Profile;
}

interface RedirectMessage {
  type: typeof ACTION_TYPES.REDIRECT_MESSAGE;
  payload: string;
}
interface AddDataTableAction {
  type: typeof ACTION_TYPES.ADD_DATATABLE;
  payload: DataTableProps["rows"];
}

export type AuthActionTypes =
  | LoginSuccessAction
  | LoginFailureAction
  | AddProfileAction
  | RedirectMessage
  | AddDataTableAction
// this reducer is set to update the redux store on the current state of the user

interface OPEN_SIDEBAR {
  type: typeof ACTION_TYPES.OPEN_SIDEBAR;
}

interface TOGGLE_SIDEBAR {
  type: typeof ACTION_TYPES.TOGGLE_SIDEBAR;
}
export type SIDEBAR = OPEN_SIDEBAR | TOGGLE_SIDEBAR;
