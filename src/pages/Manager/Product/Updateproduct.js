import React, { useEffect, useState } from "react";
import Modal from "react-modal";


import { Button } from "primereact/button";

import ApiService from "../../../api/apiService";


export default function AccountUpdate({ rowData, refreshList }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [decription, setDecription] = useState("");
  const [width, setWidth] = useState("");
  const [lenght, setlenght] = useState("");
  const [area, setArea] = useState("");
  const [street, setStreet] = useState("");
  const [province, setProvice] = useState("");
  const [district, setDistrict] = useState("");
  const [noBedroom, setNoBedroom] = useState("");
  const [noTolet, setnoToLet] = useState("");
  const [noFloor, setNoFloor] = useState("");
  const [facade, setFacade] = useState("");
  const [isFurniture, setIsFurniter] = useState(false);
  const [direction, setDirection] = useState("");
  const [utilities, setUtilities] = useState("");
  const [productStatus, setProductStatus] = useState("");
  const [receivedDate, setReceviDate] = useState("");




  async function UpdateProduct() {
    setLoading(true);

    let data = {
      id: rowData.id,
      // roleId: role,

    };

    await ApiService.changeUserRole(data)
      .then((response) => {
        setSuccessMsg("Update Product Successfull");
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

  // async function updateStatus() {
  //   setLoading(true);

  //   let data = {
  //     userId: rowData.id,
  //     status: 1,

  //       };


  //   await ApiService.updateStatusAccount(data)
  //     .then((response) => {
  //       console.log(response);
  //       setSuccessMsg("Status change successfully!");
  //       setLoading(false);
  //     })
  //     .catch((error) => {
  //       const resMessage =
  //         (error.response &&
  //           error.response.data &&
  //           error.response.data.message) ||
  //         error.message ||
  //         error.toString();

  //       setErrMsg(resMessage);
  //       setLoading(false);
  //     });
  // }
  // async function updateStatusBand() {
  //   setLoading(true);

  //   let data = {
  //     userId: rowData.id,
  //     status: 0,

  //       };


  //   await ApiService.updateStatusAccount(data)
  //     .then((response) => {
  //       console.log(response);
  //       setSuccessMsg("Status change successfully!");
  //       setLoading(false);
  //     })
  //     .catch((error) => {
  //       const resMessage =
  //         (error.response &&
  //           error.response.data &&
  //           error.response.data.message) ||
  //         error.message ||
  //         error.toString();

  //       setErrMsg(resMessage);
  //       setLoading(false);
  //     });
  // }

  const handleOpenModal = (e) => {
    e.preventDefault();
    setErrMsg("");
    setSuccessMsg("");
    setModalIsOpen(true);
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    setErrMsg("");
    setSuccessMsg("");
    UpdateProduct();
  };
 

  return (
    <div>
      <a href="#!" onClick={handleOpenModal} style={{ paddingRight: "3px" }}>
        <Button style={{ marginTop: 2, marginLeft: "1%", paddingLeft: "4%", paddingBottom: "5%", paddingRight: "2%" }}>Update</Button>
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
        <h3>Update Acount</h3>
        <div className="p-fluid p-formgrid p-grid">
          {/* Status */}
          <div className="p-field p-col-12 p-md-3">
            <div className="row mb-3">
              <div className="col-sm-3">
                <h6 className="mb-0">With</h6>
              </div>
              <div className="col-sm-9 text-secondary">
                <p>{rowData.width}m&#178;</p>
              </div>
            </div>
          </div>
        </div>
        {/* Close & Submit button */}
        <Button
          type="button"
          label="Close"
          onClick={() => setModalIsOpen(false)}
          style={{ marginTop: "10%", marginLeft: "30%" }}
        />
        <Button type="button"
          style={{ marginLeft: "5%" }}
          onClick={handleUpdateProduct}>

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
