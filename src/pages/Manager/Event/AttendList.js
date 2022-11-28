import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { Tabs, Tab } from "react-bootstrap";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

import PageHeading from "../../../components/PageHeading";
import ApiService from "../../../api/ApiService";

const EventDetail = () => {
  const { state } = useLocation();
  const [event, setEvent] = useState([]);
  const [attendant, setAttendant] = useState([]);
  const [loadingData, setLoadingData] = useState(true);

  async function getAttendant(event) {
    ApiService.getEventAttendant(event)
    .then((response) => {
      console.log(response.data.data);
      setAttendant(response.data.data);
      setLoadingData(false);
    })
    .catch((error) => {
      if (error.response) {
        // get response with a status code not in range 2xx
        console.log(error.response.data.data);
        console.log(error.response.data.status);
        console.log(error.response.data.headers);
      } else if (error.request) {
        // no response
        console.log(error.request);
      } else {
        // Something wrong in setting up the request
        console.log("Error", error.message);
      }
      console.log(error.config);
    });
  }

  useEffect(() => {
    if (typeof state != "undefined") {
      localStorage.setItem("ID", JSON.stringify(state));
    }
    const storageEvent = JSON.parse(localStorage.getItem("ID"));
    setEvent(storageEvent);
    getAttendant(event);
    setLoadingData(false);
  }, []);

  return (
    <div>
      <PageHeading title="Attend List" />
      {loadingData ? (
        <p>Loading, please wait...</p>
      ) : (
        <div className="main-body">
          <div className="row">
            <div className="col-lg-4">
              <div className="card ">
                <div className="card-body">
                  <div className="d-flex flex-column">
                    This is list of attendant for event: {event.title}
                  </div>
                  <ul className="d-flex flex-column">
                    <li>Description: {event.description}</li>
                    <li>From: {event.starttime}</li>
                    <li>To: {event.endtime}</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-8">
              <div className="card shadow mb-4">
                <DataTable
                  value={attendant}
                  paginator
                  rows={5}
                  rowsPerPageOptions={[5, 10, 20]}
                  loading={loadingData}
                  responsiveLayout="scroll"
                  paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                  currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
                >
                  <Column header="ID" field="id" />
                  <Column header="Name" field="name" />
                  <Column header="Email" field="email" />
                  <Column header="Has CV" field="cv" />
                </DataTable>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventDetail;
