import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'

import Breadcrum from '../../../Components/Breadcrum'
import AdminSidebar from '../../../Components/Admin/AdminSidebar'
import Profile from '../../../Components/User/Profile'

import TextValidator from '../../../FormValidators/TextValidator'
import ImageValidator from '../../../FormValidators/ImageValidator'

import { updateProduct, getProduct } from '../../../Redux/ActionCreators/ProductActionCreators'
import { getMaincategory } from '../../../Redux/ActionCreators/MaincategoryActionCreators'
import { getSubcategory } from '../../../Redux/ActionCreators/SubcategoryActionCreators'
import { getBrand } from '../../../Redux/ActionCreators/BrandActionCreators'

const colors = ["White", "Black", "Blue", "Red", "Green", "Pink", "Yellow", "Gray", "Purple", "Magenta", "Skyblue", "N/A"]
const sizes = ["XXXL", "XXL", "XL", "LG", "MD", "SM", "XS", "NB", "24", "26", "28", "30", "32", "34", "36", "38", "40", "N/A"]
let rte
export default function AdminProductUpdatePage() {
  let { id } = useParams()
  let refdiv = useRef()
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
    name: "",
    basePrice: "",
    discount: "",
    color: "",
    size: "",
    stockQuantity: "",
    pic: ""
  })

  let [show, setShow] = useState(false)
  let [flag, setFlag] = useState(false)

  let navigate = useNavigate()

  let ProductStateData = useSelector(state => state.ProductStateData)
  let MaincategoryStateData = useSelector(state => state.MaincategoryStateData)
  let SubcategoryStateData = useSelector(state => state.SubcategoryStateData)
  let BrandStateData = useSelector(state => state.BrandStateData)
  let dispatch = useDispatch()

  function getInputCheckbox(key, value) {
    let arr = data[key]
    if (arr.includes(value))
      arr = arr.filter(x => x !== value)
    else
      arr.push(value)

    setData({ ...data, [key]: arr })
    setErrorMessage({ ...errorMessage, [key]: arr.length === 0 ? `Please Select atleast one ${key}` : "" })
  }


  function getInputData(e) {
    let name = e.target.name
    let value = name === "pic" ? data.pic.concat(Array.from(e.target.files).map(x => "product/" + x.name)) : e.target.value
    // let value = name === "pic" ? e.target.files : e.target.value

    setData({ ...data, [name]: name === "status" || name === "stock" ? value === "1" ? true : false : value })
    setErrorMessage({ ...errorMessage, [name]: name === "pic" ? ImageValidator(e) : TextValidator(e) })
  }
  function postData(e) {
    e.preventDefault()
    let error = Object.values(errorMessage).find(x => x !== "")
    if (error)
      setShow(true)
    else {
      let bp = parseInt(data.basePrice)
      let d = parseInt(data.discount)
      let fp = parseInt(bp - bp * d / 100)
      let stockQuantity = parseInt(data.stockQuantity)

      dispatch(updateProduct({
        ...data,
        maincategory: data.maincategory || MaincategoryStateData[0].name,
        subcategory: data.subcategory || SubcategoryStateData[0].name,
        brand: data.brand || BrandStateData[0].name,
        basePrice: bp,
        discount: d,
        finalPrice: fp,
        stockQuantity: stockQuantity,
        description: rte.getHTMLCode()
      }))


      // let formData = new FormData()
      // formData.append("id", data.id)
      // formData.append("name", data.name)
      // formData.append("maincategory", data.maincategory || MaincategoryStateData[0].name)
      // formData.append("subcategory", data.subcategory || SubcategoryStateData[0].name)
      // formData.append("brand", data.brand || BrandStateData[0].name)
      // formData.append("basePrice", bp)
      // formData.append("discount", d)
      // formData.append("finalPrice", fp)
      // data.color.forEach(x => {
      //   formData.append("color", x)
      // })
      // data.size.forEach(x => {
      //   formData.append("size", x)
      // })
      // data.pic.forEach(x => {
      //   formData.append("pic", x)
      // })
      // formData.append("stock", data.stock)
      // formData.append("stocjQuantity", data.stockQuantity)
      // formData.append("description", rte.getHTMLCode())
      // formData.append("status", data.status)
      // dispatch(updateProduct(formData))

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
  useEffect(() => {
    (() => {
      dispatch(getProduct())
      if (ProductStateData.length) {
        let item = ProductStateData.find(x => x.id === id)
        if (item) {
          rte = new window.RichTextEditor(refdiv.current);
          setData({ ...data, ...item })
          rte.setHTMLCode(item.description)
        }
        else
          navigate("/admin/product")
      }
    })()
  }, [ProductStateData.length])
  return (
    <>
      <Breadcrum title="Admin" />

      <div className="container-fluid my-3">
        <div className="row">
          <div className="col-md-3">
            <AdminSidebar />
          </div>
          <div className="col-md-9">
            <h5 className='my-dark-background p-2 text-light text-center'>Update Product <Link to="/admin/product"><i className='bi bi-arrow-left text-light float-end'></i></Link></h5>
            <form onSubmit={postData}>
              <div className="row">

                <div className="col-12 mb-3">
                  <label>Name*</label>
                  <input type="text" name="name" value={data.name} onChange={getInputData} placeholder='Product Name' className={`form-control ${show && errorMessage.name ? 'border-danger' : 'border-dark'}`} />
                  {show && errorMessage.name ? <p className='text-capitalize text-danger'>{errorMessage.name}</p> : null}
                </div>

                <div className="col-lg-3 col-md-6 mb-3">
                  <label>Maincategory*</label>
                  <select name="maincategory" value={data.maincategory} onChange={getInputData} className='form-select border-dark' >
                    {MaincategoryStateData.map((item) => {
                      return <option key={item.id}>{item.name}</option>
                      // return  <option key={item.id} value={item.id}>{item.name}</option>
                    })}
                  </select>
                </div>

                <div className="col-lg-3 col-md-6 mb-3">
                  <label>Subcategory*</label>
                  <select name="subcategory" value={data.subcategory} onChange={getInputData} className='form-select border-dark' >
                    {SubcategoryStateData.map((item) => {
                      return <option key={item.id}>{item.name}</option>
                      // return  <option key={item.id} value={item.id}>{item.name}</option>
                    })}
                  </select>
                </div>

                <div className="col-lg-3 col-md-6 mb-3">
                  <label>Brand*</label>
                  <select name="brand" value={data.brand} onChange={getInputData} className='form-select border-dark' >
                    {BrandStateData.map((item) => {
                      return <option key={item.id}>{item.name}</option>
                      // return  <option key={item.id} value={item.id}>{item.name}</option>
                    })}
                  </select>
                </div>

                <div className="col-lg-3 col-md-6 mb-3">
                  <label>Stock*</label>
                  <select name="stock" value={data.stock ? "1" : "0"} onChange={getInputData} className='form-select border-dark' >
                    <option value="1">In Stock</option>
                    <option value="0">Out Of Stock</option>
                  </select>
                </div>

                <div className="col-lg-4 col-md-6 mb-3">
                  <label>Base Price*</label>
                  <input type="number" name="basePrice" value={data.basePrice} onChange={getInputData} placeholder='Product Base Price' className={`form-control ${show && errorMessage.basePrice ? 'border-danger' : 'border-dark'}`} />
                  {show && errorMessage.basePrice ? <p className='text-capitalize text-danger'>{errorMessage.basePrice}</p> : null}
                </div>

                <div className="col-lg-4 col-md-6 mb-3">
                  <label>Discount*</label>
                  <input type="number" name="discount" value={data.discount} onChange={getInputData} placeholder='Product Discount' className={`form-control ${show && errorMessage.discount ? 'border-danger' : 'border-dark'}`} />
                  {show && errorMessage.discount ? <p className='text-capitalize text-danger'>{errorMessage.discount}</p> : null}
                </div>


                <div className="col-lg-4 col-md-6 mb-3">
                  <label>Stock Quantity*</label>
                  <input type="number" name="stockQuantity" value={data.stockQuantity} onChange={getInputData} placeholder='Product Stock Quantity' className={`form-control ${show && errorMessage.stockQuantity ? 'border-danger' : 'border-dark'}`} />
                  {show && errorMessage.stockQuantity ? <p className='text-capitalize text-danger'>{errorMessage.stockQuantity}</p> : null}
                </div>

                <div className="col-12 mb-3">
                  <label>Color*</label>
                  <div className='row border border-dark p-2 m-1 rounded'>
                    {colors.map((item, index) => {
                      return <div className='col-lg-3 col-md-4 col-6' key={index}>
                        <label htmlFor={item} className='d-inline-block' style={{ width: "30%" }}>{item}</label>
                        <input type="checkbox" onChange={() => getInputCheckbox('color', item)} checked={data.color.includes(item)} className='ms-2' name={item} id={item} />
                      </div>
                    })}
                  </div>
                  {show && errorMessage.color ? <p className='text-capitalize text-danger'>{errorMessage.color}</p> : null}
                </div>

                <div className="col-12 mb-3">
                  <label>Size*</label>
                  <div className='row border border-dark p-2 m-1 rounded'>
                    {sizes.map((item, index) => {
                      return <div className='col-lg-3 col-md-4 col-6' key={index}>
                        <label htmlFor={item} className='d-inline-block' style={{ width: "30%" }}>{item}</label>
                        <input type="checkbox" onChange={() => getInputCheckbox('size', item)} checked={data.size.includes(item)} className='ms-2' name={item} id={item} />
                      </div>
                    })}
                  </div>
                  {show && errorMessage.color ? <p className='text-capitalize text-danger'>{errorMessage.color}</p> : null}
                </div>

                <div className="col-12 mb-3">
                  <label>Description</label>
                  <div ref={refdiv} className='border border-dark'></div>
                </div>


                <div className="col-md-6 mb-3">
                  <label>Pic</label>
                  <input type="file" name="pic" multiple onChange={getInputData} className={`form-control ${show && errorMessage.pic ? 'border-danger' : 'border-dark'}`} />
                  {show && errorMessage.pic ?
                    errorMessage.pic.split("|").map((x, index) => {
                      return <p className='text-capitalize text-danger' key={index}>{x}</p>
                    })
                    : null}
                </div>

                <div className="col-md-6 mb-3">
                  <label>Old Pics(Click on Pic to Remove)</label>
                  <div>
                    {data.pic.map((item, index) => {
                      return <img key={index}
                        onClick={() => {
                          data.pic.splice(index, 1)
                          setFlag(!flag)
                        }}
                        src={`${import.meta.env.VITE_APP_IMAGE_SERVER}${item}`} className='m-1' height={60} width={70} />
                    })}
                  </div>
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
