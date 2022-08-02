import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { img1 } from "../../assets";
import { useNavigate } from 'react-router-dom';
import "./login.css";

export default function Login() {
  const [payload, setPayload] = useState()
  const navigate = useNavigate()
  const onchange = (e) => {
    setPayload({ ...payload, [e.target.name]: e.target.value })
  }

  const setSession = async(mail) => {
    await localStorage.setItem('logSession', mail)
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
    if (payload?.email === 'alvinecom@crmapp.id' && payload?.password === '12121212') {
      Swal.fire({
        text: "Login Successfull",
        icon: "success"
      })
      setSession(payload?.email)
      navigate('/main/dashboard')
    } else {
      Swal.fire({
        text: "Login Failed",
        icon: "error"
      })
      navigate('/')
      console.log('====================================');
      console.log(payload);
      console.log('====================================');
    }
  }

  return (
    <div className="bg-blue">
      <div className="row g-0">
        <div className="col">
          <div className="box">
            <h2 className="text-center mt-5 text-white">CRMFYOU</h2>
            <div>
              <p className="text-white text-center">
                Manage your data customer here!
              </p>
              <div>
                <img src={img1} className="w-100 h-30" />
              </div>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="box2">
            <h2 className="text-center mt-5">Login Here</h2>
            <form onSubmit={onLogin} action="#">
              <div>
                <label className="form-label">Email</label>
                <input onChange={onchange} placeholder="johndoe@domain.com" value={payload?.email} name="email" type={'email'} className="form-control" required />
              </div>
              <div>
                <label className="form-label mt-2">Password</label>
                <input onChange={onchange} placeholder="********" value={payload?.password} name="password" type={'password'} className="form-control" required />
              </div>
              <button className="btn btn-primary w-100 mt-3" type={'submit'}>Login</button>
            </form>
            <div className="mt-3">
              <p className="text-center">
                Didn't have account? <a href="/register" className="text-decoration-none text-primary">Register now!</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
