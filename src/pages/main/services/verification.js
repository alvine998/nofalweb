import React, { useEffect, useState } from 'react'
import Layout from '../../../components/Layout'
import { Breadcrumb, Button, Modal, Table, Nav } from 'react-bootstrap'
import axios from 'axios'
import { toMoney } from '../../../utilities'
import Swal from 'sweetalert2'

const VerificationServices = () => {
    const [search, setSearch] = useState()
    const [session, setSession] = useState()
    const [product, setProduct] = useState([])
    const [status, setStatus] = useState()
    const [tab, setTab] = useState(false)
    const [toggle, setToggle] = useState(false)
    const [dataToggle, setDataToggle] = useState()

    const getSession = async () => {
        const data = await JSON.parse(localStorage.getItem('logSession'))
        const session = await JSON.parse(localStorage.getItem('session'))
        setSession(session)
        getProduct(session)
    }

    const getProduct = async (session) => {
        try {
            let url = ''
            if (tab) {
                url = `http://localhost:6001/services/list?search=${search || ''}&status=2`
            } else {
                url = `http://localhost:6001/services/list?search=${search || ''}&status=0`
            }
            const result = await axios.get(url, {
                withCredentials: false,
                headers: { 'x-admin-token': session?.token, 'Access-Control-Allow-Origin': '*' }
            })
            setProduct(result.data)
            console.log(result.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getSession()
    }, [search, status, tab])
    return (
        <>
            <Layout>
                <div>
                    <h2 style={{ fontSize: 24 }}>Verifikasi Jasa</h2>
                    <Breadcrumb>
                        <Breadcrumb.Item href="/main/dashboard">Dashboard</Breadcrumb.Item>
                        <Breadcrumb.Item active>Jasa</Breadcrumb.Item>
                        <Breadcrumb.Item active>Verifikasi Jasa</Breadcrumb.Item>
                    </Breadcrumb>
                    <div className='row'>
                        <div className='col-md'>

                        </div>
                        <div className='col-md'>

                        </div>
                        <div className='col-md'>

                        </div>
                        <div className='col-md'>
                            <input type={'text'} placeholder="Cari disini..." onChange={(e) => { setSearch(e.target.value) }} value={search} className="form-control" />
                        </div>
                    </div>

                    <Nav variant="tabs" defaultActiveKey={["waiting"]}>
                        <Nav.Item>
                            <Nav.Link eventKey={'waiting'} onClick={() => setTab(false)}>Menunggu Persetujuan</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey={'rejected'} onClick={() => setTab(true)}>Produk Ditolak</Nav.Link>
                        </Nav.Item>
                    </Nav>

                    {
                        tab ? (
                            <Table striped bordered hover responsive className='mt-2'>
                                <thead>
                                    <tr className='justify-content-center align-items-center'>
                                        <th>No</th>
                                        <th>Nama Produk</th>
                                        <th>Alamat</th>
                                        <th>Tipe</th>
                                        <th>Biaya</th>
                                        <th className='text-center'>Deskripsi</th>
                                        <th className='text-center'>Nama Perusahaan</th>
                                        <th className='text-center'>Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        product.length > 0 ?
                                            product.map((data, index) => (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{data?.title}</td>
                                                    <td>{data?.address}</td>
                                                    <td>{data?.type}</td>
                                                    <td>Rp{toMoney(data?.price)}</td>
                                                    <td className='text-center'>{data?.description || "-"}</td>
                                                    <td className='text-center'>{data?.company_name || "-"}</td>
                                                    <td className='text-center'>
                                                        <Button onClick={() => { setToggle(true); setDataToggle(data) }} variant='primary' size='sm'>Lihat</Button>
                                                    </td>
                                                </tr>
                                            )) : <div className='p-4'>
                                                <p>Data tidak ditemukan</p>
                                            </div>
                                    }
                                </tbody>
                            </Table>
                        ) : <Table striped bordered hover responsive className='mt-2'>
                            <thead>
                                <tr className='justify-content-center align-items-center'>
                                    <th>No</th>
                                    <th>Nama Produk</th>
                                    <th>Alamat</th>
                                    <th>Tipe</th>
                                    <th>Biaya</th>
                                    <th className='text-center'>Deskripsi</th>
                                    <th className='text-center'>Nama Perusahaan</th>
                                    <th className='text-center'>Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    product.length > 0 ?
                                        product.map((data, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{data?.title}</td>
                                                <td>{data?.address}</td>
                                                <td>{data?.type}</td>
                                                <td>Rp{toMoney(data?.price)}</td>
                                                <td className='text-center'>{data?.description || "-"}</td>
                                                <td className='text-center'>{data?.company_name || "-"}</td>
                                                <td className='text-center'>
                                                    <Button onClick={() => { setToggle(true); setDataToggle(data) }} variant='primary' size='sm'>Lihat</Button>
                                                </td>
                                            </tr>
                                        )) : <div className='p-4'>
                                            <p>Data tidak ditemukan</p>
                                        </div>
                                }
                            </tbody>
                        </Table>
                    }
                    {
                        toggle ? <ViewProduct session={session} toggle={toggle} setToggle={setToggle} data={dataToggle} reloadData={getSession} /> : ""
                    }
                </div>
            </Layout>
        </>
    )
}

const ViewProduct = ({ toggle, setToggle, data, active, session, reloadData }) => {
    const verification = async () => {
        try {
            const payload = {
                status: 1
            }
            const result = await axios.patch(`http://localhost:6001/services/update/verification?id=${data?.id}`, payload, {
                withCredentials: false,
                headers: { 'x-admin-token': session?.token, 'Access-Control-Allow-Origin': '*' }
            })
            reloadData()
            setToggle(!toggle)
            Swal.fire({
                text: "Berhasil Verifikasi Progress",
                icon: "success"
            })
        } catch (error) {
            console.log(error);
        }
    }

    const reject = async () => {
        try {
            const payload = {
                status: 2
            }
            const result = await axios.patch(`http://localhost:6001/services/update/verification?id=${data?.id}`, payload, {
                withCredentials: false,
                headers: { 'x-admin-token': session?.token, 'Access-Control-Allow-Origin': '*' }
            })
            reloadData()
            setToggle(!toggle)
            Swal.fire({
                text: "Berhasil Tolak Progress",
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
                <Modal.Header >
                    <Modal.Title id="contained-modal-title-vcenter">
                        Detail Jasa
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <img src={`${data?.images1 || ''}`} className='w-100' />
                    <img src={`${data?.images2 || ''}`} className='w-100' />
                    <img src={`${data?.images3 || ''}`} className='w-100' />
                    <img src={`${data?.images4 || ''}`} className='w-100' />
                    <p>
                        Nama Jasa : {data?.title || '-'} <br />
                        Alamat : {data?.address || '-'} <br />
                        Tipe : {data?.type || '-'} <br />
                        Biaya : {toMoney(data?.price)} <br />
                        Deskripsi : {data?.description || '-'} <br />
                        Nama Perusahaan : {data?.company_name || '-'} <br />
                    </p>

                </Modal.Body>
                <Modal.Footer>
                    {
                        data?.status == 2 ? (
                            <>
                                <Button variant='success' onClick={verification}>Aktifkan</Button>
                                <Button variant='warning' onClick={() => setToggle(!toggle)}>Tutup</Button>
                            </>
                        ) : (
                            <>
                                <Button variant='success' onClick={verification}>Verifikasi</Button>
                                <Button variant='danger' onClick={reject}>Tolak</Button>
                                <Button variant='warning' onClick={() => setToggle(!toggle)}>Tutup</Button>
                            </>
                        )
                    }
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default VerificationServices