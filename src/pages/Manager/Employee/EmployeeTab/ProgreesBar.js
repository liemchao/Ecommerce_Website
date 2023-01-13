import React, { useState, useEffect } from "react";
import ApiService from "../../../../api/apiService";
import ProgressBar from 'react-bootstrap/ProgressBar';

import PageHeading from "../../../../components/PageHeading";

// import { DataTable } from "primereact/datatable";
// import { Column } from "primereact/column";
// import { Paginator } from "primereact/paginator";
const Progressbar = ({ rowData }) => {
    const [data, setData] = useState([]);
    

    // const [currentPage, setCurrentPage] = useState(1);


    // async function getEmoloyeeOpportunity() {
    //     await ApiService.getOppEm(rowData.id)
    //         .then((response) => {
    //             setData(response.data.data);
    //         })
    //         .catch((error) => {
    //             if (error.response) {
                    
    //                 setData([])
    //             }
               
    //         });
    // }


    // useEffect(() => {
    //   getEmoloyeeOpportunity();
    // }, [currentPage]);




    return (
        <>
        <PageHeading title="Status" />
        <ProgressBar style={{height:100}}>
        <ProgressBar  variant="success" now={20} key={1} label="New" />
        <ProgressBar variant="warning" now={20} key={2} label="Contacted"/>
        <ProgressBar  variant="info" now={20} key={3} label="Interested"/>
        <ProgressBar  variant="dark" now={10} key={3} label="Qualified" />
        <ProgressBar  variant="danger" now={10} key={3} label="Negotiation" />
        <ProgressBar  variant="success" now={20} key={3} label="Won" draggable="liem" />

        </ProgressBar>
        </>
    );
    
};

export default Progressbar;






