import React, { useEffect, useState } from "react";
import ApiService from "../../api/apiService";
import "./MyProfile.css";
import { InputText } from "primereact/inputtext";
export default function FormUpdateAccount(rowData) {
 const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [data, setData] = useState([]);

  const [user, setUser] = useState({});
 

  useEffect(() => {
  
    setUser(rowData.rowData);
    getProfile();
  }, [rowData.rowData]);


  async function getProfile() {
  

    ApiService.getProfile()
      .then((response) => {
   

        setData(response.data.data[0].dob);

      
      })
      .catch((error) => {
        if (error.request) {
          setErrMsg(error.request)
        } else if (error.request) {
      
          setErrMsg(error.request);
        } else {
          setErrMsg(error.config);
      
        }
      });
  }

  
  async function updateInfo() {
  
    setLoading(true);

    let updateData = {
      id:user.id,
      fullname: user.fullname,
      phone: user.phone,
      gender: Boolean(user.gender),
      dob:user.dob
     
    };
    console.log(updateData)

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
        
            <div className="card-body">
                <div className="row mb-3">
                    <div className="col-sm-3">
                        <h6 className="mb-0">Name</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                        <input
                            type="text"
                            className="form-control"
                            name="name"
                            defaultValue={user.fullName}
                            onChange={(e) =>
                                setUser({ ...user, fullname: e.target.value })
                              }
                        />
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-sm-3">
                        <h6 className="mb-0">Email</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                        <input
                            type="text"
                            className="form-control"
                            name="phoneNumber"
                            readOnly
                            defaultValue={user.email}
                           

                        />
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-sm-3">
                        <h6 className="mb-0">Phone</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                        <input
                            type="text"
                            className="form-control"
                            name="phoneNumber"
                            readOnly
                            defaultValue={user.phone}
                            onChange={(e) =>
                                setUser({ ...user, phone: e.target.value })
                              }

                        />
                    </div>
                </div>


                <div className="row mb-3">
                    <div className="col-sm-3">
                        <h6 className="mb-0">Gender</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                    <select 
              onChange={(e) => setUser({ ...user, gender: e.target.value })}
            >
               
                          {
                            user.gender == "Male" ? (<>
                               <option  value={true} selected>Male</option>
                               <option  value={false}>Female</option>
                            </>) : (<>
                                <option  value={false} selected> Female </option>
                               <option   value={true}>Male</option>
                            
                            </>)
                          }
                  
              
            </select>

                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-sm-3">
                        <h6 className="mb-0">Date of Birth</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                        <InputText
                  
                     id="name"
              type="text"
              defaultValue={data}
              required
              onChange={(e) => setUser({ ...user, dob: e.target.value })}
            />
                    </div>
                </div>
            
               
                <div className="row">
                    <div className="col-sm-3" />
                    <div className="col-sm-9 text-secondary">
                        <button

                           type="button" onClick={updateInfo}
                            className="btn btn-primary px-4"
                        >
                            Save Changes
                        </button>
                         {/* Spinner */}
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
                </div>
            </div>
      
        </div>
    )
}
