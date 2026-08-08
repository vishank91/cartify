import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import Breadcrum from '../../Components/Breadcrum'

import { getCart, deleteCart, updateCart } from "../../Redux/ActionCreators/CartActionCreators"
export default function CartPage() {
    let [data, setData] = useState([])
    let [subtotal, setSubtotal] = useState(0)
    let [shipping, setShipping] = useState(0)
    let [total, setTotal] = useState(0)


    let CartStateData = useSelector(state => state.CartStateData)
    let dispatch = useDispatch()

    function deleteRecord(id) {
        if (window.confirm("Are You Sure To Delete That Record : ")) {
            dispatch(deleteCart({ id: id }))
            setData(data.filter(x => x.id !== id))
            calculate(data.filter(x => x.id !== id))
        }
    }

    function updateRecord(id, option) {
        let item = data.find(x => x.id === id)
        let index = data.findIndex(x => x.id === id)
        if ((option === "Dec" && item.quantity === 1) || (option === "Inc" && item.quantity === item.stockQuantity))
            return
        else if (option === "Dec") {
            item['quantity'] = item['quantity'] - 1
            item['total'] = item['total'] - item['price']
        }
        else if (option === "Inc") {
            item['quantity'] = item['quantity'] + 1
            item['total'] = item['total'] + item['price']
        }
        dispatch(updateCart({ ...item }))
        data[index] = { ...item }
        setData(data)
        calculate(data)
    }

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
            <Breadcrum title="Cart" />

            <div className="container my-3">
                {data.length !== 0 ?
                    <>
                        <div className='table-responsive'>
                            <table className='table table-bordered'>
                                <thead>
                                    <tr>
                                        <th>Product</th>
                                        <th>Name</th>
                                        <th>Stock Quantity</th>
                                        <th>Brand</th>
                                        <th>Color</th>
                                        <th>Size</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                        <th>Total</th>
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
                                            <td>{`${item.stockQuantity} Left In Stock`}</td>
                                            <td>{item.brand}</td>
                                            <td>{item.color}</td>
                                            <td>{item.size}</td>
                                            <td>&#8377;{item.price}</td>
                                            <td>
                                                <div className="btn-group w-100" style={{ width: 100 }}>
                                                    <button className='btn btn-primary' onClick={() => updateRecord(item.id, 'Dec')}><i className='bi bi-dash'></i></button>
                                                    <h5 className='w-25 text-center'>{item.quantity}</h5>
                                                    <button className='btn btn-primary' onClick={() => updateRecord(item.id, 'Inc')}><i className='bi bi-plus'></i></button>
                                                </div>
                                            </td>
                                            <td>&#8377;{item.total}</td>
                                            <td><button className='btn btn-danger' onClick={() => deleteRecord(item.id)}><i className='bi bi-trash'></i></button></td>
                                        </tr>
                                    })}
                                </tbody>
                            </table>
                        </div>
                        <div className="row">
                            <div className="col-md-6"></div>
                            <div className="col-md-6">
                                <table className='table table-bordered'>
                                    <tbody>
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
                                            <td colSpan={2}>
                                                <Link to="/checkout" className='btn btn-primary w-100'>Proceed To Checkout</Link>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </> :
                    <div className='card p-5 text-center'>
                        <h4>No Items in Cart</h4>
                        <Link className='btn btn-primary w-25 m-auto' to="/shop">Shop Now</Link>
                    </div>}
            </div>
        </>
    )
}
