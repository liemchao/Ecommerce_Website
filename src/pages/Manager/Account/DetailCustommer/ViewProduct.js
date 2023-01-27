import React, { useState, useEffect } from "react";
import ApiService from "../../../../api/apiService";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Paginator } from "primereact/paginator";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faClipboardList} from "@fortawesome/free-solid-svg-icons";
import { Button } from "react-bootstrap";


const HistoryList = ({rowData}) => {
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


  async function getHistoryList() {
    await ApiService.getHistory(rowData.id)
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
    getHistoryList();
  }, [currentPage]);



  const refreshList = () => {
    setLoadingData(true);
    getHistoryList();
  };



//   const customRole = (rowData) => {
//     return <div className="badge badge-success mr-2">{rowData.role.roleName}</div>;
//   };


const customButton = (rowData) => {
    return (
      <div style={{ display: "flex" }}>
        {/* Detail */}
        <Link
          style={{ paddingRight: "-10%" }}
          to={{
            pathname: "/Dashboard/Manager/ProductHistory",
            rowData: rowData.product.id,
          }}
        >
          <Button><FontAwesomeIcon icon={faClipboardList} /></Button>
        </Link>
      </div>
    );
  };


  const getStatus=(rowData)=>{
  
    if (rowData.product.productStatus=="On sale") {
      return <div className="badge badge-success mr-2"> On sale</div>;
    }
    if (rowData.product.productStatus === "Not open for sale") {
      return <div className="badge badge-dark mr-2">Not open for sale</div>
    }
    if (rowData.product.productStatus === "On hold") {
      return <div className="badge badge-warning mr-2">On hold</div>
    }
    if (rowData.product.productStatus === "Deposited") {
      return <div className="badge badge-info mr-2">Deposited</div>
    }
    if (rowData.product.productStatus === "Sold") {
      return <div className="badge badge-secondary mr-2">Sold</div>
    }
  }

  const Price = (rowData) => {
  
    let num =  rowData.product.price
    return <div className="badge badge-primary mr-2">{num.toLocaleString()}</div>
    
  }
     

  const ProductName = (rowData) => {
  
    return <div className="badge badge mr-2">{rowData.product.name}</div>;
  

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

  return (
    <>
      {!data.length==0 ? (
        <div id="wrapper">
          <div className="container-fluid">
            <div className="card shadow mb-4">
              <DataTable 
                style={{overflow:"scroll",maxHeight: "31rem"}}
                value={data}
                loading={loadingData}
                responsiveLayout="scroll"
                responsive="true"
              >
                <Column style={{ width: "10%" }} header="No" field="indexNumber" />
                <Column style={{ paddingRight: 2, paddingLeft: 3, width: "19%" }} header="Product Name" body={ProductName} />
                <Column style={{paddingLeft:"6%",width: "19%" }} header="Price(VND)" body={Price}/>
                <Column  style={{paddingLeft:"6%",width: "19%" }}  header="Sale Status" body={getStatus} />
                <Column header="Action" body={customButton} />
              </DataTable>
              <Paginator
                paginator
              
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

export default HistoryList;






