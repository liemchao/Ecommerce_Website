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
                  <Tabs
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

                  </Tabs>
                </div>
              
              {/* User is recruit */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountDetail;
