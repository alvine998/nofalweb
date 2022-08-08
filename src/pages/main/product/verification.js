import React, { useEffect, useState } from 'react'
import Layout from '../../../components/Layout'
import { Breadcrumb, Button, Modal, Table, Nav } from 'react-bootstrap'
import axios from 'axios'
import { toMoney } from '../../../utilities'
import Swal from 'sweetalert2'

const VerificationProduct = () => {
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
                url = `http://localhost:6001/products?search=${search || ''}&verified=2`
            } else {
                url = `http://localhost:6001/products?search=${search || ''}&verified=0`
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
                    <h2 style={{ fontSize: 24 }}>Verifikasi Produk</h2>
                    <Breadcrumb>
                        <Breadcrumb.Item href="/main/dashboard">Dashboard</Breadcrumb.Item>
                        <Breadcrumb.Item active>Produk</Breadcrumb.Item>
                        <Breadcrumb.Item active>Verifikasi Produk</Breadcrumb.Item>
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
                                        <th>LT / LB (m2)</th>
                                        <th className='text-center'>Deskripsi</th>
                                        <th className='text-center'>No Sertifikat</th>
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
                                                    <td>{data?.type_name}</td>
                                                    <td>{data?.surface_area} / {data?.build_area}</td>
                                                    <td className='text-center'>{data?.description || "-"}</td>
                                                    <td className='text-center'>{data?.certificate_no || "-"}</td>
                                                    <td className='text-center'>
                                                        <Button onClick={() => { setToggle(true) }} variant='primary' size='sm'>Lihat</Button>
                                                        &nbsp;
                                                        <Button className='' onClick={() => { }} variant='success' size='sm'>Aktifkan</Button>
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
                                    <th>LT / LB (m2)</th>
                                    <th className='text-center'>Deskripsi</th>
                                    <th className='text-center'>No Sertifikat</th>
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
                                                <td>{data?.type_name}</td>
                                                <td>{data?.surface_area} / {data?.build_area}</td>
                                                <td className='text-center'>{data?.description || "-"}</td>
                                                <td className='text-center'>{data?.certificate_no || "-"}</td>
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
                verified: 1
            }
            const result = await axios.patch(`http://localhost:6001/products/update/verification?id=${data?.id}`, payload, {
                withCredentials: false,
                headers: { 'x-admin-token': session?.token, 'Access-Control-Allow-Origin': '*' }
            })
            reloadData()
            setToggle(!toggle)
            Swal.fire({
                text: "Berhasil Verifikasi Produk",
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
                        Detail Produk
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <img src={`${data?.image1 || ''}`} className='w-100' />
                    <p>
                        Nama Produk : {data?.title || '-'} <br />
                        Alamat : {data?.address || '-'} <br />
                        Tipe : {data?.type_name || '-'} <br />
                        LT / LB (m2) : {(data?.surface_area || '-') + " / " + (data?.build_area || '-')} <br />
                        No Sertifikat : {data?.certificate_no || '-'} <br />
                        Fasilitas : {data?.facilities || '-'} <br />
                        Fitur Utama : {data?.main_feature || '-'} <br />
                        Area Parkir : {data?.parking_area || '-'} <br />
                        Harga : Rp{toMoney(data?.price) || '-'} <br />
                        Harga per meter : Rp{toMoney(data?.price_permeter) || '-'} <br />
                        Lokasi Map : <a href={`https://www.google.com/maps/@${data?.latitude || ''},${data?.longitude || ''},13z`}>Lihat Lokasi</a> <br />
                    </p>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant='success' onClick={verification}>Verifikasi</Button>
                    <Button variant='danger' onClick={active}>Tolak</Button>
                    <Button variant='warning' onClick={() => setToggle(!toggle)}>Tutup</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default VerificationProduct