import React, {  useEffect, useState } from "react";
import Modal from "react-modal";

import { InputText } from "primereact/inputtext";
// import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import Select from 'react-select';
import ApiService from "../../../api/apiService";

export default function ProductCreate({ refreshList }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [category, setCategory] = useState([]);
  const [prostatus, setProductStatus] = useState([]);
  const [ower, setOwer] = useState([]);
  const [unti] = useState([]);
  const [direc, setDirec]= useState([]);
  const [provice, setProvice]= useState([]);
  const [district, setDistrict]= useState([]);
  const [proviceID, setProviceID]= useState();
  
  
  var [Product, setProduct] = useState({
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
    
        setCategory(listDataSet);

        setLoading(false);
      })
      .catch((error) => {
        if (error.response) {
          // get response with a status code not in range 2xx
       
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

        setOwer(listDataSet);

        setLoading(false);
      })
      .catch((error) => {
        if (error.response) {
      
        
        } else if (error.request) {
          // no response
      
        } else {
          // Something wrong in setting up the request
          console.log("Error", error.message);
        }
       
      });
  }
  let getProvieID = (e)=>{
    setProviceID(e.target.value);
    setProduct({ ...Product, province: e.target.selectedOptions[0].text})
  }

  function convertVietnamese(str) {
    // str= str.toLowerCase();
    str= str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a");
    str= str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e");
    str= str.replace(/ì|í|ị|ỉ|ĩ/g,"i");
    str= str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"o");
    str= str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u");
    str= str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y");
    str= str.replace(/đ/g,"d");
    str= str.replace(/Đ/g,"D");
    str= str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'| |\"|\&|\#|\[|\]|~|$|_/g," ");
    str= str.replace(/-+-/g,"-");
    str= str.replace(/^\-+|\-+$/g,"");
   
    return str;
}

async function getProvice() {
  setLoading(true);

  await ApiService.getProvie()
    .then((response) => {

      let listProRes = [];
      let listSet = [];
      listProRes = response.data.results;
      listProRes.map((obj, index) => {
       
        let modifineProvinceName = ""
        if(obj.province_name.includes("Thành phố ")) {
          modifineProvinceName = obj.province_name
          obj.province_name = `${obj.province_name.replace("Thành phố ", "")} City`
          console.log(obj.province_name)
        }
          if(obj.province_name.includes("Tỉnh")) {
            modifineProvinceName = obj.province_name
            obj.province_name = `${obj.province_name.replace("Tỉnh ", "")} Province`
            console.log(obj.province_name)
        
        }
        let dataObj = {
          
          
          province_id: obj.province_id,
          province_name: convertVietnamese(obj.province_name),
          province_type: convertVietnamese(obj.province_type)
        }
        listSet.push(dataObj);
      })

  
      setProvice(listSet);

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

async function getDistrict(proviceID) {
  setLoading(true);
  console.log(proviceID)

  await ApiService.getDistrict(proviceID)
    .then((response) => {

      let listProRes = [];
      let listSet = [];
      listProRes = response.data.results;
      listProRes.map((obj, index) => {
        let modifineProvinceName = ""
        if(obj.district_name.includes("Huyện")) {
          modifineProvinceName = obj.district_name
          obj.district_name = `${obj.district_name.replace("Huyện ", "")} District`
       
    
      }
      if(obj.district_name.includes("Quận")) {
        modifineProvinceName = obj.district_name
        obj.district_name = `${obj.district_name.replace("Quận ", "")} District`
     
  
    }

  

      if(obj.district_name.includes("Thành phố")) {
        modifineProvinceName = obj.district_name
        obj.district_name = `${obj.district_name.replace("Thành phố ", "")} City`
      
    
    }

        let dataObj = {
          district_id: obj.district_id,
          district_name: convertVietnamese(obj.district_name),
          district_type: convertVietnamese(obj.district_type)
        }
        listSet.push(dataObj);
      })

      setDistrict(listSet);
    

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
       
        let list  = response.data;
        list.map((tagName) => {
          let obj = {
            value: tagName,
            label: tagName.name
          }
          unti.push(obj)
        })
        // console.log(response.data,"dsadwqew")
        // setUniti(response.data);
        // // console.log(unti)
        // console.log(unti)
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


 
  useEffect(() => {
    getUniti();
  }, []);

  
  useEffect(() => {
    getProductStatus();
  }, []);

  useEffect(() => {
    getCate();
  }, []);

  useEffect(() => {
    getOwer();
  },[]);

  useEffect(() => {
    getProvice();
  }, []);

  useEffect(() => {
    getDirc();
  }, []);
  useEffect(() => {
    getDistrict(proviceID);
  }, [proviceID]);
  // useEffect(() => {
  //   // setProduct({ ...Product, utilities: names})
  //   console.log("dfsdfsf")
  // }, [names]);
  const handleSubmit = async (e) => {
    e.preventDefault();
     createProduct();
     setSuccessMsg("");
     setErrMsg("");

   
   
  };

  return (
    <div>
      <Button
    
        style={{ float: "right"}}
        className="btn btn-primary" 
        onClick={() => setModalIsOpen(true)}
      ><FontAwesomeIcon icon={faPlus} /> Add</Button>
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
        <form onSubmit={handleSubmit} id="company-Form">
        <div className="p-fluid p-formgrid p-grid">
          {/* Name */}
          <div className="p-field p-col-8 p-md-4">
            <label htmlFor="name">Name</label>
            <InputText
              id="name"
              type="text"
              
              onChange={(e) => setProduct({ ...Product, name: e.target.value })}
            />
          </div>

          <div className="p-field p-col-2 p-md-4">
            <label htmlFor="name">Price</label>
            <InputText
              id="name"
             
              type="number"
              required
              onChange={(e) => setProduct({ ...Product, price: e.target.value })}
            />
          </div>

           {/* Name */}
           <div className="p-field p-col-8 p-md-4">
            <label htmlFor="name">Description</label>
            <InputText
              id="name"
              type="text"
              required
              onChange={(e) => setProduct({ ...Product, description: e.target.value })}
            />
          </div>
           
          <div className="p-field p-col-8 p-md-4">
           <label htmlFor="role">Category:</label><br></br>
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
           <label htmlFor="role">Product Status:</label><br></br>
            <select
              onChange={(e) => setProduct({ ...Product,productStatus:e.target.selectedOptions[0].text })}
            
            >
                
              {
                    prostatus.map((x, y) =>
                        <option key={y} value={x.id}>{x.name}</option>)
                    }
            </select>
          </div>

          <div className="p-field p-col-8 p-md-4">
           <label htmlFor="role">Product Ower:</label><br></br>
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
              required
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
              required
              onChange={(e) => setProduct({ ...Product, noBedroom: e.target.value })}
            />
          </div>
          <div className="p-field p-col-3 p-md-2">
            <label htmlFor="name">Toilet</label>
            <InputText
              id="name"
              type="number"
              onChange={(e) => setProduct({ ...Product, noToilet: e.target.value })}
            />
          </div>
          <div className="p-field p-col-3 p-md-2">
            <label style={{marginRight:5}} htmlFor="name">Floor</label>
            <InputText
              id="name"
              type="number"
              required
              onChange={(e) => setProduct({ ...Product, noFloor: e.target.value })}
            />
          </div>
          <div className="p-field p-col-1 p-md-2">
            <label htmlFor="name">Facade</label>
            <InputText
              id="name"
              type="number"
              required
              onChange={(e) => setProduct({ ...Product, facade: e.target.value })}
            />
          </div>

          <div className="p-field p-col-8 p-md-4">
           <label htmlFor="role">Direction:</label><br></br>
            <select
              onChange={(e) => setProduct({ ...Product, direction:e.target.selectedOptions[0].text })}
            >
              {
                    direc.map((x, y) =>
                        <option key={y} value={x.id}>{x.name}</option>)
                    }
              
            </select>
          </div>

          <div className="p-field p-col-8 p-md-4" >
           <label htmlFor="role">Province</label><br></br>
            <select style={{overflow:"scroll",maxHeight: "20rem"}}
              onChange={getProvieID}
              
              
            
              classNamePrefix="select"
            >
            
              {
                      provice.map((x, y) =>
                        <option key={y} name={x.province_name} value={x.province_id}>{x.province_name}</option>)
                    }
              
            </select>
          </div>

          <div className="p-field p-col-8 p-md-4">
            <label htmlFor="name">District</label><br></br>
            <select
             classNamePrefix="select"
              onChange={(e) => setProduct({ ...Product, district: e.target.selectedOptions[0].text })}      
            >
              {
                 

                      district.map((x, y) =>
                        <option key={y} value={x.district_id}>{x.district_name}</option>)
                    }
              
            </select>
          </div>

          <div className="p-field p-col-8 p-md-4">
            <label htmlFor="name">Street</label>
            <InputText
              id="name"
              type="text"
              required
              onChange={(e) => setProduct({ ...Product, street: e.target.value })}
            />
          </div>

          <div className="p-field p-col-8 p-md-4">
           <label htmlFor="role">Utilities:</label><br></br>
           
           <Select
                onChange={(e) => {
                  let listNames = []
                  e.map( (currentValue) => {
                    listNames.push(currentValue.label)
                  })
                  Product.utilities = listNames.join(",")
                }
              }
            isMulti
            name="colors"
            options= {unti}
            // value = {unti[0]}
            className="basic-multi-select"
            classNamePrefix="select"
            
              
             
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
          <div style={{marginTop:"-0.2%"}} className="p-field p-col-8 p-md-4">
            <label htmlFor="name">receivedDate</label>
            <InputText
              id="name"
              type="datetime-local"
              value={Product.receivedDate}
              required
              onChange={(e) => setProduct({ ...Product, receivedDate: e.target.value })}
            />
          </div>
         
          {/* Gender */}
          <div className="p-field p-col-8 p-md-3">
            <label htmlFor="status">Furniture</label>
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
                onChange={(e) => setProduct({ ...Product, isFurniture: e.target.value })}
              />
              <label className="form-check-label" htmlFor="exampleRadios2">
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
        <Button type="submit">
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
        </form>
      </Modal>
    </div>
  );
}
