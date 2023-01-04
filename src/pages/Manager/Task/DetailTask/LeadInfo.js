import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Tabs, Tab } from "react-bootstrap";

import ApiService from "../../../../api/apiService";

import PageHeading from "../../../../components/PageHeading";



const LeadInfor = (rowData) => {
  const { state } = useLocation();
  const [account, setAccount] = useState([]);
  const [work, setWork] = useState([]);
  const [totalRecords, setTotalRecords] = useState();
  const [totalPage, setTotalPage] = useState();
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [id, setID] = useState(rowData.location.rowData);


   async function getLeadInfo() {
      


        await ApiService.getLeadbyID(id)
          .then((response) => {
            // console.log(response);
            const dataRes = response.data.data
            const listDataSet = [...dataRes];
           
            setTotalRecords(response.data.totalRow);
         
            setAccount(listDataSet);
            console.log(account);
       
            // console.log(toString(listDataSet.productImages.url));
            // setTotalPage(response.data.totalPage);
            // setTotalRecords(response.data.totalEle);
            // you tell it that you had the result
        
          })
          .catch((error) => {
            if (error.response) {
              // get response with a status code not in range 2xx
              // console.log(error.response.data.data);
              // console.log(error.response.data.status);
              // console.log(error.response.data.headers);
            } else if (error.request) {
              // no response
              console.log(error.request);
            } else {
              // Something wrong in setting up the request
              // console.log("Error", error.message);
            }
            console.log(error.config);
          });
      }

  useEffect(() => {
    getLeadInfo()
  }, []);

  return (
    <div>
      <PageHeading title="Lead Detail" />
      {account.length==0 ? (
        <p>Loading, please wait...</p>
      ) : (
        <div className="main-body">
          <div className="row">
            <div className="col-lg-4">

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
                          <p>{account[0].fullname}</p>
                        </div>
                      </div>

                      <div className="row mb-3">
                        <div className="col-sm-3">
                          <h6 className="mb-0">Gender:</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                          {account[0].gender ? (
                            <div className="col-sm-7text-secondary">Male

                            </div>

                          ) : (
                            <div className="col-sm-7text-secondary">Female
                            </div>

                          )

                          }
                        </div>
                      </div>

                      <div className="row mb-3">
                        <div className="col-sm-3">
                          <h6 className="mb-0">Email:</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                          <p>{account[0].email}</p>
                        </div>
                      </div>
                      <div className="row mb-3">
                        <div className="col-sm-3">
                          <h6 className="mb-0">Phone:</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                          <p>{account[0].phone}</p>
                        </div>
                      </div>
                      <div className="row mb-3">
                        <div className="col-sm-3">
                          <h6 className="mb-0">Lead Type: </h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                          <p>{account[0].leadType}</p>
                        </div>
                      </div>
                      {
                        account.companyName == "" ? (<>

                        </>) : (

                          <div className="row mb-3">
                            <div className="col-sm-3">
                              <h6 className="mb-0">Company Name:</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                              <p>{account[0].companyName}</p>
                            </div>
                          </div>
                        )
                      }
                      {/* <div className="row mb-3">
                        <div className="col-sm-3">
                          <h6 className="mb-0">Gender:</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                          <p>{account.gender}</p>
                        </div>
                      </div> */}
                      {/* <div className="row mb-3">
                        <div className="col-sm-3">
                          <h6 className="mb-0">Birth Day:</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                          <p>{account.birthday}</p>
                        </div>
                      </div> */}
                      {
                        account.dob == null ? (<>

                        </>) : (

                          <div className="row mb-3">
                            <div className="col-sm-3">
                              <h6 className="mb-0">Day of Brith:</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                              <p>{(account[0].dob).slice(0, 10)}</p>
                            </div>
                          </div>
                        )
                      }
                      <div className="row mb-3">
                        <div className="col-sm-3">
                          <h6 className="mb-0">Create Day</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                          <p>{(account[0].createDate).slice(0, 10)}</p>
                        </div>
                      </div>
                      <div className="row mb-3">
                        <div className="col-sm-3">
                          <h6 className="mb-0">Lead Status</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                          {account[0].leadStatus === "New" ? (
                            <div className="badge badge-warning mr-2">
                              New
                            </div>
                          ) : (
                            <div className="badge badge-success mr-2">
                              {account.leadStatus}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </Tab>

                  {/* <Tab eventKey="account" title="Account">
                    {
                      account.account === null ? (
                        <div style={{ textAlign: "center", fontSize: 30 }}>
                          <h1 className="badge badge-danger mr-2"> Lead has not registered an account in the system</h1>
                        </div>
                      ) : (
                        <div className="card-body">
                          <div className="row mb-3">
                            <div className="col-sm-3">
                              <h6 className="mb-0">Name:</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                              {account.account.fullname}
                            </div>
                          </div>

                          <div className="row mb-3">
                            <div className="col-sm-3">
                              <h6 className="mb-0">Gender:</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                              {account.account.gender ? (
                                <div className="col-sm-7text-secondary">Male

                                </div>

                              ) : (
                                <div className="col-sm-7text-secondary">Female
                                </div>

                              )

                              }
                            </div>
                          </div>

                          <div className="row mb-3">
                            <div className="col-sm-3">
                              <h6 className="mb-0">Email:</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                              <p>{account.account.email}</p>
                            </div>
                          </div>
                          <div className="row mb-3">
                            <div className="col-sm-3">
                              <h6 className="mb-0">Phone:</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                              <p>{account.account.phone}</p>
                            </div>
                          </div>

                        </div>)

                    }

                  </Tab> */}
                </Tabs>

              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeadInfor;
