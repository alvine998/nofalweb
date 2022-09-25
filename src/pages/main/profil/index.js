import { UserIcon } from '@heroicons/react/solid'
import React from 'react'
import { Col, Row } from 'react-bootstrap'
import Layout from '../../../components/Layout'

const Profil = () => {
    return (
        <div>
            <Layout>
                <div style={{ padding: 20 }}>
                    <h2 style={{ fontSize: 30 }}>Profil Pengguna</h2>
                </div>
                <div style={{ padding: 40 }}>
                    <Row style={{marginInline: 200 }}>
                        <Col>
                            <UserIcon height={250} width={250} color={"black"} />
                        </Col>
                        <Col style={{ marginTop: 20 }}>
                            <input className='form-control' placeholder='Username' readOnly />
                            <input className='form-control' placeholder='Nama Lengkap' readOnly style={{ marginTop: 10 }} />
                            <input className='form-control' placeholder='Divisi' readOnly style={{ marginTop: 10 }} />
                            <input className='form-control' placeholder='Jenis Kelamin' readOnly style={{ marginTop: 10 }} />
                            <input className='form-control' placeholder='Email Pengguna' readOnly style={{ marginTop: 10 }} />
                        </Col>
                    </Row>
                </div>
            </Layout>
        </div>
    )
}

export default Profil