import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Tabs, Tab ,Button } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStepBackward } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";
import PageHeading from "../../../../components/PageHeading";
import OpportunityLeadList from "../../Lead/DetailLead/Oppo";
import AppointLeadList from "../../Lead/DetailLead/AppoinmentLead";
import ApiService from "../../../../api/apiService";


const EmployeeDetail = () => {

  const { state } = useLocation();
    const [account, setAccount] = useState([]);
    const [id, setid] = useState(state);
 

    const [loadingData, setLoadingData] = useState(true);

    async function getLeadDetail() {

        setLoadingData(true);
        await ApiService.getAccountById(id)
            .then((response) => {

              setAccount(response.data.data);
                
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

    useEffect(() => {

      getLeadDetail();
    }, []);


  return (
    <div>
      <PageHeading title="Lead Detail" />
      {loadingData ? (
        <p>Loading, please wait...</p>
      ) : (
        <div className="main-body">
          <div className="row">
        
            <div className="col-lg-12">
              <div className="card">
                <Tabs
                  defaultActiveKey="profile"
                  id="uncontrolled-tab-example"
                  className="mb-3"
                >
                  <Tab eventKey="profile" title="Profile">
                    <div className="card-body">
                      <div className="row mb-3">
                        <div className="col-sm-3">
                          <h6 className="mb-0">Name:</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                          {account.fullname}
                        </div>
                      </div>

                      <div className="row mb-3">
                        <div className="col-sm-3">
                          <h6 className="mb-0">Gender:</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                          {account.gender ? (
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
                          <p>{account.email}</p>
                        </div>
                      </div>
                      <div className="row mb-3">
                        <div className="col-sm-3">
                          <h6 className="mb-0">Phone:</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                          <p>{account.phone}</p>
                        </div>
                      </div>
                      <div className="row mb-3">
                        <div className="col-sm-3">
                          <h6 className="mb-0">Lead Type: </h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                          <p>{account.leadType}</p>
                        </div>
                      </div>
                      {
                        account.leadType=="Personal" ? (<>

                        </>) : (
                          
                          <div className="row mb-3">
                            <div className="col-sm-3">
                              <h6 className="mb-0">Company Name:</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                              <p>{account.companyName}</p>
                            </div>
                          </div>

                          
                        )
                      }


{
                        account.leadType=="Personal" ? (<>

                        </>) : (
                          
                          <div className="row mb-3">
                            <div className="col-sm-3">
                              <h6 className="mb-0">Website:</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                              <p>{account.website}</p>
                            </div>
                          </div>

                          
                        )
                      }
                      {/* <div className="row mb-3">
                        <div className="col-sm-3">
                          <h6 className="mb-0">Gender:</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                          <p>{account.gender}</p>
                        </div>
                      </div> */}
                      {/* <div className="row mb-3">
                        <div className="col-sm-3">
                          <h6 className="mb-0">Birth Day:</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                          <p>{account.birthday}</p>
                        </div>
                      </div> */}
                      {
                        account.dob == null| account.dob == "" ? (<>

                        </>) : (

                          <div className="row mb-3">
                            <div className="col-sm-3">
                              <h6 className="mb-0">Date of Birth:</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                              <p>{(account.dob).slice(0, 10)}</p>
                            </div>
                          </div>
                        )
                      }
                      <div className="row mb-3">
                        <div className="col-sm-3">
                          <h6 className="mb-0">Create Day</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                          <p>{(account.createDate).slice(0, 10)}</p>
                        </div>
                      </div>
                      <div className="row mb-3">
                        <div className="col-sm-3">
                          <h6 className="mb-0">Lead Status</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                          {account.leadStatus === "New" ? (
                            <div className="badge badge-warning mr-2">
                              New
                            </div>
                          ) : (
                            <div className="badge badge-success mr-2">
                              {account.leadStatus}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </Tab>

                  <Tab eventKey="account" title="Account">
                    {
                      account.account === null ? (
                        <div style={{ textAlign: "center", fontSize: 30 }}>
                          <h1 className="badge badge-danger mr-2"> Lead has not registered an account in the system</h1>
                        </div>
                      ) : (
                        <div className="card-body">
                          <div className="row mb-3">
                            <div className="col-sm-3">
                              <h6 className="mb-0">Name:</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                              {account.account.fullname}
                            </div>
                          </div>

                          <div className="row mb-3">
                            <div className="col-sm-3">
                              <h6 className="mb-0">Gender:</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                              {account.account.gender ? (
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
                              <p>{account.account.email}</p>
                            </div>
                          </div>
                          <div className="row mb-3">
                            <div className="col-sm-3">
                              <h6 className="mb-0">Phone:</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                              <p>{account.account.phone}</p>
                            </div>
                          </div>

                        </div>)

                    }

                  </Tab>
                  <Tab eventKey="appointment" title="Appointment">
                    <AppointLeadList rowData={account} />

                  </Tab>

                  <Tab eventKey="opportunity" title="Opportunity">

                    <OpportunityLeadList rowData={account} />


                  </Tab>

                </Tabs>


              </div>
            </div>
          </div>
        </div>
      )}
          <div>
        <Link 
        to="/Dashboard/Manager/LeadList"
        >
         <Button style={{marginTop:"2%"}}>
          <FontAwesomeIcon icon={faStepBackward} /> Back to
           
         </Button>
        </Link>
      </div>
    </div>
  );
};

export default EmployeeDetail;
