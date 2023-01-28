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


    const [user, setUser] = useState({});


    useEffect(() => {
        setUser(rowData.rowData)
    }, [rowData.rowData]);

    async function updateInfo() {

        setLoading(true);

        let updateData = {
            id: user.id,
            fullname: user.fullname,
            phone: user.phone,
            gender: Boolean(user.gender),
            dob: user.dob

        };

        ApiService.updateProFile(updateData)
            .then((response) => {
                setSuccessMsg("Update Profile Successfully!");
                setLoading(false);
            })
            .catch((error) => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                setErrMsg("Update Profile Failed!");
                setLoading(false);
            });
    }


    return (
        <div>
            <PageHeading title="KPI Detail" />

            <Button style={{float:"right",marginTop:"-4%"}}> <FontAwesomeIcon icon={faSave}/> Save</Button>
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
                                    <div className="col-sm-3">
                            <h6 className="mb-0 font-weight-bold">Name: </h6>
                                           </div>
                                           <div className="col-sm-9 text-secondary">
                                            <InputText
                                                id="phone"
                                                type="text"
                                                required
                                            />
                                            </div>
                                        </div><br></br>

                                        <div className="row mb-2">
                                    <div className="col-sm-3">
                            <h6 className="mb-0 font-weight-bold">Date Create: </h6>
                                           </div>
                                           <div className="col-sm-9 text-secondary">
                                            <InputText
                                                id="phone"
                                                type="text"
                                                required
                                            />
                                            </div>
                                        </div><br></br>

                                        <div className="row mb-2">
                                    <div className="col-sm-3">
                            <h6 className="mb-0 font-weight-bold">Status: </h6>
                                           </div>
                                           <div className="col-sm-9 text-secondary">
                                            <InputText
                                                id="phone"
                                                type="text"
                                                required
                                            />
                                            </div>
                                        </div><br></br>

                                        <div className="row mb-2">
                                        <div className="col-sm-3">
                            <h6 className="mb-0 font-weight-bold">Frequency Of Create: </h6>
                                           </div>
                                            <select style={{marginLeft:"2%"}} className="col-sm-5"
                                            >
                                                <option  hidden selected>Select-Frequency Of Create</option>
                                                <option  >One Week</option>



                                            </select>
                                        </div>

                                        <div style={{marginTop:"2%"}}className="row mb-2">
                                    <div className="col-sm-3">
                                    <h6 className="mb-0 font-weight-bold">IsTemplate: </h6>
                                           </div>
                                           <div className="col-sm-9 text-secondary">
                                            <InputText
                                                id="phone"
                                                type="text"
                                                required
                                            />
                                            </div>
                                        </div><br></br>
                                       
                                       
                                    </div>

                                    <div className="row mb-2">
                                    <div className="col-sm-3">
                                    <h6 className="mb-0 font-weight-bold">Expected Call: </h6>
                                           </div>
                                           <div className="col-sm-9 text-secondary">
                                            <InputText
                                                id="phone"
                                                type="number"
                                                min={1}
                                                max={600000}
                                                required
                                            />
                                            </div>
                                        </div><br></br>

                                        {/* Name */}
                                        <div className="row mb-2">
                                    <div className="col-sm-3">
                                    <h6 className="mb-0 font-weight-bold">Actual Call: </h6>
                                           </div>
                                           <div className="col-sm-9 text-secondary">
                                            <InputText
                                                id="phone"
                                                type="number"
                                                min={1}
                                                max={600000}
                                                required
                                            />
                                            </div>
                                        </div><br></br>
                                        <div className="row mb-2">
                                    <div className="col-sm-3">
                                    <h6 className="mb-0 font-weight-bold">Expected Meeting: </h6>
                                           </div>
                                           <div className="col-sm-9 text-secondary">
                                            <InputText
                                                id="phone"
                                                type="number"
                                                min={1}
                                                max={600000}
                                                required
                                            />
                                            </div>
                                        </div><br></br>
                                        <div className="row mb-2">
                                    <div className="col-sm-3">
                                    <h6 className="mb-0 font-weight-bold">Actual Meeting: </h6>
                                           </div>
                                           <div className="col-sm-9 text-secondary">
                                            <InputText
                                                id="phone"
                                                type="number"
                                                min={1}
                                                max={600000}
                                                required
                                            />
                                            </div>
                                        </div><br></br>
                                </div>
                            </div>

                        </div>
                        <div className="col-lg-6">
                        <div className="card">

                        <div className="card-body">
                                    <div className="d-flex flex-column ">

                        


                          
                                        <div className="row mb-2">
                                    <div className="col-sm-3">
                                    <h6 className="mb-0 font-weight-bold">Expected New Lead: </h6>
                                           </div>
                                           <div className="col-sm-9 text-secondary">
                                            <InputText
                                                id="phone"
                                                type="number"
                                                min={1}
                                                max={600000}
                                                required
                                            />
                                            </div>
                                        </div><br></br>
                                        <div className="row mb-2">
                                    <div className="col-sm-3">
                                    <h6 className="mb-0 font-weight-bold">Actual New Lead: </h6>
                                           </div>
                                           <div className="col-sm-9 text-secondary">
                                            <InputText
                                                id="phone"
                                                type="number"
                                                min={1}
                                                max={600000}
                                                required
                                            />
                                            </div>
                                        </div><br></br>
                                        <div className="row mb-2">
                                    <div className="col-sm-3">
                                    <h6 className="mb-0 font-weight-bold">Expected Lead Convert: </h6>
                                           </div>
                                           <div className="col-sm-9 text-secondary">
                                            <InputText
                                                id="phone"
                                                type="number"
                                                min={1}
                                                max={600000}
                                                required
                                            />
                                            </div>
                                        </div><br></br>
                                        <div className="row mb-2">
                                    <div className="col-sm-3">
                                    <h6 className="mb-0 font-weight-bold">Actual Lead Convert: </h6>
                                           </div>
                                           <div className="col-sm-9 text-secondary">
                                            <InputText
                                                id="phone"
                                                type="number"
                                                min={1}
                                                max={600000}
                                                required
                                            />
                                            </div>
                                        </div><br></br>
                                        <div className="row mb-2">
                                    <div className="col-sm-3">
                                    <h6 className="mb-0 font-weight-bold">Expected Sales: </h6>
                                           </div>
                                           <div className="col-sm-9 text-secondary">
                                            <InputText
                                                id="phone"
                                                type="number"
                                                min={1}
                                                max={600000}
                                                required
                                            />
                                            </div>
                                        </div><br></br>
                                        <div className="row mb-2">
                                    <div className="col-sm-3">
                                    <h6 className="mb-0 font-weight-bold">Actual Sales: </h6>
                                           </div>
                                           <div className="col-sm-9 text-secondary">
                                            <InputText
                                                id="phone"
                                                type="number"
                                                min={1}
                                                max={600000}
                                                required
                                            />
                                            </div>
                                        </div><br></br>

                                        <div className="row mb-2">
                                    <div className="col-sm-3">
                                    <h6 className="mb-0 font-weight-bold">Expected Revenue: </h6>
                                           </div>
                                           <div className="col-sm-9 text-secondary">
                                            <InputText
                                                id="phone"
                                                type="number"
                                                min={1}
                                                max={600000}
                                                required
                                            />
                                            </div>
                                        </div><br></br>
                                        <div className="row mb-2">
                                    <div className="col-sm-3">
                                    <h6 className="mb-0 font-weight-bold">Actual Revenue: </h6>
                                           </div>
                                           <div className="col-sm-9 text-secondary">
                                            <InputText
                                                id="phone"
                                                type="number"
                                                min={1}
                                                max={600000}
                                                required
                                            />
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
