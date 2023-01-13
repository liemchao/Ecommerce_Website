// import React, { useEffect, useState } from "react";
// import ApiService from "../../api/apiService";
// import "./MyProfile.css";

// export default function FormChangePassword(rowData) {

//     const [loading, setLoading] = useState(false);
//     const [errMsg, setErrMsg] = useState("");
//     const [successMsg, setSuccessMsg] = useState("");
  
  
//     const [user, setUser] = useState({});
   
  
//     useEffect(() => {
//       setUser(rowData.rowData)
//     }, [rowData.rowData]);
    
//     async function updateInfo() {
    
//       setLoading(true);
  
//       let updateData = {
//         id:user.id,
//         fullname: user.fullName,
//         email: user.email,
//         phone: user.phone,
//         gender: Boolean(user.gender),
//         dob:user.dob
       
//       };
//       console.log(updateData)
  
//       ApiService.updateProFile(updateData)
//         .then((response) => {
//           setSuccessMsg("Update Profile Successfully!");
//           setLoading(false);
//         })
//         .catch((error) => {
//           const resMessage =
//             (error.response &&
//               error.response.data &&
//               error.response.data.message) ||
//             error.message ||
//             error.toString();
  
//           setErrMsg(resMessage);
//           setLoading(false);
//         });
//     }


//     return (
//         <div>
//             <form onSubmit={handlePassword}>
//                 <div className="card-body">
//                     <div className="row mb-3">
//                         <div className="col-sm-3">
//                             <h6 className="mb-0">Old Password</h6>
//                         </div>
//                         <div className="col-sm-9 text-secondary">
//                             <input
//                                 type="password"
//                                 className="form-control"
//                                 name="oldPassword"
//                                 value={password.oldPassword}
//                                 required
//                                 onChange={handleChange}
//                             />
//                         </div>
//                     </div>
//                     <div className="row mb-3">
//                         <div className="col-sm-3">
//                             <h6 className="mb-0">New Password</h6>
//                         </div>
//                         <div className="col-sm-9 text-secondary">
//                             <input
//                                 type="password"
//                                 className="form-control"
//                                 name="newPassword"
//                                 value={password.newPassword}
//                                 required
//                                 onChange={handleChange}
//                             />
//                         </div>
//                     </div>
//                     <div className="row mb-3">
//                         <div className="col-sm-3">
//                             <h6 className="mb-0">Confirm Password</h6>
//                         </div>
//                         <div className="col-sm-9 text-secondary">
//                             <input
//                                 type="password"
//                                 className="form-control"
//                                 name="confirmPassword"
//                                 value={password.confirmPassword}
//                                 onChange={handleChange}
//                             />
//                         </div>
//                     </div>
//                     <div className="row">
//                         <div className="col-sm-3" />
//                         <div className="col-sm-9 text-secondary">
//                             <button
//                                 type="submit"
//                                 className="btn btn-primary px-4"
//                             >
//                                 Change password
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </form>
//         </div>
//     )
// }
