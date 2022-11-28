// import React, { useEffect, useState } from "react";
// import Modal from "react-modal";

// import { InputText } from "primereact/inputtext";
// import { InputTextarea } from "primereact/inputtextarea";
// import { Button } from "primereact/button";
// import { FileUpload } from "primereact/fileupload";

// import ApiService from "../../../api/ApiService";
// import { app } from "./../../../firebase/firebase";

// export default function CompanyUpdate({ rowData, refreshList }) {
//   const [modalIsOpen, setModalIsOpen] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [errMsg, setErrMsg] = useState("");
//   const [successMsg, setSuccessMsg] = useState("");
//   const [imgMesage, setImgMesage] = useState("");
//   const [file, setFile] = useState([]);
//   const [company, setCompany] = useState({
//     id: rowData.id,
//     image: rowData.image,
//     name: rowData.name,
//     email: rowData.email,
//     address: rowData.address,
//     phone: rowData.phone,
//     status: rowData.status,
//     description: rowData.description,
//   });

//   var validExt = ["jpg", "png", "jpeg", "JPG", "PNG", "JPEG"];

//   useEffect(() => {
//     setCompany(rowData)
//   }, [rowData]);

//   async function updateInfo() {
//     setLoading(true);

//     let updateData = {
//       id: company.id,
//       name: company.name,
//       image: company.image,
//       email: company.email,
//       address: company.address,
//       phone: company.phone,
//       description: company.description,
//     };

//     ApiService.updateCompany(updateData)
//       .then((response) => {
//         setSuccessMsg("Update successfully!");
//         setLoading(false);
//       })
//       .catch((error) => {
//         const resMessage =
//           (error.response &&
//             error.response.data &&
//             error.response.data.message) ||
//           error.message ||
//           error.toString();

//         setErrMsg(resMessage);
//         setLoading(false);
//       });
//   }

//   async function updateStatus() {
//     setLoading(true);

//     ApiService.changeCompanyStatus(rowData.id)
//       .then((response) => {
//         setSuccessMsg("Status change successfully!");
//         setLoading(false);
//       })
//       .catch((error) => {
//         const resMessage =
//           (error.response &&
//             error.response.data &&
//             error.response.data.message) ||
//           error.message ||
//           error.toString();

//         setErrMsg(resMessage);
//         setLoading(false);
//       });
//   }

//   const validation = (file) => {
//     if (file != null) {
//       // get index of .
//       var pos_of_dot = file.name.lastIndexOf(".") + 1;
//       // get the string after index of .
//       var img_ext = file.name.substring(pos_of_dot);

//       var result = validExt.includes(img_ext);

//       if (result == false) {
//         setImgMesage("Selected File Is Not Image......");
//         document.getElementById("image").value = "";
//         return false;
//       } else {
//         setImgMesage("");
//       }
//     }
//   };

//   const handleClose = (e) => {
//     e.preventDefault();
//     window.location.reload();
//   }
  
//   const onchangeImg = async (e) => {
//     setFile(e.target.files[0]);
//     validation(e.target.files[0]);
//   };

//   const handleOpenModal = (e) => {
//     e.preventDefault();
//     setErrMsg("");
//     setSuccessMsg("");
//     setImgMesage("");
//     setModalIsOpen(true);
//   };

//   const handleChangeStatus = async (e) => {
//     e.preventDefault();
//     updateStatus();
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     updateInfo();
//   };

//   return (
//     <div>
//       <a href="#!" onClick={handleOpenModal} style={{ paddingRight: "15px" }}>
//         <i className="fas fa-edit fa"></i>
//       </a>

//       <Modal
//         isOpen={modalIsOpen}
//         onAfterClose={refreshList}
//         ariaHideApp={false}
//         onRequestClose={handleClose}
//         style={{
//           overlay: {
//             zIndex: "2",
//             position: "fixed",
//             top: 0,
//             left: 0,
//             right: 0,
//             bottom: 0,
//             backgroundColor: "rgba(191, 191, 191, 0.75)",
//           },
//           content: {
//             position: "absolute",
//             top: "60px",
//             left: "250px",
//             right: "250px",
//             bottom: "120px",
//             border: "1px solid #ccc",
//             background: "#fff",
//             overflow: "auto",
//             WebkitOverflowScrolling: "touch",
//             borderRadius: "4px",
//             outline: "none",
//             padding: "20px",
//           },
//         }}
//       >
//         <h3>Update Company</h3>
//         <div className="p-fluid p-formgrid p-grid">
//         {/* Name */}
//           <div className="p-field p-col-12 p-md-6">
//             <label htmlFor="name">Name</label>
//             <InputText
//               id="name"
//               type="text"
//               defaultValue={company.name}
//               required
//               onChange={(e) => setCompany({ ...company, name: e.target.value })}
//             />
//           </div>
//           {/* Email */}
//           <div className="p-field p-col-12 p-md-6">
//             <label htmlFor="email">Email</label>
//             <InputText
//               id="email"
//               type="text"
//               defaultValue={company.email}
//               required
//               onChange={(e) =>
//                 setCompany({ ...company, email: e.target.value })
//               }
//             />
//           </div>
//           {/* Address */}
//           <div className="p-field p-col-12">
//             <label htmlFor="address">Address</label>
//             <InputText
//               id="address"
//               type="text"
//               rows="4"
//               defaultValue={company.address}
//               required
//               onChange={(e) =>
//                 setCompany({
//                   ...company,
//                   address: e.target.value,
//                 })
//               }
//             />
//           </div>
//           {/* Phone */}
//           <div className="p-field p-col-12 p-md-3">
//             <label htmlFor="phone">Phone</label>
//             <InputText
//               id="phone"
//               type="text"
//               defaultValue={company.phone}
//               required
//               onChange={(e) =>
//                 setCompany({ ...company, phone: e.target.value })
//               }
//             />
//           </div>
//           {/* Status */}
//           <div className="p-field p-col-12 p-md-3">
//             <label htmlFor="status">Status</label>
//             <br />
//             {company.status ? (
//               <Button
//                 onClick={handleChangeStatus}
//                 label="Change to Inactive"
//                 className="p-button-rounded p-button-danger"
//               />
//             ) : (
//               <Button
//                 onClick={handleChangeStatus}
//                 label="Change to Active"
//                 className="p-button-rounded p-button-success"
//               />
//             )}
//           </div>
//           {/* Image */}
//           <div className="p-field p-col-12 p-md-6">
//             <label htmlFor="image">Image</label>
//             <InputText
//               id="image"
//               accept="image/*"
//               type="file"
//               onChange={onchangeImg}
//             />
//             <label style={{ color: "red" }}> {imgMesage} </label>
//           </div>
//         </div>
//         {/* Close & Submit button */}
//         <Button
//           type="button"
//           label="Close"
//           onClick={() => setModalIsOpen(false)}
//           style={{ marginRight: "20px" }}
//         />
//         <Button type="button" onClick={handleSubmit}>
//           Submit
//         </Button>
//         {/* Spinner */}
//         {loading && (
//           <span className="spinner-border spinner-border-sm float-lg-right"></span>
//         )}
//         {/* Message after submit */}
//         {errMsg && (
//           <span className="alert alert-danger float-lg-right" role="alert">
//             {errMsg}
//           </span>
//         )}
//         {successMsg && (
//           <span className="alert alert-success float-lg-right" role="alert">
//             {successMsg}
//           </span>
//         )}
//       </Modal>
//     </div>
//   );
// }
