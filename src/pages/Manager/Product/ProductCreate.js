import React, {  useEffect, useState } from "react";
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
  const [category, setCategory] = useState([]);
  const [prostatus, setProductStatus] = useState([]);
  const [ower, setOwer] = useState([]);
  const [unti, setUniti] = useState([]);
  const [direc, setDirec]= useState([]);
  
  
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

  async function getCate() {
    setLoading(true);

    await ApiService.getidCategory()
      .then((response) => {
        const dataRes = response.data.data
        const listDataSet = [...dataRes];
        console.log(response);

        setCategory(listDataSet);

        setLoading(false);
      })
      .catch((error) => {
        if (error.response) {
          // get response with a status code not in range 2xx
          console.log(error.response.data.data);
          console.log(error.response.data.status);
          console.log(error.response.data.headers);
        } else if (error.request) {
          // no response
          console.log(error.request);
        } else {
          // Something wrong in setting up the request
          console.log("Error", error.message);
        }
        console.log(error.config);
      });
  }

  async function getOwer() {
    setLoading(true);

    await ApiService.getidProductOwer()
      .then((response) => {
        const dataRes = response.data.data
        const listDataSet = [...dataRes];
        listDataSet.map((obj, index) => {
          const count = ++index;
          obj['indexNumber'] = count

        })
        console.log(response);

        setOwer(listDataSet);

        setLoading(false);
      })
      .catch((error) => {
        if (error.response) {
          // get response with a status code not in range 2xx
          console.log(error.response.data.data);
          console.log(error.response.data.status);
          console.log(error.response.data.headers);
        } else if (error.request) {
          // no response
          console.log(error.request);
        } else {
          // Something wrong in setting up the request
          console.log("Error", error.message);
        }
        console.log(error.config);
      });
  }

  async function getProductStatus() {
    setLoading(true);

    await ApiService.getProductStatus()
      .then((response) => {
        const dataRes = response.data
        const listDataSet = [...dataRes];
        listDataSet.map((obj, index) => {
          const count = ++index;
          obj['indexNumber'] = count

        })
        console.log(response);

        setProductStatus(listDataSet);

        setLoading(false);
      })
      .catch((error) => {
        if (error.response) {
          // get response with a status code not in range 2xx
          console.log(error.response.data.data);
          console.log(error.response.data.status);
          console.log(error.response.data.headers);
        } else if (error.request) {
          // no response
          console.log(error.request);
        } else {
          // Something wrong in setting up the request
          console.log("Error", error.message);
        }
        console.log(error.config);
      });
  }

  async function getUniti() {
    setLoading(true);

    await ApiService.getUniti()
      .then((response) => {
        const dataRes = response.data
        const listDataSet = [...dataRes];
        listDataSet.map((obj, index) => {
          const count = ++index;
          obj['indexNumber'] = count

        })
        console.log(response);

        setUniti(listDataSet);

        setLoading(false);
      })
      .catch((error) => {
        if (error.response) {
          // get response with a status code not in range 2xx
          console.log(error.response.data.data);
          console.log(error.response.data.status);
          console.log(error.response.data.headers);
        } else if (error.request) {
          // no response
          console.log(error.request);
        } else {
          // Something wrong in setting up the request
          console.log("Error", error.message);
        }
        console.log(error.config);
      });
  }

  async function getDirc() {
    setLoading(true);

    await ApiService.getDirection()
      .then((response) => {
        const dataRes = response.data
        const listDataSet = [...dataRes];
        listDataSet.map((obj, index) => {
          const count = ++index;
          obj['indexNumber'] = count

        })
        console.log(response);

        setDirec(listDataSet);

        setLoading(false);
      })
      .catch((error) => {
        if (error.response) {
          // get response with a status code not in range 2xx
          console.log(error.response.data.data);
          console.log(error.response.data.status);
          console.log(error.response.data.headers);
        } else if (error.request) {
          // no response
          console.log(error.request);
        } else {
          // Something wrong in setting up the request
          console.log("Error", error.message);
        }
        console.log(error.config);
      });
  }


 
  useEffect(() => {
    getCate();
    getOwer();
    getProductStatus();
    getUniti();
    getDirc();
  }, []);

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
           <label htmlFor="role">Category:</label>
            <select
              onChange={(e) => setProduct({ ...Product, categoryId: e.target.value })}
            >
              

{
                      category.map((x, y) =>
                      
                        <option key={y} value={x.id}>{x.productCategoryName}</option>)
                    }
            </select>
          </div>

           {/* Name */}
          

             
          <div className="p-field p-col-8 p-md-4">
           <label htmlFor="role">Product Status:</label>
            <select
              onChange={(e) => setProduct({ ...Product,productStatus: e.target.value })}
            >
              {
                    prostatus.map((x, y) =>
                        <option key={y} value={x.id}>{x.name}</option>)
                    }
            </select>
          </div>

          <div className="p-field p-col-8 p-md-4">
           <label htmlFor="role">Product Ower:</label>
            <select
              onChange={(e) => setProduct({ ...Product, productOwnerId: e.target.value })}
            >
              {
                      ower.map((x, y) =>
                        <option key={y} value={x.id}>{x.productOwnerName}</option>)
                    }
              
            </select>
          </div>
           {/* Name */}
           <div  style={{marginLeft:"0%"}}className="p-field p-col-2 p-md-2">
            <label htmlFor="name">Width</label>
            <InputText
              id="name"
              type="number"
              value={Product.width}
              onChange={(e) => setProduct({ ...Product, width: e.target.value })}
            />
          </div>
           {/* Name */}
           <div className="p-field p-col-3 p-md-2">
            <label htmlFor="name">Length</label>
            <InputText
              id="name"
              type="number"
              required
              onChange={(e) => setProduct({ ...Product, length: e.target.value })}
            />
          </div>

          <div className="p-field p-col-3 p-md-2">
            <label htmlFor="name">Bedroom</label>
            <InputText
              id="name"
              type="number"
              value={Product.noBedroom}
              onChange={(e) => setProduct({ ...Product, noBedroom: e.target.value })}
            />
          </div>
          <div className="p-field p-col-3 p-md-2">
            <label htmlFor="name">Toilet</label>
            <InputText
              id="name"
              type="number"
              value={Product.noToilet}
              onChange={(e) => setProduct({ ...Product, noToilet: e.target.value })}
            />
          </div>
          <div className="p-field p-col-3 p-md-2">
            <label style={{marginRight:5}} htmlFor="name">Floor</label>
            <InputText
              id="name"
              type="number"
              value={Product.noFloor}
              onChange={(e) => setProduct({ ...Product, noFloor: e.target.value })}
            />
          </div>
          <div className="p-field p-col-1 p-md-2">
            <label htmlFor="name">Facade</label>
            <InputText
              id="name"
              type="number"
              value={Product.facade}
              onChange={(e) => setProduct({ ...Product, facade: e.target.value })}
            />
          </div>


          <div className="p-field p-col-8 p-md-4">
            <label htmlFor="name">Street</label>
            <InputText
              id="name"
              type="text"
              value={Product.street}
              onChange={(e) => setProduct({ ...Product, street: e.target.value })}
            />
          </div>

          <div className="p-field p-col-8 p-md-4">
            <label htmlFor="name">Province</label>
            <InputText
              id="name"
              type="text"
              value={Product.province}
              onChange={(e) => setProduct({ ...Product, province: e.target.value })}
            />
          </div>

          <div className="p-field p-col-8 p-md-4">
            <label htmlFor="name">District</label>
            <InputText
              id="name"
              type="text"
              value={Product.district}
              onChange={(e) => setProduct({ ...Product, district: e.target.value })}
            />
          </div>
          <div className="p-field p-col-8 p-md-4">
           <label htmlFor="role">Direction:</label>
            <select
              onChange={(e) => setProduct({ ...Product, direction: e.target.value })}
            >
              {
                    direc.map((x, y) =>
                        <option key={y} value={x.id}>{x.name}</option>)
                    }
              
            </select>
          </div>
          <div className="p-field p-col-8 p-md-4">
           <label htmlFor="role">Utilities:</label>
            <select
              onChange={(e) => setProduct({ ...Product, utilities: e.target.value })}
            >

{
                      unti.map((x, y) =>
                        <option key={y} value={x.id}>{x.name}</option>)
                    }
            </select>
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
          <div style={{marginTop:"-3%"}} className="p-field p-col-8 p-md-4">
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
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="exampleRadios"
                id="exampleRadios1"
                value={true}
                onChange={(e) => setProduct({ ...Product, isFurniture: e.target.value })}
              />
              <label className="form-check-label" for="exampleRadios1">
               Avaliable
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="exampleRadios"
                id="exampleRadios2"
                value={false}
                onChange={(e) => setProduct({ ...Product, isFurniture: e.target.value })}
              />
              <label className="form-check-label" for="exampleRadios2">
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
