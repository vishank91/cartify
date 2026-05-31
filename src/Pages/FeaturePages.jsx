import React from 'react'
import Breadcrum from '../Components/Breadcrum'
import Feature from '../Components/Feature'
import Testimonial from '../Components/Testimonial'
import FAQ from '../Components/FAQ'

export default function FeaturePages() {
    return (
        <>
            <Breadcrum title="Feature" />
            <Feature />
            <Testimonial />
            <FAQ />
        </>
    )
}
