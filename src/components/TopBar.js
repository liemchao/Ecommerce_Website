import React from "react";
import { Button,Badge} from "react-bootstrap";
import { Link, useHistory, Redirect } from "react-router-dom";
import ApiService from "../../src/api/apiService";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { faUserAlt } from '@fortawesome/free-solid-svg-icons'

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
      
      <div style={{marginTop:20}} >

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
            <FontAwesomeIcon  style={{height:"70%", width:"60%", marginLeft:"10%", marginBottom:"30%"}}icon={faBell}/>
            <Badge style={{marginTop:"-60%"}}bg="primary">1</Badge>
             </a>
            

             <div
            className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
            aria-labelledby="userDropdown"
          >
            <Button
              onClick={handleLogout}
              className="dropdown-item"
            >
              <i className="fas fa-sign-out-alt fnoti_imagea-sm fa-fw mr-2 text-gray-400"></i>
              You have new anpointment
            </Button>
          </div>



  </li>

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
             <FontAwesomeIcon icon={faUserAlt}></FontAwesomeIcon>  Profile
             
            </Link>
            <div className="dropdown-divider"></div>
            <Button
              onClick={handleLogout}
              className="dropdown-item"
            >
                 <FontAwesomeIcon icon={faSignOutAlt}></FontAwesomeIcon> Logout
              
            </Button>
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default Topbar;
