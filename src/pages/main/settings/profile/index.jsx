import { UserIcon } from '@heroicons/react/solid'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Breadcrumb } from 'react-bootstrap'
import Swal from 'sweetalert2'
import Layout from '../../../../components/Layout'
import './profile.css'

export default function Profile() {
  const [payload, setPayload] = useState()
  const [session, setSession] = useState()
  const [data, setData] = useState()
  const getSession = async () => {
    const data = await JSON.parse(localStorage.getItem('logSession'))
    const session = await JSON.parse(localStorage.getItem('session'))
    setSession(session)
    setPayload(data)

  }
  const onUpdate = async (e) => {
    try {
      e.preventDefault()
      const payloadData = {
        ...payload
      }
      const result = await axios.patch(`https://api.rajawali-pro.kinikumuda.id/admins/update`, payloadData, {
        withCredentials:false,
        headers: { 'x-admin-token': session?.token, 'Access-Control-Allow-Origin': '*' }
      })
      Swal.fire({
        text: "Login Successfull",
        icon: "success"
      })
    } catch (error) {
      console.log(error);
    }
  }
  const onchange = (e) => setPayload({ ...payload, [e.target.name]: e.target.value })
  useEffect(() => {
    getSession()
  }, [])
  return (
    <Layout>
      <div className='container mb-2'>
        <div className='row'>
          <div className='col-md'>
            <div className='box-profile-1'>
              <h2>Profil</h2>
              <Breadcrumb>
                <Breadcrumb.Item href="/main/dashboard">Dashboard</Breadcrumb.Item>
                <Breadcrumb.Item active>Settings</Breadcrumb.Item>
                <Breadcrumb.Item active>Profil</Breadcrumb.Item>
              </Breadcrumb>
              <div>
                <form onSubmit={onUpdate} action="#">
                  <div className='mt-4'>
                    <label className='form-label'>Nama Lengkap</label>
                    <input type={"text"} className="form-control" placeholder="John Doe" onChange={onchange} name="name" value={payload?.name} required />
                  </div>
                  <div className='mt-2'>
                    <label className='form-label'>Email</label>
                    <input type={"email"} className="form-control" placeholder="johndoe@domain.com" onChange={onchange} name="email" value={payload?.email} required />
                  </div>
                  <div className='mt-2'>
                    <label className='form-label'>No Telepon</label>
                    <input type={"number"} className="form-control" placeholder="08xxxxxxxxx" onChange={onchange} name="phone" value={payload?.phone} required />
                  </div>
                  {/* <div className='mt-2'>
                    <label className='form-label'>Deskripsi (Optional)</label>
                    <textarea className="form-control" placeholder="Ketik disini..." onChange={onchange} rows={4} name="about" value={payload?.about} />
                  </div> */}
                  <div className='mt-3'>
                    <button type='submit' className='btn btn-primary w-100'>Save</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          {/* <div className='col-md'>
            <div className='box-profile-2'>
              <h2>Profile Picture</h2>
              <div className='mt-5'>
                <div className='box-profile-image'>
                  {
                    payload?.picture ? <img className='w-100 h-100 image-style' /> :
                    <UserIcon color='gray'/>
                  }
                </div>
                <center className='mt-3'>
                  <button className='btn btn-primary w-50'>Change Profile Picture</button>
                </center>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </Layout>
  )
}
