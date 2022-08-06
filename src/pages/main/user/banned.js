import React, { useEffect, useState } from 'react'
import Layout from '../../../components/Layout'
import './user.css'
import Table from 'react-bootstrap/Table'
import Nav from 'react-bootstrap/Nav'
import axios from 'axios'
import { Breadcrumb, Button, Modal } from 'react-bootstrap'
import Swal from 'sweetalert2'

const BannedUser = () => {
    const [user, setUser] = useState([])
    const [search, setSearch] = useState()
    const [role, setRole] = useState()
    const [dataToggle, setDataToggle] = useState()
    const [toggle, setToggle] = useState()
    const [session, setSession] = useState()

    const getSession = async () => {
        const data = await JSON.parse(localStorage.getItem('logSession'))
        const session = await JSON.parse(localStorage.getItem('session'))
        setSession(session)
        getDataUser(session)
    }

    const getDataUser = async (session) => {
        try {
            const result = await axios.get(`http://localhost:6001/users/list/banned?search=${search || ''}&role=${role || ''}`, {
                withCredentials: false,
                headers: { 'x-admin-token': session?.token, 'Access-Control-Allow-Origin': '*' }
            })
            setUser(result.data)
            console.log(result.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getSession()
    }, [search, role])

    return (
        <>
            <Layout>
                <h2 style={{ fontSize: 24 }}>Data Pengguna</h2>
                <Breadcrumb>
                    <Breadcrumb.Item href="/main/dashboard">Dashboard</Breadcrumb.Item>
                    <Breadcrumb.Item active>Pengguna</Breadcrumb.Item>
                    <Breadcrumb.Item active>Data Pengguna</Breadcrumb.Item>
                </Breadcrumb>
                <div className='row'>
                    <div className='col-md'>

                    </div>
                    <div className='col-md'>

                    </div>
                    <div className='col-md'>
                        <select onChange={(e) => setRole(e.target.value)} value={role} className='form-select'>
                            <option value={""}>Semua Posisi</option>
                            <option value={"customer"}>Customer</option>
                            <option value={"partner"}>Mitra</option>
                        </select>
                    </div>
                    <div className='col-md'>
                        <input type={'text'} placeholder="Cari disini..." onChange={(e) => { setSearch(e.target.value) }} value={search} className="form-control" />
                    </div>
                </div>
                <Table striped bordered hover className='mt-2'>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Nama</th>
                            <th>No Telepon</th>
                            <th>Alamat</th>
                            <th>Posisi</th>
                            <th className='text-center'>Keterangan</th>
                            <th className='text-center'>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            user.map((data, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{data?.name}</td>
                                    <td>{data?.phone}</td>
                                    <td>{data?.address}</td>
                                    <td>{data?.role == 'partner' ? 'Mitra' : 'Customer'}</td>
                                    <td className='text-center'>{data?.description || "-"}</td>
                                    <td className='text-center'>
                                        <Button onClick={() => { setToggle(true); setDataToggle(data) }} variant='success' size='sm'>Aktifkan</Button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
                {
                    toggle ?
                        <ActiveOne session={session} data={dataToggle} toggle={toggle} setToggle={setToggle} reloadData={getSession} /> : ""
                }
            </Layout>
        </>
    )
}

const ActiveOne = ({ session, data, toggle, setToggle, reloadData }) => {
    const active = async () => {
        const payload = {
            id: data?.id,
            deleted: 0
        }
        try {
            const result = await axios.post(`http://localhost:6001/users/update/status`, payload, {
                withCredentials: false,
                headers: { 'x-admin-token': session.token, 'Access-Control-Allow-Origin': '*' }
            })
            console.log(result.data);
            reloadData()
            setToggle(!toggle)
            Swal.fire({
                text: "Berhasil Mengaktifkan Pengguna",
                icon: "success"
            })
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <Modal
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={toggle}
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Aktifkan Pengguna
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        Apakah anda yakin ingin mengaktifkan {data?.name} ?
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='success' onClick={active}>Aktifkan</Button>
                    <Button variant='warning' onClick={() => setToggle(!toggle)}>Tutup</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default BannedUser