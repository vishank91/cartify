import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify';

import Breadcrum from '../../../Components/Breadcrum'
import AdminSidebar from '../../../Components/Admin/AdminSidebar'
import Profile from '../../../Components/User/Profile'

let rtePrivacyPolicy;
let rteTermsAndCondition;
import { getSetting, createSetting, updateSetting } from "../../../Redux/ActionCreators/SettingActionCreators"
export default function AdminSettingPage() {
  var refdivPrivacyPolicy = useRef(null);
  var refdivTermsAndCondition = useRef(null);
  let [data, setData] = useState({
    siteName: "",
    map1: "",
    map2: "",
    address: "",
    email: "",
    phone: "",
    whatsapp: "",
    facebook: "",
    twitter: "",
    instagram: "",
    linkedin: "",
    youtube: "",
  })

  let SettingStateData = useSelector(state => state.SettingStateData)
  let dispatch = useDispatch()

  function getInputData(e) {
    let { name, value } = e.target
    setData({ ...data, [name]: value })
  }

  function postData(e) {
    e.preventDefault()
    let item = {
      ...data,
      privacyPolicy: rtePrivacyPolicy.getHTMLCode(),
      termsAndCondition: rteTermsAndCondition.getHTMLCode(),
    }
    if (SettingStateData.length)
      dispatch(updateSetting({ ...item, id: SettingStateData[0].id }))
    else
      dispatch(createSetting({ ...item }))

    toast("Setting Record Has Been Updated!!!");
  }

  useEffect(() => {
    let time = (() => {
      dispatch(getSetting())

      rtePrivacyPolicy = new window.RichTextEditor(refdivPrivacyPolicy.current);
      rteTermsAndCondition = new window.RichTextEditor(refdivTermsAndCondition.current);
      if (SettingStateData.length) {
        setData({ ...data, ...SettingStateData[0] })
        rtePrivacyPolicy.setHTMLCode(SettingStateData[0].privacyPolicy || "")
        rteTermsAndCondition.setHTMLCode(SettingStateData[0].termsAndCondition || "")
      }
      else {
        rtePrivacyPolicy.setHTMLCode("")
        rteTermsAndCondition.setHTMLCode("")
      }
    })()
    return () => clearTimeout(time)
  }, [SettingStateData.length])
  return (
    <>
      <Breadcrum title="Admin" />
      <ToastContainer />
      <div className="container-fluid my-3">
        <div className="row">
          <div className="col-md-3">
            <AdminSidebar />
          </div>
          <div className="col-md-9">
            <h5 className='my-dark-background p-2 text-light text-center'>Setting</h5>
            <form onSubmit={postData}>
              <div className="row">

                <div className="col-12 mb-3">
                  <label>Address</label>
                  <input type="text" name="address" onChange={getInputData} placeholder='Address' className='form-control border-dark' />
                </div>

                <div className="col-12 mb-3">
                  <label>Map1</label>
                  <input type="url" name="map1" onChange={getInputData} placeholder='Map1' className='form-control border-dark' />
                </div>

                <div className="col-12 mb-3">
                  <label>Map2</label>
                  <input type="url" name="map2" onChange={getInputData} placeholder='Map2' className='form-control border-dark' />
                </div>

                <div className="col-md-3 mb-3">
                  <label>Site Name</label>
                  <input type="text" name="siteName" onChange={getInputData} placeholder='Site Name' className='form-control border-dark' />
                </div>

                <div className="col-md-3 mb-3">
                  <label>Email Address</label>
                  <input type="email" name="email" onChange={getInputData} placeholder='Email Address' className='form-control border-dark' />
                </div>

                <div className="col-md-3 mb-3">
                  <label>Phone</label>
                  <input type="text" name="phone" onChange={getInputData} placeholder='Phone' className='form-control border-dark' />
                </div>

                <div className="col-md-3 mb-3">
                  <label>Whatsapp Number</label>
                  <input type="text" name="whatsapp" onChange={getInputData} placeholder='Whatsapp Number' className='form-control border-dark' />
                </div>

                <div className="col-12 mb-3">
                  <label>Facebook Profile Page Url</label>
                  <input type="url" name="facebook" onChange={getInputData} placeholder='Facebook Profile Page Url' className='form-control border-dark' />
                </div>

                <div className="col-12 mb-3">
                  <label>Twitter Profile Page Url</label>
                  <input type="url" name="twitter" onChange={getInputData} placeholder='Twitter Profile Page Url' className='form-control border-dark' />
                </div>

                <div className="col-12 mb-3">
                  <label>Linkedin Profile Page Url</label>
                  <input type="url" name="linkedin" onChange={getInputData} placeholder='Linkedin Profile Page Url' className='form-control border-dark' />
                </div>

                <div className="col-12 mb-3">
                  <label>Instagram Profile Page Url</label>
                  <input type="url" name="instagram" onChange={getInputData} placeholder='Instagram Profile Page Url' className='form-control border-dark' />
                </div>

                <div className="col-12 mb-3">
                  <label>Youtube Profile Page Url</label>
                  <input type="url" name="youtube" onChange={getInputData} placeholder='Youtube Profile Page Url' className='form-control border-dark' />
                </div>

                <div className="col-12 mb-3">
                  <label>Privacy Policy</label>
                  <div ref={refdivPrivacyPolicy} className='border border-dark'></div>
                </div>

                <div className="col-12 mb-3">
                  <label>Terms And Conditions</label>
                  <div ref={refdivTermsAndCondition} className='border border-dark'></div>
                </div>

                <div className="col-12 mb-3">
                  <button type="submit" className='btn btn-dark w-100'>Submit</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
