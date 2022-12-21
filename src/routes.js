import React from "react";

const Dashboard = React.lazy(() => import("./pages/Dashboard/index"));
const MyProfile = React.lazy(() => import("./pages/MyProfile/MyProfile"));

// Admin
const AdminAccountList = React.lazy(() => import("./pages/Admin/Account/AccountList"));
const AdminAccountDetail = React.lazy(() => import("./pages/Admin/Account/AccountDetail"));
const CreateAccount = React.lazy(() => import("./pages/Admin/Account/CreateAccount"));
// const AdminCompanyDetail = React.lazy(() => import("./pages/Admin/Company/CompanyDetail"));

// Manager
const CustomerAccountList = React.lazy(() => import("./pages/Manager/Account/AccountList"));
const EmployeeAccountDetail = React.lazy(() => import("./pages/Manager/Employee/AccountDetail"));
const CustomerAccountDetail = React.lazy(() => import("./pages/Manager/Account/AccountDetail"));
const ProductUpdate = React.lazy(() => import("./pages/Manager/Product/Updateproduct"));
const ProductList = React.lazy(() => import("./pages/Manager/Product/ProductList"))
const ProductDetail = React.lazy(() => import("./pages/Manager/Product/ProductDetail"))
const EmployeeList = React.lazy(() => import("./pages/Manager/Employee/AccountList"))
const AppointmentList = React.lazy(() => import("./pages/Manager/Appointment/AppointmentList"))
const AppointmentDetail = React.lazy(() => import("./pages/Manager/Appointment/AppointmentDetail"))
const TaskDetail = React.lazy(() => import("./pages/Manager/Task/TaskDetail"))
const TaskCreate = React.lazy(() => import("./pages/Manager/Task/TaskCreate"))
const LeadList = React.lazy(() => import("./pages/Manager/Lead/LeadList"))
const ManagerTaskList = React.lazy(() => import("./pages/Manager/Task/TaskList"))
const ProductOwerList = React.lazy(() => import("./pages/Manager/ProductOwer/ProductOwerList"))
const ProductOwerDetail = React.lazy(() => import("./pages/Manager/ProductOwer/ProductOwerDetail"))


const routes = [
  { path: "/", exact: true, name: "Home" },
  { path: "/Dashboard", exact: true, name: "Dashboard", component: Dashboard },
  { path: "/Dashboard/MyProfile", name: "MyProfile", component: MyProfile }, 
  { path: "/Dashboard/Admin/AccountList", name: "AdminAccountList", component: AdminAccountList },
  { path: "/Dashboard/Admin/AccountDetail", name: "AdminAccountDetail", component: AdminAccountDetail },
  { path: "/Dashboard/Admin/CreateAccount", name: "CreateAccount", component: CreateAccount },
  { path: "/Dashboard/Manager/AccountList", name: "CustomerAccountList", component: CustomerAccountList },
  { path: "/Dashboard/Manager/Employee/AccountDetail", name: "EmployeeAccountDetail", component: EmployeeAccountDetail},
  { path: "/Dashboard/Manager/Account/AccountDetail", name: "CustomerAccountList", component: CustomerAccountDetail },
  { path: "/Dashboard/Manager/ProductUpdate", name: "ProductUpdate", component: ProductUpdate },
  { path: "/Dashboard/Manager/ProductList", name: "ProductList", component:ProductList },
  { path: "/Dashboard/Manager/ProductDetail", name: "ProductDetail", component:ProductDetail },
  { path: "/Dashboard/Manager/EmployeeList", name: "EmployeeList", component: EmployeeList },
  { path: "/Dashboard/Manager/AppointmentList", name: "AppointmentList", component: AppointmentList },
  { path: "/Dashboard/Manager/AppointmentDetail", name: "AppointmentDetail", component: AppointmentDetail },
  { path: "/Dashboard/Manager/TaskDetail", name: "TaskDetail", component: TaskDetail },
  { path: "/Dashboard/Manager/TaskList", name: "ManagerTaskList", component: ManagerTaskList },
  { path: "/Dashboard/Manager/TaskCreate", name: "TaskCreateList", component: TaskCreate },
  { path: "/Dashboard/Manager/LeadList", name: "LeadList", component: LeadList },
  { path: "/Dashboard/Manager/ProductOwerList", name: "ProductOwerList", component: ProductOwerList },
  { path: "/Dashboard/Manager/ProductOwerDetail", name: "ProductOwerDetail", component: ProductOwerDetail },
];

export default routes;
