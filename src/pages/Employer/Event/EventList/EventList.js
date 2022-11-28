
import React, { useEffect, useState } from 'react'

import PageHeading from '../../../../components/PageHeading';
import EventCreate from "../../../../components/Modals/Event/EventCreate";
import EventUpdate from "../../../../components/Modals/Event/EventUpdate";

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Link } from 'react-router-dom';
import { Paginator } from 'primereact/paginator';

import 'primeflex/primeflex.css';
import 'primereact/resources/themes/saga-blue/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'


export default function EventList({
    eventList,
    total,
    currentPage
}) {

    const [basicFirst, setBasicFirst] = useState(0);
    const [basicRows, setBasicRows] = useState(5);
    const [event, setEvent] = useState([]);
    const [searchText, setSearchText] = useState("");


    useEffect(() => {
        setEvent(eventList);
    }, [eventList]);

    const onBasicPageChange = (event) => {
        setBasicFirst(event.first);
        setBasicRows(event.rows);
        currentPage(event.rows, (event.first/event.rows) + 1);
      }

    const imageCustom = (rowData) => {
        return (
            <img style={{ width: '50px', height: '50px', borderRadius: '50%' }}
                src={rowData.image}
                alt={rowData.image}
                className="event-image" />);
    }

    const customButton = (rowData) => {
        return (
            <div style={{ display: 'flex' }}>
                <Link style={{ paddingRight: '15px' }}
                    to={{
                        pathname: "EventDetail",
                        state: rowData
                    }}>
                    <i className="fas fa-eye"></i>
                </Link>

                <EventUpdate
                    data={rowData} />
            </div>
        );
    }


    const template = {
        layout: 'RowsPerPageDropdown PrevPageLink PageLinks NextPageLink CurrentPageReport',
        'CurrentPageReport': (options) => {
          return (
            <span style={{ color: 'var(--text-color)', userSelect: 'none', width: '120px', textAlign: 'center' }}>
              {options.first} - {options.last} of {options.totalRecords}
            </span>
          )
        }
      }

    const paginatorLeft = <Button type="button" className="p-button-text" />;
    const paginatorRight = <Button type="button" className="p-button-text" />;
    return (
        <div>
            <div id="wrapper" >
                <div className="container-fluid">
                    <EventCreate  />
                    <PageHeading title="Event List" />
                    <div className="card shadow mb-4">

                        <DataTable value={event} responsiveLayout="scroll"
                            paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                            currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
                            rows={5} rowsPerPageOptions={[5, 10, 20]}
                            paginatorLeft={paginatorLeft} paginatorRight={paginatorRight}
                            >
                            <Column field="title" header="Title" sortable filter></Column>
                            <Column header="Image" body={imageCustom}></Column>
                            <Column field="description" header="Description" sortable></Column>
                            <Column field="starttime" header="Starttime" sortable></Column>
                            <Column field="endtime" header="Endtime" sortable></Column>
                            <Column body={customButton}></Column>
                        </DataTable>

                        <Paginator
                            first={basicFirst}
                            rows={basicRows}
                            totalRecords={total}
                            template={template}
                            rowsPerPageOptions={[5, 10, 15]}
                            onPageChange={onBasicPageChange}></Paginator>

                    </div>
                </div>
            </div>
        </div>
    )
}
