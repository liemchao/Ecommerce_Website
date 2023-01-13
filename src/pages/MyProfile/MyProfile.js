import React, { Profiler, useEffect, useState } from "react";
import { Tabs, Tab, Form, ToastHeader, Button } from "react-bootstrap";
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
  const [picture, setPicture] = useState({});
  const [token, setToken] = useState(user.token);


  const uploadPicture = e => {

    setPicture({
      /* contains the preview, if you want to show the picture to the user
           you can access it with this.state.currentPicture
       */
      picturePreview: URL.createObjectURL(e.target.files[0]),
      /* this contains the file we want to send */
      pictureAsFile: e.target.files[0]
    });
  };

  const setImageAction = async event => {
    event.preventDefault();
   
    const formData = new FormData();
   
    formData.append("file", picture.pictureAsFile);

 

    for (var key of formData.entries()) {
      console.log(key[0] + ", " + key[1]);
    }

    const data = await fetch("https://backup-dtv-crm.azurewebsites.net/api/v1/SystemAccount/system-account/update-avatar", {
      method: "put",
      headers: { 
      "Authorization": 'Bearer ' + token },
      body: formData
    });

    const uploadedImage = await data.json();
    if (uploadedImage) {
      console.log("Successfully uploaded image");
    } else {
      console.log("Error Found");
    }
  };

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
                      <div className="content landing">
                        <form onSubmit={setImageAction}>
                          <input type="file" name="image" onChange={uploadPicture} />
                          <br />
                          <br />
                          <Button type="submit" name="upload">
                              Upload
                          </Button>
                        </form>
                      </div>
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
                    <FormUpdateAccount rowData={user}/>
                  </Tab>
                  {/* <Tab eventKey="account" title="Account">
                    <FormChangePassword  rowData={user} />
                  </Tab> */}

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
