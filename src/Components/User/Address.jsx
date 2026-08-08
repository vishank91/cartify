import React, { useEffect, useState } from 'react'

const dataOptions = {
  name: "",
  email: "",
  phone: "",
  address: "",
  pin: "",
  city: "",
  state: "",
}
export default function Address() {
  let [data, setData] = useState({ ...dataOptions })
  let [option, setOption] = useState({
    showModal: false
  })

  let [user, setUser] = useState({
    address: []
  })

  function createRecord() {
    setOption({
      type: "Create",
      showModal: true
    })
    setData({ ...dataOptions })
  }

  function updateRecord(index) {
    setOption({
      type: "Update",
      showModal: true,
      index: index
    })
    setData({ ...user.address[index] })
  }

  function getInputData(e) {
    let { name, value } = e.target
    setData({ ...data, [name]: value })
  }

  async function postData(e) {
    e.preventDefault()
    let address = user.address ?? []
    if (option.type === "Create")
      address.push({ ...data })
    else
      address[option.index] = { ...data }


    setUser({ ...user, address: address })
    let response = await fetch(`${import.meta.env.VITE_APP_BACKEND_SERVER}/user/${user.id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({ ...user, address: address })
    })
    response = await response.json()
    setOption({ ...option, showModal: false })
  }

  async function deleteRecord(index) {
    if (window.confirm("Are You Sure You Want to Delete That Record : ")) {
      let address = user.address
      address.splice(index, 1)
      setUser({ ...user, address: address })
      let response = await fetch(`${import.meta.env.VITE_APP_BACKEND_SERVER}/user/${user.id}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({ ...user, address: address })
      })
      response = await response.json()
    }
  }

  useEffect(() => {
    (async () => {
      let response = await fetch(`${import.meta.env.VITE_APP_BACKEND_SERVER}/user/${localStorage.getItem("userid")}`, {
        method: "GET",
        headers: {
          "content-type": "application/json"
        }
      })
      response = await response.json()
      setUser({ ...response, address: response.address ?? [] })
    })()
  }, [])
  return (
    <>
      <div className="mb-3">
        <button className='btn btn-primary float-end' onClick={createRecord}>Add New</button>
      </div>
      <div className='mt-5'>
        {user.address?.map((item, index) => {
          return <div className='card p-3' key={index}>
            <h5>{item.name}</h5>
            <h6>{item.email},{item.phone}</h6>
            <p>{item.address}</p>
            <p>{item.pin}, {item.city}, {item.state}</p>

            <div className="btn-group position-absolute end-0">
              <button className='btn btn-primary btn-sm' onClick={() => updateRecord(index)}><i className='bi bi-pencil-square'></i></button>
              <button className='btn btn-danger btn-sm' onClick={() => deleteRecord(index)}><i className='bi bi-trash'></i></button>
            </div>
          </div>
        })}
      </div>


      <div className={`modal fade ${option.showModal ? 'show d-block' : 'd-none'}`} id="exampleModal">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">{option.type} Record</h5>
              <button type="button" className="btn-close" onClick={() => setOption({ ...option, showModal: false })}></button>
            </div>
            <form onSubmit={postData}>
              <div className="modal-body">
                <div className="row">

                  <div className="col-12 mb-1">
                    <label>Name*</label>
                    <input type="text" name="name" value={data.name} onChange={getInputData} placeholder='Full Name' className='form-control border-primary' required />
                  </div>

                  <div className="col-md-6 mb-1">
                    <label>Email*</label>
                    <input type="email" name="email" value={data.email} onChange={getInputData} placeholder='Email Address' className='form-control border-primary' required />
                  </div>

                  <div className="col-md-6 mb-1">
                    <label>Phone*</label>
                    <input type="text" name="phone" value={data.phone} onChange={getInputData} placeholder='Phone Number' className='form-control border-primary' required />
                  </div>

                  <div className="col-12 mb-1">
                    <label>Address*</label>
                    <textarea name="address" value={data.address} onChange={getInputData} placeholder='Address' className='form-control border-primary' required />
                  </div>

                  <div className="col-md-4 mb-1">
                    <label>Pin Code*</label>
                    <input type="text" name="pin" value={data.pin} onChange={getInputData} placeholder='Pin Code' className='form-control border-primary' required />
                  </div>

                  <div className="col-md-4 mb-1">
                    <label>City Name*</label>
                    <input type="text" name="city" value={data.city} onChange={getInputData} placeholder='City Name' className='form-control border-primary' required />
                  </div>

                  <div className="col-md-4 mb-1">
                    <label>State Name*</label>
                    <input type="text" name="state" value={data.state} onChange={getInputData} placeholder='State Name' className='form-control border-primary' required />
                  </div>

                </div>
              </div>
              <div className="modal-footer">
                <button type="submit" className="btn btn-primary w-100">{option.type}</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
