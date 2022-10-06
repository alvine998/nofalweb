import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { crestec_logo, img1, logo_biru } from "../../assets";
import { useNavigate } from 'react-router-dom';
import "./login.css";
import axios from "axios";

export default function Login() {
  const [payload, setPayload] = useState()
  const navigate = useNavigate()
  const onchange = (e) => {
    setPayload({ ...payload, [e.target.name]: e.target.value })
  }

  const setSession = async (data) => {
    await localStorage.setItem('logSession', JSON.stringify(data))
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
      const result = await axios.post(`http://localhost:6001/users/auth`, payloadData, { withCredentials: false, headers: { 'Access-Control-Allow-Origin': '*' } })
      if (result) {
        Swal.fire({
          text: "Login Successfull",
          icon: "success"
        })
        console.log(result.data.result);
        setSession(result.data.result)
        navigate('/main/dashboard')
        return
      }

    } catch (error) {
      Swal.fire({
        text: "Username atau password salah!",
        icon: "error"
      })
      navigate('/login')
      console.log(error);
      return
    }

  }

  return (
    <div className="bg-blue" style={{paddingInline:500, overflowY:"hidden"}}>
      <div className="box2">
        <h2 className="text-center mt-5">Login Admin Crestec</h2>
        <form onSubmit={onLogin} action="#">
          <div>
            <label className="form-label">Username</label>
            <input onChange={onchange} placeholder="johndoe@domain.com" value={payload?.username} name="username" className="form-control" required />
          </div>
          <div>
            <label className="form-label mt-2">Password</label>
            <input onChange={onchange} placeholder="********" value={payload?.password} name="password" type={'password'} className="form-control" required />
          </div>
          <button className="btn btn-primary w-100 mt-3" type={'submit'}>Login</button>
        </form>
        <div className="mt-3">
          <p className="text-center">
            Belum punya akun? <a href="/register" className="text-decoration-none text-primary">Daftar sekarang!</a>
          </p>
        </div>
      </div>
    </div >
  );
}
