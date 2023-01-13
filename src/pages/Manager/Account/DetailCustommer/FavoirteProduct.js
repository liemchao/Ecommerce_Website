import React, { useState, useEffect } from "react";
import ApiService from "../../../../api/apiService";
import { Button } from "react-bootstrap";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Paginator } from "primereact/paginator";



const FavoirteList = ({ rowData }) => {
    const [data, setData] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);

    const [loadingData, setLoadingData] = useState(true);


    async function getFavoirteList() {
        setLoadingData(true)
        await ApiService.getFavoirteProduct(rowData.id)
            .then((response) => {
                const dataRes = response.data.data
                const listDataSet = [...dataRes];
                listDataSet.map((obj, index) => {
                  const count = ++index;
                  obj['indexNumber'] = count
        
                })
                setData(listDataSet)

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

    useEffect(() => {
        getFavoirteList();
    }, [currentPage]);




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
                    <Column  style={{paddingLeft:"6%",width: "19%" }}  header="Status" body={getStatus} />
                    {/* <Column header="Action" body={customButton} /> */}
                  </DataTable>
                  <Paginator
                    paginator
                  
                  />
                </div>
              </div>
            </div>
            ) : (
                <div style={{ textAlign: "center", fontSize: 30 }}>
                <h1 className="badge badge-danger mr-2"> Customer has not like any product in the system</h1>
              </div>

            )}
        </>
    );
};

export default FavoirteList;






