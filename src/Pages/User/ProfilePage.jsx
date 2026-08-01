import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Profile from '../../Components/User/Profile'
import UpdateProfile from '../../Components/User/UpdateProfile'
import Wishlist from '../../Components/User/Wishlist'
import Orders from '../../Components/User/Orders'
import Address from '../../Components/User/Address'

export default function ProfilePage() {
  let [option, setOption] = useState("")

  let [searchParams, setSearchParams] = useSearchParams()

  useEffect(() => {
    (() => {
      setOption(searchParams.get("option") ?? "Profile")
    })()
  }, [searchParams])
  return (
    <div className='container-fluid my-4'>
      <div className="row">
        <div className="col-lg-3">
          <ul className="list-group">
            <li className={`list-group-item ${option === "Profile" ? 'active' : ''}`} onClick={() => setSearchParams("option=Profile")}>Profile</li>
            <li className={`list-group-item ${option === "Update Profile" ? 'active' : ''}`} onClick={() => setSearchParams("option=Update Profile")}>Update Profile</li>
            <li className={`list-group-item ${option === "Wishlist" ? 'active' : ''}`} onClick={() => setSearchParams("option=Wishlist")}>Wishlist</li>
            <li className={`list-group-item ${option === "Orders" ? 'active' : ''}`} onClick={() => setSearchParams("option=Orders")}>Orders</li>
            <li className={`list-group-item ${option === "Address" ? 'active' : ''}`} onClick={() => setSearchParams("option=Address")}>Address</li>
          </ul>
        </div>
        <div className="col-lg-9">
          <h5 className='bg-primary text-center p-2 text-light'>{option}</h5>
          {option === "Profile" ? <Profile /> : null}
          {option === "Update Profile" ? <UpdateProfile setSearchParams={setSearchParams}/> : null}
          {option === "Wishlist" ? <Wishlist /> : null}
          {option === "Orders" ? <Orders /> : null}
          {option === "Address" ? <Address /> : null}
        </div>
      </div>
    </div>
  )
}
