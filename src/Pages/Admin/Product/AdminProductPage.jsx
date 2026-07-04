import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import DataTable from 'datatables.net-dt'
import "datatables.net-dt/css/dataTables.dataTables.min.css"

import Breadcrum from '../../../Components/Breadcrum'
import AdminSidebar from '../../../Components/Admin/AdminSidebar'
import Profile from '../../../Components/User/Profile'

import { getProduct, deleteProduct } from "../../../Redux/ActionCreators/ProductActionCreators"
export default function AdminProductPage() {
  let [data, setData] = useState([])

  let ProductStateData = useSelector(state => state.ProductStateData)
  let dispatch = useDispatch()


  function deleteRecord(id) {
    if (window.confirm("Are You Sure To Delete That Record : ")) {
      dispatch(deleteProduct({ id: id }))
      setData(data.filter(x => x.id !== id))
    }
  }

  useEffect(() => {
    let time = (() => {
      dispatch(getProduct())
      if (ProductStateData.length) {
        setData(ProductStateData)
        return setTimeout(() => new DataTable('#myTable'), [500])
      }
    })()
    return () => clearTimeout(time)
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
            <h5 className='my-dark-background p-2 text-light text-center'>Product <Link to="/admin/product/create"><i className='bi bi-plus text-light float-end'></i></Link></h5>
            <div className="table-responsive">
              <table id='myTable' className='table table-bordered'>
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Maincategory</th>
                    <th>Subcategory</th>
                    <th>Brand</th>
                    <th>Color</th>
                    <th>Size</th>
                    <th>Base Price</th>
                    <th>Discount</th>
                    <th>Final Price</th>
                    <th>Stock</th>
                    <th>Stock Quantity</th>
                    <th>Pic</th>
                    <th>Status</th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {data.map(item => {
                    return <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>
                        <div style={{ width: 200 }}>
                          {item.name}
                        </div>
                      </td>
                      <td>{item.maincategory}</td>
                      <td>{item.subcategory}</td>
                      <td>{item.brand}</td>
                      <td>
                        <div style={{ width: 100 }}>
                          {item.color?.join(", ")}
                        </div>
                      </td>
                      <td>{item.size?.join(", ")}</td>
                      <td>&#8377;{item.basePrice}</td>
                      <td>{item.discount}% Off</td>
                      <td>&#8377;{item.finalPrice}</td>
                      <td>{item.stock ? "In Stock" : "Out of Stock"}</td>
                      <td>{item.stockQuantity}</td>
                      <td>
                        <div style={{ width: 400 }}>
                          {item.pic.map((p, index) => {
                            return <Link key={index} to={`${import.meta.env.VITE_APP_IMAGE_SERVER}${p}`} target='_blank'>
                              <img src={`${import.meta.env.VITE_APP_IMAGE_SERVER}${p}`} height={60} width={80} className='m-1' alt="Product Image" />
                            </Link>
                          })}
                        </div>
                      </td>
                      <td>{item.status ? 'Active' : "Inactive"}</td>
                      <td><Link to={`/admin/product/update/${item.id}`} className='btn btn-primary'><i className='bi bi-pencil'></i></Link></td>
                      <td><button className='btn btn-danger' onClick={() => deleteRecord(item.id)}><i className='bi bi-x'></i></button></td>
                    </tr>
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
