import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import PageHeading from "../../../../components/PageHeading";
import ApiService from "../../../../api/apiService";

import { Button  } from "react-bootstrap";
// import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStepBackward } from '@fortawesome/free-solid-svg-icons'



const KPIEmployee =({ rowData })=>{
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(7);
  const [Appointment, setAppointment] = useState([]);
  const [loadingData, setLoadingData] = useState(true);
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [data1, setData1] = useState([]);
  const [idKPI ,setKPI] = useState([]);
  const [idEm ,setem] = useState(rowData.id);

  async function getKPIemployee() {
    setLoading(true);
   


    await ApiService.getKPIemployee(idEm,idKPI)
      .then((response) => {
        setData(response)
        setLoading(false);
      })
      .catch((error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setErrMsg(resMessage);
        setLoading(false);
      });
  }

  async function getKPI() {

    await ApiService.getKPI()
      .then((response) => {
        setKPI(response.data.data.id)  
      })
      .catch((error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setErrMsg(resMessage);
       
      });
  }




 
useEffect(() => {
    getKPI();
  }, []);

  useEffect(() => {
    getKPIemployee()
  }, [idKPI]);

  return (
    <div>
      <PageHeading title="Employee KPI" />
      {data.length==0? (
        <p>Loading, please wait...</p>
      ) : (
       <>
<div className="main-body">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="card">
                                <div className="card-body">
                                    <div className="d-flex flex-column ">
                                    
                                    <div className="row mb-2">
                                    <div className="col-sm-4">
                            <h6 className="mb-0 font-weight-bold">Name: </h6>
                                           </div>
                                           <div className="col-sm-4 text-secondary">
                                           <p>{data.name}</p>

                                            </div>
                                        </div><br></br>

                            

                                        <div className="row mb-2">
                                    <div className="col-sm-4">
                            <h6 className="mb-0 font-weight-bold">Period: </h6>
                                           </div>
                                           <div className="col-sm-8 text-secondary">
                                           <p>{data.startDate}   -  {data.endDate} </p>
                                            </div>
                                        </div><br></br>


                                        {/* <div className="row mb-2">
                                    <div className="col-sm-4">
                            <h6 className="mb-0 font-weight-bold">Frequency Of Create: </h6>
                                           </div>
                                           <div className="col-sm-4 text-secondary">
                                            <InputText
                                                id="phone"
                                                type="text"
                                                value={data.frequencyOfCreate}
                                                required
                                            />
                                            </div>
                                        </div><br></br> */}

                                  
                                       
                                       
                                    </div>

                                  

                                        {/* Name */}
                                      {/* {data.description==null?(<>
                                        <div className="row mb-2">
                                    <div className="col-sm-4">
                                    <h6 className="mb-0 font-weight-bold"> Description: </h6>
                                           </div>
                                           <div className="col-sm-6 text-secondary">
                                         <textarea readOnly>Empty</textarea>
                                            </div>
                                        </div><br></br>
                                      </>):(<>
                                      
                                        <div className="row mb-2">
                                    <div className="col-sm-4">
                                    <h6 className="mb-0 font-weight-bold"> Description: </h6>
                                           </div>
                                           <div className="col-sm-6 text-secondary">
                                         <textarea readOnly>{data.description}</textarea>
                                            </div>
                                        </div><br></br></>)} */}
                                       
                                  
                                </div>
                            </div>

                        </div>
                        <div className="col-lg-6">
                        <div className="card">

                        <div className="card-body">
                                    <div className="d-flex flex-column ">

                        
                                    <div className="row mb-2">
                                    <div className="col-sm-4">
                                    <h6 className="mb-0 font-weight-bold">Call: </h6>
                                           </div>
                                           <div className="col-sm-4 text-secondary">
                                           <p>{data.actualCall}/{data.expectedCall}</p>
                                            </div>
                                        </div><br></br>
                                        
                                        <div className="row mb-2">
                                    <div className="col-sm-4">
                                    <h6 className="mb-0 font-weight-bold"> Meeting: </h6>
                                           </div>
                                           <div className="col-sm-4 text-secondary">
                                           <p>{data.actualMeeting}/{data.expectedMeeting}</p>
                                            </div>
                                        </div><br></br>

                          
                                        <div className="row mb-2">
                                    <div className="col-sm-4">
                                    <h6 className="mb-0 font-weight-bold"> New Lead: </h6>
                                           </div>
                                           <div className="col-sm-4 text-secondary">
                                           <p>{data.actualNewLead}/{data.expectedNewLead}</p>
                                            </div>
                                        </div><br></br>

                                        <div className="row mb-2">
                                    <div className="col-sm-4">
                                    <h6 className="mb-0 font-weight-bold">Lead Convert: </h6>
                                           </div>
                                           <div className="col-sm-4 text-secondary">
                                           <p>{data.actualLeadConvert}/{data.expectedLeadConvert}</p>
                                            </div>
                                        </div><br></br>

                                        <div className="row mb-2">
                                    <div className="col-sm-4">
                                    <h6 className="mb-0 font-weight-bold">Sales: </h6>
                                           </div>
                                           <div className="col-sm-4 text-secondary">
                                           <p>{data.actualSales}/{data.expectedSales}</p>
                                            </div>
                                        </div><br></br>


                                        <div className="row mb-2">
                                    <div className="col-sm-4">
                                    <h6 className="mb-0 font-weight-bold">Revenue: </h6>
                                           </div>
                                           <div className="col-sm-4 text-secondary">
                                           <p>{data.actualRevenue}/{data.expectedRevenue}</p>
                                            </div>
                                        </div><br></br>
                                    
                                       
                                       

                                       
                                     
                                     



</div>
</div>
                            </div>

                          
                        </div>
                    </div>
                </div>

       </>
      )}
    </div>
  );
};

export default KPIEmployee;