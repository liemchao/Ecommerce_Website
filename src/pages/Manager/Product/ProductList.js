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


const ProductList = () => {
  const [data, setData] = useState([]);
  const [loadingData, setLoadingData] = useState(true);
  const [totalRecords, setTotalRecords] = useState();
  // const [totalPage, setTotalPage] = useState();
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
        // console.log(response);
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
      <div style={{ marginRight:"10%", display: "center" }}>
      <Link
          style={{ paddingRight: "10%" }}
          to={{
            pathname: "/Dashboard/Manager/ProductDetail",
            state: rowData,
          }}
        >
         <Button style={{marginBottom:"1%", paddingRight:"13%",marginBottom:"2%"}}>Detail</Button>
        </Link>
        <Link
         
          to={{
            pathname: "/Dashboard/Manager/ProductUpdate",
            state: rowData,
          }}
        >
            <Button  style={{ paddingRight: "10%",paddingRight:"6%", marginBottom:"2%" }}className="btn btn-success">Update
          </Button>
      </Link>
        <Button  style={{ marginRight:"10%",  paddingRight: "10%" }} className="btn btn-danger">Delete</Button>
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

  const searchProduct= () =>{
    const filterData = data.filter((value)=>{
     console.log(value);
      return (
        value.name.toLowerCase().includes(query.toLowerCase())
      )
    });
    setData(filterData);

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
       <div style={{marginLeft:"88%"}}className="d-sm-flex align-items-center justify-content-between">
        
        {/* Upload File Modal */}
        <CreateProduct refreshList={refreshList}
        
        />
        
      </div>
      <div className="row">
       <div style={{marginBottom:20}}>
       <input onChange={handleSearch}  style={{marginLeft:850,height:40,textAlign:"center"}}class="mt-4" type="text" placeholder="Search by name" aria-label="Search"/>
       <Button type="button" style={{height:40,width:100,marginTop:-7, marginLeft:10}}
       onClick={searchProduct}
       >Search</Button>
       </div>
       {!data  ? (
           <p>Data not show</p>
          
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
                  <Column header="Name" field="name"/>
                  <Column header="Category" body={getCaId} />
            
                  <Column header="Price(VND)" body={getPrice} />
                  <Column header="IsSold" body={getStatus} />
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
