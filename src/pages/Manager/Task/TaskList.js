import React, { useState, useEffect } from "react";

import PageHeading from "../../../components/PageHeading";
// import TaskCreate from "../../Manager/Task/TaskCreate";
// import TaskUpdate from "../../../components/Modals/Task/TaskUpdate";
import ApiService from "../../../api/apiService";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Paginator } from "primereact/paginator";
import { Button  } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faClipboardList } from '@fortawesome/free-solid-svg-icons'
import { faSearch} from '@fortawesome/free-solid-svg-icons'





const TaskList = () => {
  const [data, setData] = useState([]);
  const [loadingData, setLoadingData] = useState(true);
  const [totalRecords, setTotalRecords] = useState();
  const [errMsg, setErrMsg] = useState("");
  const [first, setFirst] = useState(0);
  const [query, setQuery] = useState("");
  const [rows, setRows] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageInputTooltip, setPageInputTooltip] = useState(
    "Press 'Enter' key to go to this page."
  );



 


  async function getTaskList() {
    setLoadingData(true);

    await ApiService.getTask(currentPage, rows, query)
      .then((response) => {
        const dataRes = response.data.data
        const listDataSet = [...dataRes];
        let  counter = 10 * (currentPage-1)
        listDataSet.map((obj, index) => {
        
          obj['indexNumber'] = (counter + ++index) 
         
        })
        setTotalRecords(response.data.totalRow);
        setData(listDataSet)
        setLoadingData(false);
      })
      .catch((error) => {
        if (error.request.status=="404") {
          setErrMsg(error.request.status)
        } else if (error.request) {
      
          setErrMsg(error.request);
        } else {
          setErrMsg(error.config);
      
        }
      });
  }

  useEffect(() => {
    getTaskList();
  }, [currentPage]);

  const refreshList = () => {
    getTaskList(currentPage);
  };

  const onPageChange = (event) => {
    setFirst(event.first);
    setRows(event.rows);
    setCurrentPage(event.page + 1);
  };

  const onPageInputKeyDown = (event, options, totalPage) => {
    if (event.key === "Enter") {
      const page = parseInt(currentPage);
      if (page < 0 || page > totalPage) {
        setPageInputTooltip(`Value must be between 1 and ${totalPage}.`);
      } else {
        const first = currentPage ? options.rows * (page - 1) : 0;
        setFirst(first);
        setPageInputTooltip("Press 'Enter' key to go to this page.");
      }
    }
  };

  const onPageInputChange = (event) => {
    setCurrentPage(event.target.value);
  };

  const customStatus = (rowData) => {
    if (rowData.isDone) {
      return <div className="badge badge-success mr-2">Done</div>;
    }
    else{
      return <div className="badge badge-danger mr-2">Not Done</div>;
    }
  };

  const customButton = (rowData) => {
    return (
      <div className="row">
        {/* Detail */}
        <Link
          style={{ paddingLeft: "5%" }}
          to={{
            pathname: "/Dashboard/Manager/TaskDetail",
            state: rowData,
          }}
        >
         <Button style={{marginLeft:"10%"}}> <FontAwesomeIcon icon={faClipboardList}/></Button>
        </Link>
    
      </div>
    );
  };
  const notFound =()=>{
    return <div className="badge badge-danger mr-2">Not Found</div>;
  }
 

  const handleSearch = (e) =>{
    setQuery(e.target.value);
  
  }


  return (
    <>
      {/* New DataTable */}
      <div>
        <div className="d-sm-flex align-items-center justify-content-between mb-4">
          <PageHeading title="Task List" />
          <Link
          style={{ paddingRight: "30px" }}
          to={{
            pathname: "/Dashboard/Manager/TaskCreate",
          }}
        >
         <Button><FontAwesomeIcon icon={faPlus}/>Add</Button>
        </Link>
        </div>
        <div className="row">
       <div style={{marginBottom:20}}>
       <input onChange={handleSearch}  style={{marginLeft:850,height:40,textAlign:"center"}}className="mt-4" type="text" placeholder="Search by name" aria-label="Search"/>
       <Button type="button" style={{height:40,width:100,marginTop:-7, marginLeft:10}}
       onClick={getTaskList}
       ><FontAwesomeIcon icon={faSearch} /></Button>
       </div>
        {errMsg=="404" ? (
       <div style={{marginTop:"2%"}}id="wrapper">
       <div className="container-fluid">
         <div className="card shadow mb-1">
           <DataTable
              emptyMessage={ 
                <div style={{ textAlign: "center", fontSize: 30 }}>
                <h1 className="badge badge-danger mr-2">No Task Found</h1>
              </div>
               }
           >
           <Column header="Result" body={notFound}/>
           </DataTable>
          </div>
          </div>
          </div>
        ) : (
          <div id="wrapper">
            <div className="container-fluid">
              <div className="card shadow mb-4">
                <DataTable
                  value={data}
                  loading={loadingData}
                  responsiveLayout="scroll"
                >
                  <Column header="No" field="indexNumber" />
                  <Column header="Name Task" field="name" />
                  <Column header="Create Date" field="createDate" />
                  <Column header="Status" body={customStatus} />
                  <Column header="Action" body={customButton} />
                </DataTable>
                <Paginator
                  // paginator
                  first={first}
                  rows={rows}
                  totalRecords={totalRecords}
                  onPageChange={onPageChange}
                  className="p-jc-end p-my-3"
                />
              </div>
            </div>
          </div>
        )}
      </div>
      </div>
    </>
  );
};

export default TaskList;
