import React from "react";
import { Link, Redirect } from "react-router-dom";
import { faCog } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Sidebar = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user || user.Roles === "") {
    return <Redirect to="/Login" />;
  }

  return (
    <ul
      className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
      id="accordionSidebar"
    >
      {/* Brand */}
      <Link
        className="sidebar-brand d-flex align-items-center justify-content-center"
        to="/Dashboard"
      >
        <div className="sidebar-brand-icon rotate-n-15">
          <i className="fas fa-laugh-wink"></i>
        </div>
        <div className="sidebar-brand-text mx-3">
          CRM <sup>v1.0</sup>
        </div>
      </Link>
      <hr className="sidebar-divider my-0" />

      {/* DASHBOARD */}
      <li className="nav-item">
        <Link className="nav-link" to="/Dashboard">
          <i className="fas fa-fw fa-tachometer-alt"></i>
          <span>Dashboard</span>
        </Link>
        <Link className="nav-link" to="/Dashboard/MyProfile">
          <i className="fas fa-user"></i>
          <span>My Profile</span>
        </Link>
      </li>
      <hr className="sidebar-divider" />

      {/* ADMIN */}
      {(user.role.includes("Admin")) && (
        <div>
          <div className="sidebar-heading">Admin</div>
          <li className="nav-item">
            <Link
              className="nav-link collapsed"
              to="#"
              data-toggle="collapse"
              data-target="#collapseOne"
              aria-controls="collapseOne"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-gear" viewBox="0 0 16 16">
                <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z" />
                <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z" />
              </svg>
              <span style={{marginLeft:10}}>Resource</span>
            </Link>
            <div
              id="collapseOne"
              className="collapse"
              aria-labelledby="headingThree"
              data-parent="#accordionSidebar"
            >
              <div className="bg-white py-2 collapse-inner rounded">
                <h6 className="collapse-header">Account</h6>
                <Link className="collapse-item" to="/Dashboard/Admin/AccountList">
                  Accounts
                </Link>
                {/* <Link className="collapse-item" to="/Dashboard/Admin/CompanyList">
                  Company
                </Link>
                <h6 className="collapse-header">Job & Skill</h6>
                <Link className="collapse-item" to="/Dashboard/Admin/JobList">
                  Job
                </Link>
                <Link className="collapse-item" to="/Dashboard/Admin/SkillList">
                  Skill
                </Link>
                <Link className="collapse-item" to="/Dashboard/Admin/PositionList">
                  Position
                </Link>
                <h6 className="collapse-header">Events & Interviews</h6>
                <Link className="collapse-item" to="/Dashboard/Admin/EventList">
                  Event
                </Link>
                <Link className="collapse-item" to="/Dashboard/Admin/InterviewList">
                  Interview
                </Link>
                <h6 className="collapse-header">Others</h6>
                <Link className="collapse-item" to="/Dashboard/Admin/RecruitmentList">
                  Recruitment
                </Link>
                <Link className="collapse-item" to="/Dashboard/Admin/BillingList">
                  Billing
                </Link>
                <Link className="collapse-item" to="/Dashboard/Admin/WelfareList">
                  Welfare
                </Link>
                <Link className="collapse-item" to="/Dashboard/Admin/RoleList">
                  Role
                </Link> */}
              </div>
            </div>
          </li>
          <hr className="sidebar-divider" />
        </div>
      )}

      {/* Manager */}
      {(user.role.includes("Employee")) && (
        <div>
          <div className="sidebar-heading">Employee</div>
          <li className="nav-item">
            <Link
              className="nav-link collapsed"
              to="#"
              data-toggle="collapse"
              data-target="#collapseThree"
              aria-controls="collapseThree"
            >
              <i className="fas fa-fw fa-cog"></i>
              <span>Managements</span>
            </Link>
            <div
              id="collapseThree"
              className="collapse"
              aria-labelledby="headingThree"
              data-parent="#accordionSidebar"
            >
              <div className="bg-white py-2 collapse-inner rounded">
                <h6 className="collapse-header">User Profiles</h6>
                <Link className="collapse-item" to="/Dashboard/Manager/AccountList">
                  Accounts
                </Link>
                {/* <Link className="collapse-item" to="/Dashboard/Manager/CompanyList">
                  Company
                </Link>
                <h6 className="collapse-header">Job & Skill</h6>
                <Link className="collapse-item" to="/Dashboard/Manager/JobList">
                  Job
                </Link>
                <Link className="collapse-item" to="/Dashboard/Manager/SkillList">
                  Skill
                </Link>
                <Link className="collapse-item" to="/Dashboard/Manager/PositionList">
                  Position
                </Link>
                <h6 className="collapse-header">Events & Interviews</h6>
                <Link className="collapse-item" to="/Dashboard/Manager/EventList">
                  Event
                </Link>
                <Link className="collapse-item" to="/Dashboard/Manager/InterviewList">
                  Interview
                </Link>
                <h6 className="collapse-header">Others</h6>
                <Link className="collapse-item" to="/Dashboard/Manager/RecruitmentList">
                  Recruitment
                </Link>
                <Link className="collapse-item" to="/Dashboard/Manager/BillingList">
                  Billing
                </Link>
                <Link className="collapse-item" to="/Dashboard/Manager/WelfareList">
                  Welfare
                </Link>
                <Link className="collapse-item" to="/Dashboard/Manager/RoleList">
                  Role
                </Link> */}
              </div>
            </div>
          </li>
          <hr className="sidebar-divider" />
        </div>
      )}

      {/* RECRUITER */}
      {(user.role.includes("Manager")) && (
        <div>
          <div className="sidebar-heading">Manager</div>
          <li className="nav-item">
            <Link
              className="nav-link collapsed"
              to="#"
              data-toggle="collapse"
              data-target="#collapseFive"
              aria-controls="collapseFive"
            >
             <FontAwesomeIcon style={{marginRight:"10%"}} icon={faCog} />
              <span>Manager</span>
            </Link>
            <div
              id="collapseFive"
              className="collapse"
              aria-labelledby="headingFive"
              data-parent="#accordionSidebar"
            >
              <div className="bg-white py-2 collapse-inner rounded">
                <h6 className="collapse-header">Resource</h6>
                <Link className="collapse-item"  to="/Dashboard/Manager/OpportunityList">
                  Opportunity List
                </Link>
                <Link className="collapse-item" to="/Dashboard/Manager/AppointmentList">
                  Appointment List
                </Link>
                <Link className="collapse-item" to="/Dashboard/Manager/LeadList">
                  Lead List
                </Link>
                <Link className="collapse-item" to="/Dashboard/Manager/ProductList">
                  Product List
                </Link>
                <Link className="collapse-item" to="/Dashboard/Manager/ProductOwerList">
                  Product Ower
                </Link>
                
                <Link className="collapse-item" to="/Dashboard/Manager/FeedBackList">
                  FeedBack List
                </Link>

                <Link className="collapse-item" to="/Dashboard/Manager/TaskList">
                  Task List
                </Link>

                <Link className="collapse-item" to="/Dashboard/Manager/AccountList">
                  Customer List
                </Link>

                <Link className="collapse-item" to="/Dashboard/Manager/EmployeeList">
                  Employee List
                </Link>


               

                {/* <h6 className="collapse-header">Jobs:</h6>
                <Link className="collapse-item" to="/Dashboard/Recruiter/CompanyList">
                  Company List
                </Link>
                <Link className="collapse-item" to="/Dashboard/Recruiter/EventList">
                  Event List
                </Link>
                <Link className="collapse-item" to="/Dashboard/Recruiter/InterviewList">
                  Interview List
                </Link>
                <Link className="collapse-item" to="/Dashboard/Recruiter/RecruitmentList">
                  Recruitment List
                </Link>
                <Link className="collapse-item" to="/Dashboard/Recruiter/LogList">
                  Log List
                </Link> */}
              </div>
            </div>
          </li>
          <hr className="sidebar-divider d-none d-md-block" />
        </div>
      )}
    </ul>
  );
};

export default Sidebar;