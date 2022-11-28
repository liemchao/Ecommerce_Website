import React, { useEffect, useState } from 'react'
import EventDetail from './EventDetail'
import { useLocation } from 'react-router-dom';
import ApiService from '../../../../api/ApiService';


const EVENT = "EVENT_DETAIL_STORAGE";

export default function ViewEventDetail() {
    const { state } = useLocation();
    const [event, setEvent] = useState([]);
    const [attend, setAttend] = useState([])

    // khi component render xong se gọi useffect nay 1 lan duy nhat
    useEffect(() => {
        setEvent(state);
        
        // khi reload lai trang state se bi undefined => dung localStorage de luu lai 
        if (typeof (state) != "undefined") {
            localStorage.setItem(EVENT, JSON.stringify(state));
            getAccInEvent(state)
        }
        else {
            const storageEvent = localStorage.getItem(EVENT); // localStorage.getItem("key"); 
            if (storageEvent) {
                setEvent(JSON.parse(storageEvent));
                getAccInEvent(JSON.parse(storageEvent))
            }
        }
    }, []);

    const getAccInEvent = async (event) => {
        let data = {
            id: event.id
        }
        console.log(data);
        try {
            await ApiService.getAccInEvent(data)
                .then(response => {
                    setAttend(response.data.data);
                })
        } catch (error) {
            if (error.response) {
                console.log(error.response.data.data);
                console.log(error.response.data.status);
                console.log(error.response.data.headers);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log("Error", error.message);
            }
            console.log(error.config);
        }
    }

    return (
        <div>
            <EventDetail
                eventDetail={event}
                attendUser={attend}
            />
        </div>
    )
}
