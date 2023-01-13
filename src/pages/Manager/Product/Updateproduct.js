import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";

import ApiService from "../../../api/apiService";
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LandingPage from "../../../redux/services/auth-imgae";

export default function ProductUpdate({ rowData, refreshList }) {

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [Product, setProduct] = useState("");
  const [picture, setPicture] = useState({});

  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState([]);
  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [prostatus, setProductStatus] = useState([]);
  const [ower, setOwer] = useState([]);
  const [unti, setUniti] = useState([]);
  const [direc, setDirec]= useState([]);
  const [test, Setest]= useState('1');
  const [provice, setProvice]= useState([]);
  const [image, setImage]= useState([]);



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
        setProductStatus(response.data);

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

  async function getCate() {
    setLoading(true);

    await ApiService.getidCategory()
      .then((response) => {
        const dataRes = response.data.data
        const listDataSet = [...dataRes];
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
    // UpdateProduct();
  };

  useEffect(() => {
    getDirc();
  }, [test]);

  useEffect(() => {
    getCate();
  }, [test]);

  useEffect(() => {
    getOwer();
  }, [test]);

  useEffect(() => {
    getProductStatus();
  }, [test]);

  useEffect(() => {
    getUniti();
  }, [test]);

  const uploadPicture = e => {
    setPicture({
      /* contains the preview, if you want to show the picture to the user
           you can access it with this.state.currentPicture
       */
      picturePreview: URL.createObjectURL(e.target.files[0]),
      /* this contains the file we want to send */
      pictureAsFile: e.target.files[0]
    });
  };

  const setImageAction = async e => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("id", rowData.id);
    formData.append("file", picture.pictureAsFile);

    console.log(picture.pictureAsFile);

    for (var key of formData.entries()) {
      console.log(key[0] + ", " + key[1]);
    }

    const data = await fetch("https://backup-dtv-crm.azurewebsites.net/api/v1/Product/product/add-product-image", {
      method: "post",
      headers: { 
      "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6ImRkNjM3ZjgyLWY5ZGQtNDQ4YS1iNDRhLTdkNGY5YzI0NzFhNCIsIkVtYWlsQWRyZXNzIjoibWFuYWdlckBnbWFpbC5jb20iLCJTdGF0dXMiOiJBY3RpdmF0ZWQiLCJSb2xlIjoiTWFuYWdlciIsIm5iZiI6MTY3MjAyNjcxNiwiZXhwIjoxNjc0NjE4NzE2LCJpYXQiOjE2NzIwMjY3MTZ9.IyesJccj0zl11M-MBgXQEK-j360WcEk9OyJctTldp9w" },
      body: formData
    });

    const uploadedImage = await data.json();
    if (uploadedImage) {
      console.log("Successfully uploaded image");
    } else {
      console.log("Error Found");
    }
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
        <h3>Update Product</h3>
        <div className="p-fluid p-formgrid p-grid">
          {/* Name */}
          <div className="p-field p-col-8 p-md-4">
            <label htmlFor="name">Name</label>
            <InputText
              id="name"
              type="text"
              onChange={(e) => setProduct({ ...Product, name: e.target.value })}
              defaultValue={rowData.name}
              required
             
            />
          </div>

          <div className="p-field p-col-2 p-md-4">
            <label htmlFor="price">Price</label>
            <InputText
              id="name"
              type="number"
              defaultValue={rowData.price}
              // onChange={(e) => setProduct({ ...Product, price: e.target.value })}
            />
          </div>

           {/* Name */}
           <div className="p-field p-col-8 p-md-4">
            <label htmlFor="des">Description</label>
            <InputText
              id="name"
              type="text"
              defaultValue={rowData.description}
              required
              // onChange={(e) => setProduct({ ...Product, description: e.target.value })}
            />
          </div>
           
          <div className="p-field p-col-8 p-md-4"style={{marginTop:"-2.5%"}}>
           <label htmlFor="cate">Category</label><br></br>
            <select
              // onChange={(e) => setProduct({ ...Product, categoryId: e.target.value })}
            >
              

                        {
                      category.map((x, y) =>(
                        <>
                          {
                            x.productCategoryName === rowData.category.productCategoryName ? (<>
                               <option key={y} value={x.id} selected>{x.productCategoryName}</option>
                            </>) : (<>
                              <option key={y} value={x.id}>{x.productCategoryName}</option>
                            </>)
                          }
                        </>
                      )
                         
                       )
                    }
                  
            </select>
          </div>

           {/* Name */}
          

             
          <div className="p-field p-col-8 p-md-4"style={{marginTop:"-2.5%"}}>
           <label htmlFor="status">Product Status</label><br></br>
            <select
              // onChange={(e) => setProduct({ ...Product,productStatus: e.target.value })}
            >
              
              {
                     prostatus.map((x, y) =>(
                        <>
                          {
                            x.name === rowData.productStatus ? (<>
                               <option key={y} value={x.id} selected>{x.name}</option>
                            </>) : (<>
                              <option key={y} value={x.id}>{x.name}</option>
                            </>)
                          }
                        </>
                      )
                         
                       )
                    }
            </select>
          </div>

          <div className="p-field p-col-3 p-md-3" style={{marginTop:"-2%"}}>
           <label htmlFor="ower">ProductOwer</label><br></br>
            <select
              // onChange={(e) => setProduct({ ...Product, productOwnerId: e.target.value })}
            >
               {
                     ower.map((x, y) =>(
                        <>
                          {
                            x.productOwnerName === rowData.productOwner.name ? (<>
                               <option key={y} value={x.id} selected>{x.productOwnerName}</option>
                            </>) : (<>
                              <option key={y} value={x.id}>{x.productOwnerName}</option>
                            </>)
                          }
                        </>
                      )
                         
                       )
                    }
              
            </select>
          </div>
           {/* Name */}
           <div  style={{marginLeft:"0%"}}className="p-field p-col-2 p-md-2">
            <label htmlFor="width">Width</label>
            <InputText
              id="name"
              type="number"
              defaultValue={rowData.width}
              // onChange={(e) => setProduct({ ...Product, width: e.target.value })}
            />
          </div>
           {/* Name */}
           <div className="p-field p-col-3 p-md-2">
            <label htmlFor="legth">Length</label>
            <InputText
              id="name"
              type="number"
              defaultValue={rowData.length}
              required
              // onChange={(e) => setProduct({ ...Product, length: e.target.value })}
            />
          </div>

          <div className="p-field p-col-3 p-md-2">
            <label htmlFor="bed">Bedroom</label>
            <InputText
              id="name"
              type="number"
              defaultValue={rowData.noBedroom}
              // onChange={(e) => setProduct({ ...Product, noBedroom: e.target.value })}
            />
          </div>
          <div className="p-field p-col-3 p-md-2">
            <label htmlFor="let">Toilet</label>
            <InputText
              id="name"
              type="number"
              defaultValue={rowData.noToilet}
              // onChange={(e) => setProduct({ ...Product, noToilet: e.target.value })}
            />
          </div>
          <div className="p-field p-col-3 p-md-2">
            <label style={{marginRight:5}} htmlFor="floor">Floor</label>
            <InputText
              id="name"
              type="number"
              defaultValue={rowData.noFloor}
              // onChange={(e) => setProduct({ ...Product, noFloor: e.target.value })}
            />
          </div>
          <div className="p-field p-col-1 p-md-2">
            <label htmlFor="facade">Facade</label>
            <InputText
              id="name"
              type="number"
              defaultValue={rowData.facade}
              // onChange={(e) => setProduct({ ...Product, facade: e.target.value })}
            />
          </div>


          <div className="p-field p-col-8 p-md-4">
            <label htmlFor="stress">Street</label>
            <InputText
              id="name"
              type="text"
              defaultValue={rowData.street}
              // onChange={(e) => setProduct({ ...Product, street: e.target.value })}
            />
          </div>

         

          <div className="p-field p-col-8 p-md-4">
            <label htmlFor="district">District</label>
            <InputText
              id="name"
              type="text"
              defaultValue={rowData.district}
              // onChange={(e) => setProduct({ ...Product, district: e.target.value })}
            />
          </div>


          <div className="p-field p-col-8 p-md-4">
            <label htmlFor="province">Province</label>
            <InputText
              id="name"
              type="text"
              defaultValue={rowData.province}
              // onChange={(e) => setProduct({ ...Product, province: e.target.value })}
            />
          </div>
          <div className="p-field p-col-8 p-md-4">
           <label htmlFor="direction">Direction:</label><br></br>
            <select
              // onChange={(e) => setProduct({ ...Product, direction: e.target.value })}
            >
                {
                     direc.map((x, y) =>(
                        <>
                          {
                            x.name === rowData.direction ? (<>
                               <option key={y} value={x.id} selected>{x.name}</option>
                            </>) : (<>
                              <option key={y} value={x.id}>{x.name}</option>
                            </>)
                          }
                        </>
                      )
                         
                       )
                    }
              
            </select>
          </div>
          <div className="p-field p-col-8 p-md-4">
           <label htmlFor="Utilites">Utilities:</label><br></br>
            <select
              // onChange={(e) => setProduct({ ...Product, utilities: e.target.value })}
            >
 {
                     unti.map((x, y) =>(
                        <>
                          {
                            x.name === rowData.utilities ? (<>
                               <option key={y} value={x.id} selected>{x.name}</option>
                            </>) : (<>
                              <option key={y} value={x.id}>{x.name}</option>
                            </>)
                          }
                        </>
                      )
                         
                       )
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
            <label htmlFor="recivedate">receivedDate</label>
            <InputText
              id="name"
              type="datetime"
              defaultValue={rowData.receivedDate}
              required
              // onChange={(e) => setProduct({ ...Product, receivedDate: e.target.value })}
            />
          </div>
         <LandingPage rowData={rowData}/>
         
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
                // onChange={(e) => setProduct({ ...Product, isFurniture: e.target.value })}
              />
              <label className="form-check-label" htmlFor="exampleRadios1">
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
                // onChange={(e) => setProduct({ ...Product, isFurniture: e.target.value })}
              />
              <label className="form-check-label" htmlFor="exampleRadios2">
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
