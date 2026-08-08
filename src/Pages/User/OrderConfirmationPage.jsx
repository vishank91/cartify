import React from 'react'
import Breadcrum from '../../Components/Breadcrum'
import { Link } from 'react-router-dom'

export default function OrderConfirmationPage() {
  return (
    <>
    <Breadcrum title="Order Has Been Placed"/>

    <div className="container my-5  ">
        <div className="card p-5 text-center">
                <h1>Thank You!!</h1>
                <h2>Your Order Has Been Placed</h2>
                <h3>Now You Can Track Your Order in Profile Section</h3>
                <div className="btn-group w-50 m-auto">
                    <Link className='btn btn-primary' to="/shop">Shop More</Link>
                    <Link className='btn btn-success' to="/profile?option=Orders">Orders</Link>
                </div>
        </div>
    </div>
    </>
  )
}
