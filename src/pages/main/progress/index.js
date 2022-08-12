import React, { useEffect, useState } from 'react'
import Layout from '../../../components/Layout'
import { Breadcrumb, Button, Modal, Table } from 'react-bootstrap'
import axios from 'axios'
import { toMoney } from '../../../utilities'
import Swal from 'sweetalert2'

const ProgressPage = () => {
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
            const result = await axios.get(`https://api.rajawali-pro.kinikumuda.id/progress/list?search=${search || ''}&verified=1`, {
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
                    <h2 style={{ fontSize: 24 }}>Data Progress</h2>
                    <Breadcrumb>
                        <Breadcrumb.Item href="/main/dashboard">Dashboard</Breadcrumb.Item>
                        <Breadcrumb.Item active>Progress</Breadcrumb.Item>
                        <Breadcrumb.Item active>Data Progress</Breadcrumb.Item>
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
                                <th className='text-center'>Product Id</th>
                                <th className='text-center'>Tipe Produk</th>
                                <th className='text-center'>Deskripsi</th>
                                <th className='text-center'>Tanggal Progress</th>
                                <th className='text-center'>Gambar</th>
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
                                            <td className='text-center'>
                                                <Button className='' onClick={() => { setRejectToggle(true); setDataToggle(data) }} variant='danger' size='sm'>Hapus</Button>
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
            const result = await axios.delete(`https://api.rajawali-pro.kinikumuda.id/progress/delete?id=${data?.id}`, { withCredentials: false, headers: { 'x-admin-token': session?.token, 'Access-Control-Allow-Origin': '*' } })
            setToggle(!toggle)
            reloadData()
            Swal.fire({
                text: "Berhasil Hapus Produk",
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
                        Hapus Progress
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        Apakah anda yakin ingin menghapus progress ini ?
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
                        Detail Progress
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <img src={`${data?.images1 || ''}`} className='w-100' />
                    <img src={`${data?.images2 || ''}`} className='w-100' />
                    <img src={`${data?.images3 || ''}`} className='w-100' />
                    <img src={`${data?.images4 || ''}`} className='w-100' />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='warning' onClick={() => setToggle(!toggle)}>Tutup</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ProgressPage