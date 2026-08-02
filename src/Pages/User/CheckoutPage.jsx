import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Breadcrum from '../../Components/Breadcrum'

import { getCart } from "../../Redux/ActionCreators/CartActionCreators"
export default function CheckoutPage() {
    let [data, setData] = useState([])
    let [subtotal, setSubtotal] = useState(0)
    let [shipping, setShipping] = useState(0)
    let [total, setTotal] = useState(0)


    let CartStateData = useSelector(state => state.CartStateData)
    let dispatch = useDispatch()

    function calculate(cart) {
        let total = 0
        cart.forEach(x => total = total + x.total)
        if (total > 0 && total < 1000) {
            setShipping(150)
            setTotal(total + 150)
        }
        else {
            setShipping(0)
            setTotal(total)
        }
        setSubtotal(total)
    }

    useEffect(() => {
        (() => {
            dispatch(getCart())
            if (CartStateData.length) {
                let cart = CartStateData.filter(x => x.user === localStorage.getItem("userid"))
                setData(cart)
                calculate(cart)
            }
        })()
    }, [CartStateData.length])
    return (
        <>
            <Breadcrum title="Place Order" />

            <div className="container my-3">
                <div className="row">
                    <div className="col-md-6"></div>
                    <div className="col-md-6">
                        <h4 className='text-center'>Items in Cart</h4>
                        <div className="table-responsive">
                            <table className='table table-bordered'>
                                <thead>
                                    <tr>
                                        <th>Product</th>
                                        <th>Brand</th>
                                        <th>Color</th>
                                        <th>Size</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((item, index) => {
                                        return <tr key={index}>
                                            <td>{item.name}</td>
                                            <td>{item.brand}</td>
                                            <td>{item.color}</td>
                                            <td>{item.size}</td>
                                            <td>&#8377;{item.price}</td>
                                            <td>{item.quantity}</td>
                                            <td>&#8377;{item.total}</td>
                                        </tr>
                                    })}
                                </tbody>
                            </table>

                            <table className='table table-bordered'>
                                <thead>
                                    <tr>
                                        <th>Subtotal Amount</th>
                                        <td>&#8377;{subtotal}</td>
                                    </tr>
                                     <tr>
                                        <th>Shipping Amount</th>
                                        <td>&#8377;{shipping}</td>
                                    </tr>
                                     <tr>
                                        <th>Total Amount</th>
                                        <td>&#8377;{total}</td>
                                    </tr>
                                     <tr>
                                        <th colSpan={2}>
                                            <button className='btn btn-primary w-100'>Place Order</button>
                                        </th>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
