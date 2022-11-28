// import React, { useEffect, useState } from "react";
// import Modal from "react-modal";
// import { InputText } from "primereact/inputtext";
// import { Button } from "primereact/button";
// import ApiService from "../../../api/ApiService";
// import { Dropdown } from "primereact/dropdown";


// export default function EmployeeCreate() {
//   const companyId = JSON.parse(localStorage.getItem("Temp"))

//   const [modalIsOpen, setModalIsOpen] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState();
//   const [messageSuccess, setMessageSuccess] = useState('');
//   const [email, setEmail] = useState([]);
//   const [position, setPosition] = useState([]);
//   const [positionSelect, setPositionSelect] = useState([]);

//   useEffect(() => {
//     getAllPosition();
//   }, [])

//   const getAllPosition = async () => {
//     try {
//       await ApiService.getPosition(100, 1)
//         .then(response => {
//           setPosition(response.data.data);
//         })
//     } catch (error) {
//       console.log("Fail To Load Position: " + error);
//     }
//   }

//   const CreateEmployee = () => {
//     let data = {
//       email: email,
//       positionId: positionSelect.id
//     };
//     console.log(data);
//     console.log(companyId);

//     ApiService.createWorks(companyId, data)
//       .then((response) => {
//         console.log(response.data);
//         setMessageSuccess("Employee created successfully.");
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
//     CreateEmployee();
//     setLoading(true);
//     setEmail([]);
//   }

//   const handleClose = (e) => {
//     e.preventDefault();
//     window.location.reload();
//   }

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
//             top: "150px",
//             left: "300px",
//             right: "300px",
//             bottom: "150px",
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
//         <h3 style={{ color: "#ff6969" }}>Add New Employee</h3>
//         <br />
//         <form id="Employee-Form" onSubmit={submitForm}>

//           <div className="p-fluid p-formgrid p-grid">

//             <div className="p-field p-col-12 p-md-6">
//               <label htmlFor="firstname6">Email</label>
//               <InputText
//                 id="firstname6"
//                 type="text"
//                 required
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//             </div>

//             <div className="p-field p-col-12 p-md-6">
//               <label htmlFor="lastname6">Position</label>
//               <Dropdown value={positionSelect} options={position} optionLabel="name"
//                 onChange={e => setPositionSelect(e.target.value)}
//                 placeholder="Select a Position"
//               />

//             </div>

//           </div>
//           <Button
//             type="button"
//             label="Close"
//             onClick={handleClose}
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
//           {messageSuccess && (
//             <span className="alert alert-success float-lg-right" role="alert">
//               {messageSuccess}
//             </span>
//           )}
//         </form>
//       </Modal>
//     </div>
//   );
// }
