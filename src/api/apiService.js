
import authHeader from "../redux/services/auth-header";
import axios from "axios";


/* Login */
const Login = (data) => {
  return axios.post("https://backup-dtv-crm.azurewebsites.net/api/v1/Authentication/system", data);
};

/* Logout */
const Logout = () => {
  localStorage.clear();
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


const searchAccountSystem = (query) => {
  return axios.get(`https://backup-dtv-crm.azurewebsites.net/api/v1/SystemAccount/system-account?searchString=${query}`, {
    headers: authHeader(),
  });
};

const getPublicProduct = (page,size) => {
  return axios.get(`https://backup-dtv-crm.azurewebsites.net/api/v1/Product/product?pageNumber=${page}&pageSize=${size}&filter=1%3BIsDelete`, {
    headers: authHeader(),
  });
};

const searchProduct = (query) => {
  return axios.get(`https://backup-dtv-crm.azurewebsites.net/api/v1/Product/product?searchString=${query}`, {
    headers: authHeader(),
  });
};
const searchProductOwer = (query) => {
  return axios.get(`https://backup-dtv-crm.azurewebsites.net/api/v1/ProductOwner/product-owner?searchString=${query}`, {
    headers: authHeader(),
  });
};

const searchAccountCustomer = (query) => {
  return axios.get(`https://backup-dtv-crm.azurewebsites.net/api/v1/CustomerAccount/customer-account?searchString=${query}`, {
    headers: authHeader(),
  });
};
const searchLead = (query) => {
  return axios.get(`https://backup-dtv-crm.azurewebsites.net/api/v1/Lead/lead?searchString=${query}`, {
    headers: authHeader(),
  });
};

const searchEmployee = (query) => {
  return axios.get(`https://backup-dtv-crm.azurewebsites.net/api/v1/SystemAccount/system-account?searchString=${query}&filter=2%3B3`, {
    headers: authHeader(),
  });
};

const searchAppointment = (query) => {
  return axios.get(`https://backup-dtv-crm.azurewebsites.net/api/v1/Appointment/appointment?searchString=${query}`, {
    headers: authHeader(),
  });
};

const searchTask = (query) => {
  return axios.get(`https://backup-dtv-crm.azurewebsites.net/api/v1/Task/task?searchString=${query}`, {
    headers: authHeader(),
  });
};



const getProductOwer = (page,size) => {
  return axios.get(`https://backup-dtv-crm.azurewebsites.net/api/v1/ProductOwner/product-owner?pageNumber=${page}&pageSize=${size}`, {
    headers: authHeader(),
  });
};


const createProduct = (data) => {
  return axios.post(`https://backup-dtv-crm.azurewebsites.net/api/v1/Product/product/add-without-image`,data, {
    headers: authHeader(),
  });
};

const createProductOwer = (data) => {
  return axios.post(`https://backup-dtv-crm.azurewebsites.net/api/v1/ProductOwner/product-owner/add`,data, {
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
  return axios.put(`https://backup-dtv-crm.azurewebsites.net/api/v1/Product/product/delete?id=${id}`,id,{
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
  return axios.get(`https://backup-dtv-crm.azurewebsites.net/v1/api/Enum/employee-with-number-of-task`, {
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

const getNumProductbyOwer= (id) => {
  return axios.get(`https://backup-dtv-crm.azurewebsites.net/api/v1/Product/product/product-owner/${id}`,{
  headers: authHeader(),
});

};
const getProductById = (id) => {
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

//Filter Product

const getProductNo = (page, size) => {
  return axios.get(`https://backup-dtv-crm.azurewebsites.net/api/v1/Product/product?pageNumber=${page}&pageSize=${size}&filter=15%3BNot%20open%20for%20sale`, {
    headers: authHeader(),
  });
};

const getProductOs = (page, size) => {
  return axios.get(`https://backup-dtv-crm.azurewebsites.net/api/v1/Product/product?pageNumber=${page}&pageSize=${size}&filter=15%3BOn%20sale`, {
    headers: authHeader(),
  });
};

const getProductOh = (page, size) => {
  return axios.get(`https://backup-dtv-crm.azurewebsites.net/api/v1/Product/product?pageNumber=${page}&pageSize=${size}&filter=15%3BOn%20hold`, {
    headers: authHeader(),
  });
};

const getProductDe = (page, size) => {
  return axios.get(`https://backup-dtv-crm.azurewebsites.net/api/v1/Product/product?pageNumber=${page}&pageSize=${size}&filter=15%3BDeposited`, {
    headers: authHeader(),
  });
};
const getProductSo = (page, size) => {
  return axios.get(`https://backup-dtv-crm.azurewebsites.net/api/v1/Product/product?pageNumber=${page}&pageSize=${size}&filter=15%3BSold`, {
    headers: authHeader(),
  });
};
const getProductDele = (page, size) => {
  return axios.get(`https://backup-dtv-crm.azurewebsites.net/api/v1/Product/product?pageNumber=${page}&pageSize=${size}&filter=1%3Btrue`, {
    headers: authHeader(),
  });
};

//Detail Employee
const getTaskEm = (id) => {
  return axios.get(`https://backup-dtv-crm.azurewebsites.net/api/v1/Task/task/employee/${id}`,{
  headers: authHeader(),
});
};

const getOppEm = (id) => {
  return axios.get(`https://backup-dtv-crm.azurewebsites.net/api/v1/Opportunity/opportunity/employee/${id}`,{
  headers: authHeader(),
});
};

const getAppointmEm = (id) => {
  return axios.get(`https://backup-dtv-crm.azurewebsites.net/api/v1/Appointment/appointment/employee/${id}`,{
  headers: authHeader(),
});
};

const getLeadEm = (id) => {
  return axios.get(`https://backup-dtv-crm.azurewebsites.net/api/v1/Lead/lead/employee/${id}`,{
  headers: authHeader(),
});
};
const getLeadbyID = (id) => {
  return axios.get(`https://backup-dtv-crm.azurewebsites.net/api/v1/Lead/lead/${id}`,{
  headers: authHeader(),
});
};



const getNoti = () => {
  return axios.get(`https://backup-dtv-crm.azurewebsites.net/api/v1/Notification/notification`, {
    headers: authHeader(),
  });
};


const getopportunitytLead = (id) => {
  return axios.get(`https://backup-dtv-crm.azurewebsites.net/api/v1/Opportunity/opportunity/lead/${id}`,{
  headers: authHeader(),
});
};
const getAppointLead = (id) => {
  return axios.get(`https://backup-dtv-crm.azurewebsites.net/api/v1/Appointment/appointment/lead/${id}`,{
  headers: authHeader(),
});
};

const getopportunitytCusomter = (id) => {
  return axios.get(`https://backup-dtv-crm.azurewebsites.net/api/v1/Opportunity/opportunity/customer/${id}`,{
  headers: authHeader(),
});
};

const getAppointCusomter = (id) => {
  return axios.get(`https://backup-dtv-crm.azurewebsites.net/api/v1/Appointment/appointment/customer/${id}`,{
  headers: authHeader(),
});
};
const getEmployeeTask = () => {
  return axios.get(`https://backup-dtv-crm.azurewebsites.net/v1/api/Enum/employee-with-number-of-task`,{
  headers: authHeader(),
});
};
const getEmployeeAppointment = () => {
  return axios.get(`https://backup-dtv-crm.azurewebsites.net/v1/api/Enum/employee-with-number-of-appoinment`,{
  headers: authHeader(),
});
};

export default {
  Login,
  Logout,

  //get Resource
  getAppointLead,
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
  getopportunitytLead,
  getAppointCusomter,
  getopportunitytCusomter,

  // // Companies
  //Filter
  getAppoinmentAc,
  getAppoinmentCu,
  getAppoinmentEm,
  getAppoinmentEx,
  getAppoinmentFi,
  getAppoinmentRe,
  getAppoinmentWa,
  getNoti,
  //Product
  getProductNo,
  getProductOh,
  getProductDe,
  getProductOs,
  getProductSo,
  getProductDele,

  getPublicProduct,
  getProductOwer,
  getProductById,

  createProduct,
  createProductOwer,

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
  getNumProductbyOwer,
  getEmployeeTask,
  getEmployeeAppointment,

  //Search
  searchAccountSystem,
  searchProductOwer,
  searchEmployee,
  searchAccountCustomer,
  searchLead,
  searchAppointment,
  searchTask,

  //Get Employee Detail
  getOppEm,
  getAppointmEm,
  getLeadEm,
  getTaskEm,
  getLeadbyID,
  


 
};
