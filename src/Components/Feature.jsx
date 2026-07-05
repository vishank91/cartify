import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import AOS from 'aos';

import { getFeature } from "../Redux/ActionCreators/FeatureActionCreators"
export default function Feature() {
    let FeatureStateData = useSelector(state => state.FeatureStateData)
    let dispatch = useDispatch()

    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
        });
    }, []);

    useEffect(() => {
        (() => {
            dispatch(getFeature())
        })()
    }, [FeatureStateData.length])
    return (
        <>
            <section id="featured-services" className="featured-services section">

                <div className="container">

                    <div className="row gy-4">

                        {FeatureStateData.filter(x=>x.status).map(item=>{
                            return <div key={item.id} className="col-lg-4 col-md-6 service-item d-flex" data-aos="fade-up" data-aos-delay="100">
                            <div className="icon flex-shrink-0"><span dangerouslySetInnerHTML={{__html:item.icon}}/></div>
                            <div>
                                <h4 className="title">{item.name}</h4>
                                <p className="description">{item.shortDescription}</p>
                            </div>
                        </div>
                        })}

                    </div>

                </div>

            </section>
        </>
    )
}
