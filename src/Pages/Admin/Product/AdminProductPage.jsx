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
                      <td>{item.name}</td>
                      <td>
                        <Link to={`${import.meta.env.VITE_APP_IMAGE_SERVER}${item.pic}`} target='_blank'>
                          <img src={`${import.meta.env.VITE_APP_IMAGE_SERVER}${item.pic}`} height={60} width={80} alt="Product Image" />
                        </Link>
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
