import React, { useState, useEffect } from "react";
import ApiService from "../../../../api/apiService";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Paginator } from "primereact/paginator";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboardList } from "@fortawesome/free-solid-svg-icons";
import { Button } from "react-bootstrap";


const ProductNumList = ({ rowData }) => {
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


    async function getProductOwerList() {
        console.log(rowData.id)
        await ApiService.getNumProductbyOwer(rowData.id)
            .then((response) => {

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
        getProductOwerList();
    }, [currentPage]);



    const refreshList = () => {
        setLoadingData(true);
        getProductOwerList();
    };






    const customButton = (productData) => {
        return (
            <div style={{ display: "flex" }}>
                {/* Detail */}
                <Link
                    style={{ paddingRight: "-10%" }}
                    to={{
                        pathname: "/Dashboard/Manager/ProductInfo",
                        state: productData,
                    }}
                >
                    <Button><FontAwesomeIcon icon={faClipboardList} /></Button>
                </Link>
            </div>
        );
    };


    const customStatus = (data) => {
        if (data.isFavorite) {
            return <div className="badge badge-success mr-2"> Favorite</div>;
        }
        else {
            return <div className="badge badge-warning mr-2">Not Favorite</div>;
        }
    };
    const Price = (data) => {

        return <div className="badge badge-primary mr-2"> {data.price.toLocaleString()}</div>;


    };
    const ProductName = (data) => {

        return <div className="badge badge mr-2">{data.name}</div>;


    };





    const onPageChange = (event) => {
        setFirst(event.first);
        setRows(event.rows);
        setCurrentPage(event.page + 1);
    };
    const notFound =()=>{
        return <div className="badge badge-danger mr-2">Not Found</div>;
      }

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
            {data.length == 0 ? (
          <div style={{ textAlign: "center", fontSize: 30 }}>
          <h1 className="badge badge-danger mr-2"> Ower has not an product in the system</h1>
        </div>

            ) : (
                <div id="wrapper">
                    <div className="container-fluid">
                        <div className="card shadow mb-4">
                            <DataTable
                                style={{ overflow: "scroll", maxHeight: "31rem" }}
                                value={data}
                                loading={loadingData}
                                responsiveLayout="scroll"
                                responsive="true"
                            >
                                <Column style={{ width: "10%" }} header="No" field="indexNumber" />
                                <Column style={{ paddingRight: 2, paddingLeft: 3, width: "19%" }} header="Product Name" body={ProductName} />
                                <Column style={{ paddingLeft: "6%" }} header="Price(VND)" body={Price} />
                                <Column header="Favorite" body={customStatus} />
                                <Column header="Action" body={customButton} />
                            </DataTable>
                            <Paginator
                                paginator

                            />
                        </div>
                    </div>
                </div>

            )}
        </>
    );
};

export default ProductNumList;






