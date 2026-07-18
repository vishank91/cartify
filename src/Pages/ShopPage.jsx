import React, { use, useEffect, useState } from 'react'
import Breadcrum from '../Components/Breadcrum'

import { getMaincategory } from "../Redux/ActionCreators/MaincategoryActionCreators"
import { getSubcategory } from "../Redux/ActionCreators/SubcategoryActionCreators"
import { getBrand } from "../Redux/ActionCreators/BrandActionCreators"
import { getProduct } from "../Redux/ActionCreators/ProductActionCreators"
import { useDispatch, useSelector } from 'react-redux'
import SingleProduct from '../Components/SingleProduct'

const colors = ["White", "Black", "Blue", "Red", "Green", "Pink", "Yellow", "Gray", "Purple", "Magenta", "Skyblue", "N/A"]
const sizes = ["XXXL", "XXL", "XL", "LG", "MD", "SM", "XS", "NB", "24", "26", "28", "30", "32", "34", "36", "38", "40", "N/A"]
export default function ShopPage() {
  let [data, setData] = useState([])
  let [filter, setFilter] = useState({
    maincategory: [],
    subcategory: [],
    brand: [],
    color: [],
    size: [],
  })
  let [sortFilter, setSortFilter] = useState("Latest")
  let [search, setSearch] = useState("")

  let MaincategoryStateData = useSelector(state => state.MaincategoryStateData)
  let SubcategoryStateData = useSelector(state => state.SubcategoryStateData)
  let BrandStateData = useSelector(state => state.BrandStateData)
  let ProductStateData = useSelector(state => state.ProductStateData)

  let dispatch = useDispatch()

  function getFilterSelect(key, value) {
    let arr = filter[key]
    if (arr.includes(value))
      arr = arr.filter(x => x !== value)
    else
      arr.push(value)

    setFilter({ ...filter, [key]: arr })
    applyFilter({ ...filter, [key]: arr })
  }


  function applyFilter(filter) {
    let items = ProductStateData.filter(x => x.status && (
      (filter.maincategory.length === 0 || filter.maincategory.includes(x.maincategory)) &&
      (filter.subcategory.length === 0 || filter.subcategory.includes(x.subcategory)) &&
      (filter.brand.length === 0 || filter.brand.includes(x.brand)) &&
      (filter.color.length === 0 || new Set(filter.color).intersection(new Set(x.color)).size > 0) &&
      (filter.size.length === 0 || new Set(filter.size).intersection(new Set(x.size)).size > 0)
    ))
    applySortFilter(sortFilter, items)
  }

  function applySearchFilter(search) {
    let ch = search.toLocaleLowerCase()
    let items = ProductStateData.filter(x => x.status && (
      (x.name?.toLocaleLowerCase().includes(ch)) ||
      (x.maincategory?.toLocaleLowerCase() === ch) ||
      (x.subcategory?.toLocaleLowerCase() === ch) ||
      (x.brand?.toLocaleLowerCase() === ch) ||
      (x.color?.find(x => x.toLocaleLowerCase() === ch))
    ))
    applySortFilter(sortFilter, items)
  }

  function applySortFilter(filter, data) {
    if (filter === "Latest")
      data = data.sort((x, y) => y.id.localeCompare(x.id))
    else if (filter === "Price : Low to High")
      data = data.sort((x, y) => x.finalPrice - y.finalPrice)
    else
      data = data.sort((x, y) => y.finalPrice - x.finalPrice)

    setData(data)
    setSortFilter(filter)
  }

  useEffect(() => {
    (() => dispatch(getMaincategory()))()
  }, [MaincategoryStateData.length])

  useEffect(() => {
    (() => dispatch(getSubcategory()))()
  }, [SubcategoryStateData.length])

  useEffect(() => {
    (() => dispatch(getBrand()))()
  }, [BrandStateData.length])

  useEffect(() => {
    (() => {
      dispatch(getProduct())
      if (ProductStateData.length) {
        setData(ProductStateData.filter(x => x.status))
      }
    })()
  }, [ProductStateData.length])
  return (
    <>
      <Breadcrum title="Shop" />

      <div className="container-fluid my-3">
        <div className="row">
          <div className="col-md-3">
            <ul className="list-group mb-3">
              <li className="list-group-item active" aria-disabled="true">Maincaegory</li>
              {MaincategoryStateData.filter(x => x.status).map(item => {
                return <li key={item.id} onClick={() => getFilterSelect('maincategory', item.name)} className="list-group-item">{item.name} {filter.maincategory.includes(item.name) ? <i className='bi bi-check float-end'></i> : null}</li>
              })}
            </ul>
            <ul className="list-group mb-3">
              <li className="list-group-item active" aria-disabled="true">Subcaegory</li>
              {SubcategoryStateData.filter(x => x.status).map(item => {
                return <li key={item.id} onClick={() => getFilterSelect('subcategory', item.name)} className="list-group-item">{item.name} {filter.subcategory.includes(item.name) ? <i className='bi bi-check float-end'></i> : null}</li>
              })}
            </ul>
            <ul className="list-group mb-3">
              <li className="list-group-item active" aria-disabled="true">Brand</li>
              {BrandStateData.filter(x => x.status).map(item => {
                return <li key={item.id} onClick={() => getFilterSelect('brand', item.name)} className="list-group-item">{item.name} {filter.brand.includes(item.name) ? <i className='bi bi-check float-end'></i> : null}</li>
              })}
            </ul>
            <ul className="list-group mb-3">
              <li className="list-group-item active" aria-disabled="true">Color</li>
              {colors.map((item, index) => {
                return <li key={index} onClick={() => getFilterSelect('color', item)} className="list-group-item">{item} {filter.color.includes(item) ? <i className='bi bi-check float-end'></i> : null}</li>
              })}
            </ul>
            <ul className="list-group mb-3">
              <li className="list-group-item active" aria-disabled="true">Size</li>
              {sizes.map((item, index) => {
                return <li key={index} onClick={() => getFilterSelect('size', item)} className="list-group-item">{item} {filter.size.includes(item) ? <i className='bi bi-check float-end'></i> : null}</li>
              })}
            </ul>
          </div>
          <div className="col-md-9">
            <div className="row">
              <div className="col-md-8 mb-3">
                <form onSubmit={(e) => {
                  e.preventDefault()
                  applySearchFilter(search)
                }}>
                  <div className="btn-group w-100">
                    <input type="search" name="search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder='Search Products By Name, Category, Brand and Color Etc' className='form-control border-primary' />
                    <button type="submit" className='btn btn-primary'>Search</button>
                  </div>
                </form>
              </div>
              <div className="col-md-4 mb-3">
                <select className='form-select border-primary' onChange={(e) => applySortFilter(e.target.value, data)}>
                  <option>Latest</option>
                  <option>Price : Low to High</option>
                  <option>Price : High to Low</option>
                </select>
              </div>
            </div>

            <div className="row">
              {data.map(item => {
                return <div className='col-xl-4 col-sm-6' key={item.id}>
                  <SingleProduct item={item} />
                </div>
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
