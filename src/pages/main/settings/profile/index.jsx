import { UserIcon } from '@heroicons/react/solid'
import React, { useState } from 'react'
import Layout from '../../../../components/Layout'
import './profile.css'

export default function Profile({ session }) {
  const [payload, setPayload] = useState()
  const onchange = (e) => setPayload({ ...payload, [e.target.name]: e.target.value })
  return (
    <Layout>
      <div className='container mb-2'>
        <div className='row'>
          <div className='col-md'>
            <div className='box-profile-1'>
              <h2>Profile</h2>
              <p>
                You can change your account profile here
              </p>
              <div>
                <form>
                  <div className='mt-4'>
                    <label className='form-label'>Full Name</label>
                    <input type={"text"} className="form-control" placeholder="John Doe" onChange={onchange} name="fullname" value={payload?.fullname} required />
                  </div>
                  <div className='mt-2'>
                    <label className='form-label'>Email</label>
                    <input type={"email"} className="form-control" placeholder="johndoe@domain.com" onChange={onchange} name="email" value={payload?.email} required />
                  </div>
                  <div className='mt-2'>
                    <label className='form-label'>Phone Number</label>
                    <input type={"number"} className="form-control" placeholder="08xxxxxxxxx" onChange={onchange} name="phone" value={payload?.phone} required />
                  </div>
                  <div className='mt-2'>
                    <label className='form-label'>About Me (Optional)</label>
                    <textarea className="form-control" placeholder="Type here..." onChange={onchange} rows={4} name="about" value={payload?.about} />
                  </div>
                  <div className='mt-3'>
                    <button type='submit' className='btn btn-primary w-100'>Save</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className='col-md'>
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
          </div>
        </div>
      </div>
    </Layout>
  )
}
