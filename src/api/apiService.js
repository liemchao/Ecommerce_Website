// import http from "../http-common";
import authHeader from "../redux/services/auth-header";
import axios from "axios";
// const backup="backup-"

/* Login */
const Login = (data) => {
  return axios.post("https://backup-dtv-crm.azurewebsites.net/api/v1/Authentication/system", data);
};

/* Logout */
const Logout = () => {
  localStorage.clear();
};

const searchAccountSystem = (query) => {
  return axios.get(`https://backup-dtv-crm.azurewebsites.net/api/v1/SystemAccount/system-account?searchString=${query}`, {
    headers: authHeader(),
  });
};
const getAccountSystem = (currentPage,rows) => {
  return axios.get(`https://backup-dtv-crm.azurewebsites.net/api/v1/SystemAccount/system-account?pageNumber=${currentPage}&pageSize=${rows}`, {
    headers: authHeader(),
  });
};




const getAccountById = (id) => {
   return axios.get(`https://backup-dtv-crm.azurewebsites.net/api/v1/SystemAccount/system-account/${id}`, {
     headers: authHeader(),
   });
 };

/* Update Status Account */
const updateStatusAccount = (data) => {
  return axios.put(`https://backup-dtv-crm.azurewebsites.net/api/v1/SystemAccount/system-account/update-status`,data, {
    headers: authHeader(),
  });
};

const changeUserRole = (data) => {
  return axios.put(`https://backup-dtv-crm.azurewebsites.net/api/v1/SystemAccount/system-account/adjusting-role`,data, {
    headers: authHeader(),
  });
};

// const getProfile = (data) => {
//   return axios.put(`https://backup-dtv-crm.azurewebsites.net/api/v1/SystemAccount/system-account/adjusting-role`,data, {
//     headers: authHeader(),
//   });
// };

// const getAdminLog = () => {
//   return http.get(`/api/UserAccounts/AdminLog`, { headers: authHeader() });
// };

// const viewCandidate = (data) => {
//   return http.post("/api/UserAccounts/RecruiterViewCandidate", data);
// };

const createAccount = (data) => {
  return axios.put(`https://backup-dtv-crm.azurewebsites.net/api/v1/SystemAccount/system-account/add`,data, {
    headers: authHeader(),
  });
};

const getAccountCustomer = (currentPage,rows) => {
  return axios.get(`https://backup-dtv-crm.azurewebsites.net/api/v1/CustomerAccount/customer-account?pageNumber=${currentPage}&pageSize=${rows}`, {
    headers: authHeader(),
  });
};

const getTask = (currentPage , rows) => {
  return axios.get(`https://backup-dtv-crm.azurewebsites.net/api/v1/Task/task?pageNumber=${currentPage}&pageSize=${rows}`, {
    headers: authHeader(),
  });
};

const getAccountManager = (currentPage,rows) => {
  return axios.get(`https://backup-dtv-crm.azurewebsites.net/api/v1/SystemAccount/system-account?pageNumber=${currentPage}&pageSize=${rows}&filter=2%3B2`, {
    headers: authHeader(),
  });
};
const getAccountAdmin = (currentPage,rows) => {
  return axios.get(`https://backup-dtv-crm.azurewebsites.net/api/v1/SystemAccount/system-account?pageNumber=${currentPage}&pageSize=${rows}&filter=2%3B1`, {
    headers: authHeader(),
  });
};
const getAccountEmployee = (currentPage,rows) => {
  return axios.get(`https://backup-dtv-crm.azurewebsites.net/api/v1/SystemAccount/system-account?pageNumber=${currentPage}&pageSize=${rows}&filter=2%3B3`, {
    headers: authHeader(),
  });
};







// const createAccountByFile = (data) => {
//   return http.post("/api/UserAccounts/file", data);
// };

// const updateProfile = (data) => {
//   return http.put(`/api/UserAccounts/profile`, data);
// };

// const changeUserStatus = (id, data) => {
//   return http.put(`/api/UserAccounts/${id}`, data);
// };

// const changeUserRole = (data) => {
//   return http.put("/api/UserAccounts/role", data);
// };


// /* Register */
// const createRegister = (data) => {
//   return http.post(`/api/Register`, data);
// };

// const resendVerifyCode = (data) => {
//   return http.post(`/api/Register/resend`, data);
// };

// const resetPass = (data) => {
//   return http.post(`/api/Register/resetPass`, data);
// };

// const changePassword = (data) => {
//   return http.put(`/api/Register/change-pass`, data);};

// const confirmRegister = (data) => {
//   return http.put(`/api/Register/confirm`, data);
// };

// const updateAccount = (data) => {
//   return http.put(`/api/UserAccounts/profile`, data, { headers: authHeader() });
// };

// const updatePassword = (data) => {
//   return http.put(`/api/UserAccounts/password`, data, { headers: authHeader() });
// };

// /* Companies */
// // Roles = "Admin, Staff"
// const getCompanies = (ele, page) => {
//   return http.get(`/api/Companies/${ele}/${page}`);
// };
// // Roles = "Recruiter, Candidate, Guest"
// const getPublicCompanies = (ele, page) => {
//   return http.get(`/api/Companies/page/${ele}/${page}`);
// };
// // Roles = "Guest"
// const getCompanyById = (id) => {
//   return http.get(`/api/Companies/${id}`);
// };
// // Roles = "Admin, Staff"
// const getEmloyeeInCompany = (id, ele, page) => {
//   return http.get(`/api/Companies/${id}/${ele}/${page}`);
// };
// // Roles = "Admin, Staff, Recruiter"
// const getMyCompany = (ele, page) => {
//   return http.get(`/api/Companies/my-company/${ele}/${page}`); // recruiter get their company
// };
// // Roles = "Recruiter"
// const getLogByRecruiter = (id) => {
//   return http.get(`/api/Companies/ViewLogByRecruiters/${id}`);
// };
// // Roles = "Admin, Staff, Recruiter"
// const createCompany = (data) => {
//   return http.post("/api/Companies", data);
// };
// // Roles = "Admin, Staff"
// const updateCompany = (data) => {
//   return http.put("/api/Companies", data);
// };
// // Roles = "Admin, Staff"
// const changeCompanyStatus = (id) => {
//   return http.put(`/api/Companies/${id}`);
// };
// // Roles = "Admin, Staff, Recruiter"
// const updateCompanyByCreatorId = (data) => {
//   return http.put(`/api/Companies/my-company`, data);
// };
// // Roles = "Admin, Staff, Recruiter"
// const disableCompanyByCreatorId = (id) => {
//   return http.put(`/api/Companies/my-company/${id}`);
// };
// // Roles = "Admin"
// const deleteCompany = (data) => {
//   return http.delete(`/api/Companies/deletebyid`, data);
// };

// /* Product */
const getPublicProduct = (page,size) => {
  return axios.get(`https://backup-dtv-crm.azurewebsites.net/api/v1/Product/product?pageNumber=${page}&pageSize=${size}`, {
    headers: authHeader(),
  });
};

const searchProduct = (query) => {
  return axios.get(`https://backup-dtv-crm.azurewebsites.net/api/v1/Product/product?searchString=${query}`, {
    headers: authHeader(),
  });
};


const getProductOwer = (page,size) => {
  return axios.get(`https://backup-dtv-crm.azurewebsites.net/api/v1/ProductOwner/product-owner?pageNumber=${page}&pageSize=${size}`, {
    headers: authHeader(),
  });
};

// const getProductList = (ele, page) => {
//   return http.get(`/api/Products/page/${ele}/${page}`); // lấy tất cả các Product cho Admin, Staff, Recruiter
// };

// const getProductById = (id) => {
//   return http.get(`/api/Products/${id}`);
// };

// const searchForProduct = (key, pageIndex, pageSize) => {
//   return http.get(`/api/Products/paging?key=${key}&PageIndex=${pageIndex}&PageSize=${pageSize}`);
// };

const createProduct = (data) => {
  return axios.post(`https://backup-dtv-crm.azurewebsites.net/api/v1/Product/product/add-without-image`,data, {
    headers: authHeader(),
  });
};

 const updateProduct = (data) => {
  return axios.put(`https://backup-dtv-crm.azurewebsites.net/api/v1/Product/product/update`,data, {
    headers: authHeader(),
  });
 };

// const changeProductStatus = (id, data) => {
//   return axios.get(`https://dtv-crm.azurewebsites.net/api/v1/SystemAccount/system-account/`, {
//     headers: authHeader(),
//   });
// };

const deleteProduct = (id) => {
  return axios.get(`https://backup-dtv-crm.azurewebsites.net/api/v1/SystemAccount/system-account/${id}`, {
    headers: authHeader(),
  });
};
const getFoveritList = (id) => {
  return axios.get(`https://backup-dtv-crm.azurewebsites.net/api/v1/Product/product/number-of-farvorite?id=${id}`, {
    headers: authHeader(),
  });
};
const getViewProduct = (id) => {
  return axios.get(`https://backup-dtv-crm.azurewebsites.net/api/v1/Product/product/number-of-view?id=${id}`, {
    headers: authHeader(),
  });
};
const getidCategory = () => {
  return axios.get(`https://backup-dtv-crm.azurewebsites.net/v1/api/Enum/product-category`, {
    headers: authHeader(),
  });
};

const getUniti = () => {
  return axios.get(`https://backup-dtv-crm.azurewebsites.net/v1/api/Enum/product-utilities`, {
    headers: authHeader(),
  });
};
const getDirection = () => {
  return axios.get(`https://backup-dtv-crm.azurewebsites.net/v1/api/Enum/product-direction`, {
    headers: authHeader(),
  });
};

const getidProductOwer = () => {
  return axios.get(`https://backup-dtv-crm.azurewebsites.net/v1/api/Enum/product-owner`, {
    headers: authHeader(),
  });
};

const getProductStatus = () => {
  return axios.get(`https://backup-dtv-crm.azurewebsites.net/v1/api/Enum/product-status`, {
    headers: authHeader(),
  });
};

const getAppoinment = (page, size) => {
  return axios.get(`https://backup-dtv-crm.azurewebsites.net/api/v1/Appointment/appointment?pageNumber=${page}&pageSize=${size}&sort=2%3Bfalse`, {
    headers: authHeader(),
  });
};

const getEmployee = () => {
  return axios.get(`https://backup-dtv-crm.azurewebsites.net/v1/api/Enum/employee`, {
    headers: authHeader(),
  });
};

const AssAppointment = (data) => {
  return axios.put(`https://backup-dtv-crm.azurewebsites.net/api/v1/Appointment/appointment/assign`,data, {
    headers: authHeader(),
  });
};


const getLead = (page,size) => {
  return axios.get(`https://backup-dtv-crm.azurewebsites.net/api/v1/Lead/lead?pageNumber=${page}&pageSize=${size}`, {
    headers: authHeader(),
  });
};
const getNewLead = (page,size) => {
  return axios.get(`https://backup-dtv-crm.azurewebsites.net/api/v1/Lead/lead?pageNumber=${page}&pageSize=${size}&filter=3%3BNew`,{
    headers: authHeader(),
  });
};

const getOpportunity  = (page,size) => {
  return axios.get(`https://backup-dtv-crm.azurewebsites.net/api/v1/Opportunity/opportunity?pageNumber=${page}&pageSize=${size}`, {
    headers: authHeader(),
  });
};

const getFeedBack  = (page,size) => {
  return axios.get(`https://backup-dtv-crm.azurewebsites.net/api/v1/Feedback/feedback?pageNumber=${page}&pageSize=${size}`, {
    headers: authHeader(),
  });
};


// /* Skills */
const getNameLead = (id) => {
  return axios.get(`https://backup-dtv-crm.azurewebsites.net/api/v1/Lead/lead/${id}`,{
  headers: authHeader(),
});
};


const getProvie = () => {
  return axios.get(`https://vapi.vnappmob.com/api/province`
);
};
const getHistory= (id) => {
  return axios.get(`https://backup-dtv-crm.azurewebsites.net/api/v1/Product/product/customer-history-list/${id}`,{
  headers: authHeader(),
});
};
const getProductById= (id) => {
  return axios.get(`https://backup-dtv-crm.azurewebsites.net/api/v1/Product/product/${id}`,{
  headers: authHeader(),
});
};
const getFavoirteProduct= (id) => {
  return axios.get(`https://backup-dtv-crm.azurewebsites.net/api/v1/Product/product/customer-favorite-list/${id}`,{
  headers: authHeader(),
});
};
const getDistrict= (id) => {
  return axios.get(`https://vapi.vnappmob.com/api/province/district/${id}`,{
  headers: authHeader(),
});
};

//Filter Appointment


const getAppoinmentWa = (page, size) => {
  return axios.get(`https://backup-dtv-crm.azurewebsites.net/api/v1/Appointment/appointment?pageNumber=${page}&pageSize=${size}&sort=2%3Bfalse&filter=7%3BWaiting`, {
    headers: authHeader(),
  });
};

const getAppoinmentAc = (page, size) => {
  return axios.get(`https://backup-dtv-crm.azurewebsites.net/api/v1/Appointment/appointment?pageNumber=${page}&pageSize=${size}&sort=2%3Bfalse&filter=7%3BAccepted`, {
    headers: authHeader(),
  });
};

const getAppoinmentCu = (page, size) => {
  return axios.get(`https://backup-dtv-crm.azurewebsites.net/api/v1/Appointment/appointment?pageNumber=${page}&pageSize=${size}&sort=2%3Bfalse&filter=7%3BCustomer%20Canceled`, {
    headers: authHeader(),
  });
};

const getAppoinmentEm = (page, size) => {
  return axios.get(`https://backup-dtv-crm.azurewebsites.net/api/v1/Appointment/appointment?pageNumber=${page}&pageSize=${size}&sort=2%3Bfalse&filter=7%3BEmployee%20Canceled`, {
    headers: authHeader(),
  });
};

const getAppoinmentRe = (page, size) => {
  return axios.get(`https://backup-dtv-crm.azurewebsites.net/api/v1/Appointment/appointment?pageNumber=${page}&pageSize=${size}&sort=2%3Bfalse&filter=7%3BRejected`, {
    headers: authHeader(),
  });
};

const getAppoinmentEx = (page, size) => {
  return axios.get(`https://backup-dtv-crm.azurewebsites.net/api/v1/Appointment/appointment?pageNumber=${page}&pageSize=${size}&sort=2%3Bfalse&filter=7%3BExpired`, {
    headers: authHeader(),
  });
};
const getAppoinmentFi = (page, size) => {
  return axios.get(`https://backup-dtv-crm.azurewebsites.net/api/v1/Appointment/appointment?pageNumber=${page}&pageSize=${size}&sort=2%3Bfalse&filter=7%3BFinished`, {
    headers: authHeader(),
  });
};

const getNoti = () => {
  return axios.get(`https://backup-dtv-crm.azurewebsites.net/api/v1/Notification/notification`, {
    headers: authHeader(),
  });
};






// const getSkillList = (ele, page) => {
//   return http.get(`/api/Skills/${ele}/${page}`); // lấy tất cả skills dành cho admin , staff
// };

// const getSkillById = (id) => {
//   return http.get(`/api/Skills/${id}`);
// };

// const createSkill = (data) => {
//   return http.post("/api/Skills", data);
// };

// const updateSkill = (data) => {
//   return http.put("/api/Skills", data);
// };

// const changeSkillStatus = (id) => {
//   return http.put(`/api/Skills/${id}`);
// };

// const deleteSkill = (id) => {
//   return http.delete(`/api/Skills/${id}`);
// };

// /* Positions */
// const getPosition = (ele, page) => {
//   return http.get(`/Positions/${ele}/${page}`);
// };

// const getAllPosition = () => {
//   return http.get(`/Positions`);
// };

// const createPosition = (data) => {
//   return http.post("/Positions", data);
// };

// const updatePosition = (id, data) => {
//   return http.put(`/Positions/${id}`, data);
// };

// const deletePosition = (id) => {
//   return http.delete(`/Positions/${id}`);
// };

// /* Events */
// const getEvent = (ele, page) => {
//   return http.get(`/api/Events/${ele}/${page}`); // lấy tất cả envet cho mọi role
// };

// const getEventById = (id) => {
//   return http.get(`/api/Events/${id}`);
// };

// const createEvent = (data) => {
//   return http.post("/api/Events", data);
// };

// const getEventAttendant = (data) => {
//   return http.post("/api/Events/attend", data);
// };

// const getUserInEvent = (data) => {
//   return http.post("/api/Events/accInEvent", data);
// };

// const viewAttendedEvent = (data) => {
//   return http.post("/api/Events/EventByAccEmail", data);
// };

// const getEventInCompany = (data) => {
//   return http.post("/api/Events/getEventInCompany", data);
// };

// const updateEvent = (data) => {
//   return http.put("/api/Events", data);
// };

// const deleteEvent = (id) => {
//   return http.delete(`/api/Events/${id}`);
// };

// const getAccInEvent = (data) => {
//   return http.post("/api/Events/accInEvent", data, { headers: authHeader() });
// };

// /* Interviews */
// const getInterview = (ele, page) => {
//   return http.get(`/api/Interviews/${ele}/${page}`);
// };

// const getInterviewById = (id) => {
//   return http.get(`/api/Interviews/${id}`);
// };

// const updateInterview = (data) => {
//   return http.put(`/api/Interviews`, data);
// };

// const createInterview = (data) => {
//   return http.post("/api/Interviews", data);
// }
// ;
// const getInterviewByCompany = (page, data) => {
//   return http.post(`/api/Interviews/GetInterviewByCompanyId/${page}`, data);
// };

// const deleteInterview = (data) => {
//   return http.delete(`/api/Interviews`, data);
// };

// /* InterviewDetail */
// const updateInterviewDetail = (data) => {
//   return http.put(`/api/InterviewDetails`, data);
// };

// const createInterviewDetail = (data) => {
//   return http.post(`/api/InterviewDetails`, data);
// };

// const deleteInterviewDetail = (data) => {
//   return http.delete(`/api/InterviewDetails`, data);
// };

// const getInterviewDetail = (id, ele, page) => {
//   return http.get(`/api/Interviews/${id}/${ele}/${page}`, { headers: authHeader() });
// };

// /* Welfares */

// const getAllWelfare = () => {
//   return http.get("/Welfare", { headers: authHeader() });
// };

// const getWelfareById = (id) => {
//   return http.get(`/Welfare/${id}`);
// };

// const recruiterGetWelfareList = (page) => {
//   return http.get(`/Welfare/RecruiterGetWelfaresList/${page}`);
// };

// const createWelfare = (data) => {
//   return http.post("/Welfare", data);
// };

// const updateWelfare = (id) => {
//   return http.put(`/Welfare/${id}`);
// };

// const deleteWelfare = (id) => {
//   return http.delete(`/Welfare/${id}`);
// };

// /* UserRoles */
// const getUserRoles = (ele, page) => {
//   return http.get(`/api/UserRoles/${ele}/${page}`);
// };

// const getUserRolesById = (id) => {
//   return http.get(`/api/UserRoles/${id}`);
// };

// const createUserRoles = (data) => {
//   return http.post("/UserRoles", data);
// };

// const updateUserRolesStatus = (id) => {
//   return http.put(`/api/UserRoles/${id}`);
// };

// const updateUserRoles = (data) => {
//   return http.put(`/api/UserRoles`, data);
// };

// const deleteUserRoles = (id) => {
//   return http.delete(`/api/UserRoles/${id}`);
// };

// /* UserPayments */
// const getPayments = (page) => {
//   return http.get(`/api/UserPayments/${page}`);
// };

// const getPaymentsById = (id) => {
//   return http.get(`/api/UserPayments/${id}`);
// };

// const createPayments = (data) => {
//   return http.post("/api/UserPayments", data);
// };

// const updatePayments = (data) => {
//   return http.put(`/api/UserPayments`, data);
// };

// const changePaymentStatus = (id) => {
//   return http.put(`/api/UserPayments/${id}`);
// };

// const deletePayments = (id) => {
//   return http.delete(`/api/UserPayments/${id}`);
// };

// /* Applies */
// //Roles = "Admin,Staff,Recruiter"
// const getCandidateInRecruitment = (id, ele, page) => {
//   return http.post(`/api/Applies/${id}/${ele}/${page}`);
// };

// const createApply = (data) => {
//   return http.post(`/api/Applies`, data);
// };

// const deleteApply = (id) => {
//   return http.delete(`/api/Applies/${id}`);
// };

// /* Attend */
// const getAttends = () => {
//   return http.get(`/api/Attends`);
// };

// const createAttend = (data) => {
//   return http.post("/api/Attends/add-user", data);
// };

// const applyAttendToEvent = (data) => {
//   return http.post(`/api/Attends`,data);
// };

// const addAttendedUser = (id, data) => {
//   return http.put(`/api/Attends/${id}`, data);
// };

// const deleteAttend = (id) => {
//   return http.delete(`/api/Attends/${id}`);
// };

// /* Works */
// const getWorks = (page) => {
//   return http.get(`/api/Works/${page}`);
// };

// const getWorksById = (id) => {
//   return http.get(`/api/Works/getWorksById/${id}`);
// };

// const createWorks = (id, data) => {
//   return http.post(`/api/Works/${id}`, data);
// };

// const updateWorks = (id, data) => {
//   return http.put(`/api/Works/${id}`, data);
// };

// const deleteWorks = (id) => {
//   return http.delete(`/api/Works/${id}`);
// };

// /* Recruitments */
// const getRecruitments = (ele, page) => {
//   return http.get(`/api/Recruitments/${ele}/${page}`);
// };

// const getRecruitmentsById = (id) => {
//   return http.get(`/api/Recruitments/${id}`);
// };

// const createRecruitments = (data) => {
//   return http.post("/api/Recruitments", data);
// };

// const updateRecruitments = (data) => {
//   return http.put(`/api/Recruitments`, data);
// };

// const deleteRecruitments = (data) => {
//   return http.delete(`/api/Recruitments`, data);
// };

// const getAppliedCandidate = (page, data) => {
//   return http.post(
//     `/api/Recruitments/GetAppliedCandidatetInRecruitment/${page}`, data
//   );
// };

// const getRecruitmentsByCompanyId = (data) => {
//   return http.post(`/api/Recruitments/GetRecruitmentsByCompanyId`, data);
// };

// /* Requirements */
// const getRequirements = (ele, page) => {
//   return http.get(`/api/Requirements/${ele}/${page}`);
// };

// const getRequirementsById = (id) => {
//   return http.get(`/api/Requirements/${id}`);
// };

// const getRequirementsByRecruitmentId = (id) => {
//   return http.get(`/api/Requirements/Requirement/${id}`);
// };

// const createRequirements = (id ,data) => {
//   return http.post(`api/Requirements?userID=${id}`, data);
// };

// const updateRequirements = (data) => {
//   return http.put(`/api/Requirements`, data);
// };

// const deleteRequirements = (data) => {
//   return http.delete(`/api/Requirements`, data);
// };

// /* SkillRequires */
// const getSkillRequires = (ele, page) => {
//   return http.get(`/api/SkillRequires/${ele}/${page}`);
// };

// const getSkillRequiresById = (id) => {
//   return http.get(`/api/SkillRequires/${id}`);
// };

// const getSkillRequiresByRecruitmentId = (id) => {
//   return http.get(`/api/SkillRequires/Skill/${id}`);
// };

// const createSkillRequires = (data) => {
//   return http.post("api/SkillRequires", data);
// };

// const updateSkillRequires = (data) => {
//   return http.put(`/api/SkillRequires`, data);
// };

// const deleteSkillRequires = (data) => {
//   return http.delete(`/api/SkillRequires`, data);
// };

// /* Invoices */
// const getInvoices = (ele, page) => {
//   return http.get(`/api/Invoices/${ele}/${page}`);
// };

// const getInvoicebyAccID = (ele, page) => {
//   return http.get(`/api/Invoices/my_invoice/${ele}/${page}`);
// };

// const getInvoicesById = (id) => {
//   return http.get(`/api/Invoices/${id}`);
// };

// const createInvoices = (data) => {
//   return http.post("api/Invoices", data);
// };

// const updateInvoices = (data) => {
//   return http.put(`/api/Invoices`, data);
// };

// const deleteInvoices = (data) => {
//   return http.delete(`/api/Invoices`, data);
// };

// /* HasWelfares */
// const getHasWelfares = (page) => {
//   return http.get(`/api/HasWelfares/${page}`);
// };

// const getHasWelfaresByRecruitmentId = (id) => {
//   return http.get(`/Welfare/Welfare/${id}`);
// };

// const getHasWelfaresById = (id) => {
//   return http.get(`/api/HasWelfares/GetWelfareById/${id}`);
// };

// const updateHasWelfare = (data) => {
//   return http.put(`/api/HasWelfares`, data);
// };

// const createHasWelfare = (data) => {
//   return http.post(`/api/HasWelfares`, data);
// };

// const deleteHasWelfare = (data) => {
//   return http.delete(`/api/HasWelfares`, data);
// };

export default {
  Login,
  Logout,

  // HasWelfare
  // getHasWelfares,
  // getHasWelfaresById,
  // updateHasWelfare,
  // createHasWelfare,
  // deleteHasWelfare,
  // getHasWelfaresByRecruitmentId,

  // // Invoices
  // getInvoices,
  // getInvoicesById,
  // getInvoicebyAccID,
  // createInvoices,
  // updateInvoices,
  // deleteInvoices,

  // // SkillRequires
  // getSkillRequires,
  // getSkillRequiresById,
  // createSkillRequires,
  // updateSkillRequires,
  // deleteSkillRequires,
  // getSkillRequiresByRecruitmentId,

  // // Requirements
  // getRequirements,
  // getRequirementsById,
  // createRequirements,
  // updateRequirements,
  // deleteRequirements,
  // getRequirementsByRecruitmentId,

  // // Recruitments
  // getRecruitments,
  // getRecruitmentsById,
  // createRecruitments,
  // updateRecruitments,
  // deleteRecruitments,
  // getAppliedCandidate,
  // getRecruitmentsByCompanyId,

  // // Works
  // getWorks,
  // getWorksById,
  // createWorks,
  // updateWorks,
  // deleteWorks,

  // // Attend
  // getAttends,
  // applyAttendToEvent,


  // // Applies
  // getCandidateInRecruitment,
  // createApply,
  // deleteApply,

  // // Account
  // getAccountCustomer,
  getAccountById,
  getAccountSystem,
  updateStatusAccount,
  changeUserRole,
  getViewProduct,
  createAccount,
  getAccountCustomer,
  getFoveritList,
  getProductStatus,
  getAppoinment,
  getEmployee,
  AssAppointment,
  getUniti,
  getDirection,
  getAccountAdmin,
  getAccountEmployee,
  getAccountManager,
  getFeedBack,
  getDistrict,

 
  // updateProfile,
  // updateAccount,
  // updatePassword,
  // changeUserStatus,
  // changeUserRole,

  // // Register
  // createRegister,
  // resendVerifyCode,
  // resetPass,
  // confirmRegister,
  // changePassword,

  // // Companies
  //Filter
  getAppoinmentAc,
  getAppoinmentCu,
  getAppoinmentEm,
  getAppoinmentEx,
  getAppoinmentFi,
  getAppoinmentRe,
  getAppoinmentWa,
  searchAccountSystem,
  getNoti,

  // // Products
  getPublicProduct,
  getProductOwer,
  getProductById,
  // getProductList,
  // getProductById,
  // searchForProduct,
  createProduct,
  // changeProductStatus,
  searchProduct,
  updateProduct,
  deleteProduct,
  getTask,
  getidCategory,
  getidProductOwer,
  getLead,
  getNewLead,
  getNameLead,
  getProvie,
  getOpportunity,
  getHistory,
  getFavoirteProduct,
  // // Skills
  // getPublicSkill,
  // getSkillList,
  // getSkillById,
  // createSkill,
  // updateSkill,
  // changeSkillStatus,
  // deleteSkill,

  // // Positions
  // getPosition,
  // getAllPosition,
  // createPosition,
  // updatePosition,
  // deletePosition,

  // // Events
  // getEvent,
  // getEventById,
  // getEventAttendant,
  // getUserInEvent,
  // viewAttendedEvent,
  // getEventInCompany,
  // createEvent,
  // updateEvent,
  // deleteEvent,
  // getAccInEvent,

  // // Interviews
  // getInterview,
  // getInterviewById,
  // getInterviewDetail,
  // getInterviewByCompany,
  // createInterview,
  // updateInterview,
  // deleteInterview,

  // /* InterviewDetail */
  // updateInterviewDetail,
  // createInterviewDetail,
  // deleteInterviewDetail,

  // // Welfares
  // getAllWelfare,
  // getWelfareById,
  // recruiterGetWelfareList,
  // createWelfare,
  // updateWelfare,
  // deleteWelfare,

  // // UserRoles
  // getUserRoles,
  // getUserRolesById,
  // updateUserRolesStatus,
  // createUserRoles,
  // updateUserRoles,
  // deleteUserRoles,

  // // UserPayments
  // getPayments,
  // getPaymentsById,
  // createPayments,
  // updatePayments,
  // deletePayments,
  // changePaymentStatus,
};
