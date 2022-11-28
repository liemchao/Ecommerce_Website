// import React, { useState, useRef } from 'react'
// import { Messages } from 'primereact/messages';
// import { Button } from 'primereact/button';

// import ApiService from '../../../api/ApiService';

// const EVENT = "EVENT_DETAIL_STORAGE";

// export default function EventCreate() {
//     const eventId = JSON.parse(localStorage.getItem(EVENT)).id;
//     const msgs = useRef(null);
//     const [loading, setLoading] = useState(false);
//     const [attend, setAttend] = useState({
//         eventId: eventId,
//     });

//     const submit = async (e) => {
//         e.preventDefault();
//         createAttendAPI(attend);
//         setLoading(true);
//         setAttend([]);
//     };

//     const createAttendAPI = (event) => {
//         ApiService.applyAttendToEvent(event)
//             .then((response) => {
//                 console.log(response.data);
//                 setLoading(false);
//                 message("Attend", true);
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

//             <Button type="submit" onClick={submit} >
//                 {loading && (
//                     <span className="spinner-border spinner-border-sm"></span>
//                 )}
//                 Attend
//             </Button>
            

//         </div >
//     );
// }
