import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

import ApiService from "../../../api/apiService";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";

export default function ProductOwerUpdate({ rowData, refreshList }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [imgMesage, setImgMesage] = useState("");
 

  const [company, setCompany] = useState({});
 

  useEffect(() => {
    setCompany(rowData)
  }, [rowData]);

  
  async function updateInfo() {
  
    setLoading(true);

    let updateData = {
      id:company.id,
      name: company.name,
      email: company.email,
      phone: company.phone,
      isDelete: company.isDelete,
     
    };

    ApiService.updateProductOwer(updateData)
      .then((response) => {
        setSuccessMsg("Update successfully!");
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
        <h3>Update ProductOwer</h3>
        <div className="p-fluid p-formgrid p-grid" style={{marginLeft:"30%"}}>
        {/* Name */}
          <div className="p-field p-col-12 p-md-6">
            <label htmlFor="name">Name</label>
            <InputText
              id="name"
              type="text"
              defaultValue={company.productOwnerName}
              required
              onChange={(e) => setCompany({ ...company, name: e.target.value })}
            />
          </div>
          {/* Email */}
          <div className="p-field p-col-12 p-md-6" style={{marginRight:"10%"}} >
            <label htmlFor="email">Email</label>
            <InputText
              id="email"
              type="text"
              defaultValue={company.email}
              required
              onChange={(e) =>
                setCompany({ ...company, email: e.target.value })
              }
            />
          </div>
          {/* Phone */}
          <div className="p-field p-col-12 p-md-6">
            <label htmlFor="phone">Phone</label>
            <InputText
              id="phone"
              type="text"
              defaultValue={company.phone}
              required
              onChange={(e) =>
                setCompany({ ...company, phone: e.target.value })
              }
            />
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
