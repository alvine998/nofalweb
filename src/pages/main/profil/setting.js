import { UserIcon } from '@heroicons/react/solid'
import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { Button, Col, Form, Nav, Row } from 'react-bootstrap'
import Swal from 'sweetalert2'
import { Input, Select } from '../../../components/Input'
import Layout from '../../../components/Layout'

const EditProfil = ({ navigate }) => {
    const [tabs, setTabs] = useState([true, false])
    const [payload, setPayload] = useState()

    const [user, setuser] = useState({})

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

    const genderOptions = [
        { value: '', label: 'Silahkan Pilih' },
        { value: 'L', label: 'Laki-laki' },
        { value: 'P', label: 'Perempuan' }
    ]

    const getSession = async () => {
        const data = await JSON.parse(localStorage.getItem('logSession'))
        console.log("Session : ", data);
        if (!data) {
            return navigate("/")
        }
        getData(data?.id)
        setPayload(data)
    }

    const getData = async (id) => {
        try {
            const result = await axios.get(`http://localhost:6001/users/single?id=${id}`)
            if (result) {
                setuser(result.data)
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getSession()
    }, [])

    const update = async (id) => {
        const data = {
            ...payload,
            id: id
        }
        console.log(data)
        try {
            const result = await axios.patch(`http://localhost:6001/users/`, data, { headers: 'Access-Control-Allow-Origin : *', withCredentials: false })
            setPayload()
            Swal.fire({
                text: "Berhasil Mengubah Data",
                icon: "success"
            })
            getSession()
        } catch (error) {
            console.log(error);
            Swal.fire({
                text: "Gagal Mengubah Data",
                icon: "error"
            })
        }
    }

    const handleChange = (e) => {
        setPayload({ ...payload, [e.target.name]: e.target.value })
    }

    const submitted = (e) => {
        e.preventDefault()
        const data = {
            ...payload
        }
        console.log(data);
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
                                        {console.log("payload : ", payload)}
                                        <Input title={"Username"} defaultValue={payload?.username} name="username" handleChange={handleChange} placeholder="Masukkan username" />
                                        <Input title={"Nama Lengkap"} defaultValue={payload?.fullname} name="fullname" handleChange={handleChange} placeholder="Masukkan nama lengkap" />
                                        <Select data={divisionOptions} value={payload?.division} handleChange={handleChange} name="division" title={"Divisi"} />
                                        <Select data={genderOptions} value={payload?.gender} handleChange={handleChange} name="gender" title={"Jenis Kelamin"} />
                                        <Input title={"Email"} name="email" handleChange={handleChange} defaultValue={payload?.email} placeholder="Masukkan email pengguna" />
                                        <div>
                                            <button onClick={()=>update(payload?.id)} className='btn btn-sm btn-primary w-100 mt-5' >Simpan</button>
                                        </div>
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
                                            <Input title={"Kata Sandi Lama"} name="password" type={'password'} handleChange={handleChange} placeholder="Masukkan kata sandi lama" />
                                            <Input title={"Kata Sandi Baru"} name="new_password" type={'password'} handleChange={handleChange} placeholder="Masukkan kata sandi baru" />
                                            <Input title={"Konfirmasi Kata Sandi Lama"} type={'password'} name="confirm_password" handleChange={handleChange} placeholder="Masukkan konfirmasi kata sandi baru" />
                                            <div>
                                                <a style={{ float: "right" }} href="#">Lupa kata sandi?</a>
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