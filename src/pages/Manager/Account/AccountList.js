import React, { useState, useEffect } from "react";

import PageHeading from "../../../components/PageHeading";
import ApiService from "../../../api/apiService";

import { Link } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Paginator } from "primereact/paginator";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileMedicalAlt } from '@fortawesome/free-solid-svg-icons'
import { faSearch} from '@fortawesome/free-solid-svg-icons'
import { faBan} from '@fortawesome/free-solid-svg-icons'
import { faTrashRestore} from '@fortawesome/free-solid-svg-icons'



const AccountList = () => {
  const [data, setData] = useState([]);
  const [loadingData, setLoadingData] = useState(true);
  // const [totalRecords, setTotalRecords] = useState();
  // const [totalPage, setTotalPage] = useState();
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState("");
  const [totalRecords, setTotalRecords] = useState();
  const [pageInputTooltip, setPageInputTooltip] = useState(
    "Press 'Enter' key to go to this page."
  );

  async function getAccountList() {
    setLoadingData(true);

    await ApiService.getAccountCustomer(currentPage,rows)
      .then((response) => {

        const dataRes = response.data.data
        const listDataSet = [...dataRes];
        listDataSet.map((obj, index) => {
          const count = ++ index ;
          obj['indexNumber'] = count

        })
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
        style={{ width: "100px", height: "60px" ,paddingRight:"30%"}}
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

  const customAddress = (rowData) => {
    return(
      <>
        <span
          className="d-inline-block text-truncate"
          style={{ maxWidth: 150 }}
        >
          {rowData.address}
        </span>
      </>
    );
  };

  const customStatus = (rowData) => {
    if (rowData.status=="Activated") {
      return <div className="badge badge-primary mr-2">Active</div>;
    }else 
    return <div className="badge badge-danger mr-2">Banned</div>;
    
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
      await ApiService.updateStatusCustomerAccount(dataupdate)
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
      await ApiService.updateStatusCustomerAccount(dataupdate)
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

 

  const customButton = (rowData) => {
    return (
      <div className="row">
        {/* Detail */}
        <Link
          style={{ paddingRight: "5%" }}
          to={{
            pathname: "/Dashboard/Manager/Account/AccountDetail",
            state: rowData,
          }}
        >
            <Button  style={{marginLeft:"18%"}}> <FontAwesomeIcon icon={faFileMedicalAlt} /></Button>
        </Link>
       
        { rowData.status === "Activated" ? (<>
          <Button style={{marginLeft:"2%"}} onClick={(e) => handleBan(e, rowData)} className="btn btn-danger"><FontAwesomeIcon icon={faBan} /></Button>
        </>):(<>
          <Button style={{marginLeft:"2%"}} onClick={(e) => handleRetore(e, rowData)} className="btn btn-dark"><FontAwesomeIcon icon={faTrashRestore} /></Button>
         </>)

        }
      </div>
    );
  };

  // const onPageChange = (event) => {
  //   setFirst(event.first);
  //   setRows(event.rows);
  //   setCurrentPage(event.page + 1);
  // };

  // const onPageInputKeyDown = (event, options, totalPage) => {
  //   if (event.key === "Enter") {
  //     const page = parseInt(currentPage);
  //     if (page < 0 || page > totalPage) {
  //       setPageInputTooltip(`Value must be between 1 and ${totalPage}.`);
  //     } else {
  //       const first = currentPage ? options.rows * (page - 1) : 0;
  //       setFirst(first);
  //       setPageInputTooltip("Press 'Enter' key to go to this page.");
  //     }
  //   }
  // };

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
  const onPageChange = (event) => {
    setFirst(event.first);
    setRows(event.rows);
    setCurrentPage(event.page + 1);
  };

  const handleSearch = (e) =>{
    setQuery(e.target.value);
    if(e.target.value === ""){
      refreshList();
    }

  }
  const notFound =()=>{
    return <div className="badge badge-danger mr-2">Not Found</div>;
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
          <PageHeading title="List Customer Account " />
          {/* <AccountCreate refreshList={refreshList} /> */}
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
             emptyMessage={ 
              <div style={{ textAlign: "center", fontSize: 30 }}>
              <h1 className="badge badge-danger mr-2">No Account Customer Found</h1>
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
              <div className="card shadow mb-1">
                <DataTable
                  value={data}
                  loading={loadingData}
                  responsiveLayout="scroll"
                  responsive="true"
                  rowHover={true}

                >

                 
                  <Column header="No" field="indexNumber" />
                  <Column header="Avatar" body={customImage} />
                  <Column style={{ paddingRight: 2, paddingLeft: 3, width: "16%" }} header="Name" field="fullname" />
                  <Column style={{ paddingRight: 2, paddingLeft: 3, width: "20%" }} header="Email" field="email" />
                  {/* <Column header="Address" body={customAddress} /> */}
                  <Column header="Phone" field="phone" />
                  <Column header="Status" body={customStatus} />
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
        )}
      </div>
      </div>
    </>
  );
};

export default AccountList;
