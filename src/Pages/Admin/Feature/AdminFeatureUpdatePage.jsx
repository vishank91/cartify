import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'

import Breadcrum from '../../../Components/Breadcrum'
import AdminSidebar from '../../../Components/Admin/AdminSidebar'
import Profile from '../../../Components/User/Profile'

import TextValidator from '../../../FormValidators/TextValidator'

import { updateFeature, getFeature } from '../../../Redux/ActionCreators/FeatureActionCreators'
export default function AdminFeatureUpdatePage() {
  let { id } = useParams()
  let [data, setData] = useState({
     name: "",
    icon: "",
    shortDescription: "",
    status: true
  })

  let [errorMessage, setErrorMessage] = useState({
    name: "",
    icon: "",
    shortDescription:""
  })

  let [show, setShow] = useState(false)

  let navigate = useNavigate()

  let FeatureStateData = useSelector(state => state.FeatureStateData)
  let dispatch = useDispatch()

 function getInputData(e) {
     let { name, value } = e.target
     setData({ ...data, [name]: name === "status" ? value === "1" ? true : false : value })
     setErrorMessage({ ...errorMessage, [name]: TextValidator(e) })
   }
  function postData(e) {
    e.preventDefault()
    let error = Object.values(errorMessage).find(x => x !== "")
    if (error)
      setShow(true)
    else {
      let item = FeatureStateData.find(x => x.id !== id && x.name?.toLocaleLowerCase() === data.name?.toLocaleLowerCase())
      if (item) {
        setErrorMessage({ ...errorMessage, name: 'Feature With This Name is Already Exist' })
        setShow(true)
        return
      }
      dispatch(updateFeature({ ...data }))
      navigate("/admin/feature")
    }
  }
  useEffect(() => {
    (() => {
      dispatch(getFeature())
      if (FeatureStateData.length) {
        let item = FeatureStateData.find(x => x.id === id)
        if (item)
          setData({ ...data, ...item })
        else
          navigate("/admin/feature")
      }
    })()
  }, [FeatureStateData.length])
  return (
    <>
      <Breadcrum title="Admin" />

      <div className="container-fluid my-3">
        <div className="row">
          <div className="col-md-3">
            <AdminSidebar />
          </div>
          <div className="col-md-9">
            <h5 className='my-dark-background p-2 text-light text-center'>Update Feature <Link to="/admin/feature"><i className='bi bi-arrow-left text-light float-end'></i></Link></h5>
            <form onSubmit={postData}>
              <div className="row">

                <div className="col-12 mb-3">
                  <label>Name*</label>
                  <input type="text" name="name" value={data.name} onChange={getInputData} placeholder='Feature Name' className={`form-control ${show && errorMessage.name ? 'border-danger' : 'border-dark'}`} />
                  {show && errorMessage.name ? <p className='text-capitalize text-danger'>{errorMessage.name}</p> : null}
                </div>

                <div className="col-12 mb-3">
                  <label>Short Description*</label>
                  <textarea name="shortDescription" value={data.shortDescription} rows={3} onChange={getInputData} placeholder='Feature Short Description' className={`form-control ${show && errorMessage.shortDescription ? 'border-danger' : 'border-dark'}`} />
                  {show && errorMessage.shortDescription ? <p className='text-capitalize text-danger'>{errorMessage.shortDescription}</p> : null}
                </div>

                <div className="col-md-6 mb-3">
                  <label>Icon*</label>
                  <input type="text" name="icon" value={data.icon} onChange={getInputData} className={`form-control ${show && errorMessage.icon ? 'border-danger' : 'border-dark'}`} placeholder="eg. <i class='bi bi-list'></i>'" />
                  {show && errorMessage.icon ? <p className='text-capitalize text-danger'>{errorMessage.icon}</p> : null}
                </div>


                <div className="col-md-6 mb-3">
                  <label>Status</label>
                  <select name="status" value={data.status ? "1" : "0"} className='form-select border-dark' onChange={getInputData}>
                    <option value="1">Active</option>
                    <option value="0">Inactive</option>
                  </select>
                </div>

                <div className="col-12">
                  <button className='btn btn-dark w-100'>Update</button>
                </div>

              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
