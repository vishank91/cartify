import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

import Breadcrum from '../../../Components/Breadcrum'
import AdminSidebar from '../../../Components/Admin/AdminSidebar'
import Profile from '../../../Components/User/Profile'

import TextValidator from '../../../FormValidators/TextValidator'
import ImageValidator from '../../../FormValidators/ImageValidator'

import { createProduct } from '../../../Redux/ActionCreators/ProductActionCreators'
import { getMaincategory } from '../../../Redux/ActionCreators/MaincategoryActionCreators'
import { getSubcategory } from '../../../Redux/ActionCreators/SubcategoryActionCreators'
import { getBrand } from '../../../Redux/ActionCreators/BrandActionCreators'
export default function AdminProductCreatePage() {
  let [data, setData] = useState({
    name: "",
    maincategory: "",
    subcategory: "",
    brand: "",
    color: [],
    size: [],
    basePrice: 0,
    discount: 0,
    finalPrice: 0,
    stock: true,
    stockQuantity: "",
    pic: [],
    status: true
  })

  let [errorMessage, setErrorMessage] = useState({
    name: "Name Field is Mendatory",
    basePrice: "Base Price Field is Mendatory",
    discount: "Discount Field is Mendatory",
    color: "Color Field Field is Mendatory",
    size: "Size Field Field is Mendatory",
    StockQuantity: "Stock Quantity Field is Mendatory",
    pic: "Pic Field is Mendatory"
  })

  let [show, setShow] = useState(false)

  let navigate = useNavigate()

  let MaincategoryStateData = useSelector(state => state.MaincategoryStateData)
  let SubcategoryStateData = useSelector(state => state.SubcategoryStateData)
  let BrandStateData = useSelector(state => state.BrandStateData)
  let dispatch = useDispatch()

  function getInputData(e) {
    let name = e.target.name
    let value = name === "pic" ? "product/" + e.target.files[0].name : e.target.value
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
      // let formData = new FormData()
      // formData.append("name",data.name)
      // formData.append("pic",data.pic)
      // formData.append("status",data.status)
      // dispatch(createProduct(formData))

      dispatch(createProduct({ ...data }))
      navigate("/admin/product")
    }
  }
  useEffect(() => {
    (() => {
      dispatch(getMaincategory())
    })()
  }, [MaincategoryStateData.length])

  useEffect(() => {
    (() => {
      dispatch(getSubcategory())
    })()
  }, [SubcategoryStateData.length])

  useEffect(() => {
    (() => {
      dispatch(getBrand())
    })()
  }, [BrandStateData.length])
  return (
    <>
      <Breadcrum title="Admin" />

      <div className="container-fluid my-3">
        <div className="row">
          <div className="col-md-3">
            <AdminSidebar />
          </div>
          <div className="col-md-9">
            <h5 className='my-dark-background p-2 text-light text-center'>Create Product <Link to="/admin/product"><i className='bi bi-arrow-left text-light float-end'></i></Link></h5>
            <form onSubmit={postData}>
              <div className="row">

                <div className="col-12 mb-3">
                  <label>Name*</label>
                  <input type="text" name="name" onChange={getInputData} placeholder='Product Name' className={`form-control ${show && errorMessage.name ? 'border-danger' : 'border-dark'}`} />
                  {show && errorMessage.name ? <p className='text-capitalize text-danger'>{errorMessage.name}</p> : null}
                </div>

                <div className="col-lg-3 col-md-6 mb-3">
                  <label>Maincategory*</label>
                  <select name="maincategory" className='form-select border-dark' >
                    {MaincategoryStateData.map((item) => {
                      return <option key={item.id}>{item.name}</option>
                      // return  <option key={item.id} value={item.id}>{item.name}</option>
                    })}
                  </select>
                </div>

                <div className="col-lg-3 col-md-6 mb-3">
                  <label>Subcategory*</label>
                  <select name="subcategory" className='form-select border-dark' >
                    {SubcategoryStateData.map((item) => {
                      return <option key={item.id}>{item.name}</option>
                      // return  <option key={item.id} value={item.id}>{item.name}</option>
                    })}
                  </select>
                </div>

                <div className="col-lg-3 col-md-6 mb-3">
                  <label>Brand*</label>
                  <select name="brand" className='form-select border-dark' >
                    {BrandStateData.map((item) => {
                      return <option key={item.id}>{item.name}</option>
                      // return  <option key={item.id} value={item.id}>{item.name}</option>
                    })}
                  </select>
                </div>

                <div className="col-lg-3 col-md-6 mb-3">
                  <label>Stock*</label>
                  <select name="stock" className='form-select border-dark' >
                    <option value="1">In Stock</option>
                    <option value="0">Out Of Stock</option>
                  </select>
                </div>

                <div className="col-lg-4 col-md-6 mb-3">
                  <label>Base Price*</label>
                  <input type="number" name="basePrice" onChange={getInputData} placeholder='Product Base Price' className={`form-control ${show && errorMessage.basePrice ? 'border-danger' : 'border-dark'}`} />
                  {show && errorMessage.basePrice ? <p className='text-capitalize text-danger'>{errorMessage.basePrice}</p> : null}
                </div>

                <div className="col-lg-4 col-md-6 mb-3">
                  <label>Discount*</label>
                  <input type="number" name="discount" onChange={getInputData} placeholder='Product Discount' className={`form-control ${show && errorMessage.discount ? 'border-danger' : 'border-dark'}`} />
                  {show && errorMessage.discount ? <p className='text-capitalize text-danger'>{errorMessage.discount}</p> : null}
                </div>


                <div className="col-lg-4 col-md-6 mb-3">
                  <label>Stock Quantity*</label>
                  <input type="number" name="stockQuantity" onChange={getInputData} placeholder='Product Stock Quantity' className={`form-control ${show && errorMessage.stockQuantity ? 'border-danger' : 'border-dark'}`} />
                  {show && errorMessage.stockQuantity ? <p className='text-capitalize text-danger'>{errorMessage.stockQuantity}</p> : null}
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
