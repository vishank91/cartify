import React from 'react'
import Breadcrum from '../Components/Breadcrum'
import About from '../Components/About'
import Stats from '../Components/Stats'
import Testimonial from '../Components/Testimonial'
import Feature from '../Components/Feature'
import FAQ from '../Components/FAQ'

export default function AboutPage() {
    return (
        <>
            <Breadcrum title="About" />
            <About />
            <Stats />
            <Feature />
            <Testimonial />
            <FAQ />
        </>
    )
}
