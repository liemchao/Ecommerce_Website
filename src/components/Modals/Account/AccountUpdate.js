import React, { useEffect, useState } from "react";
import Modal from "react-modal";


import { Button } from "primereact/button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons'


import ApiService from "../../../api/apiService";


export default function AccountUpdate({ rowData, refreshList }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [role, setRole] = useState("");
 
  

  async function updateRole() {
    setLoading(true);

    let data = {
  id: rowData.id,
  roleId: parseInt(role),
  
    };

    await ApiService.changeUserRole(data)
      .then((response) => {
        setSuccessMsg("Update role successfull");
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

  

  const handleOpenModal = (e) => {
    e.preventDefault();
    setErrMsg("");
    setSuccessMsg("");
    setModalIsOpen(true);
  };



  const handleChangeRole = async (e) => {
    e.preventDefault();
    setErrMsg("");
    setSuccessMsg("");
    updateRole();
  };

  return (
    <div>
      <a href="#!" onClick={handleOpenModal} style={{ paddingRight: "3px"  }}>
      <Button  style={{marginLeft:"-10%" , paddingLeft:"9%"}} className="btn btn-success"><FontAwesomeIcon icon={faPencilAlt} /></Button>
      </a>

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
            top: "100px",
            left: "400px",
            right: "300px",
            bottom: "300px",
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
        <h3>Update Role User Account</h3>
        <div className="p-fluid p-formgrid p-grid">
          <div style={{marginLeft:"30%"}}className="p-field p-col-12 p-md-7">
            <label htmlFor="role" style={{fontSize:30}}>Change Role</label><br>
            </br>
            <select  style={{marginLeft:"10%"}}
              onChange={(e) => setRole(e.currentTarget.value)}
            >
              <option value="3">Employee</option>
              <option value="2">Manager</option>
              <option value="1">Admin</option>
            </select>
          </div>
        </div>
        {/* Close & Submit button */}
        <Button
          type="button"
          label="Close"
          onClick={() => setModalIsOpen(false)}
          style={{ marginTop:"10%",marginLeft: "30%" }}
        />
        <Button type="button" 
         style={{ marginLeft: "5%" }}
        onClick={handleChangeRole}>
          
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
