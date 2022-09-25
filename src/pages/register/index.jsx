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

  useEffect(() => {
    getSession()
  }, [])

  const onLogin = (e) => {
    e.preventDefault()
    if (payload?.password.length < 8) {
      Swal.fire({
        text: "Your Password less than 8 character",
        icon: "warning"
      })
      return
    }
    Swal.fire({
      text: "Register Successfull",
      icon: "success"
    })
    navigate('/verification')
  }

  const divisionOptions = [
    { value: '', label: 'Pilih Divisi' },
    { value: 'Acc & Fin', label: 'Acc & Fin' },
    { value: 'Binding', label: 'Binding' },
    { value: 'EHS', label: 'EHS' },
    { value: 'Finishing', label: 'Finishing' },
    { value: 'Gluing', label: 'Gluing' },
    { value: 'HRD & GA, Legal', label: 'HRD & GA, Legal' },
    { value: 'ISO', label: 'ISO' },
    { value: 'PPIC', label: 'PPIC' },
    { value: 'Pre Press', label: 'Pre Press' },
    { value: 'Produksi', label: 'Produksi' },
    { value: 'Purchase', label: 'Purchase' },
    { value: 'WH FG', label: 'WH FG' },
    { value: 'WH Material', label: 'WH Material' },
    { value: 'QA & QC', label: 'QA & QC' },
    { value: 'IT', label: 'IT' },
  ]

  return (
    <div className="bg-blue" style={{ paddingInline: 500, overflowY:"hidden" }}>
      <div className="box2">
        <h2 className="text-center mt-2">Pendaftaran</h2>
        <form onSubmit={onLogin} action="#">
          <div>
            <label className="form-label">Nama Lengkap</label>
            <input onChange={onchange} placeholder="John Doe" value={payload?.fullname} name="fullname" type={'text'} className="form-control" required />
          </div>
          <div>
            <label className="form-label mt-2">Divisi</label>
            <select className='form-select'>
              {
                divisionOptions?.map((value, index) => <option key={index} value={value?.value}>{value?.label}</option>)
              }
            </select>
          </div>
          <div>
            <label className="form-label mt-2">Jenis Kelamin</label>
            <select className='form-select'>
              <option value={""}>Pilih Jenis Kelamin</option>
              <option value={"laki-laki"}>Laki-laki</option>
              <option value={"perempuan"}>Perempuan</option>
            </select>
          </div>
          <div>
            <label className="form-label mt-2">Nama Pengguna</label>
            <input onChange={onchange} value={payload?.username} placeholder="johndoe@domain.com" name="username" type={'text'} className="form-control" required />
          </div>
          <div>
            <label className="form-label mt-2">Email</label>
            <input onChange={onchange} value={payload?.email} placeholder="johndoe@domain.com" name="email" type={'email'} className="form-control" required />
          </div>
          <div>
            <label className="form-label mt-2">Password</label>
            <input onChange={onchange} placeholder="********" value={payload?.password} name="password" type={'password'} className="form-control" required />
          </div>
          <button className="btn btn-primary w-100 mt-3" type={'submit'}>Daftar</button>
        </form>
        <div className="mt-3">
          <p className="text-center">
            Sudah punya akun? <a href="/login" className="text-decoration-none text-primary">Login sekarang!</a>
          </p>
        </div>
      </div>
    </div>
  )
}
