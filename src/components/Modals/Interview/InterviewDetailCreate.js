// import React, { useState } from 'react'
// import Modal from 'react-modal'
// import { InputText } from 'primereact/inputtext';
// import { Button } from 'primereact/button';
// import ApiService from '../../../api/ApiService';

// const InterviewStorage = "INTERVIEW_DETAIL_STORAGE";

// export default function InterviewDetailCreate({ createInterviewDetail }) {

//     const storageInterviewDetail = JSON.parse(localStorage.getItem(InterviewStorage))

//     const [modalIsOpen, setModalIsOpen] = useState(false);
//     const [loading, setLoading] = useState(false);
//     const [message, setMessage] = useState('');
//     const [messageSuccess, setMessageSuccess] = useState('');
//     const [interviewDetail, setInterviewDetail] = useState({
//         interviewId: "", 
//         starttime: "", 
//         endtime: "",
//         description: "", 
//         link: "", 
//         evaluation: "",
        
//     })

//     async function createInterviewDetail(interviewDetail) {
//         let data = {
//             interviewId: storageInterviewDetail.id, 
//             starttime: interviewDetail.starttime, 
//             endtime: interviewDetail.endtime,
//             description: interviewDetail.description, 
//             link: interviewDetail.link, 
//             evaluation: interviewDetail.evaluation,
//         };
//         console.log(data);
//         ApiService.createInterviewDetail(data)
//           .then((response) => {
//             console.log(response.data);
//             setMessage("Interview Detail created successfully.");
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
//         createInterviewDetail(interviewDetail);
//         setInterviewDetail([]);
//     }

//     return (
//         <div>
//             <i style={{ float: 'right' }}
//                 className="fas fa-plus-circle fa-2x"
//                 onClick={() => setModalIsOpen(true)}>
//             </i>
//             <Modal
//                 isOpen={modalIsOpen}
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
//                 <h3 className="modal-form">Add New interview Detail</h3>
//                 <br />
//                 <form id="interviewDetail-Form" onSubmit={submitForm}>
//                     <div className="p-fluid p-formgrid p-grid">

//                     <div className="p-field p-col-12">
//                             <label className="modal-label" htmlFor="address">Interview Id</label>
//                             <InputText id="address" type="text" rows="4" required readOnly
//                                value={interviewDetail.interviewId} 
//                             />
//                         </div>
                        
//                         <div className="p-field p-col-12">
//                             <label className="modal-label" htmlFor="address">Email</label>
//                             <InputText id="address" type="text" rows="4" required
//                                 onChange={e => setInterviewDetail({ ...interviewDetail, description: e.target.value })}
//                             />
//                         </div>

//                         <div className="p-field p-col-12 p-md-3">
//                             <label className="modal-label" htmlFor="firstname6">Start Time</label>
//                             <InputText id="firstname6" type="datetime-local" required
//                                 onChange={e => setInterviewDetail({ ...interviewDetail, starttime: e.target.value })}
//                             />
//                         </div>
//                         <div className="p-field p-col-12 p-md-3">
//                             <label className="modal-label" htmlFor="firstname6">End Time</label>
//                             <InputText id="firstname6" type="datetime-local" required
//                                 onChange={e => setInterviewDetail({ ...interviewDetail, endtime: e.target.value })}
//                             />
//                         </div>

//                         <div className="p-field p-col-12 p-md-6">
//                             <label className="modal-label" htmlFor="firstname6">Evaluation</label>
//                             <InputText id="firstname6" type="text" required
//                                 onChange={e => setInterviewDetail({ ...interviewDetail, evaluation: e.target.value })}
//                             />
//                         </div>

//                         <div className="p-field p-col-12 p-md-6">
//                             <label className="modal-label" htmlFor="firstname6">Link</label>
//                             <InputText id="firstname6" type="text" required
//                                 onChange={e => setInterviewDetail({ ...interviewDetail, link: e.target.value })}
//                             />
//                         </div>


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