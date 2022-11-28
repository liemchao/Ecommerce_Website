// import React, { useEffect, useState } from "react";
// import Modal from "react-modal";

// import { InputText } from "primereact/inputtext";
// import { InputTextarea } from "primereact/inputtextarea";
// import { Button } from "primereact/button";

// import ApiService from "../../../api/ApiService";

// export default function BillingCreate({ refreshList }) {
//   const user = JSON.parse(localStorage.getItem("user"));
//   const [modalIsOpen, setModalIsOpen] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [errMsg, setErrMsg] = useState("");
//   const [successMsg, setSuccessMsg] = useState("");
//   const [imgMesage, setImgMesage] = useState("");
//   const [file, setFile] = useState([]);
//   const [billing, setBilling] = useState({
//     price: "",
//     name: "",
//     description: "",
//     status: "",
//   });

//   async function createBilling() {
//     setLoading(true);

//     let data = {
//       price: billing.price,
//       name: billing.name,
//       description: billing.description,
//       status: billing.status,
//     };

//     ApiService.createPayments(data)
//       .then((response) => {
//         setSuccessMsg("billing created successfully!");
//         setLoading(false);
//       })
//       .catch((error) => {
//         const resMessage =
//           (error.response &&
//             error.response.data &&
//             error.response.data.content) ||
//           error.content ||
//           error.toString();

//         setErrMsg(resMessage);
//         setLoading(false);
//       });
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setSuccessMsg("");
//     setErrMsg("");
//     createBilling();
//   };

//   return (
//     <div>
//       <i
//         style={{ float: "right" }}
//         className="fas fa-plus-circle fa-2x"
//         onClick={() => setModalIsOpen(true)}
//       ></i>
//       <Modal
//         isOpen={modalIsOpen}
//         ariaHideApp={false}
//         onAfterClose={refreshList}
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
//         <h3>Add New Bill</h3>
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
//               <select
//                 className="form-select"
//                 aria-label="Default select example"
//                 defaultValue={true}
//                 onChange={(e) =>
//                   setBilling({ ...billing, status: e.currentTarget.value })
//                 }
//               >
//                 <option value={true}>Active</option>
//                 <option value={false}>Inactive</option>
//               </select>
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
