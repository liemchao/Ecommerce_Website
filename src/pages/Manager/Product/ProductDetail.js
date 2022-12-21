import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Tabs, Tab } from "react-bootstrap";
import PageHeading from "../../../components/PageHeading";
import ApiService from "../../../api/apiService";

const ProductDetail = () => {
    const { state } = useLocation();
    const [Product, setProduct] = useState([]);
   
    const [loadingData, setLoadingData] = useState(true);
    

    useEffect(() => {
      if (typeof state != "undefined") {
        localStorage.setItem("Temp", JSON.stringify(state));
      }
      const storageEvent = JSON.parse(localStorage.getItem("Temp"));
      setProduct(storageEvent);
      setLoadingData(false);
      // getFoveritList();
    }, []);

    // async function getFoveritList() {
    //   setLoadingData(true);
    //   await ApiService.getFoveritList(Product.id)
    //     .then((response) => {
       
    //       setData(response);
    //       console.log(response);
        
    //       setLoadingData(false);
    //     })
    //     .catch((error) => {
    //       if (error.response) {
           
    //       } else if (error.request) {
    //         // no response
    //         console.log(error.request);
    //       } else {
        
    //       }
    //       console.log(error.config);
    //     });
    // }
  
    return (
      <div>
        <PageHeading title="Product Detail" />
        {loadingData ? (
          <p>Loading, please wait...</p>
        ) : (
          <div className="main-body">
            <div className="row">
              <div className="col-lg-4">
            
              {
                    Product.productImages.map((x, y) => 
                    <div className="card">         
                    <img
                    src={x.url}
                    alt="img-product"
                    className="p-1 bg-primary img-thumbnail rounded mx-auto d-block"
                    width={200}
                  />
                    </div>
                     
                    )}
            
                
                
              </div>
              <div className="col-lg-8">
                <div className="card">
                  <Tabs
                    defaultActiveKey="Detail"
                    id="uncontrolled-tab-example"
                    className="mb-3"
                  >
                    <Tab eventKey="Detail" title="Product Detail">
                      <div className="card-body">

                      <div className="row mb-3">
                          <div className="col-sm-3">
                            <h6 className="mb-0">Name</h6>
                          </div>
                          <div className="col-sm-9 text-secondary">
                            <p>{Product.name}</p>
                          </div>
                        </div>

                        <div className="row mb-3">
                          <div className="col-sm-3">
                            <h6 className="mb-0">Category</h6>
                          </div>
                          <div className="col-sm-9 text-secondary">
                            <p>{Product.category.productCategoryName}</p>
                          </div>
                        </div>

                        <div className="row mb-3">
                          <div className="col-sm-3">
                            <h6 className="mb-0">Price</h6>
                          </div>
                          <div className="col-sm-9 text-secondary">
                            <p>{Product.price}(VND)</p>
                          </div>
                        </div>

                        <div className="row mb-3">
                          <div className="col-sm-3">
                            <h6 className="mb-0">Description</h6>
                          </div>
                          <div className="col-sm-9 text-secondary">
                            <textarea>{Product.description}</textarea>
                          </div>
                        </div>

                        <div className="row mb-3">
                          <div className="col-sm-3">
                            <h6 className="mb-0">Width</h6>
                          </div>
                          <div className="col-sm-9 text-secondary">
                            <p>{Product.width}m</p>
                          </div>
                        </div>

                        <div className="row mb-3">
                          <div className="col-sm-3">
                            <h6 className="mb-0">Length</h6>
                          </div>
                          <div className="col-sm-9 text-secondary">
                            <p>{Product.length}m</p>
                          </div>
                        </div>

                        <div className="row mb-3">
                          <div className="col-sm-3">
                            <h6 className="mb-0">Area</h6>
                          </div>
                          <div className="col-sm-9 text-secondary">
                            <p>{Product.area}m&#178;</p>
                          </div>
                        </div>

                      </div>
                    </Tab>
                    <Tab eventKey="Product" title="Product Local">
                      <div className="card-body">

                      <div className="row mb-3">
                          <div className="col-sm-3">
                            <h6 className="mb-0">Street</h6>
                          </div>
                          <div className="col-sm-9 text-secondary">
                            <p>{Product.street}</p>
                          </div>
                        </div>

                        <div className="row mb-3">
                          <div className="col-sm-3">
                            <h6 className="mb-0">District</h6>
                          </div>
                          <div className="col-sm-9 text-secondary">
                            <p>{Product.district}</p>
                          </div>
                        </div>

                        <div className="row mb-3">
                          <div className="col-sm-3">
                            <h6 className="mb-0">Province</h6>
                          </div>
                          <div className="col-sm-9 text-secondary">
                            <p>{Product.province}</p>
                          </div>
                        </div>

                       
                      </div>
                    </Tab>

                    <Tab eventKey="Status" title="Product Status">
                      <div className="card-body">

                      <div className="row mb-3">
                          <div className="col-sm-3">
                            <h6 className="mb-0">Number of Bedroom</h6>
                          </div>
                          <div className="col-sm-9 text-secondary">
                            <p>{Product.noBedroom}</p>
                          </div>
                        </div>

                        <div className="row mb-3">
                          <div className="col-sm-3">
                            <h6 className="mb-0">Number of Toilet</h6>
                          </div>
                          <div className="col-sm-9 text-secondary">
                            <p>{Product.noToilet}</p>
                          </div>
                        </div>


                        <div className="row mb-3">
                          <div className="col-sm-3">
                            <h6 className="mb-0">Number of Floor</h6>
                          </div>
                          <div className="col-sm-9 text-secondary">
                            <p>{Product.noFloor}</p>
                          </div>
                        </div>


                        <div className="row mb-3">
                          <div className="col-sm-3">
                            <h6 className="mb-0">Facade</h6>
                          </div>
                          <div className="col-sm-9 text-secondary">
                            <p>{Product.facade}</p>
                          </div>
                        </div>

                        <div className="row mb-3">
                        <div className="col-sm-3">
                          <h6 className="mb-0">Furniture</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                          {Product.isFurniture ? (
                            <div className="badge badge-primary mr-2">
                              Active
                            </div>
                          ) : (
                            <div className="badge badge-danger mr-2">
                              Not Avaliable
                            </div>
                          )}
                        </div>
                      </div>


                      </div>
                    </Tab>



                  </Tabs>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };
  
  export default ProductDetail;