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
  const [totalPage, setTotalPage] = useState();
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageInputTooltip, setPageInputTooltip] = useState(
    "Press 'Enter' key to go to this page."
  );

  async function getPublicProduct() {
    setLoadingData(true);

    ApiService.getPublicProduct()
      .then((response) => {
        // console.log(response);
        const dataRes = response.data.data
        const listDataSet = [...dataRes];
        listDataSet.map((obj, index) => {
          const count = ++ index ;
          obj['indexNumber'] = count

        })
       

        setData(listDataSet);
        console.log(listDataSet);
        // console.log(toString(listDataSet.productImages.url));
        // setTotalPage(response.data.totalPage);
        // setTotalRecords(response.data.totalEle);
        // you tell it that you had the result
        setLoadingData(false);
      })
      .catch((error) => {
        if (error.response) {
          // get response with a status code not in range 2xx
          // console.log(error.response.data.data);
          // console.log(error.response.data.status);
          // console.log(error.response.data.headers);
        } else if (error.request) {
          // no response
          console.log(error.request);
        } else {
          // Something wrong in setting up the request
          // console.log("Error", error.message);
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
      return <div className="badge badge-primary mr-2">Avaliable</div>;
    }
    else{
      return <div className="badge badge-danger mr-2">Inactive</div>;
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
      <div style={{ display: "center" }}>
      <Link
          style={{ paddingRight: "10px" }}
          to={{
            pathname: "/Dashboard/Manager/ProductDetail",
            state: rowData,
          }}
        >
         <Button>Detail</Button>
        </Link>
        <Link
          style={{ paddingRight: "10px" }}
          to={{
            pathname: "/Dashboard/Manager/ProductUpdate",
            state: rowData,
          }}
        >
            <Button  style={{margin:2, paddingLeft :3} } className="btn btn-success">Update
          </Button>
      </Link>
        <Button className="btn btn-danger">Delete</Button>
      </div>
      </>
    );
  };
  const customImage = (rowData) => {
    return (
      <img
        style={{ width: "100px", height: "60px" }}
        src={rowData.productImages[1].url}
        alt="product-image"
        className="img-fluid"
        onError={(e) =>
          (e.target.src =
            "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png")
        }
      />
    );
  };
  

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
        <div className="d-sm-flex align-items-center justify-content-between mb-4">
          <PageHeading title="Product List" />
          <CreateProduct  refreshList={refreshList} 
          />
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
                  <Column header="ID" field="indexNumber"/>
                  <Column header="Name" field="name"/>
                  <Column header="Category" body={getCaId} />
                  <Column header="Image" body={customImage} />
                  <Column header="Address" body={getAddress} />
                  <Column header="Price(VND)" body={getPrice} />
                  <Column header="IsSold" body={getStatus} />
                  <Column header="Action" body={customButton} />

                  {/* <Column header="Cate" field="s" />
                  <Column header="Name" field="d" />
                  <Column header="Name" field="c" />
                  <Column header="Name" field="d" />
                  <Column header="Status" body="d" /> */}
                </DataTable>
                <Paginator
                  // paginator
                  // template={template}
                  // first={first}
                  // rows={rows}
                  // totalRecords={totalRecords}
                  // onPageChange={onPageChange}
                  // className="p-jc-end p-my-3"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ProductList;
