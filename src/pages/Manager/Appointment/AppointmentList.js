import React, { useState, useEffect } from "react";

import PageHeading from "../../../components/PageHeading";
import ApiService from "../../../api/apiService";

// import { Link } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Paginator } from "primereact/paginator";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import CreateProduct from "../Product/ProductCreate"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboardList } from '@fortawesome/free-solid-svg-icons'
import { faSearch} from '@fortawesome/free-solid-svg-icons'
import { Tab,Tabs } from "react-bootstrap";
import AppointmentWaList from "./FilterAppoint/AppointA"
import AppointmentAcList from "./FilterAppoint/AppointB"
import AppointmentReList from "./FilterAppoint/AppointC"
import AppointmentCuList from "./FilterAppoint/AppointD";
import AppointmentEmList from "./FilterAppoint/AppointE";
import AppointmentFiList from "./FilterAppoint/AppointJ";
import AppointmentExList from "./FilterAppoint/AppointF";




const AppointmentList = () => {
  const [data, setData] = useState([]);
  const [errMsg, setErrMsg] = useState("");
  const [loadingData, setLoadingData] = useState(true);
  const [totalRecords, setTotalRecords] = useState();
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState("");
  const [pageInputTooltip, setPageInputTooltip] = useState(
    "Press 'Enter' key to go to this page."
  );


  async function getAppointmentList() {
    setLoadingData(true);

    await ApiService.getAppoinment(currentPage, rows)
      .then((response) => {
     
        const dataRes = response.data.data
        const listDataSet = [...dataRes];
        listDataSet.map((obj, index) => {
          const count = ++ index ;
          obj['indexNumber'] = count

        })
       
        setTotalRecords(response.data.totalRow);
        setData(listDataSet);
       
        setLoadingData(false);
      })
      .catch((error) => {
        if (error.response) {
        
        } else if (error.request) {
      
          console.log(error.request);
        } else {
      
        }
        console.log(error.config);
      });
  }

  useEffect(() => {
    getAppointmentList();
  }, [currentPage]);

  const refreshList = () => {
    setLoadingData(true);
    getAppointmentList();
  };
  

  const onPageChange = (event) => {
    setFirst(event.first);
    setRows(event.rows);
    setCurrentPage(event.page + 1);
  };

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
    if (rowData.lead.employee == null) {

      return <div className="badge badge-info mr-2">Need to</div>
    } else {
      return <div className="badge badge-warning mr-2">In Process</div>

    }


  }
  const TimeCreate = (rowData) => {

    return <p style={{ marginTop: "12%" }}>{rowData.startDate} {rowData.startTime}</p>



  }


  const handleDelete = (e, rowData) => {
    e.preventDefault();
    let confirm = window.confirm(
      "Are you sure you want to delete this Product?"
    );

    if (confirm) {
      ApiService.deleteJob(rowData.id)
        .then((response) => {
         
          refreshList();
        })
        .catch((e) => {
          console.log(e);
          window.alert("Can't delete this Product.")
        });
    }
  };

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
  
  const handleSearch = (e) =>{
    setQuery(e.target.value);
    if(e.target.value === ""){
      refreshList();
    }

  }

  async function searchProduct() {
    
    await ApiService.searchProduct(query)
      .then((response) => {
        // check if the data is populated
        const dataRes = response.data.data
        const listDataSet = [...dataRes];
        listDataSet.map((obj, index) => {
          const count = ++index;
          obj['indexNumber'] = count

        })
        
        setData(listDataSet);
        setLoadingData(false)
       
      })
      .catch((error) => {
        if(error.response.status == 404) {
          setData([]);
          setErrMsg(error.response.data)

        }
      
      });
  }
  
  const notFound =()=>{
    return <div className="badge badge-danger mr-2">Not Found</div>;
  }

 

  return (
    <>
      {/* New DataTable */}
      <div>
       <PageHeading title="Appointment List" />
       <div style={{marginLeft:"85%", paddingLeft:"5%"}}className="d-sm-flex align-items-center justify-content-between">
        
        {/* Upload File Modal */}
        <CreateProduct refreshList={refreshList}
        
        />
        
      </div>
      <div className="row">
       <div style={{marginBottom:20}}>
       <input onChange={handleSearch}  style={{marginLeft:850,height:40,textAlign:"center"}}className="mt-4" type="text" placeholder="Search by name" aria-label="Search"/>
       <Button type="button" style={{height:40,width:100,marginTop:-7, marginLeft:10}}
       onClick={searchProduct}
       ><FontAwesomeIcon icon={faSearch} /></Button>
       </div>
       {data.length==0 ? (
       <div style={{marginTop:"2%"}}id="wrapper">
       <div className="container-fluid">
         <div className="card shadow mb-1">
           <DataTable
           >
           <Column header="Result" body={notFound}/>
           </DataTable>
          </div>
          </div>
          </div>
          ) : (
            <Tabs
            defaultActiveKey="Detail"
            id="uncontrolled-tab-example"
            className="mb-3"
          >
            <Tab eventKey="Detail" title="All Appointment">
            <div id="wrapper">
            <div className="container-fluid">
              <div className="card shadow mb-4">
                <DataTable
                  value={data}
                  loading={loadingData}
                  responsiveLayout="scroll"
                >
                  <Column header="No" field="indexNumber" />
                  <Column header="Title" field="activityType" />
                  <Column style={{ width: "18%" }} header="Description" field="description" />
                  <Column header="Start Date" body={TimeCreate} />
                  <Column header="End Date" field="endDate" />
                  <Column header="Employee" body={EmployeeName} />
                  <Column header="Status" body={AppointmentStatus} />
                  <Column header="Action" body={customButton} />
                </DataTable>
                <Paginator
                  paginator
                  first={first}
                  rows={rows}
                  totalRecords={totalRecords}
                  onPageChange={onPageChange}
                  className="p-jc-end p-my-3"
                />
              </div>
            </div>
          </div>

          </Tab>
          <Tab eventKey="Wa" title=" Watting">
            <AppointmentWaList/>
          </Tab>
          <Tab eventKey="Ac" title=" Accepted">
            <AppointmentAcList/>
          </Tab>
          <Tab eventKey="Re" title=" Rejected">
            <AppointmentReList/>
          </Tab>
          <Tab eventKey="Cu" title=" Customer Canel">
            <AppointmentCuList/>
          </Tab>
          <Tab eventKey="Em" title=" Employeer Canel">
            <AppointmentEmList/>
          </Tab>
          <Tab eventKey="Ex" title=" Expired">
            <AppointmentExList/>
          </Tab>
          <Tab eventKey="Fi" title=" Finish">
            <AppointmentFiList/>
          </Tab>

          </Tabs>
           
        )}
         </div>
      </div>
    </>
  );
};

export default AppointmentList;
