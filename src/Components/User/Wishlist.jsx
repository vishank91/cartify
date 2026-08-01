import React, { useEffect, useState } from 'react'

import { getWishlist, deleteWishlist } from "../../Redux/ActionCreators/WishlistActionCreators"
import { useDispatch, useSelector } from 'react-redux'
export default function Wishlist() {
  let [data, setData] = useState([])

  let WishlistStateData = useSelector(state => state.WishlistStateData)
  let dispatch = useDispatch()

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
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => {
                return <tr key={index}>
                  <td>{item.pic}</td>
                  <td>{item.name}</td>
                  <td>{item.brand}</td>
                  <td>{item.color?.join(",")}</td>
                  <td>{item.size?.join(",")}</td>
                  <td>&#8377;{item.price}</td>
                </tr>
              })}
            </tbody>
          </table>
        </div> :
        <div>
        </div>}
    </>
  )
}
