import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Tabs, Tab, Button } from "react-bootstrap";
import PageHeading from "../../../components/PageHeading";
import LeadList from "../Lead/LeadList";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkSquare } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";


const AccountDetail = () => {
    const { state } = useLocation();
    const [Task, setTask] = useState([]);
    const [ListLead, setLead] = useState([]);
    
   
    const [currentPage, setCurrentPage] = useState(1);
    const [loadingData, setLoadingData] = useState(true);
    // const [Time, setTime] = useState() ;
  
    useEffect(() => {
      if (typeof state != "undefined") {
        localStorage.setItem("Temp", JSON.stringify(state));
      }
      const storageEvent = JSON.parse(localStorage.getItem("Temp"));
      setTask(storageEvent);
      setLead(Task.taskDetails);
  
      setLoadingData(false);
    }, []);
  
    return (
      <div>
        <PageHeading title="Task Detail" />
        {loadingData ? (
          <p>Loading, please wait...</p>
        ) : (

          <div className="main-body">
            <div className="row">

            <div className="col-lg-4">
              <div className="card">
                </div>
                </div>
            
              <div className="col-lg-8">
                <div className="card">
                  <Tabs
                    defaultActiveKey="profile"
                    id="uncontrolled-tab-example"
                    className="mb-3"
                  >
                    <Tab eventKey="profile" title="Information Task">
                      <div className="card-body">
                        <div className="row mb-3">
                          <div className="col-sm-3">
                            <h6 className="mb-0">FullName:</h6>
                          </div>
                          <div className="col-sm-9 text-secondary">
                            <p>{Task.creater.fullname}</p>
                          </div>
                        </div>
                        <div className="row mb-3">
                          <div className="col-sm-3">
                            <h6 className="mb-0">Email:</h6>
                          </div>
                          <div className="col-sm-9 text-secondary">
                            <p>{Task.creater.email}</p>
                          </div>
                        </div>
                        <div className="row mb-3">
                          <div className="col-sm-3">
                            <h6 className="mb-0">Phone:</h6>
                          </div>
                          <div className="col-sm-9 text-secondary">
                            <p>{Task.creater.phone}</p>
                          </div>
                        </div>
                        {/* <div className="row mb-3">
                          <div className="col-sm-3">
                            <h6 className="mb-0">Gender:</h6>
                          </div>
                          <div className="col-sm-9 text-secondary">
                            <p>{Task.gender}</p>
                          </div>
                        </div> */}
                        {/* <div className="row mb-3">
                          <div className="col-sm-3">
                            <h6 className="mb-0">Birth Day:</h6>
                          </div>
                          <div className="col-sm-9 text-secondary">
                            <p>{Task.birthday}</p>
                          </div>
                        </div> */}
                        <div className="row mb-3">
                          <div className="col-sm-3">
                            <h6 className="mb-0">Date Create:</h6>
                          </div>
                          <div className="col-sm-9 text-secondary">
                            <p >{(Task.createDate).slice(0,10)}</p>
                          </div>
                        </div>
                        <div className="row mb-3">
                          <div className="col-sm-3">
                            <h6 className="mb-0">Time Create:</h6>
                          </div>
                          <div className="col-sm-9 text-secondary">
                            <p >{(Task.createDate).slice(11,19)}</p>
                          </div>
                        </div>
                        <div className="row mb-3">
                          <div className="col-sm-3">
                            <h6 className="mb-0">Status</h6>
                          </div>
                          <div className="col-sm-9 text-secondary">
                            {Task.isDone ? (
                              <div className="badge badge-success mr-2">
                                Done
                              </div>
                            ) : (
                              <div className="badge badge-danger mr-2">
                                Not Done
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </Tab>

                     <Tab eventKey="Employee" title="Employer">
                     <div className="card-body">
                      

                        <div className="row mb-3">
                          <div className="col-sm-3">
                            <h6 className="mb-0">FullName:</h6>
                          </div>
                          <div className="col-sm-9 text-secondary">
                            <p>{Task.employee.fullname}</p>
                          </div>
                        </div>
                        <div className="row mb-3">
                          <div className="col-sm-3">
                            <h6 className="mb-0">Email:</h6>
                          </div>
                          <div className="col-sm-9 text-secondary">
                            <p>{Task.employee.email}</p>
                          </div>
                        </div>
                        <div className="row mb-3">
                          <div className="col-sm-3">
                            <h6 className="mb-0">Phone:</h6>
                          </div>
                          <div className="col-sm-9 text-secondary">
                            <p>{Task.employee.phone}</p>
                          </div>
                        </div>
                        <div className="row mb-3">
                          <div className="col-sm-3">
                            <h6 className="mb-0">Gender:</h6>
                          </div>
                          <div className="col-sm-9 text-secondary">
                          {Task.employee.gender ? (
                              <div className="badge badge-info mr-2">
                                Female
                              </div>
                            ) : (
                              <div className="badge badge-info mr-2">
                                Male
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="row mb-3">
                          <div className="col-sm-3">
                            <h6 className="mb-0">CreateDate:</h6>
                          </div>
                          <div className="col-sm-9 text-secondary">
                            <p>{Task.employee.createDate}</p>
                          </div>
                        </div>
                        <div className="row mb-3">
                          <div className="col-sm-3">
                            <h6 className="mb-0">Status</h6>
                          </div>
                          <div className="col-sm-9 text-secondary">
                            {Task.employee.status=="Activated" ? (
                              <div className="badge badge-success mr-2">
                                Activated
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
                     <Tab eventKey="Lead" title="Lead">
                     <div className="card-body">
                     <div className="row mb-3">
                          <div className="col-sm-3">
                            <h6 className="mb-0">Lead:</h6>
                          </div>
                          <div className="col-sm-9 text-secondary">
                          {
                    Task.taskDetails.map((x, y) =>          
                        <p key={y}>{x.leadId} 
                        <Link
                        
                        to={{
                          pathname: "/Dashboard/Manager/LeadTaskDetail",
                        }}
                        
                        >
                        <Button style={{marginLeft:"10%"}}>
                          <FontAwesomeIcon icon={faExternalLinkSquare} />
                          </Button>
                          </Link></p>
                          )
                          
                     
                    }
                    
                          
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
  
  export default AccountDetail;
  