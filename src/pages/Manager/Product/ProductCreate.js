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
  const [category, setCategory]= useState("");
  const [ower , setOwer]= useState("");
  
  const [Product, setProduct] = useState({
    name:"",
    categoryId:"",
    price:"",
    description: "",
    width:"" ,
    length:"",
    area:"",
    street:"",
    province:"",
    district:"",
    noBedroom:"",
    noToilet:"",
    noFloor:"",
    facade:"",
    isFurniture:false,
    direction:"",
    utilities:"",
    productOwnerId:"",
    productStatus:"",
    receivedDate:"",
    file:"",
  });

  async function createProduct() {
    setLoading(true);

    let createData = {
    name: Product.email,
    description:Product.description,
    price:Product.price,
    fullname: Product.fullname,
    name: Product.email,
    name: Product.email,
    name: Product.email,
    name: Product.email,
    name: Product.email,
    name: Product.email,
    name: Product.email,
    name: Product.email,
    name: Product.email,
    name: Product.email,
    name: Product.email,
    name: Product.email,
    name: Product.email,
    name: Product.email,
    name: Product.email,
    name: Product.email,
    roleId: parseInt(Product.roleId),
    gender: Boolean(Product.gender),
    };
    console.log(createData);
    await ApiService.createProduct(createData)
      .then((response) => {
        console.log(response);
        setSuccessMsg("Create Product successfully!");
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
            right: "100px",
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
          <div className="p-field p-col-8 p-md-4">
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
           <div className="p-field p-col-2 p-md-4">
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
           <div className="p-field p-col-8 p-md-4">
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


          <div style={{marginTop:-45}}className="p-field p-col-2 p-md-5">
            <label htmlFor="name">Street</label>
            <InputText
              id="name"
              type="text"
              required
              onChange={(e) => setProduct({ ...Product, dob: e.target.value })}
            />
          </div>
          <div className="p-field p-col-8 p-md-4">
            <label htmlFor="name">Direction</label>
            <InputText
              id="name"
              type="text"
              // value={}
              required
              onChange={(e) => setProduct({ ...Product, phone: e.target.value })}
            />
          </div>
          {/* <div className="p-field p-col-8 p-md-4">
            <label htmlFor="name">productOwnerId</label>
            <InputText
              id="name"
              type="text"
              // value={}
              required
              onChange={(e) => setProduct({ ...Product, phone: e.target.value })}
            />
          </div> */}
          <div className="p-field p-col-8 p-md-4">
            <label htmlFor="name">receivedDate</label>
            <InputText
              id="name"
              type="Date"
              // value={}
              required
              onChange={(e) => setProduct({ ...Product, phone: e.target.value })}
            />
          </div>

          <div className="p-field p-col-8 p-md-4">
            <label htmlFor="name">Image</label>
            <InputText
              id="name"
              type="file"
              // value={}
              required
              onChange={(e) => setProduct({ ...Product, phone: e.target.value })}
            />
          </div>


          
   
          
          {/* Gender */}
          <div className="p-field p-col-8 p-md-3">
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
        <div className="center">
        <Button
          type="button"
          label="Close"
          onClick={() => setModalIsOpen(false)}
          style={{ marginRight: "20px" }}
        />
        <Button type="button" onClick={handleSubmit}>
          Submit
        </Button>
        </div>
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
