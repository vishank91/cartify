import React, { useState } from 'react'
import Breadcrum from '../../Components/Breadcrum'
import TextValidator from '../../FormValidators/TextValidator'
import { Link, useNavigate } from 'react-router-dom'

export default function SignupPage() {
    let [data, setData] = useState({
        name: '',
        username: '',
        email: '',
        phone: '',
        password: '',
        cpassword: ''
    })
    let [errorMessage, setErrorMessage] = useState({
        name: 'Name Field is Mendatory',
        username: 'User Name Field is Mendatory',
        email: 'Email Address Field is Mendatory',
        phone: 'Phone Number Field is Mendatory',
        password: 'Password Field is Mendatory'
    })
    let [show, setShow] = useState(false)
    let navigate = useNavigate()

    function getInputData(e) {
        let { name, value } = e.target
        setData({ ...data, [name]: value })
        setErrorMessage({ ...errorMessage, [name]: TextValidator(e) })
    }

    async function postData(e) {
        e.preventDefault()
        let error = Object.values(errorMessage).find(x => x !== "")
        if (error) {
            setShow(true)
            return
        }
        if (data.password !== data.cpassword) {
            setShow(true)
            setErrorMessage({ ...errorMessage, password: "Password and Confirm Password Doesn't Matched" })
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
        let item = response.find(x => x.username?.toLocaleLowerCase() === data.username?.toLocaleLowerCase() || x.email?.toLocaleLowerCase() === data.email?.toLocaleLowerCase())
        if (item) {
            setErrorMessage({
                ...errorMessage,
                username: item.username?.toLocaleLowerCase() === data.username?.toLocaleLowerCase() ? "Username is Already Taken" : "",
                email: item.email?.toLocaleLowerCase() === data.email?.toLocaleLowerCase() ? "Email Address is Already Taken" : ""
            })
            setShow(true)
            return
        }
        //Till now

        response = await fetch(`${import.meta.env.VITE_APP_BACKEND_SERVER}/user`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                name: data.name,
                username: data.name,
                email: data.email,
                phone: data.phone,
                password: data.password,
                role: "Buyer",
                status: true
            })
        })
        response = await response.json()
        navigate("/login")
    }
    return (
        <>
            <Breadcrum title='Create Account' />

            <div className="container-fluid my-3">
                <div className="row">
                    <div className="col-xl-9 col-md-10 col-sm-11 m-auto">
                        <h5 className='bg-primary text-center p-2 text-light'>Create Your Free Account</h5>
                        <form onSubmit={postData}>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label>Name*</label>
                                    <input type="text" name="name" onChange={getInputData} placeholder='Full Name' className={`form-control ${show && errorMessage.name ? 'border-danger' : 'border-primary'}`} />
                                    {show && errorMessage.name ? <p className='text-danger'>{errorMessage.name}</p> : null}
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label>Phone Number*</label>
                                    <input type="text" name="phone" onChange={getInputData} placeholder='Phone Number' className={`form-control ${show && errorMessage.phone ? 'border-danger' : 'border-primary'}`} />
                                    {show && errorMessage.phone ? <p className='text-danger'>{errorMessage.phone}</p> : null}
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label>UserName*</label>
                                    <input type="text" name="username" onChange={getInputData} placeholder='UserName' className={`form-control ${show && errorMessage.username ? 'border-danger' : 'border-primary'}`} />
                                    {show && errorMessage.username ? <p className='text-danger'>{errorMessage.username}</p> : null}
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label>Email Address*</label>
                                    <input type="email" name="email" onChange={getInputData} placeholder='Email Address' className={`form-control ${show && errorMessage.email ? 'border-danger' : 'border-primary'}`} />
                                    {show && errorMessage.email ? <p className='text-danger'>{errorMessage.email}</p> : null}
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label>Password*</label>
                                    <input type="password" name="password" onChange={getInputData} placeholder='Password' className={`form-control ${show && errorMessage.password ? 'border-danger' : 'border-primary'}`} />
                                    {show && errorMessage.password ? <p className='text-danger'>{errorMessage.password}</p> : null}
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label>Confirm Password*</label>
                                    <input type="password" name="cpassword" onChange={getInputData} placeholder='Confirm Password' className={`form-control ${show && errorMessage.pasword ? 'border-danger' : 'border-primary'}`} />
                                </div>

                                <div className="col-12 mb-3">
                                    <button className='btn btn-primary w-100' type="submit">Signup</button>
                                </div>
                            </div>
                        </form>
                        <div>
                            <Link to="/login">Already Have an Account? Login</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
