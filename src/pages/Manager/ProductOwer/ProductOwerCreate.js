import React, {  useState } from "react";
import Modal from "react-modal";

import { InputText } from "primereact/inputtext";
// import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";

import ApiService from "../../../api/apiService";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons'
export default function ProductCreate({ refreshList }) {
//   const user = JSON.parse(localStorage.getItem("user"));
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  
  const [Product, setProduct] = useState({
    name:"",
    email:"",
    phone:"",
    isDelete:true,
  });

  async function createProduct() {
    setLoading(true);

    let createData = {
    name:Product.name,
    email:Product.email,
    phone:Product.phone,
    isDelete:true,
 

    };
    console.log(createData);
    await ApiService.createProductOwer(createData)
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

  const handleclose=()=>{
    setErrMsg("");
    setSuccessMsg("");
    setModalIsOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    createProduct();
    setErrMsg("")
    setSuccessMsg("")
  };

  return (
    <div>
      <Button
    
        style={{ float: "right" }}
        className="btn btn-primary" 
        onClick={() => setModalIsOpen(true)}
      ><FontAwesomeIcon icon={faPlus} /> Add</Button>
      <Modal
        isOpen={modalIsOpen}
        onAfterClose={refreshList}
        ariaHideApp={false}
        onRequestClose={() => handleclose()}
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
        <h3>Add New Product Ower</h3>
        <div className="p-fluid p-formgrid p-grid" style={{marginLeft:"30%"}}>
          {/* Name */}
          <div className="p-field p-col-12 p-md-6">
            <label htmlFor="name">Name</label>
            <InputText
              id="name"
              type="text"
              required
              onChange={(e) => setProduct({ ...Product, name: e.target.value })}
            />
            <br></br>
          </div>


           {/* Name */}
           <div style={{marginRight:"10%"}} className="p-field p-col-12 p-md-6" >
            <label htmlFor="name">Email</label>
            <InputText
              id="email"
              type="email"
              required
              onChange={(e) => setProduct({ ...Product, email: e.target.value })}
            />
          </div><br></br>

           {/* Name */}
           <div className="p-field p-col-12 p-md-6">
            <label htmlFor="name">Phone</label>
            <InputText
              id="phone"
              type="phone"
              required
              onChange={(e) => setProduct({ ...Product, phone: e.target.value })}
            />
          </div>
        </div>
      
        <Button
          type="button"
          label="Close"
          onClick={() =>  handleclose()}
          style={{marginLeft:"35%"}}
        />
        <Button type="button" onClick={handleSubmit}
            style={{marginLeft:"5%"}}>
    
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
