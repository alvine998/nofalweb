import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { img1 } from "../../assets";
import { useNavigate } from 'react-router-dom';
import "./login.css";
import axios from "axios";

export default function Login() {
  const [payload, setPayload] = useState()
  const navigate = useNavigate()
  const onchange = (e) => {
    setPayload({ ...payload, [e.target.name]: e.target.value })
  }

  const setSession = async (data, session) => {
    await localStorage.setItem('logSession', JSON.stringify(data))
    await localStorage.setItem('session', JSON.stringify(session))
  }

  const getSession = async () => {
    const data = await JSON.parse(localStorage.getItem('logSession'))
    console.log(data);
    if (data !== null) {
      navigate("/main/dashboard")
    }
  }

  useEffect(() => {
    getSession()
  }, [])

  const onLogin = async (e) => {
    try {
      e.preventDefault()
      const payloadData = {
        ...payload
      }
      console.log('====================================');
      console.log(payloadData);
      console.log('====================================');
      const result = await axios.post(`https://api.rajawali-pro.kinikumuda.id/admins/auth`, payloadData, { withCredentials: false, headers: { 'Access-Control-Allow-Origin': '*' } })
      if (result) {
        Swal.fire({
          text: "Login Successfull",
          icon: "success"
        })
        console.log(result.data.result);
        setSession(result.data.result, result.data.session)
        navigate('/main/dashboard')
        return
      }

    } catch (error) {
      Swal.fire({
        text: "Email atau password salah!",
        icon: "error"
      })
      navigate('/')
      console.log(error);
      return
    }

  }

  return (
    <div className="bg-blue">
      <div className="row g-0">
        <div className="col">
          <div className="box">
            <h2 className="text-center mt-5 text-white">Crestec Indonesia</h2>
            <div>
              <p className="text-white text-center">
                Dashboard for administrator
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
            {/* <div className="mt-3">
              <p className="text-center">
                Didn't have account? <a href="/register" className="text-decoration-none text-primary">Register now!</a>
              </p>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
