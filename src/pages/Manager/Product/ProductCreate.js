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
    name:"",
    categoryId:"",
    price:"",
    description: "",
    width:"" ,
    length:"",
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
  });

  async function createProduct() {
    setLoading(true);
    
    let createData = {
    name: Product.name,
    description:Product.description,
    categoryId:Product.categoryId,
    price:parseInt(Product.price),
    width: parseInt(Product.width),
    length: parseInt(Product.length),
    street: Product.street,
    province: Product.province,
    district: Product.district,
    noBedroom: parseInt(Product.noBedroom),
    noToilet: parseInt(Product.noToilet),
    noFloor: parseInt(Product.noFloor),
    facade: parseInt(Product.facade),
    isFurniture: Boolean(Product.isFurniture),
    direction: Product.direction,
    utilities: Product.utilities,
    productStatus:Product.productStatus,
    productOwnerId:Product.productOwnerId,
    receivedDate:Product.receivedDate,
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
              type="text"
              value={Product.name}
              required
              onChange={(e) => setProduct({ ...Product, name: e.target.value })}
            />
          </div>
           
          <div className="p-field p-col-8 p-md-4">
           <label htmlFor="role">Category </label>
            <select
              onChange={(e) => setProduct({ ...Product, categoryId: e.target.value })}
            >
              <option value="d645ae85-04e5-4b8c-9011-4c1dd6e9cae2">Shophouse</option>
              <option value="58fd08d4-1425-401a-9430-4f915f663797">Land</option>
              <option value="b64f980c-4773-49ae-a291-5b0e2a348583">Officetel</option>
              <option value="f30d5a38-0a30-4e33-b716-6a11ed2a874b">Townhouse</option>
              <option value="b375f2b3-b29c-4e9f-a0d8-9090aee75edb">Resort</option>
              <option value="59da778e-e0cd-40f8-ae48-ced5c1c3a066">Apartment</option>
            </select>
          </div>

           {/* Name */}
           <div className="p-field p-col-2 p-md-4">
            <label htmlFor="name">Price</label>
            <InputText
              id="name"
              type="number"
              onChange={(e) => setProduct({ ...Product, price: e.target.value })}
            />
          </div>

           {/* Name */}
           <div className="p-field p-col-8 p-md-4">
            <label htmlFor="name">Description</label>
            <InputText
              id="name"
              type="text"
              value={Product.description}
              required
              onChange={(e) => setProduct({ ...Product, description: e.target.value })}
            />
          </div>

             
          <div className="p-field p-col-8 p-md-4">
           <label htmlFor="role">Product Status </label>
            <select
              onChange={(e) => setProduct({ ...Product,productStatus: e.target.value })}
            >
              <option value="1">Not open for sale</option>
              <option value="2">On sale</option>
              <option value="3">On hold</option>
              <option value="4">Deposited</option>
              <option value="5">Sold</option>
            </select>
          </div>
           {/* Name */}
           <div className="p-field p-col-1 p-md-1">
            <label htmlFor="name">Width</label>
            <InputText
              id="name"
              type="number"
              value={Product.width}
              onChange={(e) => setProduct({ ...Product, width: e.target.value })}
            />
          </div>
           {/* Name */}
           <div className="p-field p-col-1 p-md-1">
            <label htmlFor="name">Length</label>
            <InputText
              id="name"
              type="number"
              required
              onChange={(e) => setProduct({ ...Product, length: e.target.value })}
            />
          </div>

          <div className="p-field p-col-1 p-md-1">
            <label htmlFor="name">Bedroom</label>
            <InputText
              id="name"
              type="number"
              value={Product.noBedroom}
              onChange={(e) => setProduct({ ...Product, noBedroom: e.target.value })}
            />
          </div>
          <div className="p-field p-col-1 p-md-1">
            <label htmlFor="name">Toilet</label>
            <InputText
              id="name"
              type="number"
              value={Product.noToilet}
              onChange={(e) => setProduct({ ...Product, noToilet: e.target.value })}
            />
          </div>
          <div className="p-field p-col-1 p-md-1">
            <label style={{marginRight:5}} htmlFor="name">Floor</label>
            <InputText
              id="name"
              type="number"
              value={Product.noFloor}
              onChange={(e) => setProduct({ ...Product, noFloor: e.target.value })}
            />
          </div>
          <div className="p-field p-col-1 p-md-1">
            <label htmlFor="name">Facade</label>
            <InputText
              id="name"
              type="number"
              value={Product.facade}
              onChange={(e) => setProduct({ ...Product, facade: e.target.value })}
            />
          </div>
          <div className="p-field p-col-8 p-md-4">
           <label htmlFor="role">Product Ower </label>
            <select
              onChange={(e) => setProduct({ ...Product, productOwnerId: e.target.value })}
            >
              <option value="e2145c7f-ad87-4108-9d39-0305261f9ca2">Mandel Umbert</option>
              <option value="d4f82fe0-ad2d-45e2-83fc-1d133cd3e11a">Kaja Pache</option>
              <option value="a08128ef-d132-47fd-b7d7-2d5f9d824d6e">Chris Pepi</option>
              <option value="01b4bc8f-589d-4812-90f6-2f26f9cd2802">Pasquale Grimwood</option>
              
            </select>
          </div>


          <div style={{marginTop:-45}}className="p-field p-col-2 p-md-5">
            <label htmlFor="name">Street</label>
            <InputText
              id="name"
              type="text"
              value={Product.street}
              onChange={(e) => setProduct({ ...Product, street: e.target.value })}
            />
          </div>

          <div style={{marginTop:-45}}className="p-field p-col-2 p-md-5">
            <label htmlFor="name">Province</label>
            <InputText
              id="name"
              type="text"
              value={Product.province}
              onChange={(e) => setProduct({ ...Product, province: e.target.value })}
            />
          </div>

          <div style={{marginTop:-45}}className="p-field p-col-2 p-md-5">
            <label htmlFor="name">District</label>
            <InputText
              id="name"
              type="text"
              value={Product.district}
              onChange={(e) => setProduct({ ...Product, district: e.target.value })}
            />
          </div>
          <div className="p-field p-col-8 p-md-4">
            <label htmlFor="name">Direction</label>
            <InputText
              id="name"
              type="text"
              value={Product.direction}
              required
              onChange={(e) => setProduct({ ...Product, direction: e.target.value })}
            />
          </div>

          <div className="p-field p-col-8 p-md-4">
            <label htmlFor="name">utilities</label>
            <InputText
              id="name"
              type="text"
              value={Product.utilities}
              required
              onChange={(e) => setProduct({ ...Product, utilities: e.target.value })}
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
              value={Product.receivedDate}
              required
              onChange={(e) => setProduct({ ...Product, receivedDate: e.target.value })}
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
                onChange={(e) => setProduct({ ...Product, isFurniture: e.target.value })}
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
                onChange={(e) => setProduct({ ...Product, isFurniture: e.target.value })}
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
