import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Tabs, Tab } from "react-bootstrap";
import { Button } from "primereact/button";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStepBackward } from '@fortawesome/free-solid-svg-icons'

import PageHeading from "../../../components/PageHeading";
// import ApiService from "../../../api/ApiService";

const AccountDetail = () => {
  const { state } = useLocation();
  const [account, setAccount] = useState([]);
  const [work, setWork] = useState([]);
  const [totalRecords, setTotalRecords] = useState();
  const [totalPage, setTotalPage] = useState();
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
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
      <PageHeading title="Account Detail" />
      {loadingData ? (
        <p>Loading, please wait...</p>
      ) : (
        <div className="main-body">
          <div className="row">
            <div className="col-lg-4">
              <div className="card">
                <img
                 src={account.image}
                 alt="user-image"
                 className="img-fluid"
                 onError={(e) =>
                   (e.target.src =
                     "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png")
                 }
                />
              </div>
            </div>
            <div className="col-lg-8">
              <div className="card">
                <Tabs
                  defaultActiveKey="profile"
                  id="uncontrolled-tab-example"
                  className="mb-3"
                >
                  <Tab eventKey="profile" title="Profile">
                    <div className="card-body">
                      <div className="row mb-3">
                        <div className="col-sm-3">
                          <h6 className="mb-0 font-weight-bold">Name:</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                          <p>{account.fullname}</p>
                        </div>
                      </div>
                      <div className="row mb-3">
                        <div className="col-sm-3">
                          <h6 className="mb-0 font-weight-bold">Email:</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                          <p>{account.email}</p>
                        </div>
                      </div>
                      <div className="row mb-3">
                        <div className="col-sm-3">
                          <h6 className="mb-0 font-weight-bold">Phone:</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                          <p>{account.phone}</p>
                        </div>
                      </div>

                      <div className="row mb-3">
                        <div className="col-sm-3">
                          <h6 className="mb-0 font-weight-bold">Date of Birth:</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                          <p>{account.dob}</p>
                        </div>
                      </div> 

                      <div className="row mb-3">
                        <div className="col-sm-3">
                          <h6 className="mb-0 font-weight-bold">Joined Since:</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                          <p >{(account.createDate).slice(0,10)}</p>
                        </div>
                      </div>
                      <div className="row mb-3">
                        <div className="col-sm-3">
                          <h6 className="mb-0 font-weight-bold">Time Create:</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                          <p >{(account.createDate).slice(11,19)}</p>
                        </div>
                      </div>
                      <div className="row mb-3">
                        <div className="col-sm-3">
                          <h6 className="mb-0 font-weight-bold">Gender:</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                          {account.gender?(<>
                          <p>Female</p>
                          </>):(<>
                            <p>Male</p>
                          </>)}
                         
                        </div>
                      </div>
                      <div className="row mb-3">
                        <div className="col-sm-3">
                          <h6 className="mb-0 font-weight-bold">Status:</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                          {account.status=="Activated" ? (
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
        to="/Dashboard/Admin/AccountList"
        >
         <Button style={{marginTop:"2%"}}>
          <FontAwesomeIcon icon={faStepBackward} />  Back to
           
         </Button>
        </Link>
      </div>
    </div>
  );
};

export default AccountDetail;
