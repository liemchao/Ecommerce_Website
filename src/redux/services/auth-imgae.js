import React, {useEffect, useState } from "react";
import { Button } from "react-bootstrap";


const LandingPage = (rowData) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [picture, setPicture] = useState({});
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
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
    formData.append("id", rowData.rowData.id);
    formData.append("file", picture.pictureAsFile);
  

    const data = await fetch("https://backup-dtv-crm.azurewebsites.net/api/v1/Product/product/add-product-image", {
      method: "post",
      headers: { 
      "Authorization":user.token},
      body: formData
    });

    const uploadedImage = await data.text();
    console.log(uploadedImage)
    if (uploadedImage=="Success") {
      setSuccessMsg("Upload image successfully!");
      setLoading(false)
   
    } else {
      setErrMsg("Upload image Fail!");
    }
  };


  return (
    <div className="content landing" style={{marginLeft:"3%"}}>
      <form onSubmit={setImageAction}>
        <input type="file" name="image" onChange={uploadPicture} />
        <br />
        <br />
        <Button type="submit" name="upload">
          Upload
        </Button>
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
          <span style={{marginLeft:10}}className="alert alert-success float-lg 1-right" role="alert">
            {successMsg}
          </span>
        )}
      </form>
    </div>
  );
};

export default LandingPage;