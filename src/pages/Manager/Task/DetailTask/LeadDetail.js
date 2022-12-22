import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Tabs, Tab } from "react-bootstrap";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

import PageHeading from "../../../../components/PageHeading";


const LeadDetail = () => {
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
      <PageHeading title="Lead Detail" />
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
                  <Tab eventKey="profile" title="Profile">
                    <div className="card-body">
                      <div className="row mb-3">
                        <div className="col-sm-3">
                          <h6 className="mb-0">Name:</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                      
                        </div>
                      </div>
                      <div className="row mb-3">
                        <div className="col-sm-3">
                          <h6 className="mb-0">Email:</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                          <p>{account.email}</p>
                        </div>
                      </div>
                      <div className="row mb-3">
                        <div className="col-sm-3">
                          <h6 className="mb-0">Phone:</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                          <p>{account.phone}</p>
                        </div>
                      </div>
                     
                      <div className="row mb-3">
                        <div className="col-sm-3">
                          <h6 className="mb-0">Joined Since:</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                          {/* <p >{(account.createDate).slice(0, 10)}</p> */}
                        </div>
                      </div>
                      <div className="row mb-3">
                        <div className="col-sm-3">
                          <h6 className="mb-0">Time Create</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                          {/* <p >{(account.createDate).slice(11, 19)}</p> */}
                        </div>
                      </div>
                      <div className="row mb-3">
                        <div className="col-sm-3">
                          <h6 className="mb-0">Status</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
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

export default LeadDetail;
