// import React, { useState } from "react";

// import Modal from "react-modal";
// import { InputText } from "primereact/inputtext";
// import { Button } from "primereact/button";

// import ApiService from "../../../api/ApiService";

// export default function BillingUpdate({ data, refreshList }) {
//   const [modalIsOpen, setModalIsOpen] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [errMsg, setErrMsg] = useState("");
//   const [successMsg, setSuccessMsg] = useState("");
//   const [billing, setBilling] = useState({
//     id: data.id,
//     price: data.price,
//     name: data.name,
//     description: data.description,
//     status: data.status,
//   });

//   async function updateInfo() {
//     setLoading(true);
//     let data = {
//       price: billing.price,
//       name: billing.name,
//       description: billing.description,
//       status: billing.status,
//     };

//     ApiService.updatePayments(billing.id, data)
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

//     ApiService.changePaymentStatus(data.id)
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

//   const handleOpenModal = (e) => {
//     e.preventDefault();
//     setErrMsg("");
//     setSuccessMsg("");
//     setModalIsOpen(true);
//   };

//   const handleChangeStatus = async (e) => {
//     e.preventDefault();
//     updateStatus();
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     updateInfo();
//   };

//   return (
//     <div>
//       <a href="#!" onClick={handleOpenModal} style={{ paddingRight: "15px" }}>
//         <i className="fas fa-edit fa"></i>
//       </a>

//       <Modal
//         isOpen={modalIsOpen}
//         ariaHideApp={false}
//         onRequestClose={() => setModalIsOpen(false)}
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
//         <h3>Update billing</h3>
//         <form onSubmit={handleSubmit} id="billing-form">
//           <div className="p-fluid p-formgrid p-grid">
//             {/* Name */}
//             <div className="p-field p-col-12 p-md-6">
//               <label htmlFor="name">Name</label>
//               <InputText
//                 id="name"
//                 type="text"
//                 required
//                 value={billing.name}
//                 onChange={(e) =>
//                   setBilling({ ...billing, name: e.target.value })
//                 }
//               />
//             </div>
//             {/* Price */}
//             <div className="p-field p-col-12 p-md-6">
//               <label htmlFor="price">Price</label>
//               <InputText
//                 id="price"
//                 type="text"
//                 required
//                 value={billing.price}
//                 onChange={(e) =>
//                   setBilling({ ...billing, price: e.target.value })
//                 }
//               />
//             </div>
//             {/* description */}
//             <div className="p-field p-col-12">
//               <label htmlFor="description">Description</label>
//               <InputText
//                 id="description"
//                 type="text"
//                 rows="4"
//                 required
//                 value={billing.description}
//                 onChange={(e) =>
//                   setBilling({ ...billing, description: e.target.value })
//                 }
//               />
//             </div>
//             {/* Status */}
//             <div className="p-field p-col-12 p-md-3">
//               <label htmlFor="status">Status</label>
//               <br />
//               {billing.status ? (
//                 <Button
//                   onClick={handleChangeStatus}
//                   label="Change to Inactive"
//                   className="p-button-rounded p-button-danger"
//                 />
//               ) : (
//                 <Button
//                   onClick={handleChangeStatus}
//                   label="Change to Active"
//                   className="p-button-rounded p-button-success"
//                 />
//               )}
//             </div>
//           </div>
//           {/* Close & Submit button */}
//           <Button
//             type="button"
//             label="Close"
//             onClick={() => setModalIsOpen(false)}
//             style={{ marginRight: "20px" }}
//           />
//           <Button type="submit">Submit</Button>
//           {/* Spinner */}
//           {loading && (
//             <span className="spinner-border spinner-border-sm float-lg-right"></span>
//           )}
//           {/* Message after submit */}
//           {errMsg && (
//             <span className="alert alert-danger float-lg-right" role="alert">
//               {errMsg}
//             </span>
//           )}
//           {successMsg && (
//             <span className="alert alert-success float-lg-right" role="alert">
//               {successMsg}
//             </span>
//           )}
//         </form>
//       </Modal>
//     </div>
//   );
// }
