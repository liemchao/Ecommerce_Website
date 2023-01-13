import React, { useState, useEffect } from "react";
import { Button, Badge } from "react-bootstrap";
import { Link, useHistory, Redirect } from "react-router-dom";
import ApiService from "../../src/api/apiService";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { faUserAlt } from '@fortawesome/free-solid-svg-icons'
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

const Topbar = () => {
  const history = useHistory();
  const user = JSON.parse(localStorage.getItem("user"));
  const [data, setData] = useState([]);
  const [totalRecords, setTotalRecords] = useState();


  async function getNoti() {

    ApiService.getNoti()
      .then((response) => {

        setTotalRecords(response.data.totalRow);
        setData(response.data.data);
        toast("You have notifiton !")
      })
      .catch((error) => {
        if (error.response) {
          // get response with a status code not in range 2xx
          console.log(error.response.data.data);
          console.log(error.response.data.status);
          console.log(error.response.data.headers);
        } else if (error.request) {
          // no response
          console.log(error.request);
        } else {
          // Something wrong in setting up the request
          console.log("Error", error.message);
        }
        console.log(error.config);
      });
  }

  useEffect(() => {
    getNoti()
  }, []);
  


  if (!user) {
    return <Redirect to="/Login" />;
  }

  const handleLogout = () => {
    ApiService.Logout();
    history.push("/Login");
  }
 
  const refreshList = () => {
    getNoti();
  };


  return (
    <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
      {/* Topbar Navbar */}
      <ul className="navbar-nav ml-auto">

        <div style={{ marginTop: 20 }} >

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
              <FontAwesomeIcon style={{ height: "70%", width: "60%", marginLeft: "10%", marginBottom: "30%" }} icon={faBell} />
              {totalRecords>34 ? (<><Badge style={{ marginTop: "-60%" }} bg="primary">{totalRecords-34}</Badge></>):(<><Badge style={{ marginTop: "-60%" }} bg="primary">{totalRecords-totalRecords+1}</Badge></>)}
             
            </a>

            <ToastContainer/>
            <div style={{ overflow: "auto", maxHeight: "15rem", scrollbarWidth: "none" }}
              className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
              aria-labelledby="userDropdown"
            >
              {/* <div className="row">
                <Button style={{ marginLeft: "10%", border: "2px solid white " }}>
                  All
                </Button>
                 
                <Button style={{ marginLeft: "10%", border: "2px solid white" }}>
                  UnRead

                </Button>

              </div> */}


              {
                data.map((x, y) =>
                <>
                  <Button
                  onClick={refreshList}
                    className="dropdown-item"
                    >
                     {x.isRead==true ? (<div style={{color:"blue"}}>
                      <strong className="me-auto">{x.title}</strong>   <small className="text-muted">{x.createDate}</small>
                    <p key={y} value={x.id}>{x.content}</p>
                    </div>):(
                     <><strong className="me-auto">{x.title}</strong>   <small className="text-muted">{x.createDate}</small>
                    <p key={y} value={x.id}>{x.content}</p></>)

                     }
                    
                  </Button>
              
                  </>

                  )
              }


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
