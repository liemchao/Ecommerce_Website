import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Tabs, Tab } from "react-bootstrap";
import PageHeading from "../../../../components/PageHeading";
import ApiService from "../../../../api/apiService";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkSquare } from '@fortawesome/free-solid-svg-icons'
import { faStepBackward } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";


const AppointDetail = () => {

    const { state } = useLocation();
    const [appointment, setAppointment] = useState([]);
    const [id, setid] = useState(state);

    const [loadingData, setLoadingData] = useState(true);

    async function getAppoiment() {

        setLoadingData(true);
        await ApiService.getAppoimentbyID(id)
            .then((response) => {

                setAppointment(response.data.data[0]);


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

        getAppoiment();
    }, []);




 



  return (
    <div>
      <PageHeading title="Appointmnet Detail" />
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
                  <Tab eventKey="Detail" title="Appointment Detail">
                    <div className="card-body">
                      <div className="row mb-3">
                        <div className="col-sm-3">
                          <h6 className="mb-0">Full Name:</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                          <p>{appointment.fullname}
                          </p>


                        </div>
                      </div>

                      <div className="row mb-3">
                        <div className="col-sm-3">
                          <h6 className="mb-0">Title:</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                          <p>{appointment.name}</p>
                        </div>
                      </div>


                      <div className="row mb-3">
                        <div className="col-sm-3">
                          <h6 className="mb-0">Phone:</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                          <p>{appointment.phone}</p>
                        </div>
                      </div>

                      <div className="row mb-3">
                        <div className="col-sm-3">
                          <h6 className="mb-0">Email:</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                          <p>{appointment.email}</p>
                        </div>
                      </div>

                      <div className="row mb-3">
                        <div className="col-sm-3">
                          <h6 className="mb-0">Activity Type:</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                          <p>{appointment.activityType}</p>
                        </div>
                      </div>

                      <div className="row mb-3">
                        <div className="col-sm-3">
                          <h6 className="mb-0">Description:</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                          <p>{appointment.description}</p>
                        </div>
                      </div>
                  

                    <div className="row mb-3">
                        <div className="col-sm-3">
                          <h6 className="mb-0">Appoinment Status:</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                          <p className="badge badge-success mr-2"> {appointment.appointmentStatus}</p>
                        </div>
                      </div>
                      
                      </div>

                    
                  </Tab>
                  <Tab eventKey="Product" title="Appointment Time">
                    <div className="card-body">

                      <div className="row mb-3">
                        <div className="col-sm-3">
                          <h6 className="mb-0">Create Date:</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                          <p>{appointment.createDate}</p>
                        </div>
                      </div>

                      <div className="row mb-3">
                        <div className="col-sm-3">
                          <h6 className="mb-0">StartDate:</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                          <p>{appointment.startDate} {appointment.startTime}</p>
                        </div>
                      </div>

                      {
                        appointment.endDate==""|| appointment.endDate==null ? (<>

                        </>) : (
                          
                          <div className="row mb-3">
                          <div className="col-sm-3">
                            <h6 className="mb-0">End Date:</h6>
                          </div>
                          <div className="col-sm-9 text-secondary">
                            <p>{appointment.endDate}</p>
                          </div>
                        </div>

                          
                        )
                      }


{
                        appointment.acceptedDate==""|| appointment.acceptedDate==null ? (<>

                        </>) : (
                          
                          <div className="row mb-3">
                          <div className="col-sm-3">
                            <h6 className="mb-0">Accepted Day:</h6>
                          </div>
                          <div className="col-sm-9 text-secondary">
                            <p>{appointment.acceptedDate}</p>
                          </div>
                        </div>

                          
                        )
                      }
                    
                   

                    </div>


                  </Tab>
                  <Tab eventKey="Employe" title="Employee">

                  {
                      appointment.employee === null ? (
                        <div style={{ textAlign: "center", fontSize: 30 }}>
                          <h1 className="badge badge-danger mr-2"> The appointment not have employee manage </h1>
                        </div>
                      ) : (
                        <div className="card-body">
                          <div className="row mb-3">
                            <div className="col-sm-3">
                              <h6 className="mb-0">Employee's Name:</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                              {appointment.employee.fullname}
                               <Button style={{ marginLeft: "10%" }}>
                              <FontAwesomeIcon icon={faExternalLinkSquare} />
                            </Button>
                            </div>
                          </div>

                          {/* <div className="row mb-3">
                            <div className="col-sm-3">
                              <h6 className="mb-0">Gender:</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                              {appointment.employee.gender ? (
                                <div className="col-sm-7text-secondary">Male

                                </div>

                              ) : (
                                <div className="col-sm-7text-secondary">Female
                                </div>

                              )

                              }
                            </div>
                          </div> */}

                          <div className="row mb-3">
                            <div className="col-sm-3">
                              <h6 className="mb-0">Email:</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                              <p>{appointment.employee.email}</p>
                            </div>
                          </div>
                          <div className="row mb-3">
                            <div className="col-sm-3">
                              <h6 className="mb-0">Phone:</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                              <p>{appointment.employee.phone}</p>
                            </div>
                          </div>

                        </div>)

                    }
                  </Tab>





                  <Tab eventKey="Lead" title="Lead">
                    <div className="card-body">

                      <div className="row mb-3">
                        <div className="col-sm-3">
                          <h6 className="mb-0">Lead's Name:</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                          <p>{appointment.lead.fullname}
                          <Link
                      to={{
                        pathname: "/Dashboard/Manager/LeadAppoiment",
                        state:appointment.lead.id,
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
                              <h6 className="mb-0">Name Call:</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                              <p>{appointment.lead.nameCall}</p>
                            </div>
                          </div>

                      <div className="row mb-3">
                        <div className="col-sm-3">
                          <h6 className="mb-0">Status Lead:</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                          <p className="badge badge-primary mr-2">{appointment.lead.leadStatus}</p>
                        </div>
                      </div>




                    </div>
                  </Tab>

                  <Tab eventKey="ProductDetail" title="ProductDetail">
                    <div className="card-body">


                      <div className="row mb-3">
                        <div className="col-sm-3">
                          <h6 className="mb-0">Product Name:</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                          <p>{appointment.product.name}
                          <Link 
                          to={{
                            pathname: "/Dashboard/Manager/ProductAppoimnet",
                            state: appointment.product.id,
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
                          <h6 className="mb-0">Street:</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                          <p>{appointment.product.street}</p>
                        </div>
                      </div>


                      <div className="row mb-3">
                        <div className="col-sm-3">
                          <h6 className="mb-0">District:</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                          <p>{appointment.product.district}</p>
                        </div>
                      </div>

                      <div className="row mb-3">
                        <div className="col-sm-3">
                          <h6 className="mb-0">Province:</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                          <p>{appointment.product.province}</p>
                        </div>
                      </div>


                      <div className="row mb-3">
                        <div className="col-sm-3">
                          <h6 className="mb-0">Product Status:</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                          <p className="badge badge-primary mr-2">{appointment.product.productStatus}</p>
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
        to="/Dashboard/Manager/Feedback"
        >
         <Button style={{marginTop:"2%"}}>
          <FontAwesomeIcon icon={faStepBackward} /> Back to
           
         </Button>
        </Link>
      </div>
    </div>
  );
};

export default AppointDetail;