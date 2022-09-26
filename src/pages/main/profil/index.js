import { UserIcon } from '@heroicons/react/solid'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import Layout from '../../../components/Layout'

const Profil = ({ navigate }) => {
    const [user, setuser] = useState({})

    const getSession = async () => {
        const data = await JSON.parse(localStorage.getItem('logSession'))
        console.log("Session : ", data);
        if (!data) {
            return navigate("/")
        } else {
            setuser(data)
        }
    }

    useEffect(() => {
        getSession()
    }, [])
    return (
        <div>
            <Layout>
                <div style={{ padding: 20 }}>
                    <h2 style={{ fontSize: 30 }}>Profil Pengguna</h2>
                </div>
                <div style={{ padding: 40 }}>
                    <Row style={{ marginInline: 200 }}>
                        <Col>
                            <UserIcon height={250} width={250} color={"black"} />
                        </Col>
                        <Col style={{ marginTop: 20 }}>
                            <div>
                                <label className='form-label'>Username</label>
                                <input className='form-control' placeholder='Username' value={user?.username} readOnly />
                            </div>
                            <div style={{ marginTop: 10 }}>
                                <label className='form-label'>Nama Lengkap</label>
                                <input className='form-control' placeholder='Nama Lengkap' value={user?.fullname} readOnly />
                            </div>
                            <div style={{ marginTop: 10 }}>
                                <label className='form-label'>Divisi</label>
                                <input className='form-control' placeholder='Divisi' readOnly value={user?.division} />
                            </div>
                            <div style={{ marginTop: 10 }}>
                                <label className='form-label'>Jenis Kelamin</label>
                                <input className='form-control' placeholder='Jenis Kelamin' value={user?.gender == "L" ? "Laki-laki" : "Perempuan"} readOnly />
                            </div>
                            <div style={{ marginTop: 10 }}>
                                <label className='form-label'>Email</label>
                                <input className='form-control' placeholder='Email Pengguna' value={user?.email} readOnly />
                            </div>
                        </Col>
                    </Row>
                </div>
            </Layout>
        </div>
    )
}

export default Profil