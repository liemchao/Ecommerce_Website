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
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const AppointDetail = () => {
  const { state } = useLocation();
  const [Appointment, setAppointment] = useState([]);
  const [loadingData, setLoadingData] = useState(true);
  const [data, setData] = useState([]);
  const [id, setId] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);



  async function AssAppointment() {
    setLoading(true);

    let data = {
      id: Appointment.id,
      employeeId: id,

    };
    console.log(data)


    await ApiService.AssAppointment(data)
      .then((response) => {
        setSuccessMsg("Delegated Appointment Successfull");
        setLoading(false);
      })
      .catch((error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setErrMsg("Delegated Appointment Failed");
        setLoading(false);
      });
  }



  async function getAccountList() {
    setLoadingData(true);

    await ApiService.getEmployeeAppointment()
      .then((response) => {
        const dataRes = response.data.data
        const listDataSet = [...dataRes];
        listDataSet.map((obj, index) => {
          const count = ++index;
          obj['indexNumber'] = count

        })

        setData(listDataSet);

        setLoadingData(false);
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

  const chooseEmployee = (id) =>{

    let radio = document.getElementById(id);
     if (radio.checked){
      setId(id)
    

   }

 }
  const customButton1 = (rowData) => {

  
    return <input id={rowData.id} name="firt" style={{marginLeft:"10%"}} type="radio" onClick={ () => { chooseEmployee(rowData.id)}}/>
         
 
  
  
}

  useEffect(() => {
    if (typeof state != "undefined") {
      localStorage.setItem("Temp", JSON.stringify(state));
    }
    const storageEvent = JSON.parse(localStorage.getItem("Temp"));
    setAppointment(storageEvent);
    getAccountList();
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
                          <h6 className="mb-0 font-weight-bold">Full Name:</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                          <p>{Appointment.fullname}
                          </p>


                        </div>
                      </div>

                      <div className="row mb-3">
                        <div className="col-sm-3">
                          <h6 className="mb-0 font-weight-bold">Title:</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                          <p>{Appointment.name}</p>
                        </div>
                      </div>


                      <div className="row mb-3">
                        <div className="col-sm-3">
                          <h6 className="mb-0 font-weight-bold">Phone:</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                          <p>{Appointment.phone}</p>
                        </div>
                      </div>

                      <div className="row mb-3">
                        <div className="col-sm-3">
                          <h6 className="mb-0 font-weight-bold">Email:</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                          <p>{Appointment.email}</p>
                        </div>
                      </div>

                      <div className="row mb-3">
                        <div className="col-sm-3">
                          <h6 className="mb-0 font-weight-bold">Activity Type:</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                          <p>{Appointment.activityType}</p>
                        </div>
                      </div>

                      <div className="row mb-3">
                        <div className="col-sm-3">
                          <h6 className="mb-0 font-weight-bold">Description:</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                          <p>{Appointment.description}</p>
                        </div>
                      </div>


                      {
                        Appointment.abortReason==""|| Appointment.abortReason==null ? (<>

                        </>) : (
                          
                          <div className="row mb-3">
                          <div className="col-sm-3">
                            <h6 className="mb-0 font-weight-bold">Reason:</h6>
                          </div>
                          <div className="col-sm-9 text-secondary">
                            <p>{Appointment.abortReason}</p>
                          </div>
                        </div>

                          
                        )
                      }

                    <div className="row mb-3">
                        <div className="col-sm-3">
                          <h6 className="mb-0 font-weight-bold">Appoinment Status:</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                          <p className="badge badge-success mr-2"> {Appointment.appointmentStatus}</p>
                        </div>
                      </div>
                      
                      </div>

                    
                  </Tab>
                  <Tab eventKey="Product" title="Appointment Time">
                    <div className="card-body">

                      <div className="row mb-3">
                        <div className="col-sm-3">
                          <h6 className="mb-0 font-weight-bold">Create Date:</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                          <p>{Appointment.createDate}</p>
                        </div>
                      </div>

                      <div className="row mb-3">
                        <div className="col-sm-3">
                          <h6 className="mb-0 font-weight-bold">Start Day:</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                          <p>{Appointment.startDate} {Appointment.startTime}</p>
                        </div>
                      </div>

                      {
                        Appointment.endDate==""|| Appointment.endDate==null ? (<>

                        </>) : (
                          
                          <div className="row mb-3">
                          <div className="col-sm-3">
                            <h6 className="mb-0 font-weight-bold">End Date:</h6>
                          </div>
                          <div className="col-sm-9 text-secondary">
                            <p>{Appointment.endDate}</p>
                          </div>
                        </div>

                          
                        )
                      }


{
                        Appointment.acceptedDate==""|| Appointment.acceptedDate==null ? (<>

                        </>) : (
                          
                          <div className="row mb-3">
                          <div className="col-sm-3">
                            <h6 className="mb-0 font-weight-bold">Accepted Day:</h6>
                          </div>
                          <div className="col-sm-9 text-secondary">
                            <p>{Appointment.acceptedDate}</p>
                          </div>
                        </div>

                          
                        )
                      }
                    
                   

                    </div>


                  </Tab>
                  <Tab eventKey="Employe" title="Employee">

                  {
                      Appointment.employee === null ? (
                        <div style={{ textAlign: "center", fontSize: 30 }}>
                          <h1 className="badge badge-danger mr-2"> The appointment not have employee manage </h1>
                        </div>
                      ) : (
                        <div className="card-body">
                          <div className="row mb-3">
                            <div className="col-sm-3">
                              <h6 className="mb-0 font-weight-bold">Employee's Name:</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                              {Appointment.employee.fullname}
                              <Link 
                          to={{
                            pathname: "/Dashboard/Manager/EmployeeAppointment",
                            state: Appointment.employee.id,
                          }}  
                          >
                               <Button style={{ marginLeft: "10%" }}>
                               
                              <FontAwesomeIcon icon={faExternalLinkSquare} />
                            </Button>
                            </Link>
                            </div>
                          </div>

                          {/* <div className="row mb-3">
                            <div className="col-sm-3">
                              <h6 className="mb-0 font-weight-bold">Gender:</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                              {Appointment.employee.gender ? (
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
                              <h6 className="mb-0 font-weight-bold">Email:</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                              <p>{Appointment.employee.email}</p>
                            </div>
                          </div>
                          <div className="row mb-3">
                            <div className="col-sm-3">
                              <h6 className="mb-0 font-weight-bold">Phone:</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                              <p>{Appointment.employee.phone}</p>
                            </div>
                          </div>

                        </div>)

                    }
                  </Tab>





                  <Tab eventKey="Lead" title="Lead">
                    <div className="card-body">

                      <div className="row mb-3">
                        <div className="col-sm-3">
                          <h6 className="mb-0 font-weight-bold">Lead's Name:</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                          <p>{Appointment.lead.fullname}
                          <Link
                      to={{
                        pathname: "/Dashboard/Manager/LeadAppoiment",
                        state:Appointment.lead.id,
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
                              <h6 className="mb-0 font-weight-bold">Name Call:</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                              <p>{Appointment.lead.nameCall}</p>
                            </div>
                          </div>

                      <div className="row mb-3">
                        <div className="col-sm-3">
                          <h6 className="mb-0 font-weight-bold">Status Lead:</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                          <p className="badge badge-primary mr-2">{Appointment.lead.leadStatus}</p>
                        </div>
                      </div>




                    </div>
                  </Tab>

                  <Tab eventKey="ProductDetail" title="Product Detail">
                    <div className="card-body">


                      <div className="row mb-3">
                        <div className="col-sm-3">
                          <h6 className="mb-0 font-weight-bold">Product Name:</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                          <p>{Appointment.product.name}
                          <Link 
                          to={{
                            pathname: "/Dashboard/Manager/ProductAppoimnet",
                            state: Appointment.product.id,
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
                          <h6 className="mb-0 font-weight-bold">Street:</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                          <p>{Appointment.product.street}</p>
                        </div>
                      </div>


                      <div className="row mb-3">
                        <div className="col-sm-3">
                          <h6 className="mb-0 font-weight-bold">District:</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                          <p>{Appointment.product.district}</p>
                        </div>
                      </div>

                      <div className="row mb-3">
                        <div className="col-sm-3">
                          <h6 className="mb-0 font-weight-bold">Province:</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                          <p>{Appointment.product.province}</p>
                        </div>
                      </div>


                      <div className="row mb-3">
                        <div className="col-sm-3">
                          <h6 className="mb-0 font-weight-bold">Product Status:</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                          <p className="badge badge-primary mr-2">{Appointment.product.productStatus}</p>
                        </div>
                      </div>

                    </div>


                  </Tab>



                </Tabs>
              </div>
            </div>
          
            {Appointment.employee==null && Appointment.appointmentStatus=="Watting" ? (
             <div className="col-lg-12">
                <div className="card">

<Button   style={{ float:"right"}} onClick={AssAppointment} >Assign Appointment</Button>
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
</div>
             <div className="card">

                 <label htmlFor="role">Empoyee List </label>
                 <DataTable     style={{overflow:"scroll",maxHeight: "27rem"}}
                  value={data}
                  loading={loadingData}
                  responsiveLayout="scroll"
                >
                  <Column header="Employee Name" field="fullname"/>
                  <Column style={{width: "22%"}}header="Email" field="email"/>
                  <Column  header="Phone" field="phone"/>
                  <Column style={{textAlign: "center"}}header="No. Appoinment Ongoing" field="numberOfAppoinmentOnDoing"/>
                  <Column header="Action" body={customButton1} />
                </DataTable>
               </div>

              

             </div>

          ):(<></>)}
          </div>
        </div>
      )}
        <div>
        <Link 
        to="/Dashboard/Manager/AppointmentList"
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