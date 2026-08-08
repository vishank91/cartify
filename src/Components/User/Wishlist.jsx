import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { getWishlist, deleteWishlist } from "../../Redux/ActionCreators/WishlistActionCreators"
import { useDispatch, useSelector } from 'react-redux'
export default function Wishlist() {
  let [data, setData] = useState([])

  let WishlistStateData = useSelector(state => state.WishlistStateData)
  let dispatch = useDispatch()

  function deleteRecord(id) {
    if (window.confirm("Are You Sure To Delete That Record : ")) {
      dispatch(deleteWishlist({ id: id }))
      setData(data.filter(x => x.id !== id))
    }
  }

  useEffect(() => {
    (() => {
      dispatch(getWishlist())
      if (WishlistStateData.length) {
        setData(WishlistStateData.filter(x => x.user === localStorage.getItem("userid")))
      }
    })()
  }, [WishlistStateData.length])
  return (
    <>
      {data.length !== 0 ?
        <div className='table-responsive'>
          <table className='table table-bordered'>
            <thead>
              <tr>
                <th>Product</th>
                <th>Name</th>
                <th>Brand</th>
                <th>Color</th>
                <th>Size</th>
                <th>Price</th>
                <th>Stock Quantity</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => {
                return <tr key={index}>
                  <td>
                    <Link to={`${import.meta.env.VITE_APP_IMAGE_SERVER}${item.pic}`} target="_blank">
                      <img src={`${import.meta.env.VITE_APP_IMAGE_SERVER}${item.pic}`} height={70} width={100} alt="" />
                    </Link>
                  </td>
                  <td>{item.name}</td>
                  <td>{item.brand}</td>
                  <td>{item.color?.join(",")}</td>
                  <td>{item.size?.join(",")}</td>
                  <td>&#8377;{item.price}</td>
                  <td>{`${item.stockQuantity} Left In Stock`}</td>
                  <td>{item.stockQuantity ? <Link to={`/product/${item.product}`} className='btn btn-primary'><i className='bi bi-cart'></i></Link> : null}</td>
                  <td><button className='btn btn-danger' onClick={() => deleteRecord(item.id)}><i className='bi bi-trash'></i></button></td>
                </tr>
              })}
            </tbody>
          </table>
        </div> :
        <div className='card p-5 text-center'>
          <h4>No Items in Wishlist</h4>
          <Link className='btn btn-primary w-25 m-auto' to="/shop">Shop Now</Link>
        </div>}
    </>
  )
}
