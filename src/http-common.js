import axios from "axios";

const API_URL_1 = "https://dtv-crm.azurewebsites.net/api/v1"

const user = JSON.parse(localStorage.getItem("user"));
const token = JSON.parse(localStorage.getItem("token"));


export default axios.create({
  baseURL: API_URL_1,
  withCredentials: true,
  credentials: "include",
  withCredentials:true,
  origin: true,
  headers: {
    "Authorization": "Bearer " + token,
    "Accept": "application/json, text/plain,",
    "access-control-allow-origin": "*", 
    "Content-type": "application/json; charset=UTF-8;",
  },
});
