import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

import Breadcrum from '../../../Components/Breadcrum'
import AdminSidebar from '../../../Components/Admin/AdminSidebar'
import Profile from '../../../Components/User/Profile'

import TextValidator from '../../../FormValidators/TextValidator'

import { createFaq, getFaq } from '../../../Redux/ActionCreators/FaqActionCreators'
export default function AdminFaqCreatePage() {
  let [data, setData] = useState({
    question: "",
    answer: "",
    status: true
  })

  let [errorMessage, setErrorMessage] = useState({
    question: "Question Field is Mendatory",
    answer: "Answer Field Is Mendatory"
  })

  let [show, setShow] = useState(false)

  let navigate = useNavigate()

  let FaqStateData = useSelector(state => state.FaqStateData)
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
      let item = FaqStateData.find(x => x.question?.toLocaleLowerCase() === data.question?.toLocaleLowerCase())
      if (item) {
        setErrorMessage({ ...errorMessage, name: 'Faq Record With This Qustion is Already Exist' })
        setShow(true)
        return
      }
      dispatch(createFaq({ ...data }))
      navigate("/admin/faq")
    }
  }
  useEffect(() => {
    (() => {
      dispatch(getFaq())
    })()
  }, [FaqStateData.length])
  return (
    <>
      <Breadcrum title="Admin" />

      <div className="container-fluid my-3">
        <div className="row">
          <div className="col-md-3">
            <AdminSidebar />
          </div>
          <div className="col-md-9">
            <h5 className='my-dark-background p-2 text-light text-center'>Create Faq <Link to="/admin/faq"><i className='bi bi-arrow-left text-light float-end'></i></Link></h5>
            <form onSubmit={postData}>
              <div className="row">

                <div className="col-12 mb-3">
                  <label>Question*</label>
                  <input type="text" name="question" onChange={getInputData} placeholder='Faq Question' className={`form-control ${show && errorMessage.name ? 'border-danger' : 'border-dark'}`} />
                  {show && errorMessage.question ? <p className='text-capitalize text-danger'>{errorMessage.question}</p> : null}
                </div>

                <div className="col-12 mb-3">
                  <label>Answer*</label>
                  <textarea name="answer" rows={3} onChange={getInputData} placeholder='Faq Answer' className={`form-control ${show && errorMessage.answer ? 'border-danger' : 'border-dark'}`} />
                  {show && errorMessage.answer ? <p className='text-capitalize text-danger'>{errorMessage.answer}</p> : null}
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
