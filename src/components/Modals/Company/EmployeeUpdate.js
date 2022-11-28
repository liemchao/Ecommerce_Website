// import React, { useState } from 'react'
// import Modal from 'react-modal'
// import { InputText } from 'primereact/inputtext';
// import { Button } from 'primereact/button';

// export default function EmployeeUpdate({ data, updateEmployee }) {

//     const [modalIsOpen, setModalIsOpen] = useState(false);
//     const [employeeUpdate, setEmloyeeUpdate] = useState({
//         id: data.id, userName: data.userName, image: data.image, email: (data.email),
//         address: (data.address), createDate: data.createDate, status: data.status,
//         phone: data.phone
//     });
//     const submitForm = (e) => {
//         e.preventDefault();
//         updateEmployee(employeeUpdate);
//         setModalIsOpen(false);

//     }

//     const handleClick = (e) => {
//         e.preventDefault();
//         setModalIsOpen(true);
//     }
    
//     return (
//         <div>

//          <a href="#!" onClick={handleClick} style={{ paddingRight: '15px' }}>
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
//                         top: '150px',
//                         left: '300px',
//                         right: '300px',
//                         bottom: '150px',
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
//                             <label htmlFor="firstname6">Company Name</label>
//                             <InputText id="firstname6" type="text" value={employeeUpdate.userName} required
//                                 onChange={e => setEmloyeeUpdate({ ...employeeUpdate, name: e.target.value })}
//                             />
//                         </div>
//                         <div className="p-field p-col-12 p-md-6">
//                             <label htmlFor="lastname6">Image</label>
//                             <InputText id="lastname6" type="text" value={employeeUpdate.image} required
//                                 onChange={e => setEmloyeeUpdate({ ...employeeUpdate, image: e.target.value })}
//                             />
//                         </div>

//                         <div className="p-field p-col-12 p-md-3">
//                             <label htmlFor="firstname6">Email</label>
//                             <InputText id="firstname6" type="text" value={(employeeUpdate.email)} required
//                                 onChange={e => setEmloyeeUpdate({ ...employeeUpdate, email: e.target.value })}
//                             />
//                         </div>
//                         <div className="p-field p-col-12 p-md-3">
//                             <label htmlFor="lastname6">Address</label>
//                             <InputText id="lastname6" type="text" value={(employeeUpdate.address)} required
//                                 onChange={e => setEmloyeeUpdate({ ...employeeUpdate, address: e.target.value })}
//                             />
//                         </div>
//                         <div className="p-field p-col-12 p-md-3">
//                             <label htmlFor="lastname6">Phone</label>
//                             <InputText id="lastname6" type="text" value={(employeeUpdate.phone)} required
//                                 onChange={e => setEmloyeeUpdate({ ...employeeUpdate, phone: e.target.value })}
//                             />
//                         </div>

//                     </div>
//                     <Button type="button" label="Close"
//                         onClick={() => setModalIsOpen(false)}
//                         style={{ marginRight: '20px' }} />

//                     <Button type="submit" label="Submit" />
//                 </form>
//             </Modal>

//         </div>
//     )
// }