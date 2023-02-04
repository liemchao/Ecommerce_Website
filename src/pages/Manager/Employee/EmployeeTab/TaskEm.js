import React, { useState, useEffect } from "react";
import ApiService from "../../../../api/apiService";
import { Card, Button } from "react-bootstrap";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Paginator } from "primereact/paginator";

import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboardList } from '@fortawesome/free-solid-svg-icons'
const TaskEmList = ({ rowData }) => {
    const [data, setData] = useState([]);
    const [loadingData, setLoadingData] = useState(true);


    const [currentPage, setCurrentPage] = useState(1);


    async function getTaskEmList() {
        setLoadingData(true)
        await ApiService.getTaskEm(rowData.id)
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

                    setData([])
                }

            });
    }


    useEffect(() => {
        getTaskEmList();
    }, [currentPage]);

    const customStatus = (rowData) => {
        if (rowData.isDone) {
          return <div className="badge badge-success mr-2">Done</div>;
        }
        else{
          return <div className="badge badge-danger mr-2">Not Done</div>;
        }
      };
      const customButton = (rowData) => {
        return (
          <div className="row">
            {/* Detail */}
            <Link
              style={{ paddingLeft: "5%" }}
              to={{
                pathname: "/Dashboard/Manager/TaskDetail",
                state: rowData,
              }}
            >
             <Button style={{marginLeft:"-20%"}}> <FontAwesomeIcon icon={faClipboardList}/></Button>
            </Link>
            {/* <AccountUpdate rowData={rowData} refreshList={refreshList} /> */}
          </div>
        );
      };


    return (
        <>
            {!data.length == 0 ? (
                 <div id="wrapper">
                 <div className="container-fluid">
                   <div className="card shadow mb-4">
                     <DataTable 
                    style={{overflow:"scroll",maxHeight: "25rem"}}
                       value={data}
                       loading={loadingData}
                       responsiveLayout="scroll"
                       responsive="true"
                       rowHover={true}
                     >
                         <Column header="No" field="indexNumber" />
                         <Column header="Name Task" field="name" />
                         <Column header="Create Date" field="createDate" />
                         <Column header="Status" body={customStatus} />
                         <Column header="Action" body={customButton} />
                     </DataTable>
                     <Paginator
                       paginator
                     
                     />
                   </div>
                 </div>
               </div>
            ) : (
                <div style={{ textAlign: "center", fontSize: 30 }}>
                    <h1 className="badge badge-danger mr-2"> Employee has not  an task in the system</h1>
                </div>

            )}
        </>
    );
};

export default TaskEmList;






