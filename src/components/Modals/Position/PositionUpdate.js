// import React, { useState } from "react";
// import Modal from "react-modal";

// import { InputText } from "primereact/inputtext";
// import { Button } from "primereact/button";
// import { Form } from "react-bootstrap";

// import ApiService from "../../../api/ApiService";

// export default function PositionUpdate({ rowData, refreshList }) {
//   let user = JSON.parse(localStorage.getItem("user"));
//   const [modalIsOpen, setModalIsOpen] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [errMsg, setErrMsg] = useState("");
//   const [successMsg, setSuccessMsg] = useState("");
//   const [position, setPosition] = useState({
//     id: rowData.id,
//     name: rowData.name,
//     userAccountId: user.Id,
//   });

//   async function updateInfo() {
//     setLoading(true);

//     let updateData = {
//       id: position.id,
//       name: position.name,
//       userAccountId: user.Id,
//     };

//     ApiService.updatePosition(updateData.id, updateData)
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

//   const handleOpenModal = (e) => {
//     e.preventDefault();
//     setErrMsg("");
//     setSuccessMsg("");
//     setModalIsOpen(true);
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
//         <h3>Update Position</h3>
//         <Form onSubmit={handleSubmit} id="position-Form">
//           <div className="p-fluid p-formgrid p-grid">
//             {/* Name */}
//             <div className="p-field p-col-12 p-md-6">
//               <label htmlFor="name">Name</label>
//               <InputText
//                 id="name"
//                 type="text"
//                 required
//                 defaultValue={position.name}
//                 onChange={(e) =>
//                   setPosition({ ...position, name: e.target.value })
//                 }
//               />
//             </div>
//           </div>
//           {/* Close & Submit button */}
//           <Button
//             type="button"
//             label="Close"
//             onClick={() => setModalIsOpen(false)}
//             style={{ marginRight: "20px" }}
//           />
//           <Button type="button" onClick={handleSubmit}>
//             Submit
//           </Button>
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
//         </Form>
//       </Modal>
//     </div>
//   );
// }
