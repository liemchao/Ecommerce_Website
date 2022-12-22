import React, { useState, useEffect } from "react";

import PageHeading from "../../../components/PageHeading";
import AccountCreate from "../../../components/Modals/Account/AccountCreate";
import AccountUpdate from "../../../components/Modals/Account/AccountUpdate";
import ApiService from "../../../api/apiService";

import { Link } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Paginator } from "primereact/paginator";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileMedicalAlt } from '@fortawesome/free-solid-svg-icons'
import { faTrashAlt} from '@fortawesome/free-solid-svg-icons'
import { faSearch} from '@fortawesome/free-solid-svg-icons'


const AccountList = () => {
  const [data, setData] = useState([]);
  const [loadingData, setLoadingData] = useState(true);
  const [totalRecords, setTotalRecords] = useState();
  const [query, setQuery] = useState("");
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageInputTooltip, setPageInputTooltip] = useState(
    "Press 'Enter' key to go to this page."
  );

  async function getAccountList() {
    setLoadingData(true);

    await ApiService.getAccountEmployee(currentPage, rows)
      .then((response) => {

        const dataRes = response.data.data
        const listDataSet = [...dataRes];
        listDataSet.map((obj, index) => {
          const count = ++ index ;
          obj['indexNumber'] = count

        })
        // setTotalRecords(response.totalRow);
        setTotalRecords(response.data.totalRow);

        setData(listDataSet);
        // setTotalPage(response.data.totalPage);
        // setTotalRecords(response.data.totalEle);
        // you tell it that you had the result
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
    getAccountList();
  }, [currentPage]);

  const refreshList = () => {
    getAccountList();
  };

  const customImage = (rowData) => {
    return (
      <img
        style={{ width: "100px", height: "60px" }}
        src={rowData.image}
        alt="user-image"
        className="img-fluid"
        onError={(e) =>
          (e.target.src =
            "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png")
        }
      />
    );
  };


  const customStatus = (rowData) => {
    if (rowData.status==="Activated") {
      return <div className="badge badge-primary mr-2">Active</div>;
    }
    if (rowData.status==="Banned") {
      return <div className="badge badge-danger mr-2">Banned</div>;
    }
  };

  const customButton = (rowData) => {
    return (
      <div className="row">
        {/* Detail */}
        <Link style={{ paddingRight: "5%" }}
          to={{
            pathname: "/Dashboard/Manager/Employee/AccountDetail",
            state: rowData,
          }}
        >
            <Button style={{marginLeft:"-20%"}}> <FontAwesomeIcon icon={faFileMedicalAlt} /></Button>
        </Link>
        {/* Update */}
        <AccountUpdate rowData={rowData} refreshList={refreshList} />
        <Button  style={{marginLeft:"3%"}} className="btn btn-danger"><FontAwesomeIcon icon={faTrashAlt} /></Button>
      </div>
    );
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

  // const onPageInputChange = (event) => {
  //   setCurrentPage(event.target.value);
  // };

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
        value.fullname.toLowerCase().includes(query.toLowerCase())
      )
    });
    setData(filterData);

  }

  return (
    <>
      {/* New DataTable */}
      <div>
        <div className="d-sm-flex align-items-center justify-content-between mb-4">
          <PageHeading title="List Account Employee" />
          {/* <AccountCreate refreshList={refreshList} /> */}
        </div>
        <div className="row">
       <div style={{marginBottom:20}}>
       <input onChange={handleSearch}  style={{marginLeft:850,height:40,textAlign:"center"}}className="mt-4" type="text" placeholder="Search by name" aria-label="Search"/>
       <Button type="button" style={{height:40,width:100,marginTop:-7, marginLeft:10}}
       onClick={searchProduct}
       ><FontAwesomeIcon icon={faSearch} /></Button>
       </div>
        {!data && data.role=="employee"? (
          <p>No data to show...</p>
        ) : (
          <div id="wrapper">
            <div className="container-fluid">
              <div className="card shadow mb-4">
                <DataTable
                  value={data}
                  loading={loadingData}
                  responsiveLayout="scroll"
                >

                 
                  <Column header="ID" field="indexNumber" />
                  <Column header="Avatar" body={customImage} />
                  <Column header="Name" field="fullname" />
                  <Column style={{ paddingRight: 2, paddingLeft: 3, width: "20%" }} header="Email" field="email" />
                  {/* <Column header="Address" body={customAddress} /> */}
                  <Column header="Phone" field="phone" />
                  <Column header="Status" body={customStatus} />
                  <Column header="Action" body={customButton} />
                </DataTable>
                <Paginator
                  paginator
                  // template={template}
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

export default AccountList;
