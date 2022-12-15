import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import PageHeading from "../../../components/PageHeading";
import ApiService from "../../../api/apiService";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Paginator } from "primereact/paginator";
import { Button  } from "react-bootstrap";
// import { Link } from "react-router-dom";



const ProductDetail = () => {
  const { state } = useLocation();
  const [totalRecords, setTotalRecords] = useState();
  const [totalPage, setTotalPage] = useState();
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [Appointment, setAppointment] = useState([]);
  const [loadingData, setLoadingData] = useState(true);
  const [data, setData] = useState([]);
  const [id, setId] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [data1, setData1] = useState([]);
  const [idLead ,setLead] = useState([]);
  const [nameLead ,setNameLead] = useState([]);



  async function AssTask() {
    setLoading(true);

    let data = {
      id: Appointment.id,
      employeeId: id,

    };


    await ApiService.Ass(data)
      .then((response) => {
        setSuccessMsg("Assing Appoint successfull");
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
    setLoading(true);


    await ApiService.getLead(currentPage, rows)
      .then((response) => {
        const dataRes = response.data.data
        const listDataSet = [...dataRes];
        listDataSet.map((obj, index) => {
          const count = ++ index ;
          obj['indexNumber'] = count

        })
       

        setData(listDataSet);
        setLoadingData(false);
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


  async function getEmployeeList() {
    setLoadingData(true);

    await ApiService.getEmployee()
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

  const chooseCustomer = (rowData) =>{
    let disableButton = document.getElementById(rowData.id);
    let disable = document.createAttribute("disabled")
    disableButton.setAttributeNode(disable)

    nameLead.push(rowData.fullname);
    setLead(rowData.id);

   }
  const customButton = (rowData) => {

    if (rowData.leadStatus=="New") {
        return <input style={{marginLeft:"10%"}}type="checkbox"></input>;
        
      }
      else{
        return <Button disabled>Choose</Button>;;
      }
  };
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
    getEmployeeList();
  }, []);

  const refreshList = () => {
    setLoadingData(true);
    GetLead();
  };

  async function updateStatus(rowData) {
    setLoading(true);

    let data = {
  leadID: rowData.id,
  status: 1,
  
    };

    await ApiService.ChangStatusLead(data)
      .then((response) => {
        setSuccessMsg("Update role successfull");
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


  


  return (
    <div>
      <PageHeading title="Task Create" />
      {loadingData? (
        <p>Loading, please wait...</p>
      ) : (
        <div className="main-body">
          <div className="row">
            <div className="col-lg-4">
              <div className="card">
              <div className="p-field p-col-8 p-md-4">
              <label htmlFor="name">Task_Name</label>
               <input></input>
                  <label htmlFor="role">Empoyee_Name</label>
                  <select
                    onChange={(e) => setId(e.currentTarget.value)}
                  >
                    {
                      data1.map((x, y) =>
                        <option key={y} value={x.id}>{x.fullname}</option>)
                    }



                  </select>
                </div>
              
                <textarea readOnly
                 value={nameLead}
                >


                </textarea>

            <Button style={{marginTop:"50%"}}> Assig Task</Button>

              </div>
            </div>


            <div className="col-lg-8">
              <div className="card">

              <div className="container-fluid">
              <div className="card shadow mb-4">
                <DataTable
                  value={data}
                  loading={loadingData}
                  responsiveLayout="scroll"
                >
                  <Column header="ID" field="indexNumber"/>
                  <Column header="Name" field="fullname"/>
                  <Column header="Status" body={customStatus}/>
                  <Column header="Action" body={customButton} />
                </DataTable>
                <Paginator
                  // paginator
                  // template={template}
                  // first={first}
                  // rows={rows}
                  // totalRecords={totalRecords}
                  // onPageChange={onPageChange}
                  // className="p-jc-end p-my-3"
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

export default ProductDetail;