// import React, { useState, useEffect } from 'react'
// import Modal from 'react-modal'
// import { InputText } from 'primereact/inputtext';
// import { Button } from 'primereact/button';
// import { InputTextarea } from 'primereact/inputtextarea';
// import { MultiSelect } from 'primereact/multiselect';
// import { Dropdown } from 'primereact/dropdown';
// import ApiService from '../../../api/ApiService';

// export default function RecruitmentCreate({ skillList, jobList, positionList, welfareList }) {
//     let user = JSON.parse(localStorage.getItem("user"));
//     const [modalIsOpen, setModalIsOpen] = useState(false);
//     const [loading, setLoading] = useState(false);
//     const [message, setMessage] = useState('');
//     const [messageSuccess, setMessageSuccess] = useState('');

//     const [recruitmentId, setRecruitmentId] = useState(0);

//     const [job, setJob] = useState("");
//     const [skill, setSkill] = useState([]);
//     const [welfare, setWelfare] = useState([]);
//     const [position, setPosition] = useState([]);
//     const [recruitment, setRecruitment] = useState({
//         companyId: "",
//         title: "",
//         description: "",
//         createdTime: "",
//         endtime: "",
//         salary: "",
//     });

//     let skill_Lenght = skill.length;
//     let welfare_Lenght = welfare.length;

//     const createRecruitmentAPI = (recruitment) => {
//         let data = {
//             companyId: recruitment.companyId,
//             title: recruitment.title,
//             description: recruitment.description,
//             userAccountId: user.Id,
//             createdTime: recruitment.createdTime,
//             endtime: recruitment.endtime,
//             salary: recruitment.salary
//         };

//         ApiService.createRecruitments(data)
//             .then((response) => {
//                 console.log(response.data.data);
//                 setMessageSuccess("Recruitment created successfully.");
//                 setRecruitmentId(response.data.data)
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

//     const createSkillRequire = () => {
//         console.log(recruitmentId);
//         for (let i = 0; i < skill_Lenght; i++) {
//             let skillRequirement = {
//                 skillId: skill[i].id,
//                 recruitmentId: recruitmentId,
//             }
//             ApiService.createSkillRequires(skillRequirement)
//                 .then((response) => {
//                     console.log(response.data);
//                     setLoading(false);
//                 })
//                 .catch((error) => {
//                     const resMessage =
//                         (error.response &&
//                             error.response.data &&
//                             error.response.data.message) ||
//                         error.message ||
//                         error.toString();
//                     setMessage(resMessage);
//                     setLoading(false);
//                 });
//         }
//     }

//     const createHasWelfare = () => {
//         for (let j = 0; j < welfare_Lenght; j++) {
//             let hasWelfare = {
//                 welfareId: skill[j].id,
//                 recruitmentId: recruitmentId,
//                 description: "?"
//             }
//             ApiService.createHasWelfare(hasWelfare)
//                 .then((response) => {
//                     console.log(response.data);
//                     setLoading(false);
//                 })
//                 .catch((error) => {
//                     const resMessage =
//                         (error.response &&
//                             error.response.data &&
//                             error.response.data.message) ||
//                         error.message ||
//                         error.toString();
//                     setMessage(resMessage);
//                     setLoading(false);
//                 });
//         }
//     }

//     const createRequirement = () => {
//         let requirement = {
//             positionId: position.id,
//             jobId: job.id,
//             recruitmentId: recruitmentId,
//         }
//         ApiService.createRequirements(user.Id, requirement)
//             .then((response) => {
//                 console.log(response.data);
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

//     }

//     const submitForm = (e) => {
//         e.preventDefault();
//         setLoading(true);
//         createRecruitmentAPI(recruitment);
//         setRecruitment([]);
//     }

//     useEffect(() => {
//         if (recruitmentId != 0) {
//             console.log(recruitmentId);
//             createSkillRequire();
//             createHasWelfare();
//             createRequirement();
//         }
//     }, [recruitmentId])

//     return (
//         <div>
//             { }
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
//                 <h3>Add New Recruitment</h3>
//                 <form id="recruitment-Form" onSubmit={submitForm}>
//                     <div className="p-fluid p-formgrid p-grid">
//                         <div className="p-field p-col-12 p-md-6">
//                             <label htmlFor="firstname6">Recruitment Title</label>
//                             <InputText id="firstname6" type="text" required
//                                 onChange={e => setRecruitment({ ...recruitment, title: e.target.value })}
//                             />
//                         </div>
//                         <div className="p-field p-col-12 p-md-6">
//                             <label htmlFor="firstname6">Company Id</label>
//                             <InputText id="firstname6" type="text" required
//                                 onChange={e => setRecruitment({ ...recruitment, companyId: e.target.value })}
//                             />
//                         </div>

//                         <div className="p-field p-col-12 p-md-6">
//                             <label htmlFor="lastname6">Job</label>
//                             <Dropdown value={job} options={jobList} optionLabel="name"
//                                 onChange={e => setJob(e.target.value)}
//                                 placeholder="Select a Job" />
//                         </div>

//                         <div className="p-field p-col-12 p-md-6">
//                             <label htmlFor="lastname6">Position</label>
//                             <Dropdown value={position} options={positionList} optionLabel="name"
//                                 onChange={e => setPosition(e.target.value)}
//                                 placeholder="Select a Position" />
//                         </div>

//                         <div className="p-field p-col-12 p-md-6">
//                             <label htmlFor="lastname6">Skill</label>
//                             <MultiSelect value={skill} options={skillList}
//                                 onChange={(e) => setSkill(e.target.value)}
//                                 optionLabel="name" placeholder="Select Skill"
//                                 maxSelectedLabels={4} />
//                         </div>

//                         <div className="p-field p-col-12 p-md-6">
//                             <label htmlFor="lastname6">Welfare</label>
//                             <MultiSelect value={welfare} options={welfareList}
//                                 onChange={e => setWelfare(e.target.value)}
//                                 optionLabel="name" placeholder="Select Welfare"
//                                 maxSelectedLabels={4} />
//                         </div>                        

//                         <div className="p-field p-col-12 p-md-3">
//                             <label htmlFor="firstname6">Start Time</label>
//                             <InputText id="firstname6" type="datetime-local" required
//                                 onChange={e => setRecruitment({ ...recruitment, createdTime: e.target.value })}
//                             />
//                         </div>

//                         <div className="p-field p-col-12 p-md-3">
//                             <label htmlFor="firstname6">End Time</label>
//                             <InputText id="firstname6" type="datetime-local" required
//                                 onChange={e => setRecruitment({ ...recruitment, endtime: e.target.value })}
//                             />
//                         </div>

//                         <div className="p-field p-col-12 p-md-3">
//                             <label htmlFor="lastname6">Salary</label>
//                             <InputText id="lastname6" type="number" required
//                                 onChange={e => setRecruitment({ ...recruitment, salary: e.target.value })}
//                             />
//                         </div>

//                         <div className="p-field p-col-12">
//                             <label htmlFor="address">Description</label>
//                             <InputTextarea id="address" type="text" rows="15" required
//                                 onChange={e => setRecruitment({ ...recruitment, description: e.target.value })}
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