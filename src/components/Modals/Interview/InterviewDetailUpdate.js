// import React, { useEffect, useState } from 'react'
// import Modal from 'react-modal'
// import { InputText } from 'primereact/inputtext';
// import { Button } from 'primereact/button';
// import { InputTextarea } from 'primereact/inputtextarea';
// import ApiService from '../../../api/ApiService';

// export default function InterviewDetailUpdate({ data }) {

//     const [modalIsOpen, setModalIsOpen] = useState(false);
//     const [loading, setLoading] = useState(false);
//     const [message, setMessage] = useState('');
//     const [messageSuccess, setMessageSuccess] = useState('');
//     const [interviewDetailUpdate, setInterviewDetailUpdate] = useState([]);

//     useEffect(() => {
//         setInterviewDetailUpdate({
//             interviewId: data.id, 
//             starttime: data.starttime, 
//             endtime: data.endtime,
//             description: data.description, 
//             link: data.link, 
//             evaluation: data.evaluation,
//         })
//     }, [data])

//     async function updateInterviewDetail(interviewDetail) {
//         let data = {
//             interviewId: interviewDetail.id, 
//             starttime: interviewDetail.starttime, 
//             endtime: interviewDetail.endtime,
//             description: interviewDetail.description, 
//             link: interviewDetail.link, 
//             evaluation: interviewDetail.evaluation,
//         };
//         console.log(data);
//         ApiService.updateInterviewDetail(data)
//           .then((response) => {
//             console.log(response.data);
//             setMessage("Interview Detail Update successfully.");
//             setLoading(false);
//           })
//           .catch((error) => {
//             const resMessage =
//               (error.response &&
//                 error.response.data &&
//                 error.response.data.message) ||
//               error.message ||
//               error.toString();
    
//             setMessage(resMessage);
//             console.log(error.response);
//             setLoading(false);
//           });
//       };

//     const submitForm = (e) => {
//         e.preventDefault();
//         updateInterviewDetail(interviewDetailUpdate);
//         setModalIsOpen(false);

//     }
//     const handleClick = (e) => {
//         e.preventDefault();
//         setLoading(true);
//         setModalIsOpen(true);
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
//                 <h3>Update Interview Detail</h3>
//                 <form id="Interview-Form" onSubmit={submitForm}>
//                     <div className="p-fluid p-formgrid p-grid">
//                         <div className="p-field p-col-12 p-md-6">
//                             <label htmlFor="firstname6">Interview Detail Title</label>
//                             <InputText id="firstname6" type="text"
//                                 value={interviewDetailUpdate.userName}
//                                 required
//                                 onChange={e => 
//                                     setInterviewDetailUpdate({ ...interviewDetailUpdate, interviewId: e.target.value })}
//                             />
//                         </div>

//                         <div className="p-field p-col-12">
//                             <label htmlFor="address">Evaluation</label>
//                             <InputTextarea id="address" type="text" rows="4"
//                                 value={interviewDetailUpdate.evaluation}
//                                 required
//                                 onChange={e => 
//                                     setInterviewDetailUpdate({ ...interviewDetailUpdate, description: e.target.value })}
//                             />
//                         </div>

//                         <div className="p-field p-col-12 p-md-3">
//                             <label htmlFor="firstname6">Start Time</label>
//                             <InputText id="firstname6" type="datetime-local"
//                                 value={(interviewDetailUpdate.starttime)}
//                                 required
//                                 onChange={e => 
//                                     setInterviewDetailUpdate({ ...interviewDetailUpdate, starttime: e.target.value })}
//                             />
//                         </div>
//                         <div className="p-field p-col-12 p-md-3">
//                             <label htmlFor="lastname6">End Time</label>
//                             <InputText id="lastname6" type="datetime-local"
//                                 value={(interviewDetailUpdate.endtime)}
//                                 required
//                                 onChange={e => 
//                                     setInterviewDetailUpdate({ ...interviewDetailUpdate, endtime: e.target.value })}
//                             />
//                         </div>
//                         <br />
//                     </div>

//                     <Button type="button" label="Close"
//                         onClick={() => setModalIsOpen(false)}
//                         style={{ marginRight: '20px' }} />

//                     <Button type="submit">
//                         {loading && (
//                             <span className="spinner-border spinner-border-sm"></span>
//                         )}
//                         Submit
//                     </Button>
//                     {/* Message after submit */}
//                     {message && (
//                         <span className="alert alert-danger float-lg-right" role="alert">
//                             {message}
//                         </span>
//                     )}
//                     {messageSuccess && (
//                         <span className="alert alert-success float-lg-right" role="alert">
//                             {messageSuccess}
//                         </span>
//                     )}
//                 </form>
//             </Modal>

//         </div>
//     )
// }