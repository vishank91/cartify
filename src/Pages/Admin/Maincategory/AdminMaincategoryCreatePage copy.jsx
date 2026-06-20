import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

import Breadcrum from '../../../Components/Breadcrum'
import AdminSidebar from '../../../Components/Admin/AdminSidebar'
import Profile from '../../../Components/User/Profile'

import TextValidator from '../../../FormValidators/TextValidator'
import ImageValidator from '../../../FormValidators/ImageValidator'

import { createMaincategory, getMaincategory } from '../../../Redux/ActionCreators/MaincategoryActionCreators'
export default function AdminMaincategoryCreatePage() {
  let [data, setData] = useState({
    name: "",
    pic: "",
    status: true
  })

  let [errorMessage, setErrorMessage] = useState({
    name: "Name Field is Mendatory",
    pic: "Pic Field is Mendatory"
  })

  let [show, setShow] = useState(false)

  let navigate = useNavigate()

  let MaincategoryStateData = useSelector(state => state.MaincategoryStateData)
  let dispatch = useDispatch()

  function getInputData(e) {
    let name = e.target.name
    let value = name === "pic" ? "maincategory/" + e.target.files[0].name : e.target.value
    // let value = name === "pic" ? e.target.files[0] : e.target.value
    setData({ ...data, [name]: name === "status" ? value === "1" ? true : false : value })
    setErrorMessage({ ...errorMessage, [name]: name === "pic" ? ImageValidator(e) : TextValidator(e) })
  }
  function postData(e) {
    e.preventDefault()
    let error = Object.values(errorMessage).find(x => x !== "")
    if (error)
      setShow(true)
    else {
      let item = MaincategoryStateData.find(x => x.name?.toLocaleLowerCase() === data.name?.toLocaleLowerCase())
      if (item) {
        setErrorMessage({ ...errorMessage, name: 'Maincategory With This Name is Already Exist' })
        setShow(true)
        return
      }

      // let formData = new FormData()
      // formData.append("name",data.name)
      // formData.append("pic",data.pic)
      // formData.append("status",data.status)
      // dispatch(createMaincategory(formData))

      dispatch(createMaincategory({ ...data }))
      navigate("/admin/maincategory")
    }
  }
  useEffect(() => {
    (() => {
      dispatch(getMaincategory())
    })()
  }, [MaincategoryStateData.length])
  return (
    <>
      <Breadcrum title="Admin" />

      <div className="container-fluid my-3">
        <div className="row">
          <div className="col-md-3">
            <AdminSidebar />
          </div>
          <div className="col-md-9">
            <h5 className='my-dark-background p-2 text-light text-center'>Create Maincategory <Link to="/admin/maincategory"><i className='bi bi-arrow-left text-light float-end'></i></Link></h5>
            <form onSubmit={postData}>
              <div className="row">

                <div className="col-12 mb-3">
                  <label>Name*</label>
                  <input type="text" name="name" onChange={getInputData} placeholder='Product Name' className={`form-control ${show && errorMessage.name ? 'border-danger' : 'border-dark'}`} />
                  {show && errorMessage.name ? <p className='text-capitalize text-danger'>{errorMessage.name}</p> : null}
                </div>

                <div className="col-md-6 mb-3">
                  <label>Pic*</label>
                  <input type="file" name="pic" onChange={getInputData} className={`form-control ${show && errorMessage.pic ? 'border-danger' : 'border-dark'}`} />
                  {show && errorMessage.pic ? <p className='text-capitalize text-danger'>{errorMessage.pic}</p> : null}
                </div>

                <div className="col-md-6 mb-3">
                  <label>Status*</label>
                  <select name="status" className='form-select border-dark' onChange={getInputData}>
                    <option value="1">Active</option>
                    <option value="0">Inactive</option>
                  </select>
                </div>

                <div className="col-12">
                  <button className='btn btn-dark w-100'>Create</button>
                </div>

              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
