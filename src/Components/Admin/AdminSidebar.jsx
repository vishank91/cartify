import React from 'react'
import { Link } from 'react-router-dom'

export default function AdminSidebar() {
    return (
        <div className="list-group">
            <Link to="/admin" className="list-group-item my-dark-background mb-1" aria-current="true"><i className='bi bi-house fs-5'></i> <span className='float-end'>Home</span></Link>
            <Link to="/admin/maincategory" className="list-group-item my-dark-background mb-1" aria-current="true"><i className='bi bi-list fs-5'></i> <span className='float-end'>Maincatgory</span></Link>
            <Link to="/admin/subcategory" className="list-group-item my-dark-background mb-1" aria-current="true"><i className='bi bi-list fs-5'></i> <span className='float-end'>Subcategory</span></Link>
            <Link to="/admin/brand" className="list-group-item my-dark-background mb-1" aria-current="true"><i className='bi bi-tag fs-5'></i> <span className='float-end'>Brand</span></Link>
            <Link to="/admin/product" className="list-group-item my-dark-background mb-1" aria-current="true"><i className='bi bi-list fs-5'></i> <span className='float-end'>Product</span></Link>
            <Link to="/admin/feature" className="list-group-item my-dark-background mb-1" aria-current="true"><i className='bi bi-tag fs-5'></i> <span className='float-end'>Features</span></Link>
            <Link to="/admin/faq" className="list-group-item my-dark-background mb-1" aria-current="true"><i className='bi bi-question-circle fs-5'></i> <span className='float-end'>Faq</span></Link>
            <Link to="/admin/setting" className="list-group-item my-dark-background mb-1" aria-current="true"><i className='bi bi-gear fs-5'></i> <span className='float-end'>Setting</span></Link>
            <Link to="/admin/newsletter" className="list-group-item my-dark-background mb-1" aria-current="true"><i className='bi bi-envelope fs-5'></i> <span className='float-end'>Newsletter</span></Link>
            <Link to="/admin/contactus" className="list-group-item my-dark-background mb-1" aria-current="true"><i className='bi bi-telephone fs-5'></i> <span className='float-end'>ContactUs</span></Link>
            <Link to="/admin/checkout" className="list-group-item my-dark-background mb-1" aria-current="true"><i className='bi bi-bag-check fs-5'></i> <span className='float-end'>Checkout</span></Link>
            <Link to="/admin/user" className="list-group-item my-dark-background mb-1" aria-current="true"><i className='bi bi-people fs-5'></i> <span className='float-end'>User</span></Link>
        </div>
    )
}
