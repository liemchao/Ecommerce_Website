import React, { useState, useEffect } from "react";
import AccountUpdate from "../../../components/Modals/Account/AccountUpdate";
import ApiService from "../../../api/apiService";
import { Tabs, Tab } from "react-bootstrap";

import { Link } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Paginator } from "primereact/paginator";
import { InputText } from "primereact/inputtext";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashRestore} from '@fortawesome/free-solid-svg-icons';
import { faFileMedicalAlt } from '@fortawesome/free-solid-svg-icons';
import { faBan } from '@fortawesome/free-solid-svg-icons';


const AccountAdminList = () => {
  const [data, setData] = useState([]);
  
  const [loadingData, setLoadingData] = useState(true);
  const [totalRecords, setTotalRecords] = useState();
  const [totalPage, setTotalPage] = useState();
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [show, setShow] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errMsg, setErrMsg] = useState("");
  // const [fileMsg, setFileMsg] = useState("");
  const [pageInputTooltip, setPageInputTooltip] = useState(
    "Press 'Enter' key to go to this page."
  );



 
  async function getAccountAdmin() {
    await ApiService.getAccountAdmin(currentPage, rows)
      .then((response) => {
        // check if the data is populated
        const dataRes = response.data.data
        const listDataSet = [...dataRes];
        listDataSet.map((obj, index) => {
          const count = ++index;
          obj['indexNumber'] = count

        })
        setData(listDataSet);
        setTotalRecords(response.data.totalRow);
        setLoadingData(false)
      })
      .catch((error) => {
        if (error.response) {

        } else if (error.request) {

        } else {

          console.log("Error", error.message);
        }
        console.log(error.config);
      });
  }
  

  useEffect(() => {
    setLoadingData(true);
    getAccountAdmin();
  }, [currentPage]);



  const refreshList = () => {
    setLoadingData(true);
    getAccountAdmin();
  };


  async function handleBan (e, rowData) {
    e.preventDefault();
    let confirm = window.confirm(
      "Are you sure you want to ban this account?"
    );

    if (confirm) {

      let dataupdate = {
        userId: rowData.id,
        status: 0,
        
          };
      await ApiService.updateStatusAccount(dataupdate)
        .then((response) => {
          window.alert(" Ban this account sucsseful.")
          refreshList();
        })
        .catch((e) => {
          console.log(e);
          window.alert("Can't ban this account.")
        });
    }
  };

  async function handleRetore (e, rowData) {
    e.preventDefault();
    let confirm = window.confirm(
      "Are you sure you want to restore this account?"
    );

    if (confirm) {

      let dataupdate = {
        userId: rowData.id,
        status: 1,
        
          };
      await ApiService.updateStatusAccount(dataupdate)
        .then((response) => {
          window.alert(" Restore this account sucsseful.")
          refreshList();
        })
        .catch((e) => {
          console.log(e);
          window.alert("Can't restore this account.")
        });
    }
  };



  const customRole = (rowData) => {
    return <div className="badge badge-primary mr-2">{rowData.role.roleName}</div>;
  };


  const customStatus = (rowData) => {
    if (rowData.status === "Activated") {
      // console.log(rowData.status);
      return <div className="badge badge-primary mr-2">Active</div>;
    }
    if (rowData.status === "Banned") {
      return <div className="badge badge-danger mr-2">Banned</div>;
    }
  };

  const customButton = (rowData) => {
    return (
      <>
        <div style={{ paddingRight: "5%" }}className="row">

          {/* Detail */}
          <Link
            style={{ paddingRight: "5%" }}
            to={{
              pathname: "/Dashboard/Admin/AccountDetail",
              state: rowData,
            }}
          >
            <Button><FontAwesomeIcon icon={faFileMedicalAlt}/></Button>
          </Link>
          {/* Update */}

          <AccountUpdate rowData={rowData} refreshList={refreshList} />
     
        { rowData.status === "Activated" ? (<>
          <Button style={{marginLeft:"2%"}} onClick={(e) => handleBan(e, rowData)} className="btn btn-danger"><FontAwesomeIcon icon={faBan} /></Button>
        </>):(<>
          <Button  style={{marginLeft:"2%"}} onClick={(e) => handleRetore(e, rowData)} className="btn btn-dark"><FontAwesomeIcon icon={faTrashRestore} /></Button>
         </>)

        }
           </div>
      </>
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



  const handleClose = () => setShow(false);

  const handleShow = () => {
    setErrMsg("");
    setSuccessMsg("");
    setShow(true);
  };



  const template = {
    layout: "CurrentPageReport PrevPageLink NextPageLink",
    CurrentPageReport: (options) => {
      return (
        <>
          <span
            className="p-mx-3"
            style={{ color: "var(--text-color)", userSelect: "none" }}
          >
            Go to{" "}
            <InputText
              size="2"
              className="p-ml-1"
              value={currentPage}
              tooltip={pageInputTooltip}
              onKeyDown={(e) => onPageInputKeyDown(e, options, totalPage)}
              onChange={onPageInputChange}
            />
          </span>
          <span
            style={{
              color: "var(--text-color)",
              userSelect: "none",
              width: "120px",
              textAlign: "center",
            }}
          >
            {options.first} - {options.last} of {options.totalRecords}
          </span>
        </>
      );
    },
  };
  const onPageInputChange = (event) => {
    setCurrentPage(event.target.value);
  };

  return (
    <>
              {data ? (
                <div id="wrapper">
                  <div className="container-fluid">
                    <div className="card shadow mb-4">
                      <DataTable
                        value={data}
                        loading={loadingData}
                        responsiveLayout="scroll"
                        rowHover={true}

                      >
                        <Column style={{ width: "5%" }} header="No" field="indexNumber" />
                        <Column header="Name" field="fullname" />
                        <Column style={{ paddingRight: 2, paddingLeft: 3, width: "20%" }} header="Email" field="email" />
                        <Column header="Phone" field="phone" />
                        <Column header="Role" body={customRole} />
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
              ) : (
                <p>No data to show...</p>

              )}          
    </>
  );
};

export default AccountAdminList;
