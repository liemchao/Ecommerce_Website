import React, { useEffect, useState } from "react";

import PageHeading from "../../../components/PageHeading";



export default function KPIDetail(rowData) {
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
                                           <p>{KPI.startDate}   -  {KPI.endDate} </p>
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

                          
                        </div>
                    </div>
                </div>
            )}
        </div>


       

    )
}
