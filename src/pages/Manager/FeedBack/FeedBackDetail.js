import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Tabs, Tab } from "react-bootstrap";
import PageHeading from "../../../components/PageHeading";
import ApiService from "../../../api/apiService";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkSquare } from '@fortawesome/free-solid-svg-icons'
import { faStepBackward } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";




const FeedbackDetail = () => {
  const { state } = useLocation();
  const [account, setAccount] = useState([]);

  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    if (typeof state != "undefined") {
      localStorage.setItem("Temp", JSON.stringify(state));
    }
    const storageEvent = JSON.parse(localStorage.getItem("Temp"));
    setAccount(storageEvent);
    setLoadingData(false);
  }, []);

  return (
    <div>
      <PageHeading title="Feedback Detail" />
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
                  <Tab eventKey="profile" title="Information">
                    <div className="card-body">
                        {account.content=="" ? (<>
                        
                          <div className="row mb-3">
                        <div className="col-sm-3">
                          <h6 className="mb-0 font-weight-bold">Content:</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                        Empty
                        </div>
                      </div>
                        </>):( <div className="row mb-3">
                        <div className="col-sm-3">
                          <h6 className="mb-0 font-weight-bold">Content:</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                          {account.content}
                        </div>
                      </div>)}
                     

                      <div  style={{marginTop:25}}className="row mb-3">
                        <div className="col-sm-3">
                          <h6 className="mb-0 font-weight-bold">Rate:</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                        <p>{account.rate}</p>
                        </div>
                      </div>

                      <div className="row mb-3">
                        <div className="col-sm-3">
                          <h6 className="mb-0 font-weight-bold">Feedback Date:</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                          <p>{(account.feedbackDate).slice(0, 10)}</p>
                        </div>
                      </div>
                  
                    </div>
                  </Tab>

                  <Tab eventKey="account" title="Appointment">
                    <div className="card-body">
                
                      <div className="row mb-3">
                        <div className="col-sm-3">
                          <h6 className="mb-0 font-weight-bold">Title: </h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                          <p>{account.appointment.name}
                          <Link 
                          to={{
                            pathname: "/Dashboard/Manager/FeedBackAppointment",
                            state: account.appointment.id,
                          }}
                          
                          >
                            <Button style={{ marginLeft: "10%" }}>
                              <FontAwesomeIcon icon={faExternalLinkSquare} />
                            </Button>
                            </Link></p>
                          
                        </div>
                      </div>

                      

                      <div className="row mb-3">
                        <div className="col-sm-3">
                          <h6 className="mb-0 font-weight-bold">Activity Type:</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                          <p>{account.appointment.activityType}</p>
                        </div>
                      </div>

                      <div className="row mb-3">
                        <div className="col-sm-3">
                          <h6 className="mb-0 font-weight-bold">Description:</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                          <p>{account.appointment.description}</p>
                        </div>
                      </div>

                      <div className="row mb-3">
                        <div className="col-sm-3">
                          <h6 className="mb-0 font-weight-bold">Status:</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                          {account.appointment.appointmentStatus =="Finished" ? (
                            <div className="badge badge-success mr-2">
                              Finished
                            </div>
                          ) : (
                            <div className="badge badge-danger mr-2">
                             {account.appointment.appointmentStatus}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                  
                  </Tab>
                  {/* <Tab eventKey="creater" title="Creater">

                    <div className="card-body">

                    <div className="row mb-3">
                        <div className="col-sm-3">
                          <h6 className="mb-0 font-weight-bold">Full Name</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                          <p>{account.appointment.fullname}
              
                          </p>


                        </div>
                      </div>


                      <div className="row mb-3">
                        <div className="col-sm-3">
                          <h6 className="mb-0 font-weight-bold">Phone</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                          <p>{account.appointment.phone}</p>
                        </div>
                      </div>

                      <div className="row mb-3">
                        <div className="col-sm-3">
                          <h6 className="mb-0 font-weight-bold">Email:</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                          <p>{account.appointment.email}</p>
                        </div>
                      </div>

                    </div>


                  </Tab> */}
                 

                  <Tab eventKey="opportunity" title="Customer">

                     <div className="card-body">
                      <div className="row mb-3">
                        <div className="col-sm-3">
                          <h6 className="mb-0 font-weight-bold">Name:</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                          <p>{account.customer.fullname}</p>
                        </div>
                      </div>
                      <div className="row mb-3">
                        <div className="col-sm-3">
                          <h6 className="mb-0 font-weight-bold">Email:</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                          <p>{account.customer.email}</p>
                        </div>
                      </div>
                      <div className="row mb-3">
                        <div className="col-sm-3">
                          <h6 className="mb-0 font-weight-bold">Phone:</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                          <p>{account.customer.phone}</p>
                        </div>
                      </div>
                      {/* <div className="row mb-3">
                        <div className="col-sm-3">
                          <h6 className="mb-0 font-weight-bold">Gender:</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                          <p>{account.gender}</p>
                        </div>
                      </div> */}
                      {/* <div className="row mb-3">
                        <div className="col-sm-3">
                          <h6 className="mb-0 font-weight-bold">Birth Day:</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                          <p>{account.birthday}</p>
                        </div>
                      </div> */}
                      <div className="row mb-3">
                        <div className="col-sm-3">
                          <h6 className="mb-0 font-weight-bold">Joined Since:</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                          <p >{(account.customer.createDate).slice(0, 10)}</p>
                        </div>
                      </div>
                      <div className="row mb-3">
                        <div className="col-sm-3">
                          <h6 className="mb-0 font-weight-bold">Time Create:</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                          <p >{(account.customer.createDate).slice(11, 19)}</p>
                        </div>
                      </div>
                      <div className="row mb-3">
                        <div className="col-sm-3">
                          <h6 className="mb-0 font-weight-bold">Date of Birth</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                          <p >{account.customer.dob}</p>
                        </div>
                      </div>
                      <div className="row mb-3">
                        <div className="col-sm-3">
                          <h6 className="mb-0 font-weight-bold">Status:</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                          {account.customer.status ? (
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

                </Tabs>


              </div>
            </div>
          </div>
        </div>
      )}
        <div>
        <Link 
        to="/Dashboard/Manager/FeedBackList"
        >
         <Button style={{marginTop:"2%"}}>
          <FontAwesomeIcon icon={faStepBackward} /> Back to
           
         </Button>
        </Link>
      </div>
    </div>
  );
};

export default FeedbackDetail;
