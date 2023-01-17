import React, { useState, useEffect } from "react";

import PageHeading from "../../../components/PageHeading";
import ApiService from "../../../api/apiService";
import { CSVLink} from 'react-csv';

import { Link } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Paginator } from "primereact/paginator";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboardList } from '@fortawesome/free-solid-svg-icons'
import { faSearch} from '@fortawesome/free-solid-svg-icons'
import { faDownload } from '@fortawesome/free-solid-svg-icons'


const LeadList = () => {
  const [data, setData] = useState([]);
  const [loadingData, setLoadingData] = useState(true);
  const [totalRecords, setTotalRecords] = useState();
  const [query, setQuery] = useState("");
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState("");
  const [pageInputTooltip, setPageInputTooltip] = useState(
    "Press 'Enter' key to go to this page."
  );

  async function getOpportunity() {
    setLoadingData(true);

    ApiService.getOpportunity( currentPage,rows)
      .then((response) => {
        const dataRes = response.data.data
        const listDataSet = [...dataRes];
        let  counter = 5 * (currentPage-1)
        listDataSet.map((obj, index) => {
        
          obj['indexNumber'] = (counter + ++index) 
         
        })
        setTotalRecords(response.data.totalRow);

        setData(listDataSet);

      
        setLoadingData(false);
      })
      .catch((error) => {
        if (error.response) {
          setError(error.response)
        } else if (error.request) {
          setError(error.request)
         
        } else {
         
        }
        setError(error)
      });
  }

  useEffect(() => {
    getOpportunity();
  }, [currentPage]);

  const refreshList = () => {
    getOpportunity();
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
              pathname: "/Dashboard/Manager/OpportunityDetail",
              state: rowData,
            }}
          >
           <Button style={{marginLeft:"10%"}}> <FontAwesomeIcon icon={faClipboardList}/></Button>
          </Link>
          {/* <AccountUpdate rowData={rowData} refreshList={refreshList} /> */}
        </div>
      );
    };

  const customStatus = (rowData) => {
    if(rowData.opportunityStatus=="New"){
      return <div className="badge badge-warning mr-2">{rowData.opportunityStatus}</div>;
    }else{
      return <div className="badge badge-success mr-2">{rowData.opportunityStatus}</div>;
    }
  }
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
  const handleSearch = (e) =>{
    setQuery(e.target.value);
    if(e.target.value === ""){
      refreshList();
    }

  }

  const dealValue = (rowData)=>{
    
    let num = rowData.listedPrice
    return(
      <p className="badge badge-primary mr-2">{num.toLocaleString()}</p>
    )
  }

  const searchProduct= () =>{
    const filterData = data.filter((value)=>{
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
          <PageHeading title="Opportunity List" />
          {/* <Button
    style={{ margin:0,float: "right"}}
    className="btn btn-primary" 
>  Generate Excel</Button> */}
<CSVLink   style={{ margin:0,float: "right"}}  data={data} filename="Opportunity"  className="btn btn-primary"><FontAwesomeIcon icon={faDownload} />Generate Excel</CSVLink>
          {/* <CreateProduct refreshList={refreshList}/> */}
        </div> 
        <div className="row">
       <div style={{marginBottom:10, marginTop:"-2%", marginLeft:"62%"}}>
       <input onChange={handleSearch}  style={{height:40,textAlign:"center"}}className="mt-4" type="text" placeholder="Search by name" aria-label="Search"/>
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
           <h1 className="badge badge-danger mr-2">No Opportunity Found</h1>
         </div>
          }
           >
           <Column header="Result" body={notFound}/>
           </DataTable>
          </div>
          </div>
          </div>
        ): (
          <div id="wrapper">
            <div className="container-fluid">
              <div className="card shadow mb-4">
              <DataTable
                  value={data}
                  loading={loadingData}
                  responsiveLayout="scroll"
                  rowHover={true}
                  
                >
                  <Column header="No" field="indexNumber"/>
                  <Column header="Name" field="name"/>
                  <Column header="Description" field="description"/>
                  <Column header="Deal Value" body={dealValue}/>
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

export default LeadList;
