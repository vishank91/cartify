import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Feature from '../Components/Feature'
import About from '../Components/About'
import Products from '../Components/Products'
import CTA from '../Components/CTA'
import Testimonial from '../Components/Testimonial'
import FAQ from '../Components/FAQ'

import { getSetting } from "../Redux/ActionCreators/SettingActionCreators"
import { getProduct } from "../Redux/ActionCreators/ProductActionCreators"
import { getMaincategory } from "../Redux/ActionCreators/MaincategoryActionCreators"
import ProductSlider from '../Components/ProductSlider'
export default function HomePage() {
    let [data, setData] = useState([])
    let [maincategory, setMaincategory] = useState([])

    let [settingData, setSettingData] = useState({
        siteName: import.meta.env.VITE_APP_SITE_NAME,
    })

    let SettingStateData = useSelector(state => state.SettingStateData)
    let ProductStateData = useSelector(state => state.ProductStateData)
    let MaincategoryStateData = useSelector(state => state.MaincategoryStateData)
    let dispatch = useDispatch()

    useEffect(() => {
        (() => {
            dispatch(getSetting())
            if (SettingStateData.length) {
                let item = {}
                Object.keys(settingData).forEach(key => item[key] = SettingStateData[0][key] || settingData[key])
                setSettingData({ ...item })
            }
        })()
    }, [SettingStateData.length])

    useEffect(() => {
        (() => {
            dispatch(getProduct())
            if (ProductStateData.length)
                setData(ProductStateData.filter(x => x.status))
        })()
    }, [ProductStateData.length])

    useEffect(() => {
        (() => {
            dispatch(getMaincategory())
            if (MaincategoryStateData.length)
                setMaincategory(MaincategoryStateData.filter(x => x.status))
        })()
    }, [MaincategoryStateData.length])
    return (
        <>
            <section id="hero" className="hero section dark-background">

                <img src="/assets/img/world-dotted-map.png" alt="" className="hero-bg" data-aos="fade-in" />

                <div className="container">
                    <div className="row gy-4 d-flex justify-content-between">
                        <div className="col-lg-6 order-2 order-lg-1 d-flex flex-column justify-content-center">
                            <h3 data-aos="fade-up">Shop Smarter with {settingData.siteName} – Discover Quality Products at Unbeatable Prices</h3>
                            <p data-aos="fade-up" data-aos-delay="100">Explore a world of premium products across your favorite categories. Enjoy secure shopping, exclusive deals, fast delivery, and exceptional customer service, making every purchase simple, convenient, and rewarding with {settingData.siteName}.</p>

                            <form action="/shop" method='get' className="form-search d-flex align-items-stretch mb-3" data-aos="fade-up" data-aos-delay="200">
                                <input type="text" name='search' className="form-control" placeholder="Enter Category, Brand Etc. to Search Products" />
                                <button type="submit" className="btn btn-primary">Search</button>
                            </form>

                            <div className="row gy-4" data-aos="fade-up" data-aos-delay="300">

                                <div className="col-lg-3 col-6">
                                    <div className="stats-item text-center w-100 h-100">
                                        <span data-purecounter-start="0" data-purecounter-end="232" data-purecounter-duration="0" className="purecounter">1000+</span>
                                        <p>Customers</p>
                                    </div>
                                </div>

                                <div className="col-lg-3 col-6">
                                    <div className="stats-item text-center w-100 h-100">
                                        <span data-purecounter-start="0" data-purecounter-end="521" data-purecounter-duration="0" className="purecounter">100+</span>
                                        <p>Products</p>
                                    </div>
                                </div>

                                <div className="col-lg-3 col-6">
                                    <div className="stats-item text-center w-100 h-100">
                                        <span data-purecounter-start="0" data-purecounter-end="1453" data-purecounter-duration="0" className="purecounter">20+</span>
                                        <p>Brands</p>
                                    </div>
                                </div>

                                <div className="col-lg-3 col-6">
                                    <div className="stats-item text-center w-100 h-100">
                                        <span data-purecounter-start="0" data-purecounter-end="32" data-purecounter-duration="0" className="purecounter">24/7</span>
                                        <p>Support</p>
                                    </div>
                                </div>

                            </div>

                        </div>

                        <div className="col-lg-5 order-1 order-lg-2 hero-img" data-aos="zoom-out">
                            <img src="/assets/img/hero-img.svg" className="img-fluid mb-3 mb-lg-0" alt="" />
                        </div>

                    </div>
                </div>

            </section>
            <Feature />
            <About />
            <Products maincategory={maincategory} data={data} />
            <CTA />
            {maincategory.map(item=>{
                return <ProductSlider title={item.name} data={ProductStateData.filter(x=>x.maincategory===item.name)}/>
            })}
            <FAQ />
            <Testimonial />
        </>
    )
}
