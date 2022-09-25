import { UserIcon } from '@heroicons/react/solid'
import React, { useState } from 'react'
import { Button, Col, Form, Nav, Row } from 'react-bootstrap'
import { Input } from '../../../components/Input'
import Layout from '../../../components/Layout'

const EditProfil = () => {
    const [tabs, setTabs] = useState([true, false])
    const [payload, setPayload] = useState()

    const handleChange = (e) => {
        setPayload({ ...payload, [e.target.name]: e.target.value })
    }

    const submitted = () => {
        console.log(payload);
    }

    return (
        <div>
            <Layout>
                <div style={{ padding: 20 }}>
                    <h2 style={{ fontSize: 30 }}>Pengaturan Akun</h2>
                </div>
                <div style={{ padding: 40 }}>
                    <Nav fill variant="tabs" defaultActiveKey="1">
                        <Nav.Item>
                            <Nav.Link eventKey="1" onClick={() => { setTabs([true, false]) }}>Edit Profil</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="2" onClick={() => { setTabs([false, true]) }}>Ubah Kata Sandi</Nav.Link>
                        </Nav.Item>
                    </Nav>
                    {
                        tabs[0] ?
                            <div style={{ marginTop: 40 }}>
                                <Row style={{ marginInline: 200 }}>
                                    <Col>
                                        <UserIcon height={250} width={250} color={"black"} />
                                    </Col>
                                    <Col style={{ marginTop: 20 }}>
                                        <Form>
                                            <Input title={"Username"} name="username" handleChange={handleChange} placeholder="Masukkan username" />
                                            <Input title={"Nama Lengkap"} name="fullname" handleChange={handleChange} placeholder="Masukkan nama lengkap" />
                                            <Input title={"Divisi"} name="division" handleChange={handleChange} placeholder="Masukkan divisi" />
                                            <Input title={"Jenis Kelamin"} name="gender" handleChange={handleChange} placeholder="Masukkan jenis kelamin" />
                                            <Input title={"Email"} name="email" handleChange={handleChange} placeholder="Masukkan email pengguna" />
                                            <div>
                                                <button className='btn btn-sm btn-primary w-100 mt-5' >Simpan</button>
                                            </div>
                                        </Form>
                                    </Col>
                                </Row>
                            </div>
                            :
                            <div style={{ marginTop: 40 }}>
                                <Row style={{ marginInline: 200 }}>
                                    <Col>
                                        <UserIcon height={250} width={250} color={"black"} />
                                        <div>
                                            <h2 style={{ marginLeft: 70, fontSize: 24 }}>Username</h2>
                                        </div>
                                    </Col>
                                    <Col style={{ marginTop: 20 }}>
                                        <Form onSubmit={submitted} action="#">
                                            <Input title={"Kata Sandi Lama"} name="password" handleChange={handleChange} placeholder="Masukkan kata sandi lama" />
                                            <Input title={"Kata Sandi Baru"} name="new_password" handleChange={handleChange} placeholder="Masukkan kata sandi baru" />
                                            <Input title={"Konfirmasi Kata Sandi Lama"} name="confirm_password" handleChange={handleChange} placeholder="Masukkan konfirmasi kata sandi baru" />
                                            <div>
                                                <a style={{float:"right"}} href="#">Lupa kata sandi?</a>
                                            </div>
                                            <div>
                                                <Button type='submit' className='w-100 mt-5' size='sm' >Simpan</Button>
                                            </div>
                                        </Form>
                                    </Col>
                                </Row>
                            </div>
                    }

                </div>
            </Layout>
        </div>
    )
}

export default EditProfil