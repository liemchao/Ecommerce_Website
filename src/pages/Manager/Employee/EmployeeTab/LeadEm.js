import React, { useState, useEffect } from "react";
import ApiService from "../../../../api/apiService";
import { Button } from "react-bootstrap";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Paginator } from "primereact/paginator";

import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboardList } from '@fortawesome/free-solid-svg-icons'

const LeadEmList = ({ rowData }) => {
    const [data, setData] = useState([]);
    const [loadingData, setLoadingData] = useState(true);

    const [currentPage, setCurrentPage] = useState(1);


    async function getLeadEmList() {
        setLoadingData(true)
        await ApiService.getLeadEm(rowData.id)
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
        getLeadEmList();
    }, [currentPage]);

    const customStatus = (rowData) => {
        if(rowData.leadStatus=="New"){
          return <div className="badge badge-warning mr-2">{rowData.leadStatus}</div>;
        }else{
          return <div className="badge badge-success mr-2">{rowData.leadStatus}</div>;
        }
      }
      const customButton = (rowData) => {
        return (
          <div className="row">
            {/* Detail */}
            <Link
              style={{ paddingLeft: "5%" }}
              to={{
                pathname: "/Dashboard/Manager/LeadDetail",
                state: rowData,
              }}
            >
             <Button style={{marginLeft:"-20%"}}> <FontAwesomeIcon icon={faClipboardList}/></Button>
            </Link>
        
          </div>
        );
      };


    return (
        <>
            {!data.length==0 ? (
                <div id="wrapper">
                <div className="container-fluid">
                  <div className="card shadow mb-4">
                  <DataTable    style={{overflow:"scroll",maxHeight: "25rem"}}
                      value={data}
                      loading={loadingData}
                      responsiveLayout="scroll"
                    >
                      <Column header="No" field="indexNumber"/>
                      <Column header="Name" field="fullname"/>
                      <Column header="Status" body={customStatus}/>
                      <Column header="Action" body={customButton} />
    
                    
                    </DataTable>
                    <Paginator
                      paginator
                      // template={template}
                    
                    />
                  </div>
                </div>
              </div>
            ) : (
                <div style={{ textAlign: "center", fontSize: 30 }}>
                <h1 className="badge badge-danger mr-2"> Employee has not an lead in the system</h1>
              </div>

            )}
        </>
    );
};

export default LeadEmList;






