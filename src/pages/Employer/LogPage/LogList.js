
import React, { useEffect, useState } from 'react'

import PageHeading from '../../../components/PageHeading';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';

import 'primeflex/primeflex.css';
import 'primereact/resources/themes/saga-blue/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'


export default function LogList({ logList }) {

    const [log, setLog] = useState(null);

    useEffect(() => {
        setLog(logList);
    }, [logList]);

    const paginatorLeft = <Button type="button" className="p-button-text" />;
    const paginatorRight = <Button type="button" className="p-button-text" />;
    return (
        <div>
            <div id="wrapper" >
                <div className="container-fluid">              

                    <PageHeading title="Log List" />
                    <div className="card shadow mb-4">

                        <DataTable value={log} paginator responsiveLayout="scroll"
                            paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                            currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
                            rows={5} rowsPerPageOptions={[5, 10, 20]}
                            paginatorLeft={paginatorLeft} paginatorRight={paginatorRight}
                            >
                            
                            <Column field="des" header="Description" filter sortable></Column>
                            <Column field="time" header="Create Time" sortable></Column>

                        </DataTable>

                    </div>
                </div>
            </div>
        </div>
    )
}
