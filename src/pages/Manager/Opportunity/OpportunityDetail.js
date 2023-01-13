import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Tabs, Tab, Button } from "react-bootstrap";
import PageHeading from "../../../components/PageHeading";
// import ProductNumList from "./ProductView/ProductNum";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStepBackward } from '@fortawesome/free-solid-svg-icons'
import { faExternalLinkSquare } from '@fortawesome/free-solid-svg-icons'


const ProductOWerDetail = () => {
    const { state } = useLocation();
    const [Opportunity, setOpportunity] = useState([]);
    const [loadingData, setLoadingData] = useState(true);
    // const [Time, setTime] = useState() ;
  
    useEffect(() => {
      if (typeof state != "undefined") {
        localStorage.setItem("Temp", JSON.stringify(state));
      }
      const storageEvent = JSON.parse(localStorage.getItem("Temp"));
      setOpportunity(storageEvent);
      setLoadingData(false);
    }, []);
  
    return (
      <div>
        <PageHeading title="Opportunity Detail" />
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
                    <Tab eventKey="Detail" title="Information">
                      <div className="card-body">

                      <div className="row mb-3">
                          <div className="col-sm-3">
                            <h6 className="mb-0">Name:</h6>
                          </div>
                          <div className="col-sm-9 text-secondary">
                            <p>{Opportunity.name}</p>
                          </div>
                        </div>

                        <div className="row mb-3">
                          <div className="col-sm-3">
                            <h6 className="mb-0">Description:</h6>
                          </div>
                          <div className="col-sm-9 text-secondary">
                          <p>{Opportunity.description}</p>
                          </div>
                        </div>

                        <div className="row mb-3">
                        <div className="col-sm-3">
                          <h6 className="mb-0">Create Day</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                          <p>{(Opportunity.createDate).slice(0, 10)}</p>
                        </div>
                      </div>

                      <div className="row mb-3">
                        <div className="col-sm-3">
                          <h6 className="mb-0">Listed Price</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                          <p>{(Opportunity.listedPrice).toLocaleString()}</p>
                        </div>
                      </div>
                      
                      
                        <div className="row mb-3">
                        <div className="col-sm-3">
                          <h6 className="mb-0">Status:</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                          {Opportunity.opportunityStatus== 'New' ? (
                            <div className="badge badge-primary mr-2">
                              New
                            </div>
                          ) : (
                            <div className="badge badge-sucess mr-2">
                            {Opportunity.opportunityStatus}
                            </div>
                          )}
                        </div>
                      </div>

                      </div>
                    </Tab>
                    <Tab eventKey="Productview" title="Lead">
                    <div className="card-body">
                      <div className="row mb-3">
                        <div className="col-sm-3">
                          <h6 className="mb-0">Name:</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                          {Opportunity.lead.fullname}
                        </div>
                      </div>

                      <div className="row mb-3">
                        <div className="col-sm-3">
                          <h6 className="mb-0">Name Call:</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                          {Opportunity.lead.nameCall}
                        </div>
                      </div>

                      <div className="row mb-3">
                        <div className="col-sm-3">
                          <h6 className="mb-0">Gender:</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                          {Opportunity.lead.gender ? (
                            <div className="col-sm-7text-secondary">Male

                            </div>

                          ) : (
                            <div className="col-sm-7text-secondary">Female
                            </div>

                          )

                          }
                        </div>
                      </div>

                      <div className="row mb-3">
                        <div className="col-sm-3">
                          <h6 className="mb-0">Email:</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                          <p>{Opportunity.lead.email}</p>
                        </div>
                      </div>
                      <div className="row mb-3">
                        <div className="col-sm-3">
                          <h6 className="mb-0">Phone:</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                          <p>{Opportunity.lead.phone}</p>
                        </div>
                      </div>
                      <div className="row mb-3">
                        <div className="col-sm-3">
                          <h6 className="mb-0">Lead Type: </h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                          <p>{Opportunity.lead.leadType}</p>
                        </div>
                      </div>
                      {
                        Opportunity.lead.leadType=="Personal" ? (<>

                        </>) : (
                          
                          <div className="row mb-3">
                            <div className="col-sm-3">
                              <h6 className="mb-0">Company Name:</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                              <p>{Opportunity.lead.companyName}</p>
                            </div>
                          </div>

                          
                        )
                      }


{
                        Opportunity.lead.leadType=="Personal" ? (<>

                        </>) : (
                          
                          <div className="row mb-3">
                            <div className="col-sm-3">
                              <h6 className="mb-0">Website:</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                              <p>{Opportunity.lead.website}</p>
                            </div>
                          </div>

                          
                        )
                      }
              
                      {
                        Opportunity.lead.dob == null|Opportunity.lead.dob == "" ? (<>

                        </>) : (

                          <div className="row mb-3">
                            <div className="col-sm-3">
                              <h6 className="mb-0">Day of Brith:</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                              <p>{(Opportunity.lead.dob).slice(0, 10)}</p>
                            </div>
                          </div>
                        )
                      }
                      <div className="row mb-3">
                        <div className="col-sm-3">
                          <h6 className="mb-0">Create Day: </h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                          <p>{(Opportunity.lead.createDate).slice(0, 10)}</p>
                        </div>
                      </div>
                      <div className="row mb-3">
                        <div className="col-sm-3">
                          <h6 className="mb-0">Lead Status: </h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                          {Opportunity.lead.leadStatus === "New" ? (
                            <div className="badge badge-warning mr-2">
                              New
                            </div>
                          ) : (
                            <div className="badge badge-success mr-2">
                              {Opportunity.lead.leadStatus}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                      
                     

                    </Tab>
                    <Tab eventKey="profile" title="Employee">
                    <div className="card-body">
                      <div className="row mb-3">
                        <div className="col-sm-3">
                          <h6 className="mb-0">Name:</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                          <p>{Opportunity.employee.fullname}</p>
                        </div>
                      </div>
                      <div className="row mb-3">
                        <div className="col-sm-3">
                          <h6 className="mb-0">Email:</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                          <p>{Opportunity.employee.email}</p>
                        </div>
                      </div>
                      <div className="row mb-3">
                        <div className="col-sm-3">
                          <h6 className="mb-0">Phone:</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                          <p>{Opportunity.employee.phone}</p>
                        </div>
                      </div>
                      {/* <div className="row mb-3">
                        <div className="col-sm-3">
                          <h6 className="mb-0">Gender:</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                          <p>{Opportunity.employee.gender}</p>
                        </div>
                      </div> */}
                      {/* <div className="row mb-3">
                        <div className="col-sm-3">
                          <h6 className="mb-0">Birth Day:</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                          <p>{Opportunity.employee.birthday}</p>
                        </div>
                      </div> */}
                      <div className="row mb-3">
                        <div className="col-sm-3">
                          <h6 className="mb-0">Joined Since:</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                          <p >{(Opportunity.employee.createDate).slice(0, 10)}</p>
                        </div>
                      </div>
                      <div className="row mb-3">
                        <div className="col-sm-3">
                          <h6 className="mb-0">Time Create</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                          <p >{(Opportunity.employee.createDate).slice(11, 19)}</p>
                        </div>
                      </div>


                      <div className="row mb-3">
                        <div className="col-sm-3">
                          <h6 className="mb-0">Status</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                          {Opportunity.employee.status == "Activated" ? (
                            <div className="badge badge-primary mr-2">
                              Active
                            </div>
                          ) : (
                            <div className="badge badge-danger mr-2">
                              Banned
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </Tab>

                  <Tab eventKey="ProductDetail" title="ProductDetail">
                    <div className="card-body">


                      <div className="row mb-3">
                        <div className="col-sm-3">
                          <h6 className="mb-0">Product Name</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                          <p>{Opportunity.product.name}
                          <Link 
                          to={{
                            pathname: "/Dashboard/Manager/OppProduct",
                            state: Opportunity.product.id,
                          }}
                          
                          >
                            <Button style={{ marginLeft: "10%" }}>
                              <FontAwesomeIcon icon={faExternalLinkSquare} />
                            </Button>
                            </Link>
                          </p>
                        </div>
                      </div>


                      <div className="row mb-3">
                        <div className="col-sm-3">
                          <h6 className="mb-0">District</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                          <p>{Opportunity.product.district}</p>
                        </div>
                      </div>

                      <div className="row mb-3">
                        <div className="col-sm-3">
                          <h6 className="mb-0">Province</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                          <p>{Opportunity.product.province}</p>
                        </div>
                      </div>


                      <div className="row mb-3">
                        <div className="col-sm-3">
                          <h6 className="mb-0">Product Status</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                          <p className="badge badge-primary mr-2">{Opportunity.product.productStatus}</p>
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
        to="/Dashboard/Manager/OpportunityList"
        >
         <Button style={{marginTop:"2%"}}>
          <FontAwesomeIcon icon={faStepBackward} /> Back to
           
         </Button>
        </Link>
      </div>
      </div>
    );
  };
  
  export default ProductOWerDetail;