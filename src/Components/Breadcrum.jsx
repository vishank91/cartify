import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function Breadcrum({ title }) {
    return (
        <div className="page-title dark-background" style={{ backgroundImage: "url(assets/img/page-title-bg.jpg)" }}>
            <div className="container position-relative">
                <h1>{title}</h1>
                <p>Esse dolorum voluptatum ullam est sint nemo et est ipsa porro placeat quibusdam quia assumenda numquam molestias.</p>
                <nav className="breadcrumbs">
                    <ol>
                        <li><Link to="/">Home</Link></li>
                        <li className="current">{title}</li>
                    </ol>
                </nav>
            </div>
        </div>
    )
}
