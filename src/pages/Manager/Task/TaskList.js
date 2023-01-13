import React, { useState, useEffect } from "react";

import PageHeading from "../../../components/PageHeading";
// import TaskCreate from "../../Manager/Task/TaskCreate";
// import TaskUpdate from "../../../components/Modals/Task/TaskUpdate";
import AccountUpdate from "../../../components/Modals/Account/AccountUpdate";
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
  const [names, setNames] = useState([]);

  const [loadingData, setLoadingData] = useState(true);
  const [totalRecords, setTotalRecords] = useState();
  const [totalPage, setTotalPage] = useState();
  const [first, setFirst] = useState(0);
  const [query, setQuery] = useState(0);
  const [rows, setRows] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageInputTooltip, setPageInputTooltip] = useState(
    "Press 'Enter' key to go to this page."
  );



 


  async function getTaskList() {
    setLoadingData(true);

    await ApiService.getTask(currentPage,rows)
      .then((response) => {
        const dataRes = response.data.data
        const listDataSet = [...dataRes];
        listDataSet.map((obj, index) => {
          const count = ++ index ;
          obj['indexNumber'] = count
        })
        setTotalRecords(response.data.totalRow);
        setData(listDataSet)
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
         <Button style={{marginLeft:"-20%"}}> <FontAwesomeIcon icon={faClipboardList}/></Button>
        </Link>
        <AccountUpdate rowData={rowData} refreshList={refreshList} />
      </div>
    );
  };
  const notFound =()=>{
    return <div className="badge badge-danger mr-2">Not Found</div>;
  }
 
  // const template = {
  //   layout: "CurrentPageReport PrevPageLink NextPageLink",
  //   CurrentPageReport: (options) => {
  //     return (
  //       <>
  //         <span
  //           className="p-mx-3"
  //           style={{ color: "var(--text-color)", userSelect: "none" }}
  //         >
  //           Go to{" "}
  //           <InputText
  //             size="2"
  //             className="p-ml-1"
  //             value={currentPage}
  //             tooltip={pageInputTooltip}
  //             onKeyDown={(e) => onPageInputKeyDown(e, options, totalPage)}
  //             onChange={onPageInputChange}
  //           />
  //         </span>
  //         <span
  //           style={{
  //             color: "var(--text-color)",
  //             userSelect: "none",
  //             width: "120px",
  //             textAlign: "center",
  //           }}
  //         >
  //           {options.first} - {options.last} of {options.totalRecords}
  //         </span>
  //       </>
  //     );
  //   },
  // };  

  // const handleDelete = (e, rowData) => {
  //   e.preventDefault();
  //   let confirm = window.confirm(
  //     "Are you sure you want to delete this Task?"
  //   );

  //   if (confirm) {
  //     ApiService.deletePayments(rowData)
  //       .then((response) => {
  //         console.log(response.data);
  //         refreshList();
  //       })
  //       .catch((e) => {
  //         window.alert(e.message);
  //       });
  //   }
  // };
  const handleSearch = (e) =>{
    setQuery(e.target.value);
    if(e.target.value === ""){
      refreshList();
    }

  }
  const searchProduct= () =>{
    const filterData = data.filter((value)=>{
     console.log(value);
      return (
        value.name.toLowerCase().includes(query.toLowerCase())
      )
    });
    setData(filterData);

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
       onClick={searchProduct}
       ><FontAwesomeIcon icon={faSearch} /></Button>
       </div>
        {data.length==0 ? (
       <div style={{marginTop:"2%"}}id="wrapper">
       <div className="container-fluid">
         <div className="card shadow mb-1">
           <DataTable
           emptyMessage="No Task Found."
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
