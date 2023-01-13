import React, {useEffect, useState } from "react";

const LandingPage = (rowData) => {

  const [picture, setPicture] = useState({});
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

    console.log(picture.pictureAsFile);

    for (var key of formData.entries()) {
      console.log(key[0] + ", " + key[1]);
    }

    const data = await fetch("https://backup-dtv-crm.azurewebsites.net/api/v1/Product/product/add-product-image", {
      method: "post",
      headers: { 
      "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6ImRkNjM3ZjgyLWY5ZGQtNDQ4YS1iNDRhLTdkNGY5YzI0NzFhNCIsIkVtYWlsQWRyZXNzIjoibWFuYWdlckBnbWFpbC5jb20iLCJTdGF0dXMiOiJBY3RpdmF0ZWQiLCJSb2xlIjoiTWFuYWdlciIsIm5iZiI6MTY3MjAyNjcxNiwiZXhwIjoxNjc0NjE4NzE2LCJpYXQiOjE2NzIwMjY3MTZ9.IyesJccj0zl11M-MBgXQEK-j360WcEk9OyJctTldp9w" },
      body: formData
    });

    const uploadedImage = await data.json();
    console.log(data.json())
    if (uploadedImage) {
      console.log("Successfully uploaded image");
    } else {
      console.log("Error Found");
    }
  };


  return (
    <div className="content landing">
      <form onSubmit={setImageAction}>
        <input type="file" name="image" onChange={uploadPicture} />
        <br />
        <br />
        <button type="submit" name="upload">
          Upload
        </button>
      </form>
    </div>
  );
};

export default LandingPage;