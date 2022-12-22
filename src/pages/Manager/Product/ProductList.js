import React, { useState, useEffect } from "react";

import PageHeading from "../../../components/PageHeading";
import ApiService from "../../../api/apiService";

// import { Link } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Paginator } from "primereact/paginator";
import { Button} from "react-bootstrap";
import { Link } from "react-router-dom";
import CreateProduct from "../Product/ProductCreate"
import UpdateProduct from "../Product/Updateproduct";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileMedicalAlt } from '@fortawesome/free-solid-svg-icons'
import { faTrashAlt} from '@fortawesome/free-solid-svg-icons'
import { faSearch} from '@fortawesome/free-solid-svg-icons'




const ProductList = () => {
  const [data, setData] = useState([]);
  const [errMsg, setErrMsg] = useState("");
  const [loadingData, setLoadingData] = useState(true);
  const [totalRecords, setTotalRecords] = useState();
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState("");
  const [pageInputTooltip, setPageInputTooltip] = useState(
    "Press 'Enter' key to go to this page."
  );


  async function getPublicProduct() {
    setLoadingData(true);

    await ApiService.getPublicProduct(currentPage, rows)
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
        
        } else if (error.request) {
      
          console.log(error.request);
        } else {
      
        }
        console.log(error.config);
      });
  }

  useEffect(() => {
    getPublicProduct();
  }, [currentPage]);

  const refreshList = () => {
    setLoadingData(true);
    getPublicProduct();
  };
  

  const onPageChange = (event) => {
    setFirst(event.first);
    setRows(event.rows);
    setCurrentPage(event.page + 1);
  };
  const getCaId = (rowData)=>{
    return(
       rowData.category.productCategoryName
    )

  }
  const getStatus=(rowData)=>{
  
    if (rowData.isSold) {
      // console.log(rowData.status);
      return <div className="badge badge-primary mr-2"> Not Avaliable</div>;
    }
    else{
      return <div className="badge badge-success mr-2">Avaliable</div>;
    }
  }
  const getPrice = (rowData)=>{
    return(
       rowData.price
    )
  }
  const getAddress = (rowData)=>{
    return(
       rowData.district
    )

  }

  const customButton = (rowData) => {
    return (
      <>
      <div className="row">
      <Link
          to={{
            pathname: "/Dashboard/Manager/ProductDetail",
            state: rowData,
          }}
        >
         <Button style={{marginLeft:"-20%"}}> <FontAwesomeIcon icon={faFileMedicalAlt} /></Button>
        </Link>
        <UpdateProduct rowData={rowData} refreshList={refreshList} />
        <Button  style={{marginLeft:"3%"}} className="btn btn-danger"><FontAwesomeIcon icon={faTrashAlt} /></Button>
      </div>
      </>
    );
  };
  
  const handleSearch = (e) =>{
    setQuery(e.target.value);
    if(e.target.value === ""){
      refreshList();
    }

  }

  async function searchProduct() {
    
    await ApiService.searchProduct(query)
      .then((response) => {
        // check if the data is populated
        const dataRes = response.data.data
        const listDataSet = [...dataRes];
        listDataSet.map((obj, index) => {
          const count = ++index;
          obj['indexNumber'] = count

        })
        
        setData(listDataSet);
        setLoadingData(false)
       
      })
      .catch((error) => {
        if(error.response.status == 404) {
          setData([]);
          setErrMsg(error.response.data)

        }
        // if (error.response) {
        //   faTableCellsLarge
        //   setErrMsg(error.response.data)

        // } else if (error.request) {
        //   setErrMsg(error.response.data);

        // } else {

        //   setErrMsg(error.response.data);
        // }
        // setErrMsg(error.response.data);
      });
  }
  

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

  const onPageInputChange = (event) => {
    setCurrentPage(event.target.value);
  };
  const notFound =()=>{
    return <div className="badge badge-danger mr-2">Not Found</div>;
  }

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
            {/* <InputText
              size="2"
              className="p-ml-1"
              value={currentPage}
              tooltip={pageInputTooltip}
              onKeyDown={(e) => onPageInputKeyDown(e, options, totalPage)}
              onChange={onPageInputChange}
            /> */}
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

  return (
    <>
      {/* New DataTable */}
      <div>
       <PageHeading title="Product List" />
       <div style={{marginLeft:"85%", paddingLeft:"5%"}}className="d-sm-flex align-items-center justify-content-between">
        
        {/* Upload File Modal */}
        <CreateProduct refreshList={refreshList}
        
        />
        
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
                  <Column header="ID" field="indexNumber"/>
                  <Column style={{ paddingRight:"4%", width: "25%" }} header="Name" field="name"/>
                  <Column header="Category" body={getCaId} />
            
                  <Column header="Price(VND)" body={getPrice} />
                  <Column header="Sold" body={getStatus} />
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

export default ProductList;
