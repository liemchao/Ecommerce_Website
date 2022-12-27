import React, { useState, useEffect } from "react";

import PageHeading from "../../../components/PageHeading";
import ApiService from "../../../api/apiService";

import { Link } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Paginator } from "primereact/paginator";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboardList } from '@fortawesome/free-solid-svg-icons'
import AccountUpdate from "../../../components/Modals/Account/AccountUpdate";
import CreateProduct from "../Product/ProductCreate"
import { faSearch} from '@fortawesome/free-solid-svg-icons'
import { faStar } from '@fortawesome/free-solid-svg-icons'




const FeedBackList = () => {
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

  async function getFeedBackList() {
    setLoadingData(true);

    ApiService.getFeedBack( currentPage,rows)
      .then((response) => {
        const dataRes = response.data.data
        const listDataSet = [...dataRes];
        listDataSet.map((obj, index) => {
          const count = ++ index ;
          obj['indexNumber'] = count

        })
        // setTotalRecords(response.totalRow);
        setTotalRecords(response.data.totalRow);
        console.log(totalRecords)

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

  useEffect(() => {
    getFeedBackList();
  }, [currentPage]);

  const refreshList = () => {
    getFeedBackList();
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

  const customButton = (rowData) => {
      return (
        <div className="row">
          {/* Detail */}
          <Link
            style={{ paddingLeft: "5%" }}
            to={{
              pathname: "/Dashboard/Manager/LeadDetail",
              state: rowData,
            }}
          >
           <Button style={{marginLeft:"-20%"}}> <FontAwesomeIcon icon={faClipboardList}/></Button>
          </Link>
          <AccountUpdate rowData={rowData} refreshList={refreshList} />
        </div>
      );
    };

  const customStatus = (rowData) => {
    if(rowData.appointment.appointmentStatus=="Finished"){
      return <div className="badge badge-primary mr-2">Avaliable</div>;
    }else{
      return <div className="badge badge-success mr-2">Not Avaliable</div>;
    }
  }


  const customerName = (rowData) => {

   return <p>{rowData.customer.fullname}</p>;
      
  }
  const EmployeeName = (rowData) => {

    return <p>{rowData.appointment.fullname}</p>;
       
   }
   const Rate = (rowData) => {
   
      return  <FontAwesomeIcon icon={faStar} color="Blue"/>
    
       
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
          <PageHeading title="FeedBack List" />
          <CreateProduct refreshList={refreshList}/>
        </div> 
        <div className="row">
       <div style={{marginBottom:20}}>
       <input onChange={handleSearch}  style={{marginLeft:850,height:40,textAlign:"center"}}className="mt-4" type="text" placeholder="Search by name" aria-label="Search"/>
       <Button type="button" style={{height:40,width:100,marginTop:-7, marginLeft:10}}
       onClick={searchProduct}
       ><FontAwesomeIcon icon={faSearch} /></Button>
       </div>
        {!data ? (
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
                  <Column header="No" field="indexNumber"/>
                  <Column header="Name Customer" body={customerName}/>
                  <Column header="Name Employee" body={EmployeeName}/>
                  <Column style={{ width: "19%" }} header="Time Revice" field="feedbackDate"/>
                  <Column header="Content" field="content"/>
                  <Column header="Rate" body={Rate}/>
                  <Column header="Status" body={customStatus}/>
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

export default FeedBackList;
