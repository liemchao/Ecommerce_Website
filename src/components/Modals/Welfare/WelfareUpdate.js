// import React, { useState } from "react";
// import Modal from "react-modal";

// import { InputText } from "primereact/inputtext";
// import { Button } from "primereact/button";
// import { Form } from "react-bootstrap";

// import ApiService from "../../../api/ApiService";

// export default function WelfareUpdate({ data }) {
//   let user = JSON.parse(localStorage.getItem("user"));
//   const [modalIsOpen, setModalIsOpen] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState();
//   const [welfare, setWelfare] = useState({
//     id: data.id,
//     name: data.name,
//     userAccountId: user.Id,
//     status: data.status,
//   });

//   const update = () => {
//     ApiService.updateWelfare(welfare.id)
//       .then((response) => {
//         setMessage("Update successfully!");
//         setLoading(false);
//       })
//       .catch((error) => {
//         const resMessage =
//           (error.response &&
//             error.response.data &&
//             error.response.data.message) ||
//           error.message ||
//           error.toString();

//         setMessage(resMessage);
//         setLoading(false);
//       });
//   };

//   const submitForm = (e) => {
//     e.preventDefault();
//     setMessage("");
//     setLoading(true);
//     update();
//   };

//   const handleClick = (e) => {
//     e.preventDefault();
//     setModalIsOpen(true);
//   };

//   return (
//     <div>
//       <a href="#!" onClick={handleClick} style={{ paddingRight: "15px" }}>
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
//         <h3>Update Welfare</h3>
//         <Form onSubmit={submitForm} id="welfare-Form">
//           <div className="p-fluid p-formgrid p-grid">
//             {/* Name */}
//             <div className="p-field p-col-12 p-md-6">
//               <label htmlFor="title">Name</label>
//               <InputText
//                 id="name"
//                 type="text"
//                 required
//                 value={welfare.name}
//                 onChange={(e) => setWelfare({ ...welfare, name: e.target.value })}
//               />
//             </div>
//             {/* Status */}
//             <div className="p-field p-col-12 p-md-3">
//               <label htmlFor="status">Status: </label>
//               <br />
//               <Form.Select
//                 aria-label="Default select example"
//                 value={welfare.status}
//                 onChange={(e) =>
//                     setWelfare({ ...welfare, status: e.currentTarget.value })
//                 }
//               >
//                 <option value={true}>Active</option>
//                 <option value={false}>Inactive</option>
//               </Form.Select>
//             </div>
//           </div>
//           <Button
//             type="button"
//             label="Close"
//             onClick={() => setModalIsOpen(false)}
//             style={{ marginRight: "20px" }}
//           />
//           <Button type="submit">
//             {loading && (
//               <span className="spinner-border spinner-border-sm"></span>
//             )}
//             Submit
//           </Button>
//           {/* Message after submit */}
//           {message && (
//             <span className="alert alert-danger float-lg-right" role="alert">
//               {message}
//             </span>
//           )}
//         </Form>
//       </Modal>
//     </div>
//   );
// }
