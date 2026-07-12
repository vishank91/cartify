import React, { useEffect, useState } from 'react'
import AOS from 'aos';
import SingleProduct from './SingleProduct';
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
                            <SingleProduct item={item} />
                        </div>

                    })}

                </div>

            </div>

        </section>
    )
}
