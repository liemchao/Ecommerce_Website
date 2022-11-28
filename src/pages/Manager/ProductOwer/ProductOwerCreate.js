import React, {  useState } from "react";
import Modal from "react-modal";

import { InputText } from "primereact/inputtext";
// import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";

import ApiService from "../../../api/apiService";

export default function ProductCreate({ refreshList }) {
//   const user = JSON.parse(localStorage.getItem("user"));
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  
  const [Product, setProduct] = useState({
    email:"",
    phone:"",
    password:"",
    fullname: "",
    roleId: 0 ,
    // image: "",
    gender:false,
    dob:""
    // userProductId: user.Id,
  });

  async function createProduct() {
    setLoading(true);

    let createData = {
    email:Product.email,
    phone:Product.phone,
    password:Product.password,
    fullname: Product.fullname,
    roleId: parseInt(Product.roleId),
    // image: Product.image,
    gender: Boolean(Product.gender),
    dob:Product.dob
    //   userProductId: user.Id,
    };
    console.log(createData);
    ApiService.createProduct(createData)
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
    createProduct();
  };

  return (
    <div>
      <Button
    
        style={{ float: "right" }}
        className="btn btn-primary" 
        onClick={() => setModalIsOpen(true)}
      >Create Product</Button>
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
        <h3>Add New Product</h3>
        <div className="p-fluid p-formgrid p-grid">
          {/* Name */}
          <div className="p-field p-col-12 p-md-6">
            <label htmlFor="name">Name</label>
            <InputText
              id="name"
              type="email"
              value={Product.email}
              required
              onChange={(e) => setProduct({ ...Product, email: e.target.value })}
            />
          </div>


           {/* Name */}
           <div className="p-field p-col-12 p-md-6">
            <label htmlFor="name">Price</label>
            <InputText
              id="name"
              type="number"
              // value={}
              required
              onChange={(e) => setProduct({ ...Product, phone: e.target.value })}
            />
          </div>

           {/* Name */}
           <div className="p-field p-col-12 p-md-6">
            <label htmlFor="name">Description</label>
            <InputText
              id="name"
              type="password"
              value={Product.password}
              required
              onChange={(e) => setProduct({ ...Product, password: e.target.value })}
            />
          </div>
           {/* Name */}
           <div className="p-field p-col-1 p-md-1">
            <label htmlFor="name">Width</label>
            <InputText
              id="name"
              type="number"
              value={Product.fullname}
              required
              onChange={(e) => setProduct({ ...Product, fullname: e.target.value })}
            />
          </div>
           {/* Name */}
           {/* <div className="p-field p-col-12 p-md-6">
           <label htmlFor="role">Change Role</label>
            <select
              onChange={(e) => setProduct({...Product, roleId: parseInt(e.currentTarget.value)})}
            >
              <option value="1">Employee</option>
              <option value="2">Manager</option>
              <option value="3">Admin</option>
            </select>
          </div> */}
           {/* Name */}
           {/* <div className="p-field p-col-12 p-md-6">
            <label htmlFor="name">Image</label>
            <InputText
              id="name"
              type="file"
              value={Product.image}
              required
              onChange={(e) => setProduct({ ...Product, image: e.target.value })}
            />
          </div> */}
           {/* Name */}
           <div className="p-field p-col-1 p-md-1">
            <label htmlFor="name">Length</label>
            <InputText
              id="name"
              type="number"
              required
              onChange={(e) => setProduct({ ...Product, dob: e.target.value })}
            />
          </div>

          <div className="p-field p-col-1 p-md-1">
            <label htmlFor="name">Area</label>
            <InputText
              id="name"
              type="number"
              required
              onChange={(e) => setProduct({ ...Product, dob: e.target.value })}
            />
          </div>

          <div className="p-field p-col-1 p-md-1">
            <label htmlFor="name">Bedroom</label>
            <InputText
              id="name"
              type="number"
              required
              onChange={(e) => setProduct({ ...Product, dob: e.target.value })}
            />
          </div>
          <div className="p-field p-col-1 p-md-1">
            <label htmlFor="name">Toilet</label>
            <InputText
              id="name"
              type="number"
              required
              onChange={(e) => setProduct({ ...Product, dob: e.target.value })}
            />
          </div>
          <div className="p-field p-col-1 p-md-1">
            <label style={{marginRight:5}} htmlFor="name">Floor</label>
            <InputText
              id="name"
              type="number"
              required
              onChange={(e) => setProduct({ ...Product, dob: e.target.value })}
            />
          </div>
          <div className="p-field p-col-1 p-md-1">
            <label htmlFor="name">Facade</label>
            <InputText
              id="name"
              type="number"
              required
              onChange={(e) => setProduct({ ...Product, dob: e.target.value })}
            />
          </div>
          <div className="p-field p-col-1 p-md-1">
            <label htmlFor="name">Area</label>
            <InputText
              id="name"
              type="number"
              required
              onChange={(e) => setProduct({ ...Product, dob: e.target.value })}
            />
          </div>

          <div className="p-field p-col-12 p-md-6">
            <label htmlFor="name">Street</label>
            <InputText
              id="name"
              type="text"
              required
              onChange={(e) => setProduct({ ...Product, dob: e.target.value })}
            />
          </div>

          
   
          
          {/* Gender */}
          <div className="p-field p-col-12 p-md-3">
            <label htmlFor="status">isFurniture</label>
            <br />
            <div class="form-check">
              <input
                class="form-check-input"
                type="radio"
                name="exampleRadios"
                id="exampleRadios1"
                value={true}
                onChange={(e) => setProduct({ ...Product, gender: e.target.value })}
              />
              <label class="form-check-label" for="exampleRadios1">
               Avaliable
              </label>
            </div>
            <div class="form-check">
              <input
                class="form-check-input"
                type="radio"
                name="exampleRadios"
                id="exampleRadios2"
                value={false}
                onChange={(e) => setProduct({ ...Product, gender: e.target.value })}
              />
              <label class="form-check-label" for="exampleRadios2">
               Not Avalabel
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
