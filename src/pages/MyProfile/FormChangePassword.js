import React, { useEffect, useState } from "react";
import ApiService from "../../api/apiService";
import "./MyProfile.css";

export default function FormChangePassword() {

    const initalState = {
        oldPassword: "", newPassword: "", confirmPassword: ""
    }
    
    const [password, setPassword] = useState(initalState)
    const user = JSON.parse(localStorage.getItem("user"));
    const [message, setMessage] = useState({});

    const changePassword = (data) => {
        var object = {};
        data.forEach((value, key) => object[key] = value);
        var json = JSON.stringify(object);
        ApiService.updatePassword(json).then(res => {
            console.log(res.data);
            reset();
        }).catch(e => {
            console.log(e);
        })
    }

    const reset = () => { setPassword(initalState) };

    const handlePassword = e => {
        e.preventDefault();
        if (validate()) {
            const data = new FormData()
            data.append('id', user.Id)
            data.append('oldPassword', password.oldPassword)
            data.append('newPassword', password.newPassword)
            data.append('confirmPassword', password.newPassword)
            changePassword(data)
        } else {
            return;
        }
    }

    const handleChange = event => {
        const { name, value } = event.target;
        setPassword({ ...password, [name]: value });
    };


   const validate = () => {
        let temp = {}
        temp.oldPassword = password.oldPassword == "" ? false:true;
        temp.newPassword = password.newPassword == "" ? false:true;
        temp.confirmPassword = (password.confirmPassword == "" || password.newPassword != password.confirmPassword) ? false:true;
        setMessage(temp);
        return Object.values(temp).every(x => x == true)
    }

    const appErrorsClass = field => (field in message && message[field] == false) ? ' validate' : ''


    return (
        <div>
            <form onSubmit={handlePassword}>
                <div className="card-body">
                    <div className="row mb-3">
                        <div className="col-sm-3">
                            <h6 className="mb-0">Old Password</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                            <input
                                type="text"
                                className={"form-control"+ appErrorsClass('oldPassword')}
                                name="oldPassword"
                                value={password.oldPassword}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-sm-3">
                            <h6 className="mb-0">New Password</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                            <input
                                type="text"
                                className={"form-control"+ appErrorsClass('newPassword')}
                                name="newPassword"
                                value={password.newPassword}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-sm-3">
                            <h6 className="mb-0">Confirm Password</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                            <input
                                type="text"
                                className={"form-control"+ appErrorsClass('confirmPassword')}
                                name="confirmPassword"
                                value={password.confirmPassword}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-3" />
                        <div className="col-sm-9 text-secondary">
                            <button
                                type="submit"
                                className="btn btn-primary px-4"
                            >
                                Change password
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}
