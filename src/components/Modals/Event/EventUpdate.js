// import React, { useEffect, useState } from 'react'
// import Modal from 'react-modal'
// import { InputText } from 'primereact/inputtext';
// import { Button } from 'primereact/button';
// import { InputTextarea } from 'primereact/inputtextarea';
// import ApiService from '../../../api/ApiService';

// import { app } from './../../../firebase/firebase'

// export default function EventUpdate({ data }) {

//     let user = JSON.parse(localStorage.getItem("user"));
//     const [modalIsOpen, setModalIsOpen] = useState(false);
//     const [loading, setLoading] = useState(false);
//     const [message, setMessage] = useState("");
//     const [imgMesage, setImgMesage] = useState("");
//     const [file, setFile] = useState(null)
//     const [onEdit, setOnEdit] = useState(false);
//     const [eventUpdate, setEventUpdate] = useState({});

//     useEffect(() => {
//         setEventUpdate({
//             id: data.id,
//             title: data.title,
//             image: data.image,
//             starttime: (data.starttime),
//             endtime: (data.endtime),
//             description: data.description,
//         })
//     }, [data]);


//     var validExt = ["jpg", "png", "jpeg", "JPG", "PNG", "JPEG"];

//     const update = () => {
//         ApiService.updateEvent(eventUpdate)
//             .then((response) => {
//                 setMessage("Update successfully!");
//                 setLoading(false);
//             })
//             .catch((error) => {
//                 const resMessage =
//                     (error.response &&
//                         error.response.data &&
//                         error.response.data.message) ||
//                     error.message ||
//                     error.toString();
//                 setMessage(resMessage);
//                 setLoading(false);
//             });
//     };

//     const onchangeImg = (e) => {
//         setFile(e.target.files[0])
//         console.log(file);
//         validation(e.target.files[0])
//     }

//     const handleClick = (e) => {
//         e.preventDefault();
//         setModalIsOpen(true);
//     }

//     const handleClose = (e)=> {
//         e.preventDefault();
//         window.location.reload();
//     }

//     useEffect(() => {
//         if (onEdit) {
//             update()
//         }
//         setLoading(false)
//     }, [onEdit])

//     const submitForm = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         setMessage("");
//         console.log(file);
//         if (file != null) {
//             const storageRef = app.storage().ref();
//             const fileRef = storageRef.child(file.name)
//             await fileRef.put(file).then(() => {
//                 console.log("Upload File ");
//             })
//             console.log(await fileRef.getDownloadURL())
//             setEventUpdate({ ...eventUpdate, image: await fileRef.getDownloadURL() })
//             setOnEdit(true);
//         } else {
//             update();
//         }
//     };

//     const validation = (file) => {
//         if (file != null) {
//             // get index of .
//             var pos_of_dot = file.name.lastIndexOf(".") + 1;
//             // get the string after index of .
//             var img_ext = file.name.substring(pos_of_dot);
//             var result = validExt.includes(img_ext);
//             if (result == false) {
//                 setImgMesage("Select File Is Not Image......")
//                 document.getElementById("event-img").value = "";
//                 return false;
//             } else {
//                 setImgMesage("");
//             }
//         }
//     }

//     return (
//         <div>

//             <a href="#!" onClick={handleClick} style={{ paddingRight: '15px' }}>
//                 <i className="fas fa-edit fa"></i>
//             </a>

//             <Modal isOpen={modalIsOpen}
//                 ariaHideApp={false}
//                 onRequestClose={() => setModalIsOpen(false)}
//                 style={{
//                     overlay: {
//                         zIndex: '2',
//                         position: 'fixed',
//                         top: 0,
//                         left: 0,
//                         right: 0,
//                         bottom: 0,
//                         backgroundColor: 'rgba(191, 191, 191, 0.75)'
//                     },
//                     content: {
//                         position: 'absolute',
//                         top: '60px',
//                         left: '250px',
//                         right: '250px',
//                         bottom: '120px',
//                         border: '1px solid #ccc',
//                         background: '#fff',
//                         overflow: 'auto',
//                         WebkitOverflowScrolling: 'touch',
//                         borderRadius: '4px',
//                         outline: 'none',
//                         padding: '20px'
//                     }
//                 }}>
//                 <h3>Update Event</h3>
//                 <form id="Event-Form" onSubmit={submitForm}>
//                     <div className="p-fluid p-formgrid p-grid">
//                         <div className="p-field p-col-12 p-md-6">
//                             <label htmlFor="firstname6">Event Tile</label>
//                             <InputText id="firstname6" type="text" value={eventUpdate.title} required
//                                 onChange={e => setEventUpdate({ ...eventUpdate, title: e.target.value })}
//                             />
//                         </div>
//                         <div className="p-field p-col-12 p-md-6">
//                             <label htmlFor="image">Image</label>
//                             <InputText
//                                 id="event-img"
//                                 type="file"
//                                 accept="image/*"
//                                 onChange={onchangeImg}
//                             />
//                             <label style={{ color: 'red' }}> {imgMesage} </label>
//                         </div>

//                         <div className="p-field p-col-12">
//                             <label htmlFor="address">Description</label>
//                             <InputTextarea id="address" type="text" rows="4" value={eventUpdate.description} required
//                                 onChange={e => setEventUpdate({ ...eventUpdate, description: e.target.value })}
//                             />
//                         </div>

//                         <div className="p-field p-col-12 p-md-3">
//                             <label htmlFor="firstname6">Start Date</label>
//                             <InputText id="firstname6" type="datetime-local" value={(eventUpdate.starttime)} required
//                                 onChange={e => setEventUpdate({ ...eventUpdate, starttime: e.target.value })}
//                             />
//                         </div>
//                         <div className="p-field p-col-12 p-md-3">
//                             <label htmlFor="lastname6">End Date</label>
//                             <InputText id="lastname6" type="datetime-local" value={(eventUpdate.endtime)} required
//                                 onChange={e => setEventUpdate({ ...eventUpdate, endtime: e.target.value })}
//                             />
//                         </div>

//                     </div>
//                     <Button type="button" label="Close"
//                         onClick={handleClose}
//                         style={{ marginRight: '20px' }} />

//                     <Button type="submit">
//                         {loading && (
//                             <span className="spinner-border spinner-border-sm"></span>
//                         )}
//                         Update
//                     </Button>
//                     {message && (
//                         <span className="alert alert-danger float-lg-right" role="alert">
//                             {message}
//                         </span>
//                     )}
//                 </form>
//             </Modal>

//         </div>
//     )
// }
