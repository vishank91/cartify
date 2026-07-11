import React, { useEffect, useState } from 'react'
import AOS from 'aos';
import { Link } from 'react-router-dom';
export default function Products({ maincategory, data }) {
    let [selected, setSelected] = useState("")
    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
        });
    }, []);
    return (
        <section id="services" className="services section">

            <div className="container section-title" data-aos="fade-up">
                <span>Our Latest Products<br /></span>
                <h2>Our Latest Prducts</h2>
                <div className='btn-group'>
                    <button className={selected === "" ? 'btn btn-primary' : 'btn btn-light'} onClick={() => setSelected("")}>All</button>
                    {maincategory.map((item, index) => {
                        return <button key={index} onClick={() => setSelected(item.name)} className={selected === item.name ? 'btn btn-primary' : 'btn btn-light'}>{item.name}</button>
                    })}
                </div>
            </div>

            <div className="container">

                <div className="row gy-4">

                    {data.filter(x => selected === "" || x.maincategory === selected).slice(0, 24).map((item, index) => {
                        return <div className="col-lg-4 col-md-6" key={index}>
                            <div className="card">
                                <div className="card-img">
                                    <img src={`${import.meta.env.VITE_APP_IMAGE_SERVER}${item.pic[0]}`} style={{ height: 300 }} alt="" className="w-100" />
                                </div>
                                <h3 className='text-center' style={{ height: 50 }}>{item.name}</h3>
                                <h6 className='text-center'><del>&#8377;{item.basePrice}</del> &#8377;{item.finalPrice} <sup>{item.discount}% Off</sup></h6>
                                <div className='btn-group w-100'>
                                    <button disabled className='btn btn-secondary'>{item.brand}</button>
                                    <button disabled className='btn btn-success'>{item.stock ? `${item.stockQuantity} Left IN Stock` : 'Out Of Stock'}</button>
                                    <Link to={`/product/${item.id}`} className='btn btn-primary text-light'><i className='bi bi-cart-plus'></i> Add to Cart</Link>
                                </div>
                            </div>
                        </div>

                    })}

                </div>

            </div>

        </section>
    )
}
