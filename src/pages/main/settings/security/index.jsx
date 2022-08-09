import { UserIcon } from '@heroicons/react/solid'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Breadcrumb } from 'react-bootstrap'
import Swal from 'sweetalert2'
import Layout from '../../../../components/Layout'
import './security.css'

export default function Security() {
    const [payload, setPayload] = useState()
    const [session, setSession] = useState()
    const [data, setData] = useState()
    const getSession = async () => {
        const data = await JSON.parse(localStorage.getItem('logSession'))
        const session = await JSON.parse(localStorage.getItem('session'))
        setSession(session)
        setData(data)
    }
    const onUpdate = async (e) => {
        try {
            e.preventDefault()
            if (payload?.password !== payload?.cPassword) {
                Swal.fire({
                    text: "Password tidak sesuai!",
                    icon: "error"
                })
            }
            const payloadData = {
                password: payload?.password,
                id: data?.id
            }
            const result = await axios.post(`http://localhost:6001/admins/change/password`, payloadData, {
                withCredentials: false,
                headers: { 'x-admin-token': session?.token, 'Access-Control-Allow-Origin': '*' }
            })
            Swal.fire({
                text: "Berhasil ubah password",
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
                            <h2>Keamanan</h2>
                            <Breadcrumb>
                                <Breadcrumb.Item href="/main/dashboard">Dashboard</Breadcrumb.Item>
                                <Breadcrumb.Item active>Settings</Breadcrumb.Item>
                                <Breadcrumb.Item active>Kemanan</Breadcrumb.Item>
                            </Breadcrumb>
                            <div>
                                <form onSubmit={onUpdate} action="#">
                                    <div className='mt-4'>
                                        <label className='form-label'>Password Baru</label>
                                        <input type={"password"} className="form-control" placeholder="********" onChange={onchange} name="password" value={payload?.password} required />
                                    </div>
                                    <div className='mt-2'>
                                        <label className='form-label'>Konfirmasi Password Baru</label>
                                        <input type={"password"} className="form-control" placeholder="********" onChange={onchange} name="cPassword" value={payload?.cPassword} required />
                                    </div>
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
