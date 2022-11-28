// import React, { useState } from "react";
// import { Link, useHistory, Redirect } from "react-router-dom";
// import Form from "react-bootstrap/Form";
// import Button from "react-bootstrap/Button";
// import ApiService from "../../api/ApiService";
// import { InputText } from "primereact/inputtext";
// import "./style.css";
 
// const EmailVerify = () => {
//   const history = useHistory();
//   const newUser = JSON.parse(localStorage.getItem("newUser"));
//   const [loadingVerify, setLoadingVerify] = useState(false);
//   const [loadingResend, setLoadingResend] = useState(false);
//   const [verifiedUser, setVerifiedUser] = useState({});
  
//   if (!newUser) {
//     return <Redirect to="/Login" />;
//   }

//   const verifyNewUser = (verifiedUser) => {
//     let data = {
//       email: newUser.email,
//       code: verifiedUser.code,
//     };

//     ApiService.confirmRegister(data)
//       .then((response) => {
//         console.log(response.data);
//         // you tell it that you had the result
//         setLoadingVerify(false);
//         window.alert("Your Account has been verified!");
//         history.push("/Login");
//       })
//       .catch((error) => {
//         if (error.response) {
//           // get response with a status code not in range 2xx
//           console.log(error.response.data);
//           console.log(error.response.status);
//           console.log(error.response.headers);
//         } else if (error.request) {
//           // no response
//           console.log(error.request);
//         } else {
//           // Something wrong in setting up the request
//           console.log("Error", error.message);
//         }
//         console.log(error.config);
//         setLoadingResend(false);
//       });
//   };

//   const resendVerifyCode = (newUser) => {
//     let data = {
//       email: newUser.email,
//     };

//     ApiService.resendVerifyCode(data)
//       .then((response) => {
//         console.log(response.data);
//         // you tell it that you had the result
//         setLoadingResend(false);
//       })
//       .catch((error) => {
//         if (error.response) {
//           // get response with a status code not in range 2xx
//           console.log(error.response.data);
//           console.log(error.response.status);
//           console.log(error.response.headers);
//         } else if (error.request) {
//           // no response
//           console.log(error.request);
//         } else {
//           // Something wrong in setting up the request
//           console.log("Error", error.message);
//         }
//         console.log(error.config);
//         setLoadingResend(false);
//       });
//   };

//   const handleVerify = (e) => {
//     e.preventDefault();
//     setLoadingVerify(true);
//     verifyNewUser(verifiedUser);
//   };

//   const handleResend = (e) => {
//     e.preventDefault();
//     setLoadingResend(true);
//     resendVerifyCode(newUser);
//   };

//   return (
//     <div>
//       <div className="wrapper">
//         <h5>You one step away</h5>
//         <h1>Verify Your Email Address</h1>
//         <div className="message">
//           <p>
//             Hello,
//             <br /> You are almost ready to get started.
//             <br /> Check your mail and enter the
//             <span style={{ color: "#e0c200" }}> verification code </span> to
//             become one of <span style={{ color: "#3cd5ff" }}>Smoke-Free</span>{" "}
//             members.
//           </p>
//         </div>

//         <div className="section">
//           <Form onSubmit={handleVerify} action className="form-send">
//             <input
//               type="text"
//               id="email"
//               name="email"
//               defaultValue={newUser.email}
//               style={{ display: "none" }}
//             />
//             <InputText
//               type="text"
//               id="code"
//               name="code"
//               placeholder="Verification Code"
//               onChange={(e) =>
//                 setVerifiedUser({
//                   ...verifiedUser,
//                   code: e.target.value,
//                 })
//               }
//             />
//             <br />
//             {loadingVerify && (
//               <span className="spinner-border spinner-border-sm"></span>
//             )}
//             <Button type="submit" className="btn btn-send">
//               {" "}
//               Verify{" "}
//             </Button>
//           </Form>
//         </div>
//         <footer>
//           <div className="message">
//             <p>
//               Still have not received the
//               <span style={{ color: "#e0c200" }}> Verification code</span>.
//             </p>
//           </div>
//           <Form onSubmit={handleResend} action className="form-resend">
//             <input
//               type="text"
//               id="email"
//               name="email"
//               defaultValue={newUser.email}
//             />
//             <br />
//             {loadingResend && (
//               <span className="spinner-border spinner-border-sm"></span>
//             )}
//             <Button
//               type="submit"
//               form="form1"
//               className="btn btn-resend"
//               value="Submit"
//             >
//               Resend
//             </Button>
//           </Form>
//         </footer>
//       </div>
//       <div className="notification" />
//     </div>
//   );
// };

// export default EmailVerify;
