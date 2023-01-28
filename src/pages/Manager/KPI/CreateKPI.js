import React, {  useState } from "react";
import Modal from "react-modal";

import { InputText } from "primereact/inputtext";
// import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";

import ApiService from "../../../api/apiService";

export default function ProductCreate({ refreshList }) {
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
    
     
        <h3>Add  KPI Template</h3>
        <div className="p-fluid p-formgrid p-grid" style={{marginLeft:"30%"}}>
          {/* Name */}
     
        
           <div style={{marginRight:"10%"}} className="p-field p-col-12 p-md-6" >
            <label htmlFor="name">No. Expected Call</label>
            <InputText
              id="email"
              type="number"
              min={1}
              max={600000}
              required
              onChange={(e) => setProduct({ ...Product, email: e.target.value })}
            />
          </div><br></br>

           {/* Name */}
           <div className="p-field p-col-12 p-md-6">
            <label htmlFor="name">No. Expected Meeting</label>
            <InputText
              id="phone"
              type="number"
              min={1}
              max={600000}
              required
              onChange={(e) => setProduct({ ...Product, phone: e.target.value })}
            />
          </div><br></br>


          <div style={{marginRight:"10%"}} className="p-field p-col-12 p-md-6" >
            <label htmlFor="name">No. Expected New Lead</label>
            <InputText
              id="email"
              type="number"
              min={1}
              max={600000}
              required
              onChange={(e) => setProduct({ ...Product, email: e.target.value })}
            />
          </div><br></br>

          <div style={{marginRight:"10%"}} className="p-field p-col-12 p-md-6" >
            <label htmlFor="name">No. Expected Lead Convert</label>
            <InputText
              id="email"
              type="number"
              min={1}
              max={600000}
              required
              onChange={(e) => setProduct({ ...Product, email: e.target.value })}
            />
          </div><br></br>

          <div style={{marginRight:"10%"}} className="p-field p-col-12 p-md-6" >
            <label htmlFor="name">No. Expected Sales</label>
            <InputText
              id="email"
              type="number"
              min={1}
              max={600000}
              required
              onChange={(e) => setProduct({ ...Product, email: e.target.value })}
            />
          </div><br></br>

          <div style={{marginRight:"10%"}} className="p-field p-col-12 p-md-6" >
            <label htmlFor="name">No. Expected Revenue</label>
            <InputText
              id="email"
              type="number"
              min={1}
              max={600000}
              required
              onChange={(e) => setProduct({ ...Product, email: e.target.value })}
            />
          </div><br></br>

          
        </div>
      
        <Button
          type="button"
          label="Close"
          onClick={() =>  handleclose()}
          style={{marginLeft:"40%"}}
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
   </div>
  );
}
