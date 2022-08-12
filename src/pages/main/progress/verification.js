import React, { useEffect, useState } from 'react'
import Layout from '../../../components/Layout'
import { Breadcrumb, Button, Modal, Table, Nav } from 'react-bootstrap'
import axios from 'axios'
import { toMoney } from '../../../utilities'
import Swal from 'sweetalert2'

const VerificationProgress = () => {
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
                url = `https://api.rajawali-pro.kinikumuda.id/progress/list?search=${search || ''}&verified=2`
            } else {
                url = `https://api.rajawali-pro.kinikumuda.id/progress/list?search=${search || ''}&verified=0`
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
                    <h2 style={{ fontSize: 24 }}>Verifikasi Progress</h2>
                    <Breadcrumb>
                        <Breadcrumb.Item href="/main/dashboard">Dashboard</Breadcrumb.Item>
                        <Breadcrumb.Item active>Progress</Breadcrumb.Item>
                        <Breadcrumb.Item active>Verifikasi Progress</Breadcrumb.Item>
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
                            <Nav.Link eventKey={'rejected'} onClick={() => setTab(true)}>Progress Ditolak</Nav.Link>
                        </Nav.Item>
                    </Nav>

                    {
                        tab ? (
                            <Table striped bordered hover responsive className='mt-2'>
                                <thead>
                                    <tr className='justify-content-center align-items-center'>
                                        <th>No</th>
                                        <th className='text-center'>Product Id</th>
                                        <th className='text-center'>Tipe Produk</th>
                                        <th className='text-center'>Deskripsi</th>
                                        <th className='text-center'>Tanggal Progress</th>
                                        <th className='text-center'>Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        product.length > 0 ?
                                            product.map((data, index) => (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td className='text-center'>{data?.product_id}</td>
                                                    <td className='text-center'>{data?.product_type}</td>
                                                    <td className='text-center'>{data?.description || "-"}</td>
                                                    <td className='text-center'>{data?.created_on.substr(0, 10) || "-"}</td>
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
                                    <th className='text-center'>Product Id</th>
                                    <th className='text-center'>Tipe Produk</th>
                                    <th className='text-center'>Deskripsi</th>
                                    <th className='text-center'>Tanggal Progress</th>
                                    <th className='text-center'>Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    product.length > 0 ?
                                        product.map((data, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td className='text-center'>{data?.product_id}</td>
                                                <td className='text-center'>{data?.product_type}</td>
                                                <td className='text-center'>{data?.description || "-"}</td>
                                                <td className='text-center'>{data?.created_on.substr(0, 10) || "-"}</td>
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

const ViewProduct = ({ toggle, setToggle, data, session, reloadData }) => {
    const verification = async () => {
        try {
            const payload = {
                verified: 1
            }
            const result = await axios.patch(`https://api.rajawali-pro.kinikumuda.id/progress/update/verification?id=${data?.id}`, payload, {
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
                verified: 2
            }
            const result = await axios.patch(`https://api.rajawali-pro.kinikumuda.id/progress/update/verification?id=${data?.id}`, payload, {
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
                        Detail Progress
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <img src={`${data?.images1 || ''}`} className='w-100' />
                    <img src={`${data?.images2 || ''}`} className='w-100' />
                    <img src={`${data?.images3 || ''}`} className='w-100' />
                    <img src={`${data?.images4 || ''}`} className='w-100' />
                    <img src={`${data?.images5 || ''}`} className='w-100' />

                    <p>
                        Produk Id : {data?.product_id || '-'} <br />
                        Tipe Produk : {data?.product_type || '-'} <br />
                        Deskripsi : {data?.description || '-'} <br />
                        Tanggal Proses : {data?.created_on.substr(0, 10) || '-'} <br />
                    </p>

                </Modal.Body>
                <Modal.Footer>
                    {
                        data?.verified == 2 ? (
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

export default VerificationProgress