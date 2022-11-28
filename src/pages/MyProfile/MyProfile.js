import React, { Profiler, useEffect, useState } from "react";
import { Tabs, Tab, Form, ToastHeader } from "react-bootstrap";
import PageHeading from "../../components/PageHeading";
// import ApiService from "../../api/apiService";
import FormUpdateAccount from "./FormUpdateAccount";
import FormChangePassword from "./FormChangePassword";

const AccountDetail = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [account, setData] = useState({})
  const [loadingData, setLoadingData] = useState(false);
  const [messages, setMessages] = useState([]);
  const [password, setPassword] = useState({})

 
  const showImage = () => { }

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
                <div className="card-body">
                  <div className="d-flex flex-column align-items-center text-center">
                    <img
                      src={user.image}
                      alt="Admin"
                      className="rounded-circle p-1 bg-primary"
                      width={110}
                    />
                    <div className="mt-3">
                      <p className="text-secondary mb-3">Roles: {user.role}</p>
                      <input
                        type="file"
                        className="text-center center-block file-upload"
                        onChange={showImage}
                      />
                    </div>
                  </div>
                </div>
              </div>

            </div>
            <div className="col-lg-8">
                <div className="card">
                  {/* <Tabs
                    defaultActiveKey="profile"
                    id="uncontrolled-tab-example"
                    className="mb-3"
                  >
                    <Tab eventKey="profile" title="Profile">
                      <FormUpdateAccount />
                    </Tab>
                    <Tab eventKey="account" title="Account">
                      <FormChangePassword />
                    </Tab>

                  </Tabs> */}
                </div>
              
              {/* User is recruit */}
              
              {user.role.includes("Admin") && (
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
                            <h6 className="mb-0">Name</h6>
                          </div>
                          <div className="col-sm-9 text-secondary">
                            <input
                              type="text"
                              className="form-control"
                              defaultValue={user.fullName}
                              
                              
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
                              defaultValue={user.phone}
                            />
                          </div>
                        </div>
                        <div className="row mb-3">
                          <div className="col-sm-3">
                            <h6 className="mb-0">Address</h6>
                          </div>
                          <div className="col-sm-9 text-secondary">
                            <input
                              type="text"
                              className="form-control"
                              defaultValue="Bay Area, San Francisco, CA"
                            />
                          </div>
                        </div>
                        <div className="row mb-3">
                          <div className="col-sm-3">
                            <h6 className="mb-0">Status</h6>
                          </div>
                          <div className="col-sm-9 text-secondary">
                          <div className="row mb-3">
                        <div className="col-sm-9 text-secondary">
                          {user.status ? (
                            <div className="badge badge-primary mr-2">
                              Actived
                            </div>
                          ) : (
                            <div className="badge badge-danger mr-2">
                              Banned
                            </div>
                          )}
                        </div>
                      </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-sm-3" />
                          <div className="col-sm-9 text-secondary">
                            <button
                              type="submit"
                              className="btn btn-primary px-4"
                            >
                              Save Changes
                            </button>
                          </div>
                        </div>
                      </div>
                    </Tab>
                    <Tab eventKey="account" title="Account">
                      <div className="card-body">
                        <div className="row mb-3">
                          <div className="col-sm-3">
                            <h6 className="mb-0">Username</h6>
                          </div>
                          <div className="col-sm-9 text-secondary">
                            <input
                              type="text"
                              className="form-control"
                              defaultValue={user.fullname}
                            />
                          </div>
                        </div>
                        <div className="row mb-3">
                          <div className="col-sm-3">
                            <h6 className="mb-0">Password</h6>
                          </div>
                          <div className="col-sm-9 text-secondary">
                            <input
                              type="text"
                              className="form-control"
                              defaultValue={user.password}
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-sm-3" />
                          <div className="col-sm-9 text-secondary">
                            <button
                              type="submit"
                              className="btn btn-primary px-4"
                            >
                              Change password
                            </button>
                          </div>
                        </div>
                      </div>
                    </Tab>
                    <Tab eventKey="job" title="Job"></Tab>
                    {/* <Tab eventKey="cv" title="CV">
                      <div className="card-body">
                        <p>Upload your CV here:</p>
                        <input
                          type="file"
                          className="text-center center-block file-upload"
                        />
                      </div>
                    </Tab> */}
                    <Tab eventKey="contact" title="Contact"></Tab>
                  </Tabs>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountDetail;
