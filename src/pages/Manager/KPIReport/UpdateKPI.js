import React, { useEffect, useState } from "react";
import ApiService from "../../../api/apiService";
import PageHeading from "../../../components/PageHeading";
import { InputText } from "primereact/inputtext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave} from '@fortawesome/free-solid-svg-icons'

import { Button } from "react-bootstrap";


export default function KPIUpdate(rowData) {
    const [loading, setLoading] = useState(false);
    const [errMsg, setErrMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");
    const [KPI, setKPI] = useState({});

    useEffect(() => {
        setKPI(rowData.location.state)
    }, [rowData.location.state]);



    return (
        <div>
            <PageHeading title="KPI Detail" />

           
            {loading ? (
                <p>Loading, please wait...</p>
            ) : (
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
                                           <p>{KPI.name}</p>

                                            </div>
                                        </div><br></br>

                            

                                        <div className="row mb-2">
                                    <div className="col-sm-4">
                            <h6 className="mb-0 font-weight-bold">Period: </h6>
                                           </div>
                                           <div className="col-sm-8 text-secondary">
                                           <p>{KPI.startDate.slice(0, 10)}   -  {KPI.endDate.slice(0, 10)} </p>
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
                                                value={KPI.frequencyOfCreate}
                                                required
                                            />
                                            </div>
                                        </div><br></br> */}

                                  
                                       
                                       
                                    </div>

                                  

                                        {/* Name */}
                                      {/* {KPI.description==null?(<>
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
                                         <textarea readOnly>{KPI.description}</textarea>
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
                                           <p>{KPI.actualCall}/{KPI.expectedCall}</p>
                                            </div>
                                        </div><br></br>
                                        
                                        <div className="row mb-2">
                                    <div className="col-sm-4">
                                    <h6 className="mb-0 font-weight-bold"> Meeting: </h6>
                                           </div>
                                           <div className="col-sm-4 text-secondary">
                                           <p>{KPI.actualMeeting}/{KPI.expectedMeeting}</p>
                                            </div>
                                        </div><br></br>

                          
                                        <div className="row mb-2">
                                    <div className="col-sm-4">
                                    <h6 className="mb-0 font-weight-bold"> New Lead: </h6>
                                           </div>
                                           <div className="col-sm-4 text-secondary">
                                           <p>{KPI.actualNewLead}/{KPI.expectedNewLead}</p>
                                            </div>
                                        </div><br></br>

                                        <div className="row mb-2">
                                    <div className="col-sm-4">
                                    <h6 className="mb-0 font-weight-bold">Lead Convert: </h6>
                                           </div>
                                           <div className="col-sm-4 text-secondary">
                                           <p>{KPI.actualLeadConvert}/{KPI.expectedLeadConvert}</p>
                                            </div>
                                        </div><br></br>

                                        <div className="row mb-2">
                                    <div className="col-sm-4">
                                    <h6 className="mb-0 font-weight-bold">Sales: </h6>
                                           </div>
                                           <div className="col-sm-4 text-secondary">
                                           <p>{KPI.actualSales}/{KPI.expectedSales}</p>
                                            </div>
                                        </div><br></br>


                                        <div className="row mb-2">
                                    <div className="col-sm-4">
                                    <h6 className="mb-0 font-weight-bold">Revenue: </h6>
                                           </div>
                                           <div className="col-sm-4 text-secondary">
                                           <p>{KPI.actualRevenue}/{KPI.expectedRevenue}</p>
                                            </div>
                                        </div><br></br>
                                    
                                       
                                       

                                       
                                     
                                     



</div>
</div>
                            </div>

                            {/* User is recruit */}
                        </div>
                    </div>
                </div>
            )}
        </div>


        //         <div className="row">
        //             <div className="col-sm-3" />
        //             <div className="col-sm-9 text-secondary">
        //                 <button

        //                    type="button" onClick={updateInfo}
        //                     className="btn btn-primary px-4"
        //                 >
        //                     Save Changes
        //                 </button>
        //                  {/* Spinner */}
        // {loading && (
        //   <span className="spinner-border spinner-border-sm float-lg-right"></span>
        // )}
        // {/* Message after submit */}
        // {errMsg && (
        //   <span className="alert alert-danger float-lg-right" role="alert">
        //     {errMsg}
        //   </span>
        // )}
        // {successMsg && (
        //   <span className="alert alert-success float-lg-right" role="alert">
        //     {successMsg}
        //   </span>
        // )}
        //             </div>
        //         </div>
        //     </div>
        // </div>

    )
}
