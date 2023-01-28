import React, { useState, useEffect } from "react";
import PageHeading from "../../../components/PageHeading";
import ApiService from "../../../api/apiService";

// import { Link } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Paginator } from "primereact/paginator";
import { Button} from "react-bootstrap";
import { Link } from "react-router-dom";
import CreateProduct from "../ProductOwer/ProductOwerCreate"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileMedicalAlt } from '@fortawesome/free-solid-svg-icons'
import { faTrashAlt} from '@fortawesome/free-solid-svg-icons'
import { faSearch} from '@fortawesome/free-solid-svg-icons'
import { faTrashRestore} from '@fortawesome/free-solid-svg-icons'
import ProductOwerUpdate from "./ProductOwerUpdate";


const ProductOwerList = () => {
  const [data, setData] = useState([]);
  const [loadingData, setLoadingData] = useState(true);
  const [totalRecords, setTotalRecords] = useState();
  const [errMsg, setErrMsg] = useState("");
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState("");


  async function getProductOwer() {
    setLoadingData(true);

    ApiService.getProductOwer(currentPage,rows,query)
      .then((response) => {
        // console.log(response);
        const dataRes = response.data.data
        const listDataSet = [...dataRes];
        let  counter = 10 * (currentPage-1)
        listDataSet.map((obj, index) => { 
          obj['indexNumber'] = (counter + ++index) 
        })
       
        setTotalRecords(response.data.totalRow);
        setData(listDataSet);
    
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
    getProductOwer();
  }, [currentPage]);

  const refreshList = () => {
    setLoadingData(true);
    getProductOwer();
  };
  

  const onPageChange = (event) => {
    setFirst(event.first);
    setRows(event.rows);
    setCurrentPage(event.page + 1);
  };

  async function handleDelete (e, rowData) {
    e.preventDefault();
    let confirm = window.confirm(
      "Are you sure you want to delete this Product Ower?"
    );

    if (confirm) {
      await ApiService.deleteProductOwer(rowData.id)
        .then((response) => {
          window.alert(" Delete this Product Ower sucsseful.")
          refreshList();
        })
        .catch((e) => {
         
          window.alert("Can't delete this Product.")
        });
    }
  };

  async function handleRestone (e, rowData) {
    e.preventDefault();
    let confirm = window.confirm(
      "Are you sure you want to restore this Product Ower?"
    );

    if (confirm) {
     
      await ApiService.deleteProductOwer(rowData.id)
        .then((response) => {
          window.alert(" Restore this Product Ower sucsseful.")
          refreshList();
        })
        .catch((e) => {
          window.alert("Can't restore this Product Ower.")
        });
    }
  };
  
  const getStatus=(rowData)=>{
  
    if (rowData.isDelete) {
  
      return <div className="badge badge-danger mr-2">True</div>;
    }
    else{
      return <div className="badge badge-dark mr-2">False</div>;
    }
  }
  
  const getValue= (rowData) =>{
    return <div className="badge badge-info mr-2">{rowData.totalProduct}</div>;

  }
  const notFound =()=>{
    return <div className="badge badge-danger mr-2">Not Found</div>;
  }

  const customButton = (rowData) => {
    return (
      <>
      <div className="row">
      <Link
          to={{
            pathname: "/Dashboard/Manager/ProductOwerDetail",
            state: rowData,
          }}
        >
         <Button style={{marginLeft:"-20%"}}><FontAwesomeIcon icon={faFileMedicalAlt}/></Button>
        </Link>
        <ProductOwerUpdate rowData={rowData} refreshList={refreshList} />
        { rowData.isDelete ? (<>
          <Button style={{marginLeft:"2%"}} onClick={(e) => handleRestone(e, rowData)} className="btn btn-dark"><FontAwesomeIcon icon={faTrashRestore} /></Button>
        </>):(<>
          <Button style={{marginLeft:"2%"}} onClick={(e) => handleDelete(e, rowData)} className="btn btn-danger"><FontAwesomeIcon icon={faTrashAlt} /></Button>
         </>)

        }
     
        {/* Detail */}
        {/* <Link
          style={{ paddingRight: "10px" }}
          to={{
            pathname: "/Dashboard/Admin/AccountDetail",
            state: rowData,
          }}
        >
         <Button style={{ marginLeft: "-30px" }}>Detail</Button>
        </Link> */}
        {/* Update */}
        
        {/* <AccountUpdate rowData={rowData} refreshList={refreshList} /> */}
      </div>
      </>
    );
  };

  

 
  const handleSearch = (e) =>{
    setQuery(e.target.value); 
  }


  return (
    <>
      {/* New DataTable */}
      <div>
        <div className="d-sm-flex align-items-center justify-content-between mb-4">
          <PageHeading title="Product Ower List" />
          <CreateProduct  refreshList={refreshList} 
          />
        </div>
        <div className="row">
       <div style={{marginBottom:20}}>
       <input onChange={handleSearch}  style={{marginLeft:850,height:40,textAlign:"center"}}className="mt-4" type="text" placeholder="Search by name" aria-label="Search"/>
       <Button type="button" style={{height:40,width:100,marginTop:-7, marginLeft:10}}
       onClick={getProductOwer}
       ><FontAwesomeIcon icon={faSearch}/></Button>
       </div>
        {errMsg=="404" ? (
          <div style={{marginTop:"2%"}}id="wrapper">
          <div className="container-fluid">
            <div className="card shadow mb-1">
              <DataTable
              emptyMessage={ 
                <div style={{ textAlign: "center", fontSize: 30 }}>
                <h1 className="badge badge-danger mr-2">No Product Ower Found</h1>
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
                  <Column style={{width: "6%" }} header="No" field="indexNumber"/>
                  <Column style={{width: "18%" }} header="Name"  field="productOwnerName"/>
                  <Column header="Phone"  field="phone"/>
                  <Column style={{width: "22%" }} header="Email"  field="email"/>
                  <Column style={{textAlign:"center"}}header="Total Product"  body={getValue}/>
                  <Column style={{textAlign:"center"}} header="Delete Status" body={getStatus} />
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

export default ProductOwerList;
