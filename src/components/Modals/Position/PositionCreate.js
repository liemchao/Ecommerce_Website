// import React, { useState } from "react";
// import Modal from "react-modal";

// import { InputText } from "primereact/inputtext";
// import { Button } from "primereact/button";
// import Form from "react-bootstrap/Form";

// import ApiService from "../../../api/ApiService";

// export default function PositionCreate({ refreshList }) {
//   let user = JSON.parse(localStorage.getItem("user"));
//   const [modalIsOpen, setModalIsOpen] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [errMsg, setErrMsg] = useState("");
//   const [successMsg, setSuccessMsg] = useState("");
//   const [position, setPosition] = useState({
//     name: "",
//     userAccountId: "",
//   });

//   async function create() {
//     setLoading(true);

//     let data = {
//       positionName: position.name,
//       userAccountId: user.Id,
//     };

//     ApiService.createPosition(data)
//       .then((response) => {
//         setSuccessMsg("Position created successfully.");
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

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setErrMsg("");
//     setSuccessMsg("");
//     create();
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
//         <h3>Add New Position</h3>
//         <form id="company-Form" onSubmit={handleSubmit}>
//           <div className="p-fluid p-formgrid p-grid">
//             {/* Name */}
//             <div className="p-field p-col-12 p-md-6">
//               <label htmlFor="name">Name</label>
//               <InputText
//                 id="name"
//                 type="text"
//                 required
//                 onChange={(e) =>
//                   setPosition({ ...position, name: e.target.value })
//                 }
//               />
//             </div>
//             {/* Status */}
//             <div className="p-field p-col-12 p-md-3">
//               <label htmlFor="status">Status</label>
//               <br />
//               <Form.Select
//                 onChange={(e) =>
//                   setPosition({ ...position, status: e.currentTarget.value })
//                 }
//               >
//                 <option value={true}>Active</option>
//                 <option value={false}>Inactive</option>
//               </Form.Select>
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
