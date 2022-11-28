
import React, { useState, useEffect } from 'react'
import EventList from './EventList'
import ApiService from '../../../../api/ApiService';

export default function ViewEvent() {


    const [eventList, setEventList] = useState([]);
    const [totalRecord, setTotalRecord] = useState(0);

    useEffect(() => {
        getEventPage(5, 1);
    }, []);

    const getEventPage = async (row, page) => {
        try {
            await ApiService.getEvent(row, page)
                .then(response => {
                    setEventList(response.data.data);
                    setTotalRecord(response.data.totalEle);
                })
        } catch (error) {
            if (error.response) {
                // get response with a status code not in range 2xx
                console.log(error.response.data.data);
                console.log(error.response.data.status);
                console.log(error.response.data.headers);
              } else if (error.request) {
                // no response
                console.log(error.request);
              } else {
                // Something wrong in setting up the request
                console.log("Error", error.message);
              }
              console.log(error.config);
        }
    }

    return (
        <div>

            <EventList
                eventList={eventList}
                currentPage={getEventPage}
                total={totalRecord}
            />
        </div>
    )
}