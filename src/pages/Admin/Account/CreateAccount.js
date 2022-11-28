import React, {  useState } from "react";
import Modal from "react-modal";

import { InputText } from "primereact/inputtext";
// import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";

import ApiService from "../../../api/apiService";

export default function AccountCreate({ refreshList }) {
//   const user = JSON.parse(localStorage.getItem("user"));
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  
  const [Account, setAccount] = useState({
    email:"",
    phone:"",
    password:"",
    fullname: "",
    roleId: 0 ,
    // image: "",
    gender:false,
    dob:""
    // userAccountId: user.Id,
  });

  async function createAccount() {
    setLoading(true);

    let createData = {
    email:Account.email,
    phone:Account.phone,
    password:Account.password,
    fullname: Account.fullname,
    roleId: parseInt(Account.roleId),
    // image: Account.image,
    gender: Boolean(Account.gender),
    dob:Account.dob
    //   userAccountId: user.Id,
    };
    console.log(createData);
    ApiService.createAccount(createData)
      .then((response) => {
        console.log(response);
        setSuccessMsg("Create successfully!");
        setLoading(false);
      })
      .catch((error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setErrMsg(resMessage);
        setLoading(false);
      });
  }

  // const handleOpenModal = (e) => {
  //   e.preventDefault();
  //   setErrMsg("");
  //   setSuccessMsg("");
  //   setModalIsOpen(true);
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    createAccount();
  };

  return (
    <div>
      <Button
    
        style={{ float: "right" }}
        className="btn btn-primary" 
        onClick={() => setModalIsOpen(true)}
      >Create Account</Button>
      <Modal
        isOpen={modalIsOpen}
        onAfterClose={refreshList}
        ariaHideApp={false}
        onRequestClose={() => setModalIsOpen(false)}
        style={{
          overlay: {
            zIndex: "2",
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(191, 191, 191, 0.75)",
          },
          content: {
            position: "absolute",
            top: "60px",
            left: "250px",
            right: "250px",
            bottom: "120px",
            border: "1px solid #ccc",
            background: "#fff",
            overflow: "auto",
            WebkitOverflowScrolling: "touch",
            borderRadius: "4px",
            outline: "none",
            padding: "20px",
          },
        }}
      >
        <h3>Add New Account</h3>
        <div className="p-fluid p-formgrid p-grid">
          {/* Name */}
          <div className="p-field p-col-12 p-md-6">
            <label htmlFor="name">Email</label>
            <InputText
              id="name"
              type="email"
              value={Account.email}
              required
              onChange={(e) => setAccount({ ...Account, email: e.target.value })}
            />
          </div>


           {/* Name */}
           <div className="p-field p-col-12 p-md-6">
            <label htmlFor="name">Phone</label>
            <InputText
              id="name"
              type="phone"
              value={Account.phone}
              required
              onChange={(e) => setAccount({ ...Account, phone: e.target.value })}
            />
          </div>

           {/* Name */}
           <div className="p-field p-col-12 p-md-6">
            <label htmlFor="name">Password</label>
            <InputText
              id="name"
              type="password"
              value={Account.password}
              required
              onChange={(e) => setAccount({ ...Account, password: e.target.value })}
            />
          </div>
           {/* Name */}
           <div className="p-field p-col-12 p-md-6">
            <label htmlFor="name">FullName</label>
            <InputText
              id="name"
              type="text"
              value={Account.fullname}
              required
              onChange={(e) => setAccount({ ...Account, fullname: e.target.value })}
            />
          </div>
           {/* Name */}
           <div className="p-field p-col-12 p-md-6">
           <label htmlFor="role">Change Role</label>
            <select
              onChange={(e) => setAccount({...Account, roleId: parseInt(e.currentTarget.value)})}
            >
              <option value="1">Employee</option>
              <option value="2">Manager</option>
              <option value="3">Admin</option>
            </select>
          </div>
           {/* Name */}
           {/* <div className="p-field p-col-12 p-md-6">
            <label htmlFor="name">Image</label>
            <InputText
              id="name"
              type="file"
              value={Account.image}
              required
              onChange={(e) => setAccount({ ...Account, image: e.target.value })}
            />
          </div> */}
           {/* Name */}
           <div className="p-field p-col-12 p-md-6">
            <label htmlFor="name">DOB</label>
            <InputText
              id="name"
              type="date"
              value={Account.dob}
              required
              onChange={(e) => setAccount({ ...Account, dob: e.target.value })}
            />
          </div>
   
          
          {/* Gender */}
          <div className="p-field p-col-12 p-md-3">
            <label htmlFor="status">Gender</label>
            <br />
            <div class="form-check">
              <input
                class="form-check-input"
                type="radio"
                name="exampleRadios"
                id="exampleRadios1"
                value={true}
                onChange={(e) => setAccount({ ...Account, gender: e.target.value })}
              />
              <label class="form-check-label" for="exampleRadios1">
                Female
              </label>
            </div>
            <div class="form-check">
              <input
                class="form-check-input"
                type="radio"
                name="exampleRadios"
                id="exampleRadios2"
                value={false}
                onChange={(e) => setAccount({ ...Account, gender: e.target.value })}
              />
              <label class="form-check-label" for="exampleRadios2">
                Male
              </label>
            </div>
          </div>
        </div>
        {/* Close & Submit button */}
        <Button
          type="button"
          label="Close"
          onClick={() => setModalIsOpen(false)}
          style={{ marginRight: "20px" }}
        />
        <Button type="button" onClick={handleSubmit}>
          Submit
        </Button>
        {/* Spinner */}
        {loading && (
          <span className="spinner-border spinner-border-sm float-lg-right"></span>
        )}
        {/* Message after submit */}
        {errMsg && (
          <span className="alert alert-danger float-lg-right" role="alert">
            {errMsg}
          </span>
        )}
        {successMsg && (
          <span className="alert alert-success float-lg-right" role="alert">
            {successMsg}
          </span>
        )}
      </Modal>
    </div>
  );
}
