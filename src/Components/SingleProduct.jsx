import React from 'react'
import { Link } from 'react-router-dom'

export default function SingleProduct({item}) {
    return (
        <div className="card">
            <div className="card-img">
                <img src={`${import.meta.env.VITE_APP_IMAGE_SERVER}${item.pic[0]}`} style={{ height: 300 }} alt="" className="w-100" />
            </div>
            <h5 className='text-center my-3'>{item.name}</h5>
            <h6 className='text-center'><del>&#8377;{item.basePrice}</del> &#8377;{item.finalPrice} <sup>{item.discount}% Off</sup></h6>
            <div className='btn-group w-100'>
                <button disabled className='btn-sm btn btn-secondary'>{item.brand}</button>
                <button disabled className='btn-sm btn btn-success'>{item.stock ? `${item.stockQuantity} Left IN Stock` : 'Out Of Stock'}</button>
                <Link to={`/product/${item.id}`} className='btn-sm btn btn-primary text-light'><i className='bi bi-cart-plus'></i> Add to Cart</Link>
            </div>
        </div>
    )
}
