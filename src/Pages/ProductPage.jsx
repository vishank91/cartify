import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cube';
import 'swiper/css/pagination';

// import required modules
import { EffectCube, Pagination } from 'swiper/modules';


import Breadcrum from '../Components/Breadcrum'

import { getProduct } from "../Redux/ActionCreators/ProductActionCreators"
import { useNavigate, useParams } from 'react-router-dom'
import ProductSlider from '../Components/ProductSlider'

const sliderOptions = {
    effect: 'cube',
    grabCursor: true,
    cubeEffect: {
        shadow: true,
        slideShadows: true,
        shadowOffset: 20,
        shadowScale: 0.94,
    },
    loop: true,
    pagination: true,
    modules: [EffectCube, Pagination],
    className: "mySwiper"
}
export default function ProductPage() {
    let { id } = useParams()
    let [data, setData] = useState({})
    let [relatedProducts, setRelatedProducts] = useState([])

    let [selected, setSelected] = useState({
        quantity: 1,
        color: "",
        size: ""
    })

    let ProductStateData = useSelector(state => state.ProductStateData)
    let dispatch = useDispatch()

    useEffect(() => {
        (() => {
            dispatch(getProduct())
            if (ProductStateData.length) {
                let item = ProductStateData.find(x => x.id === id)
                if (item) {
                    setData({ ...item })
                    setSelected({ ...selected, color: item.color[0], size: item.size[0] })
                    setRelatedProducts(ProductStateData.filter(x => x.maincategory === item.maincategory))
                }
                else
                    window.history.back()
            }
        })()
    }, [ProductStateData.length, id])
    return (
        <>
            <Breadcrum title={data.name ?? ""} />

            <div className="container-fluid my-3">
                <div className="row">
                    <div className="col-md-6">
                        <Swiper {...sliderOptions}>
                            {data.pic?.map((item, index) => {
                                return <SwiperSlide key={index}>
                                    <img src={`${import.meta.env.VITE_APP_IMAGE_SERVER}${item}`} height={500} className='w-100' alt="" />
                                </SwiperSlide>
                            })}
                        </Swiper>
                    </div>
                    <div className="col-md-6">
                        <h5 className='bg-primary text-center p-2 text-light'>{data.name}</h5>
                        <table className='table table-bordered'>
                            <tbody>
                                <tr>
                                    <th>Maincategory</th>
                                    <td>{data.maincategory}</td>
                                </tr>
                                <tr>
                                    <th>Subcategory</th>
                                    <td>{data.subcategory}</td>
                                </tr>
                                <tr>
                                    <th>Brand</th>
                                    <td>{data.brand}</td>
                                </tr>
                                <tr>
                                    <th>Price</th>
                                    <td><del>&#8377;{data.basePrice}</del> &#8377;{data.finalPrice} <sup>{data.discount}% Off</sup></td>
                                </tr>
                                <tr>
                                    <th>Stock</th>
                                    <td>{data.stock ? `${data.stockQuantity} Left in Stock` : 'Out Of Stock'}</td>
                                </tr>
                                <tr>
                                    <th>Color</th>
                                    <td>
                                        <div className='btn-group'>
                                            {data.color?.map((item, index) => {
                                                return <button onClick={() => setSelected({ ...selected, color: item })} className={`btn ${selected.color === item ? 'btn-primary' : 'btn-light'}`}>{item}</button>
                                            })}
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <th>Size</th>
                                    <td>
                                        <div className='btn-group'>
                                            {data.size?.map((item, index) => {
                                                return <button onClick={() => setSelected({ ...selected, size: item })} className={`btn ${selected.size === item ? 'btn-primary' : 'btn-light'}`}>{item}</button>
                                            })}
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan={2}>
                                        <div className="row">
                                            <div className="col-lg-4 col-5">
                                                <div className="btn-group w-100">
                                                    <button className='btn btn-primary' onClick={() => selected.quantity > 1 ? setSelected({ ...selected, quantity: selected.quantity - 1 }) : null}><i className='bi bi-dash'></i></button>
                                                    <h3 className='w-50 text-center'>{selected.quantity}</h3>
                                                    <button className='btn btn-primary' onClick={() => selected.quantity < data.stockQuantity ? setSelected({ ...selected, quantity: selected.quantity + 1 }) : null}><i className='bi bi-plus'></i></button>
                                                </div>
                                            </div>
                                            <div className="col-lg-8 col-7">
                                                <div className="btn-group w-100">
                                                    <button className='btn btn-primary'><i className='bi bi-cart-check'></i> Add to Cart</button>
                                                    <button className='btn btn-success'><i className='bi bi-heart'></i> Add to Wishlist</button>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <th>Description</th>
                                    <td><div dangerouslySetInnerHTML={{ __html: data.description }} /></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {relatedProducts.length ?
                <ProductSlider title="Related Products" data={relatedProducts} /> : null}
        </>
    )
}
