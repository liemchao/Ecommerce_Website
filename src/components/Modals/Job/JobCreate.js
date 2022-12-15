import React, { useState } from "react";
import Modal from "react-modal";

import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import Form from "react-bootstrap/Form";

import ApiService from "../../../api/ApiService";

export default function JobCreate({ refreshList }) {
  let user = JSON.parse(localStorage.getItem("user"));
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [job, setJob] = useState({
    name: "",
    status: "",
    userAccountId: "",
  });

  const createJob = () => {
    setLoading(true);

    let data = {
      name: job.name,
      status: job.status,
      userAccountId: user.Id,
    };

    ApiService.createJob(data)
      .then((response) => {
        setSuccessMsg("Job created successfully.");
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
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrMsg("");
    setSuccessMsg("");
    createJob();
  };

  return (
    <div>
      <i
        style={{ float: "right" }}
        className="fas fa-plus-circle fa-2x"
        onClick={() => setModalIsOpen(true)}
      ></i>
      <Modal
        isOpen={modalIsOpen}
        ariaHideApp={false}
        onAfterClose={refreshList}
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
        <h3>Add New job</h3>
        <form id="company-Form" onSubmit={handleSubmit}>
          <div className="p-fluid p-formgrid p-grid">
            {/* Name */}
            <div className="p-field p-col-12 p-md-6">
              <label htmlFor="name">Name</label>
              <InputText
                id="name"
                type="text"
                required
                value={job.name}
                onChange={(e) => setJob({ ...job, name: e.target.value })}
              />
            </div>
            {/* Status */}
            <div className="p-field p-col-12 p-md-3">
              <label htmlFor="status">Status</label>
              <br />
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="exampleRadios"
                  id="exampleRadios1"
                  value={true}
                  onChange={(e) => setJob({ ...job, status: e.target.value })}
                />
                <label className="form-check-label" for="exampleRadios1">
                  Active
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="exampleRadios"
                  id="exampleRadios2"
                  value={false}
                  onChange={(e) => setJob({ ...job, status: e.target.value })}
                />
                <label className="form-check-label" for="exampleRadios2">
                  Inactive
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
          <Button type="submit">Submit</Button>
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
        </form>
      </Modal>
    </div>
  );
}
