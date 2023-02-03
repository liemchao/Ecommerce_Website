import React, { useState, useEffect } from "react";
import ApiService from "../../../../api/apiService";
import { Card ,Button } from "react-bootstrap";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Paginator } from "primereact/paginator";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboardList } from '@fortawesome/free-solid-svg-icons'


const AppointmentEm = ({ rowData }) => {
    const [data, setData] = useState([]);
    const [loadingData, setLoadingData] = useState(true);


    const [currentPage, setCurrentPage] = useState(1);


    async function getAppoinmentEm() {
      setLoadingData(true);
        await ApiService.getAppointmEm(rowData.id)
            .then((response) => {
              const dataRes = response.data.data
              const listDataSet = [...dataRes];
              listDataSet.map((obj, index) => {
                  const count = ++index;
                  obj['indexNumber'] = count
              })
              setData(listDataSet)
              setLoadingData(false);
            })
            .catch((error) => {
                if (error.response) {
                    
                    setData([])
                }
               
            });
    }


    useEffect(() => {
        getAppoinmentEm();
    }, [currentPage]);

    const TimeCreate = (rowData) => {

      return <p style={{ marginTop: "12%" }}>{rowData.startDate} {rowData.startTime}</p>
    }
    const AppointmentStatus = (rowData) => {
      if (rowData.appointmentStatus === "Customer Canceled") {
        return <div className="badge badge-info mr-2">Customer Canceled</div>
      }
      if (rowData.appointmentStatus === "Expired") {
        return <div className="badge badge-warning mr-2">Expired</div>
      }
      if (rowData.appointmentStatus === "Finished") {
        return <div className="badge badge-success mr-2">Finished</div>
      }
      if (rowData.appointmentStatus === "Rejected") {
        return <div className="badge badge-danger mr-2">Rejected</div>
      }
      if (rowData.appointmentStatus === "Waiting") {
        return <div className="badge badge-primary mr-2">Waiting</div>
      }
      if (rowData.appointmentStatus === "Employee Canceled") {
        return <div className="badge badge-dark">Employee Canceled</div>
      }
      if (rowData.appointmentStatus === "Accepted") {
        return <div className="badge badge-success">Accepted</div>
      }
    }

    const EmployeeName = (rowData) => {
      if (rowData.employee == null) {
  
        return <div className="badge badge-warning mr-2"> Not assigned</div>
      } else {
        return <div className="badge badge-info mr-2">Assigned</div>
  
      }
  
  
    }
    const customButton = (rowData) => {
      return (
        <div style={{ display: "flex" }}>
          {/* Detail */}
          <Link
            style={{ paddingRight: "-10%" }}
            to={{
              pathname: "/Dashboard/Manager/AppointmentDetail",
              state: rowData,
            }}
          >
            <Button><FontAwesomeIcon icon={faClipboardList} /></Button>
          </Link>
        </div>
      );
    };



    return (
        <>
            {!data.length==0 ? (
          <div id="wrapper">
          <div className="container-fluid">
            <div className="card shadow mb-4">
              <DataTable 
               style={{overflow:"scroll",maxHeight: "25rem"}}
                value={data}
                loading={loadingData}
                responsiveLayout="scroll"
                responsive="true"
                rowHover={true}

              >
                  <Column style={{ width: "6%" }}header="No" field="indexNumber" />
                  <Column header="Activity Type" field="activityType" />
                  <Column style={{ width: "14%" }} header="Description" field="description" />
                  <Column header="Start Date" body={TimeCreate} />
                  <Column header="End Date" field="endDate" />
                  <Column header="Employee" body={EmployeeName} />
                  <Column header="Status" body={AppointmentStatus} />
                  <Column header="Action" body={customButton} />
              </DataTable>
              <Paginator
                paginator
              
              />
            </div>
          </div>
        </div>
            ) : (
                <div style={{ textAlign: "center", fontSize: 30 }}>
                <h1 className="badge badge-danger mr-2"> Employee has not  an appointment  in the system</h1>
              </div>

            )}
        </>
    );
};

export default AppointmentEm;






