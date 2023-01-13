import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Tabs, Tab, Button } from "react-bootstrap";
import PageHeading from "../../../components/PageHeading";
import LeadList from "../Lead/LeadList";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkSquare } from '@fortawesome/free-solid-svg-icons'
import { faStepBackward } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";
import ApiService from "../../../api/apiService";



const TaskDetail = () => {
    const { state } = useLocation();
    const [Task, setTask] = useState([]);
    const [ListLead, setLead] = useState([]);
    const [name, setName] = useState();
    
   
    const [currentPage, setCurrentPage] = useState(1);
    const [loadingData, setLoadingData] = useState(true);
    // const [Time, setTime] = useState() ;
  
    useEffect(() => {
      if (typeof state != "undefined") {
        localStorage.setItem("Temp", JSON.stringify(state));
      }
      const storageEvent = JSON.parse(localStorage.getItem("Temp"));
      setTask(storageEvent);
      setLoadingData(false);
    }, []);




       async function getLeadName(id) {  
 
       await ApiService.getNameLead(id)
        .then((response) => {
        
          console.log("sssds"+ response.data.data[0].fullname)
         
          setName(response.data.data[0].fullname)
     
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
    const getNam=(id)=>{
      console.log(id)

    }
  
    return (
      <div>
        <PageHeading title="Task Detail" />
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
                            <p >{(Task.createDate)} </p>
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

                     <Tab eventKey="Employee" title="Employee">
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
                            <h6 className="mb-0">Lead Name:</h6>
                          </div>
                          <div className="col-sm-9 text-secondary">
                          {
                        
                    Task.taskDetails.map((currvalue, index) =>   {
                      // console.log(currvalue)
                      return <div className="row"> <p
                      style={{textAlign:"center",marginLeft:"-10%"}}>{currvalue.fullname}</p>
                      <Link
                      to={{
                        pathname: "/Dashboard/Manager/LeadInfo",
                        state:currvalue.leadId,
                      }}
                  
                      >
                      <Button style={{textAlign:"center",marginLeft:"30%", marginTop:"-10%"}}>
                        <FontAwesomeIcon icon={faExternalLinkSquare} />
                        </Button>
                        </Link></div>
                    })

                     
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
         <div>
        <Link 
        to="/Dashboard/Manager/TaskList"
        >
         <Button style={{marginTop:"2%"}}>
          <FontAwesomeIcon icon={faStepBackward} /> Back to
           
         </Button>
        </Link>
      </div>
      </div>
    );
  };
  
  export default TaskDetail;
  