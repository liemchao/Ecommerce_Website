import React, { useState,useEffect } from "react";
import { InputText } from "primereact/inputtext";
// import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { Link } from "react-router-dom";
import ApiService from "../../../api/apiService";

export default function ProductUpdate() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const [KPI, setKPI] = useState({});
  async function getKPI() {

    await ApiService.getKPI()
      .then((response) => {
        setKPI(response.data.data)  
      })
      .catch((error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setErrMsg(resMessage);
       
      });
  }
  useEffect(() => {
    getKPI();
  }, []);

  async function UpdateKPItemplate() {
    setLoading(true);

    let update = {
      id:KPI.id,
      frequencyOfCreate:1,
      expectedCall:parseInt(KPI.expectedCall),
      expectedMeeting:parseInt(KPI.expectedMeeting),
      expectedNewLead:parseInt(KPI.expectedNewLead),
      expectedLeadConvert:parseInt(KPI.expectedLeadConvert),
      expectedSales:parseInt(KPI.expectedSales),
      expectedRevenue:parseInt(KPI.expectedRevenue)
    };
    console.log(update)
    await ApiService.UpdateKPItemplate(update)
      .then((response) => {
        setSuccessMsg("Update KPI successfully!");
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

  const handleSubmit = async (e) => {
    e.preventDefault();
   UpdateKPItemplate();
    setErrMsg("")
    setSuccessMsg("")
  };

  return (
    <div>
{loading?(<><p>Loading Data</p></>):(<>

  <h3>Update KPI Template</h3>
      <div className="p-fluid p-formgrid p-grid" style={{ marginLeft: "30%" }}>
    
    
        {/* Name */}
        <div style={{ marginRight: "10%" }} className="p-field p-col-12 p-md-6" >
          <label htmlFor="name">No. Expected Call</label>
          <InputText
            id="email"
            type="number"
            min={1}
            defaultValue={KPI.expectedCall}
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
            defaultValue={KPI.expectedMeeting}
            min={1}
            max={600000}

            required
            onChange={(e) => setKPI({...KPI, expectedMeeting: e.target.value })}
          />
        </div><br></br>


        <div style={{ marginRight: "10%" }} className="p-field p-col-12 p-md-6" >
          <label htmlFor="name">No. Expected New Lead</label>
          <InputText
            id="email"
            type="number"
            min={1}
            max={600000}
            defaultValue={KPI.expectedNewLead}
            required
            onChange={(e) => setKPI({...KPI, expectedNewLead: e.target.value })}
          />
        </div><br></br>

        <div style={{ marginRight: "10%" }} className="p-field p-col-12 p-md-6" >
          <label htmlFor="name">No. Expected Lead Convert</label>
          <InputText
            id="email"
            type="number"
            defaultValue={KPI.expectedLeadConvert}
            min={1}
            max={600000}
            required
            onChange={(e) => setKPI({...KPI, expectedLeadConvert: e.target.value })}
          />
        </div><br></br>

        <div style={{ marginRight: "10%" }} className="p-field p-col-12 p-md-6" >
          <label htmlFor="name">No. Expected Sales</label>
          <InputText
            id="email"
            type="number"
            defaultValue={KPI.expectedSales}
            min={1}
            max={600000}
            required
            onChange={(e) => setKPI({...KPI, expectedSales: e.target.value })}
            />
        </div><br></br>

        <div style={{ marginRight: "10%" }} className="p-field p-col-12 p-md-6" >
          <label htmlFor="name">No. Expected Revenue</label>
          <InputText
            id="email"
            type="number"
            defaultValue={KPI.expectedRevenue}
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
        style={{ marginLeft: "5%" }}>

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
</>)}

      
    </div>
  );
}
