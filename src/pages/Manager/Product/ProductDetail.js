import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Tabs, Tab, Button, Figure  } from "react-bootstrap";
import PageHeading from "../../../components/PageHeading";
import { faExternalLinkSquare } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStepBackward } from '@fortawesome/free-solid-svg-icons'
import ApiService from "../../../api/apiService";

const ProductDetail = () => {
    const { state } = useLocation();
    const [Product, setProduct] = useState([]);
    const [ProductFa, setProductFa] = useState('');

    const [ProductVi, setProductVi] = useState([]);
   
    const [loadingData, setLoadingData] = useState(true);

    const [id, setID] = useState(state.id);

    
    
    
    useEffect(() => {
      if (typeof state != "undefined") {
        localStorage.setItem("Temp", JSON.stringify(state));
      }
      const storageEvent = JSON.parse(localStorage.getItem("Temp"));
      setProduct(storageEvent);
      getFoveritList();
      getViewProdcut();
      setLoadingData(false);
    }, []);



    async function getFoveritList() {
      setLoadingData(true);
      console.log(id);
      await ApiService.getProductFavorite(id)
        .then((response) => {
          setProductFa(response.data)
          setLoadingData(false);
        })
        .catch((error) => {
          if (error.response) {
           
          } else if (error.request) {
            // no response
            console.log(error.request);
          } else {
        
          }
          console.log(error.config);
        });
    }

    async function getViewProdcut() {
      setLoadingData(true);
      console.log(id);
      await ApiService.getViewProduct(id)
        .then((response) => {
          setProductVi(response.data)
          setLoadingData(false);
        })
        .catch((error) => {
          if (error.response) {
           
          } else if (error.request) {
            // no response
            console.log(error.request);
          } else {
        
          }
          console.log(error.config);
        });
    }
  
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
                    <div style={{ textAlign:"center"}}className="card">
                    <Figure style={{margin:"2%"}}>
                    <Figure.Image
                      width={180}
                      height={180}
                      alt="171x180"
                      src={x.url}
                      className="img-thumbnail"
                      
                    />
                  </Figure>
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
                            <h6 className="mb-0">Product Name:</h6>
                          </div>
                          <div className="col-sm-9 text-secondary">
                            <p>{Product.name}</p>
                          </div>
                        </div>

                        <div className="row mb-3">
                          <div className="col-sm-3">
                            <h6 className="mb-0">Category:</h6>
                          </div>
                          <div className="col-sm-9 text-secondary">
                            <p>{Product.category.productCategoryName}</p>
                          </div>
                        </div>

                        <div className="row mb-3">
                          <div className="col-sm-3">
                            <h6 className="mb-0">Price:</h6>
                          </div>
                          <div className="col-sm-9 text-secondary">
                            <p>{Product.price}(VND)</p>
                          </div>
                        </div>

                        <div className="row mb-3">
                          <div className="col-sm-3">
                            <h6 className="mb-0">Description:</h6>
                          </div>
                          <div className="col-sm-9 text-secondary">
                            <textarea>{Product.description}</textarea>
                          </div>
                        </div>

                        <div className="row mb-3">
                          <div className="col-sm-3">
                            <h6 className="mb-0">Width:</h6>
                          </div>
                          <div className="col-sm-9 text-secondary">
                            <p>{Product.width}m</p>
                          </div>
                        </div>

                        <div className="row mb-3">
                          <div className="col-sm-3">
                            <h6 className="mb-0">Length:</h6>
                          </div>
                          <div className="col-sm-9 text-secondary">
                            <p>{Product.length}m</p>
                          </div>
                        </div>

                        <div className="row mb-3">
                          <div className="col-sm-3">
                            <h6 className="mb-0">Area:</h6>
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
                            <h6 className="mb-0">Street:</h6>
                          </div>
                          <div className="col-sm-9 text-secondary">
                            <p>{Product.street}</p>
                          </div>
                        </div>

                        <div className="row mb-3">
                          <div className="col-sm-3">
                            <h6 className="mb-0">District:</h6>
                          </div>
                          <div className="col-sm-9 text-secondary">
                            <p>{Product.district}</p>
                          </div>
                        </div>

                        <div className="row mb-3">
                          <div className="col-sm-3">
                            <h6 className="mb-0">Province:</h6>
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
                            <h6 className="mb-0">Number of Bedroom:</h6>
                          </div>
                          <div className="col-sm-9 text-secondary">
                            <p>{Product.noBedroom}</p>
                          </div>
                        </div>

                        <div className="row mb-3">
                          <div className="col-sm-3">
                            <h6 className="mb-0">Number of Toilet:</h6>
                          </div>
                          <div className="col-sm-9 text-secondary">
                            <p>{Product.noToilet}</p>
                          </div>
                        </div>


                        <div className="row mb-3">
                          <div className="col-sm-3">
                            <h6 className="mb-0">Number of Floor:</h6>
                          </div>
                          <div className="col-sm-9 text-secondary">
                            <p>{Product.noFloor}</p>
                          </div>
                        </div>


                        <div className="row mb-3">
                          <div className="col-sm-3">
                            <h6 className="mb-0">Facade:</h6>
                          </div>
                          <div className="col-sm-9 text-secondary">
                            <p>{Product.facade}</p>
                          </div>
                        </div>

                        <div className="row mb-3">
                        <div className="col-sm-3">
                          <h6 className="mb-0">Furniture:</h6>
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
                    <Tab eventKey="Ower" title="Product Ower" >
                    <div className="card-body">
                     <div className="row mb-3">
                          <div className="col-sm-3">
                            <h6 className="mb-0">Name Ower:</h6>
                          </div>
                          <div className="col-sm-9 text-secondary">
          
                  
                      
                        <p>{Product.productOwner.name} 
                        <Link
                        
                        to={{
                          pathname: "/Dashboard/Manager/ProductOwerInfo",
                          state: Product,
                        }}
                        
                        >
                        <Button style={{marginLeft:"10%"}}>
                          
                          <FontAwesomeIcon icon={faExternalLinkSquare} />
                          </Button>
                          </Link></p>
                          
                          
                     
                    
                    
                          
                          </div>
                        </div>
                       
                      </div>


                    </Tab>
                    <Tab eventKey="Favoirte" title="Product Behavor" >
                    <div className="card-body">
              
                     <div className="row mb-3">
                          <div className="col-sm-6">
                            <h6 className="mb-0">Number of Customer View The Product:</h6>
                          </div>
                          <div className="col-sm-4 text-secondary">
                            <p>{ProductFa}</p>
                          </div>
                        </div>
                        
                     <div className="row mb-3">
                          <div className="col-sm-6">
                            <h6 className="mb-6">Number of Customer Like The Product:</h6>
                          </div>
                          <div className="col-sm-4 text-secondary">
                            <p>{ProductVi}</p>
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
        <div>
        <Link 
        to="/Dashboard/Manager/ProductList"
        >
         <Button style={{marginTop:"2%"}}>
          <FontAwesomeIcon icon={faStepBackward} /> Back to
           
         </Button>
        </Link>
      </div>
      </div>
    );
  };
  
  export default ProductDetail;