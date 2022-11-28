// import React, { useRef, useState } from 'react'
// import { Button } from 'primereact/button';
// import { Messages } from 'primereact/messages';

// import ApiService from '../../../api/ApiService';

// export default function ApplyCreate() {
//     let recruitmentId = JSON.parse(localStorage.getItem("APPLY_DETAIL_STORAGE")).id;
//     const msgs = useRef(null);
//     const [loading, setLoading] = useState(false);
//     const [apply, setRecruitment] = useState({
//         recruitmentId: recruitmentId,
//     });

//     const createApplyAPI = (apply) => {
//         ApiService.createApply(apply)
//             .then((response) => {
//                 console.log(response.data);
//                 setLoading(false);
//                 message("Apply", true);
//             })
//             .catch((error) => {
//                 const resMessage = error.response.data.message
//                     // (error.response &&
//                     //     error.response.data &&
//                     //     error.response.data.message) ||
//                     // error.message ||
//                     // error.toString();
                   
//                 console.log(resMessage);
//                 message(resMessage, false);
//                 setLoading(false);
//             });
//     };


//     const submit = (e) => {
//         e.preventDefault();
//         setLoading(true);
//         createApplyAPI(apply);
//         setRecruitment([]);
//     }

//     const message = (message, check) => {
//         if (check === true) {
//             msgs.current.show([
//                 { severity: 'success', summary: ' ', detail: message + ' Success', sticky: true },
//             ]);
//         }
//         else {
//             msgs.current.show([
//                 { severity: 'error', summary: ' ', detail: message , sticky: true }
//             ]);
//         }
//     }

//     return (
//         <div>
//             <div style={{ right: '20px', position: 'fixed', zIndex: '1' }}>
//                 <Messages ref={msgs} />
//             </div>

//             <Button type="submit" onClick={submit} style={{float: 'right'}}>
//                 {loading && (
//                     <span className="spinner-border spinner-border-sm"></span>
//                 )}
//                 Apply
//             </Button>

//         </div>
//     )
// }