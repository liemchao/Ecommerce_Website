import React from "react";
import { Link, Redirect } from "react-router-dom";

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
              <i className="fas fa-fw fa-cog"></i>
              <span>Resource</span>
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
              <i className="fas fa-fw fa-cog"></i>
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
                <Link className="collapse-item" to="/Dashboard/Manager/ProductList">
                  Product
                </Link>
                <Link className="collapse-item" to="/Dashboard/Manager/ProductList">
                  Product Ower
                </Link>
                <Link className="collapse-item" to="/Dashboard/Manager/ProductList">
                Customer Behavior
                </Link>

                <Link className="collapse-item" to="/Dashboard/Manager/AccountList">
                 Customer
                </Link>

                 <Link className="collapse-item" to="/Dashboard/Manager/EmployeeList">
                 Employee
                </Link> 

                <Link className="collapse-item" to="/Dashboard/Manager/TaskList">
                 Task
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
