// import React, { useState } from "react";
// import { Link, useHistory } from "react-router-dom";
// import Form from "react-bootstrap/Form";
// import Button from "react-bootstrap/Button";
// import { InputText } from "primereact/inputtext";
// import ApiService from "../../api/ApiService";

// import "../../assets/scss/_login.scss";

// const RegisterForm = (props) => {
//   let history = useHistory();
//   const [loading, setLoading] = useState(false);
//   const [errMsg, setErrMsg] = useState("");
//   const [successMsg, setSuccessMsg] = useState("");
//   const [newUser, setNewUser] = useState({
//     email: "",
//     passwordHash: "",
//     confirmPassword: "",
//   });

//   const register = (newUser) => {
//     let data = {
//       email: newUser.email,
//       passwordHash: newUser.passwordHash,
//       confirmPassword: newUser.confirmPassword,
//     };

//     if (!(data.passwordHash === data.confirmPassword)) {
//       setErrMsg("Confirm Password must match Passwod!")
//       setLoading(false);
//     }
//     else {
//       ApiService.createRegister(data)
//       .then((response) => {
//         setLoading(false);
//         setSuccessMsg("Register successfull!");
//         localStorage.setItem("newUser", JSON.stringify(newUser));
//         history.push("/Verify");
//       })
//       .catch((error) => {
//         const resMessage =
//           (error.response &&
//             error.response.data &&
//             error.response.data.message) ||
//           error.message ||
//           error.toString();

//         setErrMsg(resMessage);
//         setLoading(false);
//       });
//     }
//   };

//   const handleRegister = (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setErrMsg("");
//     setSuccessMsg("");
//     register(newUser);
//   };

//   const handleRedirect = e => {
//     e.preventDefault();
//     history.push("/Verify");
//   }

//   return (
//     <>
//       <Form onSubmit={handleRegister} className="sign-up-form">
//         <div className="logo">
//           <img src={props.logo} alt="logoFPT" />
//           <h4>
//             <span style={{ color: "blue" }}>F</span>
//             <span style={{ color: "orange" }}>P</span>
//             <span style={{ color: "green" }}>T</span> RECRUITMENT
//           </h4>
//         </div>
//         <div className="heading">
//           <h2>Get Started</h2>
//           <h6>Already have an account? </h6>
//           <a className="toggle" href="#/Login2" onClick={props.onClick}>
//             Login
//           </a>
//         </div>
//         {/* Input Email */}
//         <div className="actual-form">
//           <div className="input-wrap">
//             <InputText
//               type="email"
//               className="input-field"
//               autoComplete="off"
//               required
//               placeholder="Email"
//               value={newUser.email}
//               onChange={(e) =>
//                 setNewUser({ ...newUser, email: e.target.value })
//               }
//             />
//           </div>
//           {/* Input Password */}
//           <div className="input-wrap">
//             <InputText
//               type="password"
//               minLength="4"
//               className="input-field"
//               autoComplete="off"
//               required
//               placeholder="Password"
//               value={newUser.passwordHash}
//               onChange={(e) =>
//                 setNewUser({ ...newUser, passwordHash: e.target.value })
//               }
//             />{" "}
//           </div>
//           {/* Input Confirm Password */}
//           <div className="input-wrap">
//             <InputText
//               type="password"
//               minLength="4"
//               className="input-field"
//               autoComplete="off"
//               required
//               placeholder="Confirm Password"
//               value={newUser.confirmPassword}
//               onChange={(e) =>
//                 setNewUser({ ...newUser, confirmPassword: e.target.value })
//               }
//             />
//           </div>
//           {/* Submit Button */}
//           <Button
//             block="true"
//             size="lg"
//             type="submit"
//             className="sign-btn"
//             disabled={loading}
//           >
//             {loading && (
//               <span className="spinner-border spinner-border-sm"></span>
//             )}
//             <span>Sign Up</span>
//           </Button>
//           {/* Message after submit */}
//           {errMsg && (
//             <div className="form-group">
//               <div className="alert alert-danger" role="alert">
//                 {errMsg}
//               </div>
//             </div>
//           )}
//           {successMsg && (
//             <div className="form-group">
//               <div className="alert alert-success" role="alert">
//                 {successMsg}
//               </div>
//             </div>
//           )}
//         </div>
//       </Form>
//     </>
//   );
// };

// export default RegisterForm;
