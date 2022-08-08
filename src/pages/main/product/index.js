import React, { useEffect, useState } from 'react'
import Layout from '../../../components/Layout'
import { Breadcrumb, Button, Modal, Table } from 'react-bootstrap'
import axios from 'axios'
import { toMoney } from '../../../utilities'
import Swal from 'sweetalert2'

const ProductPage = () => {
    const [search, setSearch] = useState()
    const [session, setSession] = useState()
    const [product, setProduct] = useState([])
    const [status, setStatus] = useState()
    const [toggle, setToggle] = useState(false)
    const [rejectToggle, setRejectToggle] = useState(false)
    const [dataToggle, setDataToggle] = useState()


    const getSession = async () => {
        const data = await JSON.parse(localStorage.getItem('logSession'))
        const session = await JSON.parse(localStorage.getItem('session'))
        setSession(session)
        getProduct(session)
    }

    const getProduct = async (session) => {
        try {
            const result = await axios.get(`http://localhost:6001/products/?search=${search || ''}&status=${status || ''}`, {
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
    }, [search, status])
    return (
        <>
            <Layout>
                <div>
                    <h2 style={{ fontSize: 24 }}>Data Produk</h2>
                    <Breadcrumb>
                        <Breadcrumb.Item href="/main/dashboard">Dashboard</Breadcrumb.Item>
                        <Breadcrumb.Item active>Produk</Breadcrumb.Item>
                        <Breadcrumb.Item active>Data Produk</Breadcrumb.Item>
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
                                                <Button onClick={() => { setToggle(true); setDataToggle(data) }} variant='primary' size='sm'>Lihat</Button>
                                                &nbsp;
                                                <Button className='mt-1' onClick={() => { setRejectToggle(true); setDataToggle(data) }} variant='danger' size='sm'>Hapus</Button>

                                            </td>
                                        </tr>
                                    )) : <div className='p-4'>
                                        <p>Data tidak ditemukan</p>
                                    </div>
                            }
                        </tbody>
                    </Table>
                    <ViewProduct session={session} toggle={toggle} setToggle={setToggle} data={dataToggle} />
                    <RejectProduct session={session} toggle={rejectToggle} setToggle={setRejectToggle} data={dataToggle} reloadData={getSession} />
                </div>
            </Layout>
        </>
    )
}

const RejectProduct = ({ toggle, setToggle, data, active, session, reloadData }) => {
    const reject = async () => {
        try {

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
                        Hapus Produk
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        Apakah anda yakin ingin menghapus produk {data?.title} ?
                    </p>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant='danger' onClick={reject}>Hapus</Button>
                    <Button variant='warning' onClick={() => setToggle(!toggle)}>Tutup</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

const ViewProduct = ({ toggle, setToggle, data }) => {
    useEffect(() => {

    }, [data])
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
                    {/* <Button variant='success' onClick={verification}>Verifikasi</Button>
                    <Button variant='danger' onClick={active}>Tolak</Button> */}
                    <Button variant='warning' onClick={() => setToggle(!toggle)}>Tutup</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ProductPage