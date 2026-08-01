import React, { useEffect, useState } from 'react'

import TextValidator from '../../FormValidators/TextValidator'
export default function UpdateProfile({ setSearchParams }) {
    let [user, setUser] = useState({
        name: '',
        username: '',
        email: '',
        phone: '',
    })
    let [errorMessage, setErrorMessage] = useState({
        name: '',
        username: '',
        email: '',
        phone: '',
    })
    let [show, setShow] = useState(false)

    function getInputData(e) {
        let { name, value } = e.target
        setUser({ ...user, [name]: value })
        setErrorMessage({ ...errorMessage, [name]: TextValidator(e) })
    }

    async function postData(e) {
        e.preventDefault()
        let error = Object.values(errorMessage).find(x => x !== "")
        if (error) {
            setShow(true)
            return
        }
        //Remove Following Code in Case of Real Backend
        let response = await fetch(`${import.meta.env.VITE_APP_BACKEND_SERVER}/user`, {
            method: "GET",
            headers: {
                "content-type": "application/json"
            }
        })
        response = await response.json()
        let item = response.find(x => x.id !== localStorage.getItem("userid") && (x.username?.toLocaleLowerCase() === user.username?.toLocaleLowerCase() || x.email?.toLocaleLowerCase() === user.email?.toLocaleLowerCase()))
        if (item) {
            setErrorMessage({
                ...errorMessage,
                username: item.username?.toLocaleLowerCase() === user.username?.toLocaleLowerCase() ? "Username is Already Taken" : "",
                email: item.email?.toLocaleLowerCase() === user.email?.toLocaleLowerCase() ? "Email Address is Already Taken" : ""
            })
            setShow(true)
            return
        }
        //Till now

        response = await fetch(`${import.meta.env.VITE_APP_BACKEND_SERVER}/user/${localStorage.getItem("userid")}`, {
            method: "PUT",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({ ...user })
        })
        response = await response.json()
        setSearchParams("option=Profile")
    }


    useEffect(() => {
        (async () => {
            let response = await fetch(`${import.meta.env.VITE_APP_BACKEND_SERVER}/user/${localStorage.getItem("userid")}`, {
                method: "GET",
                headers: {
                    "content-type": "application/json"
                }
            })
            response = await response.json()
            setUser({ ...user, ...response })
        })()
    }, [])
    return (
        <>
            <form onSubmit={postData}>
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label>Name*</label>
                        <input type="text" name="name" value={user.name} onChange={getInputData} placeholder='Full Name' className={`form-control ${show && errorMessage.name ? 'border-danger' : 'border-primary'}`} />
                        {show && errorMessage.name ? <p className='text-danger'>{errorMessage.name}</p> : null}
                    </div>

                    <div className="col-md-6 mb-3">
                        <label>Phone Number*</label>
                        <input type="text" name="phone" value={user.phone} onChange={getInputData} placeholder='Phone Number' className={`form-control ${show && errorMessage.phone ? 'border-danger' : 'border-primary'}`} />
                        {show && errorMessage.phone ? <p className='text-danger'>{errorMessage.phone}</p> : null}
                    </div>

                    <div className="col-md-6 mb-3">
                        <label>UserName*</label>
                        <input type="text" name="username" value={user.username} onChange={getInputData} placeholder='UserName' className={`form-control ${show && errorMessage.username ? 'border-danger' : 'border-primary'}`} />
                        {show && errorMessage.username ? <p className='text-danger'>{errorMessage.username}</p> : null}
                    </div>

                    <div className="col-md-6 mb-3">
                        <label>Email Address*</label>
                        <input type="email" name="email" value={user.email} onChange={getInputData} placeholder='Email Address' className={`form-control ${show && errorMessage.email ? 'border-danger' : 'border-primary'}`} />
                        {show && errorMessage.email ? <p className='text-danger'>{errorMessage.email}</p> : null}
                    </div>

                    <div className="col-12 mb-3">
                        <button className='btn btn-primary w-100' type="submit">Update</button>
                    </div>
                </div>
            </form>
        </>
    )
}
