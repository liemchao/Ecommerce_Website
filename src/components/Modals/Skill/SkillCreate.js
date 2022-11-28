// import React, { useEffect, useState } from "react";
// import Modal from "react-modal";

// import { InputText } from "primereact/inputtext";
// import { InputTextarea } from "primereact/inputtextarea";
// import { Button } from "primereact/button";

// import ApiService from "../../../api/ApiService";

// export default function SkillCreate({ refreshList }) {
//   const user = JSON.parse(localStorage.getItem("user"));
//   const [modalIsOpen, setModalIsOpen] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [errMsg, setErrMsg] = useState("");
//   const [successMsg, setSuccessMsg] = useState("");
//   const [skill, setSkill] = useState({
//     name: "",
//     status: "",
//     userAccountId: user.Id,
//   });

//   var validExt = ["jpg", "png", "jpeg", "JPG", "PNG", "JPEG"];

//   async function createSkill() {
//     setLoading(true);

//     let createData = {
//       name: skill.name,
//       status: skill.status,
//       userAccountId: user.Id,
//     };

//     ApiService.createSkill(createData)
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
//     createSkill();
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
//         onAfterClose={refreshList}
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
//         <h3>Add New Skill</h3>
//         <div className="p-fluid p-formgrid p-grid">
//           {/* Name */}
//           <div className="p-field p-col-12 p-md-6">
//             <label htmlFor="name">Name</label>
//             <InputText
//               id="name"
//               type="text"
//               value={skill.name}
//               required
//               onChange={(e) => setSkill({ ...skill, name: e.target.value })}
//             />
//           </div>
//           {/* Status */}
//           <div className="p-field p-col-12 p-md-3">
//             <label htmlFor="status">Status</label>
//             <br />
//             <div class="form-check">
//               <input
//                 class="form-check-input"
//                 type="radio"
//                 name="exampleRadios"
//                 id="exampleRadios1"
//                 value={true}
//                 onChange={(e) => setSkill({ ...skill, status: e.target.value })}
//               />
//               <label class="form-check-label" for="exampleRadios1">
//                 Active
//               </label>
//             </div>
//             <div class="form-check">
//               <input
//                 class="form-check-input"
//                 type="radio"
//                 name="exampleRadios"
//                 id="exampleRadios2"
//                 value={false}
//                 onChange={(e) => setSkill({ ...skill, status: e.target.value })}
//               />
//               <label class="form-check-label" for="exampleRadios2">
//                 Inactive
//               </label>
//             </div>
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
