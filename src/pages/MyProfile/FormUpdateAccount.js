import React, { useEffect, useState } from "react";
import ApiService from "../../api/apiService";
import "./MyProfile.css";

export default function FormUpdateAccount() {

    const initialAccount = { fullName: "", email: "", phone: "", password: "" , roleId:"", image:"", gender:"", dob:"" }
    const user = JSON.parse(localStorage.getItem("user"));
    const [account, setAccount] = useState(initialAccount);
    const [message, setMessage] = useState({});


    useEffect(() => {
        ApiService.getAccountById(user.id)
            .then((response) => {
                setAccount(response.data.data);
            })
            .catch((e) => {
                console.log(e);
            });
    }, []);

    const handleChange = event => {
        const { name, value } = event.target;
        setAccount({ ...account, [name]: value });
    };


    const handleChangeAccount = e => {
        e.preventDefault();
        if(validate()){
            const data = new FormData()
            data.append('id', user.id)
            data.append('fullName', account.fullName)
            data.append('email', account.email)
            data.append('phoneNumber', account.phone)
            data.append('password', account.password)
            data.append('gender', account.gender)
            data.append('roleId', account.roleId)
            data.append('img', account.image)
            data.append('dob', account.dob)


            updateProfile(data)
        }else{
            return;
        }
    }

    const updateProfile = (data) => {
        var object = {};
        data.forEach((value, key) => object[key] = value);
        var json = JSON.stringify(object);

        ApiService.updateAccount(json)
            .then((response) => {
                ApiService.getAccountById(user.id)
                    .then((response) => {
                        setAccount(response.data.data);
                        console.log(response.data);
                    })
                    .catch((e) => {
                        console.log(e);
                    });
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const validate = () => {
        let temp = {}
        temp.name = account.name == "" ? false:true;
        // temp.email = account.email == "" ? false:true;
        // temp.phoneNumber = account.phoneNumber == "" ? false:true;
        // temp.address = account.address == "" ? false:true;
        // temp.status = account.status == "" ? false:true;
        setMessage(temp);
        return Object.values(temp).every(x => x == true)
    }

    const appErrorsClass = field => (field in message && message[field] == false) ? ' validate' : ''

    return (
        <div>
        <form onSubmit={handleChangeAccount}>
            <div className="card-body">
                <div className="row mb-3">
                    <div className="col-sm-3">
                        <h6 className="mb-0">Name</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                        <input
                            type="text"
                            className={"form-control"+ appErrorsClass('name')}
                            name="name"
                            value={user.fullName}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-sm-3">
                        <h6 className="mb-0">Email</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                        <input
                            type="email"
                            className={"form-control"+ appErrorsClass('email')}
                            name="email"
                            value={user.email}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-sm-3">
                        <h6 className="mb-0">Phone</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                        <input
                            type="text"
                            className={"form-control"+ appErrorsClass('phoneNumber')}
                            name="phoneNumber"
                            value={user.phone}
                            onChange={handleChange}

                        />
                    </div>
                </div>
                {/* <div className="row mb-3">
                    <div className="col-sm-3">
                        <h6 className="mb-0">Image</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                        <input
                            type="file"
                            className={"form-control"+ appErrorsClass('address')}
                            name="image"
                            value={user.image}
                            onChange={handleChange}
                        />
                    </div>
                </div> */}
                <div className="row mb-3">
                    <div className="col-sm-3">
                        <h6 className="mb-0">Gender</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                        <input
                            type="text"
                            className={"form-control"+ appErrorsClass('status')}
                            value={user.gender}
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
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>
        </form>
        </div>
    )
}
