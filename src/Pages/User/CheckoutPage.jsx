import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import Breadcrum from '../../Components/Breadcrum'

import { deleteCart, getCart } from "../../Redux/ActionCreators/CartActionCreators"
import { getProduct, updateProduct } from "../../Redux/ActionCreators/ProductActionCreators"
import { createCheckout } from "../../Redux/ActionCreators/CheckoutActionCreators"
export default function CheckoutPage() {
    let [data, setData] = useState([])
    let [subtotal, setSubtotal] = useState(0)
    let [shipping, setShipping] = useState(0)
    let [total, setTotal] = useState(0)

    let [selected, setSelected] = useState({
        deliveryAddress: {},
        paymentMode: "COD"
    })

    let [user, setUser] = useState({ address: [] })


    let CartStateData = useSelector(state => state.CartStateData)
    let ProductStateData = useSelector(state => state.ProductStateData)
    let dispatch = useDispatch()

    let navigate = useNavigate()

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

    function placeOrder() {
        let item = {
            user: localStorage.getItem("userid"),
            orderStatus: 'Order Has Been Placed',
            paymentMode: selected.paymentMode,
            deliveryAddress: selected.deliveryAddress,
            paymentStatus: "Pending",
            subtotal: subtotal,
            shipping: shipping,
            total: total,
            date: new Date(),
            products: data
        }
        dispatch(createCheckout(item))

        data.forEach(x => {
            let p = ProductStateData.find(pr => pr.id === x.product)
            p.stockQuantity = p.stockQuantity - x.quantity
            p.stock = p.stockQuantity === 0 ? false : true
            dispatch(updateProduct(p))
            dispatch(deleteCart(x.id))
        })

        navigate("/order-confirmation")
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


    useEffect(() => {
        (async () => {
            let response = await fetch(`${import.meta.env.VITE_APP_BACKEND_SERVER}/user/${localStorage.getItem("userid")}`, {
                method: "GET",
                headers: {
                    "content-type": "application/json"
                }
            })
            response = await response.json()
            setUser({ ...response, address: response.address ?? [] })
            if (response?.address.length)
                setSelected({ ...selected, deliveryAddress: response.address[0] })
        })()
    }, [])

    useEffect(() => {
        (() => dispatch(getProduct()))()
    }, [ProductStateData.length])
    return (
        <>
            <Breadcrum title="Place Order" />

            <div className="container my-3">
                <div className="row">
                    <div className="col-md-6">
                        <h4 className='text-center'>Delivery Address</h4>
                        {user.address.length ?
                            user.address?.map((item, index) => {
                                return <div className='card p-3' key={index} onClick={() => setSelected({ ...selected, deliveryAddress: item })}>
                                    <h5>{item.name}</h5>
                                    <h6>{item.email},{item.phone}</h6>
                                    <p>{item.address}</p>
                                    <p>{item.pin}, {item.city}, {item.state}</p>

                                    {selected.deliveryAddress.address === item.address ?
                                        <i className='bi bi-check fs-3 position-absolute end-0 p-2'></i> : null}
                                </div>
                            }) :
                            <p>No Address Record Found, Please Create Atleast One Address Record in Profile</p>
                        }
                    </div>
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
                                        <th>Payment Mode</th>
                                        <td>
                                            <select name="mode" onChange={(e) => setSelected({ ...selected, paymentMode: e.target.value })} className='form-select border-primary'>
                                                <option>COD</option>
                                                <option>Net Banking</option>
                                            </select>
                                        </td>
                                    </tr>
                                    {user.address.length ? <tr>
                                        <th colSpan={2}>
                                            <button className='btn btn-primary w-100' onClick={placeOrder}>Place Order</button>
                                        </th>
                                    </tr> :
                                        <tr>
                                            <th colSpan={2}>
                                                <Link to="/profile?option=Address" className='btn btn-primary w-100'>Create Address</Link>
                                            </th></tr>}
                                </thead>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
