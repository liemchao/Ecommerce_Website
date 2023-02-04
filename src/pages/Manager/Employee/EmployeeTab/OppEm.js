import React, { useState, useEffect } from "react";
import ApiService from "../../../../api/apiService";
import { Card ,Button } from "react-bootstrap";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Paginator } from "primereact/paginator";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboardList } from '@fortawesome/free-solid-svg-icons'



const OpportunityEmList = ({ rowData }) => {
    const [loadingData, setLoadingData] = useState(true);

    const [data, setData] = useState([]);

    const [totalRecords, setTotalRecords] = useState();


    const [currentPage, setCurrentPage] = useState(1);


    async function getLeadOpportunity() {
      
        setLoadingData(true)

        await ApiService.getOppEm(rowData.id)
            .then((response) => {

                const dataRes = response.data.data
                const listDataSet = [...dataRes];
                let  counter = 10 * (currentPage-1)
                listDataSet.map((obj, index) => {
                
                  obj['indexNumber'] = (counter + ++index) 
                 
                })
                setData(listDataSet);
                setTotalRecords(response.data.totalRow);

              setLoadingData(false)

            })
            .catch((error) => {
                if (error.response) {

                    setData([])
                }

            });
    }



    const customButton = (rowData) => {
        return (
          <div className="row">
            {/* Detail */}
            <Link
              style={{ paddingLeft: "5%" }}
              to={{
                pathname: "/Dashboard/Manager/OpportunityDetail",
                state: rowData,
              }}
            >
             <Button style={{marginLeft:"-20%"}}> <FontAwesomeIcon icon={faClipboardList}/></Button>
            </Link>
          </div>
        );
      };
  
    const customStatus = (rowData) => {
      if(rowData.opportunityStatus=="New"){
        return <div className="badge badge-primary mr-2">{rowData.opportunityStatus}</div>;
      }
      if(rowData.opportunityStatus=="Lost"){
        return <div className="badge badge-danger mr-2">{rowData.opportunityStatus}</div>;
      }
      if(rowData.opportunityStatus=="Reservations"){
        return <div className="badge badge-info mr-2">{rowData.opportunityStatus}</div>;
      }
      if(rowData.opportunityStatus=="Under review"){
        return <div className="badge badge-success mr-2">{rowData.opportunityStatus}</div>;
      }
      
      else{
        return <div className="badge badge-warning mr-2">{rowData.opportunityStatus}</div>;
      }
    }

    useEffect(() => {
        getLeadOpportunity();
    }, [currentPage]);

    const dealValue = (rowData)=>{
    
        let num = rowData.listedPrice
        return(
          <p className="badge badge-primary mr-2">{num.toLocaleString()}</p> 
        )
      }


    return (
        <>
            {!data.length == 0 ? (
                <div id="wrapper" style={{ overflow: "scroll", maxHeight: "31rem" }}>
                    <div className="container-fluid">
                        <DataTable
                            value={data}
                            loading={loadingData}
                            responsiveLayout="scroll"
                            rowHover={true}

                        >
                            <Column header="No" field="indexNumber" />
                            <Column header="Name" field="name" />
                            <Column header="Description" field="description" />
                            <Column header="Deal Value" body={dealValue} />
                            <Column header="Status" body={customStatus} />
                            <Column header="Action" body={customButton} />
                        </DataTable>
                        <Paginator
                           paginator>

                           </Paginator>
                    </div>
                </div>
            ) : (
                <div style={{ textAlign: "center", fontSize: 30 }}>
                    <h1 className="badge badge-danger mr-2"> Customer has not an opportunity in the system</h1>
                </div>

            )}
        </>
    );
};

export default OpportunityEmList;






