
import React from 'react'
import PageHeading from '../../../../components/PageHeading';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';

import 'primeflex/primeflex.css';
import 'primereact/resources/themes/saga-blue/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'

import AttendCreate from '../../../../components/Modals/Event/AttendCreate'

const iconUserTest = 'https://icons-for-free.com/iconfiles/png/512/business+costume+male+man+office+user+icon-1320196264882354682.png'

export default function EventDetail({ eventDetail, attendUser }) {


    const paginatorLeft = <Button type="button" className="p-button-text" />;
    const paginatorRight = <Button type="button" className="p-button-text" />;

    return (
        <div>
            <div id="wrapper">
                {console.log(attendUser)}

                <div className="container-fluid" style={{ width: '100%' }}>
                    <PageHeading title="Event" />
                    <div className="card-header py-3">
                        <h6 className="m-0 font-weight-bold text-primary">{eventDetail.title}</h6>
                    </div>
                    <img style={{ width: '100%', height: 'auto' }}
                        src={eventDetail.image}>
                    </img>
                    <hr />
                    

                    <ul className="d-flex flex-column">
                    <li>Description: {eventDetail.description}</li>
                    <li>From: {eventDetail.starttime}</li>
                    <li>To: {eventDetail.endtime}</li>
                  </ul>
                </div>
            </div>

            <div className="container-fluid" style={{ width: '100%' }}>
                    <PageHeading title="Attend User" />
                    <AttendCreate />
                    <div className="card shadow mb-4">
                        <DataTable
                            value={attendUser}
                            paginator
                            responsiveLayout="scroll"
                            paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                            currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
                            rows={5}
                            rowsPerPageOptions={[5, 10, 20]}
                            paginatorLeft={paginatorLeft}
                            paginatorRight={paginatorRight}>
                            <Column field="name" header="User" sortable ></Column>
                            <Column field="image" header="Avatar" sortable ></Column>
                            <Column field="address" header="Address" sortable></Column>
                            <Column field="createdTime" header="Create Time" sortable></Column>
                        </DataTable>
                    </div>
                </div>
        </div>
    )
}
