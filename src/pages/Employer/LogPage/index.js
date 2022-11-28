
import React, { useEffect, useState } from 'react'
import ApiService from '../../../api/ApiService';
import LogList from './LogList';



export default function ViewLoglist() {

    let user = JSON.parse(localStorage.getItem("user"));
    let userId = user.Id

    const [logList, setLogList] = useState([]);

    useEffect(() => {
        getLogByRecruiter();
    }, []);

    // get all event
    const getLogByRecruiter = async () => {
        try {
            await ApiService.getLogByRecruiter(1)
           .then(response => {
                setLogList(response.data.data[userId]); 
                          
            })
        } catch (error) {
            console.log("Fail To Load Company: " + error);
        }
    }

    return (
        <div>
            {console.log(userId)}
            <LogList
                logList ={logList}
            />
        </div>
    )
}