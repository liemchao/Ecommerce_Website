import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

import ApiService from "../../../../api/apiService";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";

export default function LeadUpdate({ rowData, refreshList }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [imgMesage, setImgMesage] = useState("");
  const [loadLead, setLoad] = useState(false);
  const [Account, setAccount] = useState({})

  useEffect(() => {
    setAccount(rowData)
  }, [rowData]);

  
  async function updateInfo() {
  
    setLoading(true);

    let UpdateData = {
        fullname:Account.fullname,
        nameCall:Account.nameCall,
        gender:Boolean(Account.gender),
        dob:Account.dob,
        email:Account.email,
        phone:Account.phone,
        leadType: Account.leadType,
        website:Account.website ,
        companyName:Account.companyName,
    };

    ApiService.updateLead(UpdateData)
      .then((response) => {
        setSuccessMsg("Update Lead successfully!");
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


  const handleClose = (e) => {
    e.preventDefault();
    window.location.reload();
  }
  

  const handleOpenModal = (e) => {
    e.preventDefault();
    setErrMsg("");
    setSuccessMsg("");
    setImgMesage("");
    setModalIsOpen(true);
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    updateInfo();
  };

  let GetleadType = (e)=>{

    setAccount({...Account, leadType: e.target.value})
    if(e.target.value=="Enterprise"){
        setLoad(true);
     }else(
        setLoad(false)
     )
 

  }

  return (
    <div>
      <a href="#!" onClick={handleOpenModal}>
      <Button style={{marginLeft:"-10%" , paddingLeft:"9%"}} className="btn btn-success"><FontAwesomeIcon icon={faPencilAlt} />
          </Button> 
          </a>

      <Modal
        isOpen={modalIsOpen}
        onAfterClose={refreshList}
        ariaHideApp={false}
        onRequestClose={handleClose}
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
     <h3>Update Lead</h3>
        <div className="p-fluid p-formgrid p-grid">
          {/* Name */}
          <div className="p-field p-col-12 p-md-6">
            <label htmlFor="name">Email</label>
            <InputText
              id="email"
              type="email"
              defaultValue={Account.email}
              defaultvalue={(e) => setAccount({ ...Account, email: e.target.value })}
            />
          </div>


           {/* Name */}
           <div className="p-field p-col-12 p-md-6">
            <label htmlFor="name">Phone</label>
            <InputText
              id="phone"
              type="phone"
              defaultValue={Account.phone}
              onChange={(e) => setAccount({ ...Account, phone: e.target.value })}
            />
          </div>

           {/* Name */}
           <div className="p-field p-col-12 p-md-6">
            <label htmlFor="name">Full Name</label>
            <InputText
              id="fullname"
              type="text"
              defaultValue={Account.fullname}
              
              onChange={(e) => setAccount({ ...Account, fullname: e.target.value })}
            />
          </div>
           {/* Name */}
           <div className="p-field p-col-12 p-md-6">
            <label htmlFor="name">Name Call</label>
            <InputText
              id="name"
              type="text"
              defaultValue={Account.nameCall}
             
              onChange={(e) => setAccount({ ...Account, nameCall: e.target.value })}
            />
          </div>
           {/* Name */}
           <div className="p-field p-col-12 p-md-6">
           <label htmlFor="role">Lead Type</label><br>
           </br>
            <select
             onChange={GetleadType}
            >
            {Account.leadType=="Enterprise" ? ( 
                <>
             <option value={Account.leadType}>{Account.leadType}</option>
             <option value="Personal">Personal</option>
          
              </>
            ):(

                <>
                <option value={Account.leadType}>{Account.leadType}</option>
                <option value="Enterprise">Enterprise</option>
                 </>
            )}
             
             
            </select>
          </div>
          {
            loadLead ? (<>  <div className="p-field p-col-12 p-md-6">
            <label htmlFor="name">Website</label>
            <InputText
              id="name"
              type="text"
              defaultValue={Account.website}
             
              onChange={(e) => setAccount({ ...Account, website: e.target.value })}
            />
          </div>
          <div className="p-field p-col-12 p-md-6">
            <label htmlFor="name">Company Name</label>
            <InputText
              id="name"
              type="text"
              defaultValue={Account.companyName}
             
              onChange={(e) => setAccount({ ...Account, companyName: e.target.value })}
            />
          </div></>):
          (<></>)


          }
        

           <div className="p-field p-col-12 p-md-6">
            <label htmlFor="name">DOB</label>
            <InputText
              id="name"
              type="date"
              defaultValue={Account.dob}
            
              onChange={(e) => setAccount({ ...Account, dob: e.target.value })}
            />
          </div>
   
          {/* Gender */}
          <div className="p-field p-col-12 p-md-3">
            <label htmlFor="status">Gender</label>
            <br />
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="exampleRadios"
                id="exampleRadios1"
                defaultValue={true}
                onChange={(e) => setAccount({ ...Account, gender: e.target.value })}
              />
              <label className="form-check-label" htmlFor="exampleRadios1">
                Female
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="exampleRadios"
                id="exampleRadios2"
                value={false}
                onChange={(e) => setAccount({ ...Account, gender: e.target.value })}
              />
              <label className="form-check-label" htmlFor="exampleRadios2">
                Male
              </label>
            </div>
          </div>
        </div>
        <Button
          type="button"
          label="Close"
          onClick={() => setModalIsOpen(false)}
          style={{marginLeft:"35%"}}
        />
        <Button    style={{marginLeft:"5%"}} type="button" onClick={handleSubmit}>
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
