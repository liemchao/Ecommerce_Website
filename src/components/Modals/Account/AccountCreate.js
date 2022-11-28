// import React, { useState, useEffect } from "react";
// import Modal from "react-modal";

// import { InputText } from "primereact/inputtext";
// import { Button } from "primereact/button";

// import ApiService from "../../../api/ApiService";

// import { app } from "./../../../firebase/firebase";

// export default function AccountCreate({ refreshList }) {
//   const [modalIsOpen, setModalIsOpen] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [errMsg, setErrMsg] = useState("");
//   const [successMsg, setSuccessMsg] = useState("");
//   const [imgMesage, setImgMesage] = useState("");
//   const [file, setFile] = useState([]);
//   const [account, setAccount] = useState({
//     avatar: "",
//     name: "",
//     email: "",
//     address: "",
//     phoneNumber: "",
//     status: "",
//   });

//   var validExt = ["jpg", "png", "jpeg", "JPG", "PNG", "JPEG"];

//   async function createUser() {
//     let data = {
//       avatar: account.avatar,
//       name: account.name,
//       email: account.email,
//       address: account.address,
//       phoneNumber: account.phoneNumber,
//       status: account.status,
//       passwordHash: "000000",
//     };

//     ApiService.createAccount(data)
//       .then((response) => {
//         setSuccessMsg("Account created successfully!");
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

//   const onchangeImg = (e) => {
//     setFile(e.target.files[0]);
//     validation(e.target.files[0]);
//   };

//   useEffect(() => {
//     if (account.avatar != "") {
//       createUser();
//     }
//     setLoading(false);
//   }, [account.avatar]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setSuccessMsg("");
//     setErrMsg("");

//     const storageRef = app.storage().ref();
//     const fileRef = storageRef.child(file.name);
//     await fileRef.put(file).then(() => {
//       console.log("Upload File ");
//     });
//     console.log(await fileRef.getDownloadURL());
//     setAccount({ ...account, avatar: await fileRef.getDownloadURL() });
//   };

//   const validation = (file) => {
//     if (file != null) {
//       // get index of .
//       var pos_of_dot = file.name.lastIndexOf(".") + 1;
//       // get the string after index of .
//       var img_ext = file.name.substring(pos_of_dot);

//       var result = validExt.includes(img_ext);

//       if (result == false) {
//         setImgMesage("Selected File Is Not Image......");
//         document.getElementById("avatar").value = "";
//         return false;
//       } else {
//         setImgMesage("");
//       }
//     }
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
//         <h3>Add New Account</h3>
//         <form id="company-Form" onSubmit={handleSubmit}>
//           <div className="p-fluid p-formgrid p-grid">
//             {/* Name */}
//             <div className="p-field p-col-12 p-md-6">
//               <label htmlFor="name">Name</label>
//               <InputText
//                 id="name"
//                 type="text"
//                 value={account.name}
//                 required
//                 onChange={(e) =>
//                   setAccount({ ...account, name: e.target.value })
//                 }
//               />
//             </div>
//             {/* Email */}
//             <div className="p-field p-col-12 p-md-6">
//               <label htmlFor="email">Email</label>
//               <InputText
//                 id="email"
//                 type="text"
//                 value={account.email}
//                 required
//                 onChange={(e) =>
//                   setAccount({ ...account, email: e.target.value })
//                 }
//               />
//             </div>
//             {/* Address */}
//             <div className="p-field p-col-12">
//               <label htmlFor="address">Address</label>
//               <InputText
//                 id="address"
//                 type="text"
//                 rows="4"
//                 value={account.address}
//                 required
//                 onChange={(e) =>
//                   setAccount({
//                     ...account,
//                     address: e.target.value,
//                   })
//                 }
//               />
//             </div>
//             {/* Phone */}
//             <div className="p-field p-col-12 p-md-3">
//               <label htmlFor="phone">Phone</label>
//               <InputText
//                 id="phone"
//                 type="text"
//                 value={account.phoneNumber}
//                 required
//                 onChange={(e) =>
//                   setAccount({ ...account, phoneNumber: e.target.value })
//                 }
//               />
//             </div>
//             {/* Status */}
//             <div className="p-field p-col-12 p-md-3">
//               <label htmlFor="status">Active</label>
//               <br />
//               <select
//                 className="form-select"
//                 aria-label="Default select example"
//                 defaultValue={true}
//                 onChange={(e) =>
//                   setAccount({ ...account, status: e.currentTarget.value })
//                 }
//               >
//                 <option value={true}>Active</option>
//                 <option value={false}>Inactive</option>
//               </select>
//             </div>
//             {/* Image */}
//             <div className="p-field p-col-12 p-md-6">
//               <label htmlFor="image">Image</label>
//               <InputText
//                 id="image"
//                 accept="image/*"
//                 type="file"
//                 onChange={onchangeImg}
//               />
//               <label style={{ color: "red" }}> {imgMesage} </label>
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
