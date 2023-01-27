import React, { Component,useEffect,useState } from "react";
import CardInfo from "../../components/Cards/Info";
import ChartDonut from "../../components/Charts/Donut";
import ChartLine from "../../components/Charts/Line";
import Bar from "../../components/Charts/Bar"
import PageHeading from "../../components/PageHeading";
import { faIdCard } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, Redirect } from "react-router-dom";
import { Button } from "react-bootstrap";



const Dashboard = () => {
  // componentWillMount() {
  //   document.getElementById("body").className = "page-top";
  // }
  // const [totalCompany, setTotalCompany] = useState(0);
  // const [totalWelfare, setTotalWelfare] = useState(1);
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user || user.Roles === "") {
    return <Redirect to="/Login" />;
  }
    return (
      <>
        {(user.role.includes("Manager")) && (
          <>
            <PageHeading title="Performance dasboard" /> 
         


<li className="nav-item dropdown no-arrow"  style={{ marginTop:"-7%",float: "right", listStyle:"none"}} >
           <a 
            className="nav-link dropdown-toggle"
            href="/#"
            id="userDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
              <Button
    
    style={{ marginTop:"10%",float: "right"}}
    className="btn btn-primary" 
>   <FontAwesomeIcon icon={faIdCard} /> Action KPI</Button> 
            </a>
          {/* Dropdown - User Information */}
          <div
            className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
            aria-labelledby="userDropdown"
          >
            <Link className="dropdown-item" to="/Dashboard/MyProfile">
               Create Template

            </Link>
            <div className="dropdown-divider"></div>
            <Link className="dropdown-item" to="/Dashboard/MyProfile">
               Update Template

            </Link>
          </div>
        </li>


            <div className="row">

        
            
            <CardInfo
              title="Lead (Convertion) Ratio"
              icon="calendar"
              color="primary"
              value="17:1"
             
            > 
            
            <Link>
            </Link>
            
            </CardInfo>
            <CardInfo
              title="Leads"
              icon="calendar"
              color="primary"
              value="2.130"
            />
            <CardInfo
              title="Opportunitties"
              icon="calendar"
              color="primary"
              value="643"
            />
  
            <CardInfo
              title="Negotiation"
              icon="calendar"
              color="success"
              value="215,000"
            />
  
            <CardInfo title="Wins" icon="clipboard" color="info" value="50%" />
  
            <CardInfo
              title="Proposal"
              icon="comments"
              color="warning"
              value="18"

            />
          </div>
          <div className="row">
            <div className="col-xl-2 col-lg-4">
              <ChartDonut title="Lead-to-Opportunity Ratio"/>
            </div>
            <div className="col-xl-2 col-lg-4">
              <ChartDonut title="Opportunity-to-win Ratio" />
            </div>
            <div className="col-xl-3 col-lg-6">
              <ChartLine title="Daniel" />
            </div>
            <div className="col-xl-3 col-lg-6">
              <ChartLine title="Anna" />
            </div>
            <div className="col-xl-2 col-lg-6">
              <Bar title="Test1"/>
            </div>
          </div> 
          </>

        )}
    
       
      </>
    );
  }
export default Dashboard;
