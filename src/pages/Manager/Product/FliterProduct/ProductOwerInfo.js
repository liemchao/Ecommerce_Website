import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Tabs, Tab, Button } from "react-bootstrap";
import PageHeading from "../../../../components/PageHeading";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStepBackward } from '@fortawesome/free-solid-svg-icons'

const ProductOWerInfor = () => {
    const { state } = useLocation();
    const [Product, setProduct] = useState([]);
    const [work, setWork] = useState([]);
    const [totalRecords, setTotalRecords] = useState();
    const [totalPage, setTotalPage] = useState();
    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const [loadingData, setLoadingData] = useState(true);
    // const [Time, setTime] = useState() ;
  
    useEffect(() => {
      if (typeof state != "undefined") {
        localStorage.setItem("Temp", JSON.stringify(state));
      }
      const storageEvent = JSON.parse(localStorage.getItem("Temp"));
      setProduct(storageEvent);
      setLoadingData(false);
    }, []);
  
    return (
      <div>
        <PageHeading title="Product Ower Detail" />
        {loadingData ? (
          <p>Loading, please wait...</p>
        ) : (
          <div className="main-body">
            <div className="row">
            
              <div className="col-lg-12">
                <div className="card">
                  <Tabs
                    defaultActiveKey="Detail"
                    id="uncontrolled-tab-example"
                    className="mb-3"
                  >
                    <Tab eventKey="Detail" title="Product Ower Detail">
                      <div className="card-body">

                      <div className="row mb-3">
                          <div className="col-sm-3">
                            <h6 className="mb-0">Name:</h6>
                          </div>
                          <div className="col-sm-9 text-secondary">
                            <p>{Product.productOwner.name}</p>
                          </div>
                        </div>

                        <div className="row mb-3">
                          <div className="col-sm-3">
                            <h6 className="mb-0">Email:</h6>
                          </div>
                          <div className="col-sm-9 text-secondary">
                          <p>{Product.productOwner.email}</p>
                          </div>
                        </div>

                        <div className="row mb-3">
                          <div className="col-sm-3">
                            <h6 className="mb-0">Phone:</h6>
                          </div>
                          <div className="col-sm-9 text-secondary">
                          <p>{Product.productOwner.phone}</p>
                         
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
  
  export default ProductOWerInfor;