import {
  Navigate,
  Outlet,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import SignIn from "./pages/signin/SignIn";
import Overview from "./pages/overview/Overview";

import "./styles/global.scss";
import SignUp from "./pages/signup/Signup";
import Navbar from "./components/navbar/Navbar";
import Menu from "./components/menu/Menu";
import AddData from "./pages/addData/AddData";
import AuthGuard from "./AUTH/Auth";
import Records from "./pages/records/Records";
import NotFound from "./pages/PageNotFound/NotFound";

const DashboardLayout = () => {

  return (
    <div className="main">
      <div className="projcont ">
        <div className="menuContainer">
          <Menu />
        </div>
        <div className="dynamic-container">
          <div className="navBar">
            <Navbar />
          </div>

          <div className="contentContainer">
            {/* I can either use reactRouterDom here but I wanna use this guy */}
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Navigate to="/signup" />} />
      <Route path="/signup/" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      <Route
        path="/admin-dashboard/"
        element={<Navigate to={"/admin-dashboard/overview"} />}
      />
      <Route
        path="/admin-dashboard/"
        element={
          <AuthGuard>
            <DashboardLayout />
          </AuthGuard>
        }
      >
        <Route path="overview" element={<Overview />} />
        <Route path="records" element={<Records />} />
        <Route path="add-data" element={<AddData />} />
      </Route>
      {/* Catch-all route for non-existing pages */}
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
