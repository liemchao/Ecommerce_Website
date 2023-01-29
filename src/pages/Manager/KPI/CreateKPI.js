import React, {  useState } from "react";

import { InputText } from "primereact/inputtext";
// import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";

import ApiService from "../../../api/apiService";
import { Link } from "react-router-dom";

export default function KPITemplateCreate() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  
  const [KPI, setKPI] = useState({
    frequencyOfCreate:1,
    expectedCall:0,
    expectedMeeting:0,
    expectedNewLead:0,
    expectedLeadConvert:0,
    expectedSales:0,
    expectedRevenue:0
  });

  async function CreateKPI() {
    setLoading(true);

    let createData = {
    frequencyOfCreate:KPI.frequencyOfCreate,
    expectedCall:KPI.expectedCall,
    expectedMeeting:KPI.expectedMeeting,
    expectedNewLead:KPI.expectedNewLead,
    expectedLeadConvert:KPI.expectedLeadConvert,
    expectedSales:KPI.expectedSales,
    expectedRevenue:KPI.expectedRevenue
    };
    console.log(createData);
    await ApiService.createKPI(createData)
      .then((response) => {
        setSuccessMsg("Create KPI template successfully!");
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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    CreateKPI();
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
              onChange={(e) => setKPI({ ...KPI, expectedCall: e.target.value })}
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
              onChange={(e) => setKPI({...KPI, expectedMeeting: e.target.value })}
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
              onChange={(e) => setKPI({...KPI, expectedNewLead: e.target.value })}
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
              onChange={(e) => setKPI({...KPI, expectedLeadConvert: e.target.value })}
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
              onChange={(e) => setKPI({...KPI, expectedSales: e.target.value })}
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
              onChange={(e) => setKPI({...KPI, expectedRevenue: e.target.value })}
            />
          </div><br></br>

          
        </div>
      <Link
      to={{
        pathname: "/Dashboard/Manager/KPIList",
      }}
      
      >
      <Button
          type="button"
          label="Close"
        
          style={{marginLeft:"40%"}}
        />
      </Link>
     
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
