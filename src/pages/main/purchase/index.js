import { MinusCircleIcon, PlusCircleIcon } from '@heroicons/react/solid';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Alert, Button, Col, Modal, Row, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Input, InputArea, Select } from '../../../components/Input';
import Layout from '../../../components/Layout'
import { jsPDF } from 'jspdf'
import ReactToPrint from 'react-to-print';
import { PrintComponentPurchase } from '../../../components/Print/PrintPurchase';
import { useRef } from 'react';

const PrintWrapper = ({ item }) => {
    const componentRef = useRef()

    return (
        <>
            <ReactToPrint
                trigger={() => <button className='btn btn-primary btn-sm w-100'>Print</button>}
                content={() => componentRef.current}
            />
            <PrintComponentPurchase ref={componentRef} data={item} />
        </>
    )
}

const PurchaseRequest = () => {

    const [show, setShow] = useState(false)
    const [payload, setPayload] = useState()
    const [selected, setSelected] = useState()
    const [selectedStatus, setSelectedStatus] = useState()
    const [listJobs, setListJobs] = useState([])
    const [toggle, setToggle] = useState(false)
    const [editToggle, setEditToggle] = useState(false)
    const [accToggle, setAccToggle] = useState(false)
    const [user, setuser] = useState()
    const [dataJob, setDataJob] = useState([])

    const navigate = useNavigate()
    const getSession = async () => {
        const data = await JSON.parse(localStorage.getItem('logSession'))
        console.log("Session : ", data);
        if (!data) {
            return navigate("/")
        } else {
            setuser(data)
        }
        getData(data?.id)
        getDataJob()
    }

    const getDataJob = async () => {
        try {
            const result = await axios.get(`http://localhost:6001/jobs/list?status=1`)
            setDataJob(result.data)
        } catch (error) {
            console.log(error);
        }
    }

    const getData = async (id) => {
        try {
            const result = await axios.get(`http://localhost:6001/purchases/list`)
            setListJobs(result.data)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getSession()
    }, [])

    const save = async () => {
        if (isNaN(price) || isNaN(estimation)) {
            return alert("Cannot insert NaN value")
        }
        const data = {
            ...payload,
            dept: user?.division,
            req_by: user?.fullname,
            in_kind: payload?.in_kind,
            job_id: payload?.job_id,
            total: total,
            estimation_price: parseFloat(estimation),
            total_price: price,
        }
        console.log(data)
        try {
            const result = await axios.post(`http://localhost:6001/purchases/`, data, { headers: 'Access-Control-Allow-Origin : *', withCredentials: false })
            setShow(false)
            setPayload()
            Swal.fire({
                text: "Berhasil Menyimpan Data",
                icon: "success"
            })
            getSession()
        } catch (error) {
            console.log(error);
            Swal.fire({
                text: "Gagal Menyimpan Data",
                icon: "error"
            })
        }
    }

    const StatusOptions = [
        { value: '', label: 'Silahkan Pilih' },
        { value: 'Internal (Merah)', label: 'Internal (Merah)' },
        { value: 'Internal & Eksternal (Kuning)', label: 'Internal & Eksternal (Kuning)' },
        { value: 'Pribadi (Hijau)', label: 'Pribadi (Hijau)' },
    ]

    const logging = () => {
        const data = {
            ...payload,
            status: selectedStatus
        }
        console.log(data);
    }
    const handleChange = (e) => {
        setPayload({ ...payload, [e.target.name]: e.target.value })
    }

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

    const [total, setTotal] = useState(payload?.total || 0)
    const [price, setPrice] = useState(payload?.total_price || 0)
    const [estimation, setEstimation] = useState(payload?.estimation_price || 0)

    useEffect(() => {
        if (price == NaN) {
            setPrice(0)
        }
        setPrice(parseFloat(total) * parseFloat(estimation))

    }, [total, price, estimation])

    const update = async (id) => {
        const data = {
            ...payload,
            id: id
        }
        console.log(data)
        try {
            const result = await axios.patch(`http://localhost:6001/purchases/`, data, { headers: 'Access-Control-Allow-Origin : *', withCredentials: false })
            setEditToggle(false)
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

    const removing = async (id) => {
        try {
            const result = await axios.delete(`http://localhost:6001/purchases?id=${id}`)
            setPayload()
            setToggle(!toggle)
            Swal.fire({
                text: "Berhasil Menghapus Data",
                icon: "success"
            })
            getSession()
        } catch (error) {
            console.log(error);
            Swal.fire({
                text: "Gagal Menghapus Data",
                icon: "error"
            })
        }
    }

    const print = async (value) => {
        const doc = new jsPDF()

        doc.text("Hello World", 10, 10)
        doc.text(`Date : ${value?.created_on}`, 10, 30)
        doc.text(`Dept / Section : ${value?.dept}`, 10, 40)
        doc.output('dataurlnewwindow');
        // doc.save("a4.pdf")
    }

    return (
        <>
            <Layout>
                <div style={{ padding: 20 }}>
                    <h2 style={{ fontSize: 30 }}>Buat Purchase Request</h2>
                    <div style={{ padding: 20 }}>
                        {/* Button */}
                        <Button size='sm' onClick={() => { setShow(!show); setSelected(); setSelectedStatus() }}>Tambah Data Purchase Request</Button>

                        <div>
                            <Table striped bordered hover responsive className='mt-2'>
                                <thead>
                                    <tr className='justify-content-center align-items-center'>
                                        <th>No</th>
                                        <th>Pemohon</th>
                                        <th>Dept</th>
                                        <th>Pemesanan</th>
                                        <th>Jumlah</th>
                                        <th>Estimasi Harga</th>
                                        <th>Total</th>
                                        {/* <th>Status</th> */}
                                        <th>Opsi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        listJobs?.map((value, i) => (
                                            <tr key={i}>
                                                <td>{i + 1}</td>
                                                <td>{value?.req_by}</td>
                                                <td>{value?.dept}</td>
                                                <td>{value?.in_kind}</td>
                                                <td>{value?.total}</td>
                                                <td>{value?.estimation_price}</td>
                                                <td>{value?.total_price}</td>
                                                {/* <td>{value?.status == 0 ? 'Menunggu' : value?.status == 1 ? 'Disetujui' : value?.status == 3 ? 'Selesai' : 'Ditolak'}</td> */}
                                                <td>
                                                    <>
                                                        <PrintWrapper item={value} key={i} />
                                                    </>
                                                    <div className='mt-1' />
                                                    <button onClick={() => { setEditToggle(!editToggle); setPayload(value) }} className='btn btn-warning btn-sm w-100'>Edit</button>
                                                    <div className='mt-1' />
                                                    <button onClick={() => { setToggle(!toggle); setPayload(value) }} className='btn btn-danger btn-sm w-100'>Hapus</button>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </Table>
                        </div>

                        {
                            editToggle ? (
                                <Modal show={editToggle} onHide={() => { setEditToggle(!editToggle) }}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Edit Data Purchase Request</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <Input title={"Request By"} read={true} value={user?.fullname} placeholder="Masukkan Nama Pengguna" name={"req_by"} handleChange={handleChange} />
                                        <Input title={"Dept/Section"} read={true} value={user?.division} placeholder="Masukkan Divisi" name={"dept"} handleChange={handleChange} />
                                        <label className='form-label mt-2'>Job Request</label>
                                        <select className='form-select' value={payload?.job_id} onChange={handleChange} name="job_id">
                                            <option value="">Pilih Job Request</option>
                                            {
                                                dataJob?.map((val, i) => <option value={val?.id}>{`[0${val?.id}] : ${val?.subject} - ${val?.detail} - ${val?.dept}`}</option>)
                                            }
                                        </select>
                                        <InputArea title={"Kind of Service"} defaultValue={payload?.in_kind} placeholder="Silahkan Tulis Disini" name={"in_kind"} handleChange={handleChange} />
                                        <div style={{ marginTop: 20 }}>
                                            <div className='row g-2'>
                                                <div className='col-md-1'>
                                                    <button onClick={() => { payload?.total < 1 ? setPayload({ ...payload, total: 0 }) : setPayload({ ...payload, total: payload?.total - 1, total_price: (payload?.total - 1) * payload?.estimation_price }) }}>
                                                        <MinusCircleIcon width={30} height={30} />
                                                    </button>
                                                </div>
                                                <div className='col-md-2'>
                                                    <input value={payload?.total || total} style={{ marginLeft: 'auto', marginRight: 'auto' }} readOnly className='form-control text-center' />
                                                </div>
                                                <div className='col-md'>
                                                    <button onClick={() => { setPayload({ ...payload, total: payload?.total + 1, total_price: (payload?.total + 1) * payload?.estimation_price }) }}>
                                                        <PlusCircleIcon width={30} height={30} />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <Input title={"Estimasi Harga"} value={payload?.estimation_price || estimation} placeholder="Rp 0" name={"estimation_price"} handleChange={(e) => { setEstimation(e.target.value) }} />
                                        <Input read={true} title={"Total Harga"} placeholder="Rp 0" value={payload?.total_price || price} name={"total_price"} />
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={() => { setEditToggle(!editToggle) }}>
                                            Batalkan
                                        </Button>
                                        <Button variant="primary" onClick={() => { update(payload?.id) }}>
                                            Simpan
                                        </Button>
                                    </Modal.Footer>
                                </Modal>
                            ) : ""
                        }

                        {
                            toggle ? (
                                <Modal show={toggle} onHide={() => { setToggle(!toggle) }}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Hapus Data Purchase Request</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <p>Anda yakin ingin menghapus data {payload?.in_kind}?</p>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={() => { setToggle(!toggle) }}>
                                            Batalkan
                                        </Button>
                                        <Button variant="danger" onClick={() => { removing(payload?.id) }}>
                                            Hapus
                                        </Button>
                                    </Modal.Footer>
                                </Modal>
                            ) : ""
                        }

                        <Modal show={show} onHide={() => { setShow(!show) }}>
                            <Modal.Header closeButton>
                                <Modal.Title>Tambah Data Purchase Request</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Input title={"Request By"} read={true} value={user?.fullname} placeholder="Masukkan Nama Pengguna" name={"req_by"} handleChange={handleChange} />
                                <Input title={"Dept/Section"} read={true} value={user?.division} placeholder="Masukkan Divisi" name={"dept"} handleChange={handleChange} />
                                <label className='form-label mt-2'>Job Request</label>
                                <select className='form-select' value={payload?.job_id} onChange={handleChange} name="job_id">
                                    <option value="">Pilih Job Request</option>
                                    {
                                        dataJob?.map((val, i) => <option value={val?.id}>{`[0${val?.id}] : ${val?.subject} - ${val?.detail} - ${val?.dept}`}</option>)
                                    }
                                </select>
                                <InputArea title={"Kind of Service"} placeholder="Silahkan Tulis Disini" name={"in_kind"} handleChange={handleChange} />
                                <div style={{ marginTop: 20 }}>
                                    <div className='row g-2'>
                                        <div className='col-md-1'>
                                            <button onClick={() => { total < 1 ? setTotal(0) : setTotal(total - 1) }}>
                                                <MinusCircleIcon width={30} height={30} />
                                            </button>
                                        </div>
                                        <div className='col-md-2'>
                                            <input value={total} style={{ marginLeft: 'auto', marginRight: 'auto' }} readOnly className='form-control text-center' />
                                        </div>
                                        <div className='col-md'>
                                            <button onClick={() => { setTotal(total + 1) }}>
                                                <PlusCircleIcon width={30} height={30} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <Input title={"Estimasi Harga"} value={estimation} placeholder="Rp 0" name={"estimation_price"} handleChange={(e) => { setEstimation(e.target.value) }} />
                                <Input read={true} title={"Total Harga"} placeholder="Rp 0" value={price} name={"total_price"} />
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={() => { setShow(!show) }}>
                                    Batalkan
                                </Button>
                                <Button variant="primary" onClick={() => { save() }}>
                                    Simpan
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </div>
                </div>
            </Layout>
        </>
    )
}

export default PurchaseRequest