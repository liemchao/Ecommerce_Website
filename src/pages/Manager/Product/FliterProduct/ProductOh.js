import React, { useState, useEffect } from "react";
import ApiService from "../../../../api/apiService";
import { Link } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Paginator } from "primereact/paginator";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UpdateProduct from "../Updateproduct";
import { faFileMedicalAlt } from '@fortawesome/free-solid-svg-icons'
import { faTrashAlt} from '@fortawesome/free-solid-svg-icons'


const ProductOhList = () => {
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




    async function getProductOhList() {
        await ApiService.getProductOh(currentPage, rows)
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
        getProductOhList();
    }, [currentPage]);



    const refreshList = () => {
        setLoadingData(true);
        getProductOhList();
    };

    async function handleDelete (e, rowData) {
        e.preventDefault();
        let confirm = window.confirm(
          "Are you sure you want to delete this Product?"
        );
    
        if (confirm) {
          console.log(rowData.id)
          await ApiService.deleteProduct(rowData.id)
            .then((response) => {
              window.alert(" Delete this Product sucsseful.")
              refreshList();
            })
            .catch((e) => {
              console.log(e);
              window.alert("Can't delete this Product.")
            });
        }
      };

    const getCaId = (rowData)=>{
        return(
           rowData.category.productCategoryName
        )
    
      }


      const getAddress = (rowData)=>{
        return(
          <div className="auto">{rowData.street}/{rowData.district}/{rowData.province}</div>
        )
    
      }
      const getPrice = (rowData)=>{
        let num = rowData.price
        return(
           num.toLocaleString()
        )
      }
      const getStatus=(rowData)=>{
  
        if (rowData.productStatus === "On hold") {
            return <div className="badge badge-warning mr-2">On hold</div>
          }
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
               <Button style={{marginLeft:"-20%"}}> <FontAwesomeIcon icon={faFileMedicalAlt} color="primary"/></Button>
              </Link>
              <UpdateProduct rowData={rowData} refreshList={refreshList} />
              <Button onClick={(e) => handleDelete(e, rowData)} style={{marginLeft:"3%"}} className="btn btn-danger"><FontAwesomeIcon icon={faTrashAlt} /></Button>
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


    const onPageInputChange = (event) => {
        setCurrentPage(event.target.value);
    };
    const notFound =()=>{
        return <div className="badge badge-danger mr-2">Not Found</div>;
      }

    return (
        <>
           {data.length == 0 ? (
                <div id="wrapper">
                    <div className="container-fluid">
                        <div className="card shadow mb-4">
                            <DataTable
                              emptyMessage="No Product Found."
                            >
                                <Column header="Result" body={notFound} />
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
                                emptyMessage="No Product Found."
                            >
                                <Column style={{ width: "5%" }} header="No" field="indexNumber" />
                                <Column style={{ width: "20%" }} header="Name" field="name"  sortable/>
                                <Column header="Category" body={getCaId} />
                                {/* <Column header="Image" body={customImage} /> */}
                                <Column style={{ width: "22%", header: "center" }} header="Address" body={getAddress} />
                                <Column style={{ width: "12%" }} header="Price(VND)" body={getPrice} />
                                <Column header="Status" body={getStatus} />
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
        </>
    );
};

export default ProductOhList;
