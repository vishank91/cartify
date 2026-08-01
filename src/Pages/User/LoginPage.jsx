import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import Breadcrum from '../../Components/Breadcrum'
export default function LoginPage() {
    let [data, setData] = useState({
        username: '',
        password: '',
    })
    let [errorMessage, setErrorMessage] = useState("")
    let navigate = useNavigate()

    function getInputData(e) {
        let { name, value } = e.target
        setData({ ...data, [name]: value })
    }

    async function postData(e) {
        e.preventDefault()
        //Remove Following Code in Case of Real Backend
        let response = await fetch(`${import.meta.env.VITE_APP_BACKEND_SERVER}/user`, {
            method: "GET",
            headers: {
                "content-type": "application/json"
            }
        })
        response = await response.json()
        let item = response.find(x => (x.username?.toLocaleLowerCase() === data.username?.toLocaleLowerCase() || x.email?.toLocaleLowerCase() === data.username?.toLocaleLowerCase()) && data.password === x.password)
        if (item) {
            if (item.status === false)
                setErrorMessage("Your Account Has Been Blocked Due to Some Unauthorized Activity, Please Contact Us to Unblock Your Account")
            else {
                localStorage.setItem("login", true)
                localStorage.setItem("name", item.name)
                localStorage.setItem("userid", item.id)
                localStorage.setItem("role", item.role)
                if (item.role === "Buyer")
                    navigate("/profile?option=Profile")
                else
                    navigate("/admin")
            }
        }
        else
            setErrorMessage("Invalid Username or Password ")
    }
    return (
        <>
            <Breadcrum title='Create Account' />

            <div className="container-fluid my-3">
                <div className="row">
                    <div className="col-xl-7 col-md-9 col-sm-11 m-auto">
                        <h5 className='bg-primary text-center p-2 text-light'>Login To Your Account</h5>
                        <form onSubmit={postData}>
                            <div className="row">

                                <div className="col-12 mb-3">
                                    <label>UserName*</label>
                                    <input type="text" name="username" onChange={getInputData} placeholder='UserName or Email Address' className={`form-control ${errorMessage ? 'border-danger' : 'border-primary'}`} />
                                    {errorMessage ? <p className='text-danger'>{errorMessage}</p> : null}
                                </div>

                                <div className="col-12 mb-3">
                                    <label>Password*</label>
                                    <input type="password" name="password" onChange={getInputData} placeholder='Password' className={`form-control ${errorMessage ? 'border-danger' : 'border-primary'}`} />
                                </div>

                                <div className="col-12 mb-3">
                                    <button className='btn btn-primary w-100' type="submit">Login</button>
                                </div>
                            </div>
                        </form>
                        <div className='d-flex justify-content-between'>
                            <Link to="#">Forget Password?</Link>
                            <Link to="/signup">Doesn't Have an Account? Signup</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
