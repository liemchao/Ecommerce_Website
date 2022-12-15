import React from "react";
import { Button } from "react-bootstrap";
import { Link, useHistory, Redirect } from "react-router-dom";
import ApiService from "../../src/api/apiService";
const Topbar = () => {
  const history = useHistory();
  const user = JSON.parse(localStorage.getItem("user"));
  
  if (!user) {
    return <Redirect to="/Login" />;
  }

  const handleLogout = () => {
    ApiService.Logout();
    history.push("/Login");
  }

  return (
    <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
      {/* Topbar Navbar */}
      <ul className="navbar-nav ml-auto">
      
      <div style={{marginTop:10}} >
       <Button>
      <svg  xmlns="http://www.w3.org/2000/svg" width="30" height="30"  fill="currentColor" className="bi bi-bell-fill" viewBox="0 0 18 18">
  <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zm.995-14.901a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z"/>
</svg>
</Button>
       </div>
        <div className="topbar-divider d-none d-sm-block">
          
  
        </div>
        {/* User Information */}
        <li className="nav-item dropdown no-arrow">
          <a
            className="nav-link dropdown-toggle"
            href="/#"
            id="userDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <span className="mr-2 d-none d-lg-inline text-gray-600 small">
              {user.fullName}
            </span>
            <img
              className="img-profile rounded-circle"
              src={user.image}
              alt={user.image}
            />
          </a>
          {/* Dropdown - User Information */}
          <div
            className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
            aria-labelledby="userDropdown"
          >
            <Link className="dropdown-item" to="/Dashboard/MyProfile">
              <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
              Profile
            </Link>
            <div className="dropdown-divider"></div>
            <Button
              onClick={handleLogout}
              className="dropdown-item"
            >
              <i className="fas fa-sign-out-alt fnoti_imagea-sm fa-fw mr-2 text-gray-400"></i>
              Logout
            </Button>
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default Topbar;
