import { Profile } from "./redux-interface";

interface AuthState {
  is_authenticated: boolean;
  profile: Profile;
  redirectionMessage: string;
  DBdata: {
    title: string;
    firstName: string;
    lastName: string;
    Date: string;
    email: string;
    phoneNumber: string;
    total: number;
    partnershipsTotal: number;
    givingsTotal: number;
  }[];
}
interface Sidebar {
  isSidebarOpen: boolean
}

export interface RootState {
  auth_reducer: AuthState;
  sidebar_reducer: Sidebar 
}


export interface DataTableProps {
  column: {
    col2: string;
    col3: string;
    col4: string;
    col5: string;
    col6: string;
    col7: string;
    col8: string;
    col9: string;
  }[];

  rows: {
    title: string;
    firstName: string;
    lastName: string;
    Date: string;
    email: string;
    phoneNumber: string;
    total: number;
    partnershipsTotal: number;
    givingsTotal: number;
  };
}
