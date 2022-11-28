// import React, { useEffect, useState } from 'react'
// import Modal from 'react-modal'
// import { InputText } from 'primereact/inputtext';
// import { Button } from 'primereact/button';
// import { InputTextarea } from 'primereact/inputtextarea';
// import ApiService from '../../../api/ApiService';

// export default function RecruitmentUpdate({ data }) {

//     const [modalIsOpen, setModalIsOpen] = useState(false);
//     const [recruitment, setRecruitment] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [message, setMessage] = useState();
//     const [messageSuccess, setMessageSuccess] = useState('');


//     useEffect(() => {
//         setRecruitment({
//             id: data.id,
//             title: data.title,
//             image: data.image,
//             companyId: data.companyId,
//             description: data.description,
//             createdTime: data.createdTime,
//             userAccountId: data.userAccountId,
//             endtime: data.endtime,
//             salary: data.salary
//         })
//     }, [data]);



//     const update = () => {
//         ApiService.updateRecruitments(recruitment)
//             .then((response) => {
//                 setMessageSuccess("Update successfully!");
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
//         // window.location.reload();
//     };

//     const submitForm = (e) => {
//         e.preventDefault();
//         setMessage("");
//         setLoading(true);
//         update();
//     };

//     const handleClick = (e) => {
//         e.preventDefault();
//         setModalIsOpen(true);
//     };

//     const handleClose = (e) => {
//         e.preventDefault();
//         window.location.reload();
//     }

//     return (
//         <div>

//             <a href="#!" onClick={handleClick} style={{ paddingRight: '15px' }}>
//                 <i className="fas fa-edit fa"></i>
//             </a>

//             <Modal isOpen={modalIsOpen}
//                 ariaHideApp={false}
//                 onRequestClose={handleClose}
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
//                 <h3>Update Recruitment</h3>
//                 <form id="Event-Form" onSubmit={submitForm}>
//                     <div className="p-fluid p-formgrid p-grid">
//                         <div className="p-field p-col-12 p-md-6">
//                             <label htmlFor="firstname6">Title</label>
//                             <InputText id="firstname6" type="text" value={recruitment.title} required
//                                 onChange={e => setRecruitment({ ...recruitment, title: e.target.value })}
//                             />
//                         </div>

//                         <div className="p-field p-col-12">
//                             <label htmlFor="address">Description</label>
//                             <InputTextarea id="address" type="text" rows="4" value={recruitment.description} required
//                                 onChange={e => setRecruitment({ ...recruitment, description: e.target.value })}
//                             />
//                         </div>

//                         <div className="p-field p-col-12 p-md-3">
//                             <label htmlFor="firstname6">End Time</label>
//                             <InputText id="firstname6" type="datetime-local" value={(recruitment.endtime)} required
//                                 onChange={e => setRecruitment({ ...recruitment, endtime: e.target.value })}
//                             />
//                         </div>
//                         <div className="p-field p-col-12 p-md-3">
//                             <label htmlFor="lastname6">Salary</label>
//                             <InputText id="lastname6" type="text" value={(recruitment.salary)} required
//                                 onChange={e => setRecruitment({ ...recruitment, salary: e.target.value })}
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