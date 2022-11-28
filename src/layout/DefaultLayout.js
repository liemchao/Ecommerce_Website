import React from "react";
import Sidebar from "../components/SideBar";
import Topbar from "../components/TopBar";
import Footer from "../components/Footer";
import Content from "../components/Content";
import { Redirect } from "react-router";

const DefaultLayout = () => {
  let user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return <Redirect to="/Login" />;
  }

  return (
    <div>
      <div id="wrapper">
        <Sidebar />
        {/* Content Wrapper  */}
        <div id="content-wrapper" className="d-flex flex-column">
          {/* Main Content  */}
          <div id="content">
            <Topbar />
            {/* Page Content  */}
            <div className="container-fluid">
              <Content />
            </div>
            {/* /.container-fluid  */}
          </div>
          {/* Footer  */}
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default DefaultLayout;
