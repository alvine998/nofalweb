import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import { img1 } from "../../assets";
import './register.css'

export default function Register() {
  const [payload, setPayload] = useState()
  const navigate = useNavigate()

  const onchange = (e) => {
    setPayload({ ...payload, [e.target.name]: e.target.value })
  }

  const getSession = async () => {
    const mail = await localStorage.getItem('logSession')
    console.log(mail);
    if (mail !== null) {
      navigate("/main/dashboard")
    }
  }

  useEffect(()=>{
    getSession()
  },[])

  const onLogin = (e) => {
    e.preventDefault()
    if(payload?.password.length < 8){
      Swal.fire({
        text:"Your Password less than 8 character",
        icon:"warning"
      })
      return
    }
    Swal.fire({
      text:"Register Successfull",
      icon:"success"
    })
    navigate('/verification')
  }

  return (
    <div className="bg-blue">
      <div className="row g-0">
        <div className="col">
          <div className="box">
            <h2 className="text-center mt-5 text-white">CRMFYOU</h2>
            <div>
              <p className="text-white text-center">
                Build your own business!
              </p>
              <div>
                <img src={img1} className="w-100 h-30" />
              </div>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="box2">
            <h2 className="text-center mt-2">Register Here</h2>
            <form onSubmit={onLogin} action="#">
              <div>
                <label className="form-label">Full Name</label>
                <input onChange={onchange} placeholder="John Doe" value={payload?.fullname} name="fullname" type={'text'} className="form-control" required />
              </div>
              <div>
                <label className="form-label mt-2">Email</label>
                <input onChange={onchange} value={payload?.email} placeholder="johndoe@domain.com" name="email" type={'email'} className="form-control" required />
              </div>
              <div>
                <label className="form-label mt-2">Phone Number</label>
                <input onChange={onchange} value={payload?.phone} placeholder="08xxxxxxxx" name="phone" type={'number'} className="form-control" required />
              </div>
              <div>
                <label className="form-label mt-2">Password</label>
                <input onChange={onchange} placeholder="********" value={payload?.password} name="password" type={'password'} className="form-control" required />
              </div>
              <button className="btn btn-primary w-100 mt-3" type={'submit'}>Register</button>
            </form>
            <div className="mt-3">
              <p className="text-center">
                Did you have account? <a href="/" className="text-decoration-none text-primary">Login now!</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
