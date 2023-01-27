import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import PageHeading from "../../../components/PageHeading";
import ApiService from "../../../api/apiService";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Paginator } from "primereact/paginator";
import { Button  } from "react-bootstrap";
// import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons'



const TaskUpdate = () => {
  const { state } = useLocation();
  const [totalRecords, setTotalRecords] = useState();
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(7);
  const [currentPage, setCurrentPage] = useState(1);
  const [Appointment, setAppointment] = useState([]);
  const [loadingData, setLoadingData] = useState(true);
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [data1, setData1] = useState([]);
  const [idLead ,setLead] = useState([]);
  const [idEm ,setem] = useState([]);



  async function AssTask() {
    setLoading(true);

    let data = {
      name:name,
      employeeId: idEm,
      leadId: idLead
    };
    console.log(data);


    await ApiService.createTask(data)
      .then((response) => {
        setSuccessMsg("Assing Task Successfull");
        setLoading(false);
      })
      .catch((error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setErrMsg(resMessage);
        setLoading(false);
      });
  }

  async function GetLead() {
    setLoadingData(true);

    ApiService.getNewLead(currentPage,rows)
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


  async function getEmployeeList() {
    setLoadingData(true);

    await ApiService.getEmployeeTask()
      .then((response) => {

        const dataRes = response.data.data
        const listDataSet = [...dataRes];
        listDataSet.map((obj, index) => {
          const count = ++index;
          obj['indexNumber'] = count

        })

        setData1(listDataSet);

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

  const chooseCustomer = (id) =>{
    let checkBox = document.getElementById(id);
      if (checkBox.checked){
        idLead.push(id);
              // let disable = document.createAttribute("disabled")
    // disableButton.setAttributeNode(disable)
    // nameLead.push(rowData.fullname);
    // setLead(rowData.id);
      } else {
        idLead.splice(idLead.indexOf(checkBox.id), 1)
        // idLead.forEach((value, index) => {
        //   if(checkBox.id === value) 
        //   {
        //     idLead.splice(index, 1);
        //     console.log(idLead)
        //   }
        // })
        
      }
  };
    // let disable = document.createAttribute("disabled")
    // disableButton.setAttributeNode(disable)

    // nameLead.push(rowData.fullname);
    // setLead(rowData.id);

    const chooseEmployee = (id) =>{

     let radio = document.getElementById(id);
      if (radio.checked){
       setem(id)
     

    }

  }

    const onPageChange = (event) => {
      setFirst(event.first);
      setRows(event.rows);
      setCurrentPage(event.page + 1);
    };

  
  const customButton = (rowData) => {

    if (rowData.leadStatus=="New") {
        return <input id={rowData.id} style={{marginLeft:"10%"}}type="checkbox" onClick={ () => {
          chooseCustomer(rowData.id)
        }}/>;
        
      }
      else{
        return <Button disabled></Button>;;
      }
  };

  const customButton1 = (rowData) => {

  
        return  <input type="radio" id={rowData.id} name="customer_name" value={rowData} onClick={ () => {
          chooseEmployee(rowData.id)
        }}/>
     
      
      
  }

  const customStatus = (rowData) => {
    if (rowData.leadStatus=="New") {
      return <div className="badge badge-success mr-2">New</div>;
    }
    else{
      return <div className="badge badge-warning mr-2">Not Avalible</div>;
    }
  };

useEffect(() => {
    GetLead();
  
  }, [currentPage]);

  useEffect(() => {
    getEmployeeList();
  }, []);

  const refreshList = () => {
    setLoadingData(true);
  };


  return (
    <div>
      <PageHeading title="Update Task" />
      {!data? (
        <p>Loading, please wait...</p>
      ) : (
        <div className="main-body">
          <div className="row">
            <div className="col-lg-5">
              <div className="card">
              <div className="p-field p-col-8 p-md-4">
              <label htmlFor="name">Task Name</label>
               <input onChange={(e) => setName(e.currentTarget.value)} ></input>
                </div>

                <DataTable     style={{overflow:"scroll",maxHeight: "27rem"}}
                  value={data1}
                  loading={loadingData}
                  responsiveLayout="scroll"
                >
                  <Column header="Employee Name" field="fullname"/>
                  <Column  style={{textAlign: "center"}} header="Number Task" field="numberOfTaskOnDoing"/>
                  <Column header="Action" body={customButton1} />
                </DataTable>

            <Button style={{marginTop:"5%"}} onClick={AssTask}> <FontAwesomeIcon icon={faPlus}/> Create Task</Button>
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
       <span className="alert alert-success float-lg-right" role="alert">
         {successMsg}
       </span>
     )}
              </div>
            </div>


            <div className="col-lg-7">
              <div className="card">

              <div className="container-fluid">
              <div className="card shadow mb-4">
                <DataTable
                  value={data}
                  loading={loadingData}
                  responsiveLayout="scroll"
                >
                  <Column header="ID" field="indexNumber"/>
                  <Column header=" Customer Name" field="fullname"/>
                  <Column header="Status" body={customStatus}/>
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
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskUpdate;