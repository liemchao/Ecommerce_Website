// import React, { useState, useEffect } from 'react'
// import Modal from 'react-modal'
// import { Button } from 'primereact/button';
// import { InputText } from "primereact/inputtext";
// import { InputTextarea } from "primereact/inputtextarea";
// import { Form } from "react-bootstrap";
// import { app } from "./../../../firebase/firebase";
// import ApiService from "../../../api/ApiService";


// export default function EventCreate() {
//   let user = JSON.parse(localStorage.getItem("user"));
//   const [modalIsOpen, setModalIsOpen] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");
//   const [messageSuccess, setMessageSuccess] = useState('');
//   const [imgMesage, setImgMesage] = useState("");
//   const [image, setImage] = useState([]);
//   const [file, setFile] = useState([]);
//   const [event, setEvent] = useState({
//     id: null,
//     title: "",
//     image: "",
//     description: "",
//     userAccountId: "",
//     starttime: "",
//     endtime: "",
//   });

//   var validExt = ["jpg", "png", "jpeg", "JPG", "PNG", "JPEG"];

//   async function createEvent(event) {
//     let data = {
//       title: event.title,
//       image: event.image,
//       description: event.description,
//       userAccountId: user.Id,
//       starttime: event.starttime,
//       endtime: event.endtime,
//     };

//     ApiService.createEvent(data)
//       .then((response) => {
//         console.log(response.data);
//         setMessageSuccess("Event created successfully.");
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
//   }

//   useEffect(() => {
//     if(event.image != ""){
//       createEvent(event);
//     }
//   }, [event.image])

//   const onchangeImg = (e) => {
//     setFile(e.target.files[0]);
//     console.log(file);
//     validation(e.target.files[0]);
//   };

//   const submitForm = async (e) => {
//     e.preventDefault();
//     setMessage("");

//     const storageRef = app.storage().ref();
//     const fileRef = storageRef.child(file.name);
//     await fileRef.put(file).then(() => {
//       console.log("Upload File ");
//     });
//     console.log(await fileRef.getDownloadURL());
//     setEvent({ ...event, image: await fileRef.getDownloadURL() });

//     setLoading(true);
//   };

//   const validation = (file) => {
//     if (file != null) {
//       // get index of .
//       var pos_of_dot = file.name.lastIndexOf(".") + 1;
//       // get the string after index of .
//       var img_ext = file.name.substring(pos_of_dot);

//       var result = validExt.includes(img_ext);

//       if (result == false) {
//         setImgMesage("Select File Is Not Image......");
//         document.getElementById("event-img").value = "";
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
//         <h3>Add New event</h3>
//         <Form onSubmit={submitForm} id="event-Form">
//           <div className="p-fluid p-formgrid p-grid">
//             {/* Title */}
//             <div className="p-field p-col-12 p-md-6">
//               <label htmlFor="title">Title</label>
//               <InputText
//                 id="title"
//                 type="text"
//                 required
//                 value={event.title}
//                 onChange={(e) => setEvent({ ...event, title: e.target.value })}
//               />
//             </div>
//             {/* Image */}
//             <div className="p-field p-col-12 p-md-6">
//               <label htmlFor="image">image</label>
//               <InputText
//                 id="image"
//                 accept="image/*"
//                 type="file"
//                 onChange={onchangeImg}
//               />
//               <label style={{color: 'red'}}> {imgMesage} </label>
//             </div>
//             {/* Description */}
//             <div className="p-field p-col-12 ">
//               <label htmlFor="description">Description</label>
//               <InputText
//                 id="description"
//                 type="text"
//                 rows="4"
//                 value={event.description}
//                 onChange={(e) =>
//                   setEvent({ ...event, description: e.target.value })
//                 }
//               />
//             </div>
//             {/* Start time */}
//             <div className="p-field p-md-6">
//               <label htmlFor="starttime">Start Time</label>
//               <InputText
//                 id="starttime"
//                 type="datetime-local"
//                 rows="4"
//                 required
//                 value={event.starttime}
//                 onChange={(e) =>
//                   setEvent({ ...event, starttime: e.target.value })
//                 }
//               />
//             </div>
//             {/* End Time */}
//             <div className="p-field p-md-6">
//               <label htmlFor="endtime">End Time</label>
//               <InputText
//                 id="endtime"
//                 type="datetime-local"
//                 rows="4"
//                 required
//                 value={event.endtime}
//                 onChange={(e) =>
//                   setEvent({ ...event, endtime: e.target.value })
//                 }
//               />
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
//           {messageSuccess && (
//             <span className="alert alert-success float-lg-right" role="alert">
//               {messageSuccess}
//             </span>
//           )}
//         </Form>
//       </Modal>
//     </div>
//   );
// }
