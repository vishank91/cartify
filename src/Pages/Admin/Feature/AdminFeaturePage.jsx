import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import DataTable from 'datatables.net-dt'
import "datatables.net-dt/css/dataTables.dataTables.min.css"

import Breadcrum from '../../../Components/Breadcrum'
import AdminSidebar from '../../../Components/Admin/AdminSidebar'
import Profile from '../../../Components/User/Profile'

import { getFeature, deleteFeature } from "../../../Redux/ActionCreators/FeatureActionCreators"
export default function AdminFeaturePage() {
  let [data, setData] = useState([])

  let FeatureStateData = useSelector(state => state.FeatureStateData)
  let dispatch = useDispatch()


  function deleteRecord(id) {
    if (window.confirm("Are You Sure To Delete That Record : ")) {
      dispatch(deleteFeature({ id: id }))
      setData(data.filter(x => x.id !== id))
    }
  }

  useEffect(() => {
    let time = (() => {
      dispatch(getFeature())
      if (FeatureStateData.length) {
        setData(FeatureStateData)
        return setTimeout(() => new DataTable('#myTable'), [500])
      }
    })()
    return () => clearTimeout(time)
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
            <h5 className='my-dark-background p-2 text-light text-center'>Feature <Link to="/admin/feature/create"><i className='bi bi-plus text-light float-end'></i></Link></h5>
            <div className="table-responsive">
              <table id='myTable' className='table table-bordered'>
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Icon</th>
                    <th>Short Description</th>
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
                      <td><span className='fs-1' dangerouslySetInnerHTML={{__html:item.icon}}/></td>
                      <td>{item.shortDescription}</td>
                      <td>{item.status ? 'Active' : "Inactive"}</td>
                      <td><Link to={`/admin/feature/update/${item.id}`} className='btn btn-primary'><i className='bi bi-pencil'></i></Link></td>
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
