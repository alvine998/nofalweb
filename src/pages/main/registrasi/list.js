import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Modal, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Input, InputArea, Select } from '../../../components/Input';
import Layout from '../../../components/Layout'
import { jsPDF } from 'jspdf'
import { useRef } from 'react';
import ReactToPrint from 'react-to-print';
import { PrintComponentRegis } from '../../../components/Print/PrintRegis';

const PrintWrapper = ({ item }) => {
    const componentRef = useRef()

    return (
        <>
            <ReactToPrint
                trigger={() => <button className='btn btn-warning btn-sm w-100'>Print</button>}
                content={() => componentRef.current}
            />
            <PrintComponentRegis ref={componentRef} data={item} />
        </>
    )
}

const ListRegisPenyimpanan = () => {

    const [show, setShow] = useState(false)
    const [payload, setPayload] = useState()
    const [selected, setSelected] = useState()
    const [selectedStatus, setSelectedStatus] = useState()
    const [listJobs, setListJobs] = useState([])
    const [toggle, setToggle] = useState(false)
    const [editToggle, setEditToggle] = useState(false)
    const [accToggle, setAccToggle] = useState(false)
    const [user, setuser] = useState()

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
    }

    const getData = async (id) => {
        try {
            const result = await axios.get(`http://localhost:6001/storages/list?user_id=${id}`)
            setListJobs(result.data)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getSession()
    }, [])

    const approval = async (id) => {
        const data = {
            status: 1,
            modified_on: new Date()
        }
        console.log(data)
        try {
            const result = await axios.patch(`http://localhost:6001/storages/status?id=${id}`, data, { headers: 'Access-Control-Allow-Origin : *', withCredentials: false })
            setShow(false)
            setPayload()
            Swal.fire({
                text: "Data Berhasil Disetujui",
                icon: "success"
            })
            getSession()
        } catch (error) {
            console.log(error);
            Swal.fire({
                text: "Data Gagal Disetujui",
                icon: "error"
            })
        }
    }

    const reject = async (id) => {
        const data = {
            status: 2,
            modified_on: new Date()
        }
        console.log(data)
        try {
            const result = await axios.patch(`http://localhost:6001/storages/status?id=${id}`, data, { headers: 'Access-Control-Allow-Origin : *', withCredentials: false })
            setShow(false)
            setPayload()
            Swal.fire({
                text: "Data Berhasil Ditolak",
                icon: "success"
            })
            getSession()
        } catch (error) {
            console.log(error);
            Swal.fire({
                text: "Data Gagal Ditolak",
                icon: "error"
            })
        }
    }

    const ondone = async (id) => {
        const data = {
            work_by: payload?.work_by,
            notes: payload?.notes,
            status: 3,
            modified_on: new Date()
        }
        try {
            const result = await axios.patch(`http://localhost:6001/storages/done?id=${id}`, data, { headers: 'Access-Control-Allow-Origin : *', withCredentials: false })
            setToggle(false)
            setPayload()
            Swal.fire({
                text: "Data Berhasil Diupdate",
                icon: "success"
            })
            getSession()
        } catch (error) {
            console.log(error);
            Swal.fire({
                text: "Data Gagal Diupdate",
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

    const handleOptions = [
        { value: 'EDP', label: "EDP" },
        { value: 'Service', label: "Service" },
        { value: 'Maintenance', label: "Maintenance" },
        { value: 'Sendiri', label: "Sendiri" },
    ]

    const logging = () => {
        const data = {
            ...payload,
            status: selected,
            subject: selectedStatus
        }
        console.log(data);
    }
    const handleChange = (e) => {
        setPayload({ ...payload, [e.target.name]: e.target.value })
    }

    return (
        <>
            <Layout>
                <div style={{ padding: 20 }}>
                    <h2 style={{ fontSize: 30 }}>List Email Request</h2>
                    <div style={{ padding: 20 }}>

                        <div>
                            <Table striped bordered hover responsive className='mt-2'>
                                <thead>
                                    <tr className='justify-content-center align-items-center'>
                                        <th>No</th>
                                        <th>Jenis Regis</th>
                                        <th>Nama PIC</th>
                                        <th>Dept</th>
                                        <th>Status Perangkat</th>
                                        <th>Tanggal</th>
                                        <th>Keterangan</th>
                                        <th>Status</th>
                                        <th>Opsi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        listJobs?.map((value, i) => (
                                            <tr key={i}>
                                                <td>{i + 1}</td>
                                                <td>{value?.type}</td>
                                                <td>{value?.pic_name}</td>
                                                <td>{value?.dept}</td>
                                                <td>{value?.device_status}</td>
                                                <td>{value?.created_on.substr(0, 10)}</td>
                                                <td>{value?.detail}</td>
                                                <td>{value?.status == 0 ? 'Menunggu' : value?.status == 1 ? 'Disetujui' : value?.status == 3 ? 'Selesai' : 'Ditolak'}</td>
                                                <td>
                                                    {
                                                        value?.status == 0 ?
                                                            <button onClick={() => { setShow(true); setPayload(value) }} className='btn btn-warning btn-sm w-100'>Lihat</button>
                                                            :
                                                            value?.status == 1 ?
                                                                <button onClick={() => { setToggle(true); setPayload(value) }} className='btn btn-warning btn-sm w-100'>Update</button>
                                                                : value?.status == 3 ?
                                                                    <>
                                                                        <PrintWrapper item={value} key={i} />
                                                                    </> : ''
                                                    }
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </Table>
                        </div>

                        {
                            toggle ? (
                                <>
                                    <Modal show={toggle} onHide={() => { setToggle(!toggle) }}>
                                        <Modal.Header closeButton>
                                            <Modal.Title>Update Data Registrasi Penyimpanan</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            {/* <Input title={"Request By"} defaultValue={payload?.} placeholder="Nama Pengguna" name={"req_by"} handleChange={handleChange} /> */}
                                            <input type='hidden' name='user_id' value={user?.id} onChange={handleChange} />
                                            <Select title={"Diperbaiki/Dipasang Oleh"} name={"work_by"} handleChange={handleChange} data={handleOptions} />
                                            <InputArea title={"Keterangan"} placeholder="Silahkan Tulis Keterangan Disini" name={"notes"} handleChange={handleChange} />
                                        </Modal.Body>
                                        <Modal.Footer>
                                            <Button variant="secondary" onClick={() => { setToggle(!toggle) }}>
                                                Batalkan
                                            </Button>
                                            <Button variant="primary" onClick={() => { ondone(payload?.id, user?.fullname) }} >
                                                Selesai
                                            </Button>
                                        </Modal.Footer>
                                    </Modal>
                                </>
                            ) : ''
                        }

                        <Modal show={show} onHide={() => { setShow(!show) }}>
                            <Modal.Header closeButton>
                                <Modal.Title>Detail Data Registrasi Penyimpanan</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <p>Dept/Section : {payload?.dept}</p>
                                <p>Jenis Regis : {payload?.type}</p>
                                <p>Nama PIC : {payload?.pic_name}</p>
                                <p>Status Perangkat : {payload?.device_status}</p>
                                <p>Keterangan : {payload?.detail}</p>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={() => { setShow(!show) }}>
                                    Batalkan
                                </Button>
                                <Button onClick={() => { reject(payload?.id) }} variant="danger">
                                    Tolak
                                </Button>
                                <Button onClick={() => { approval(payload?.id) }} variant="success">
                                    Terima
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </div>
                </div>
            </Layout>
        </>
    )
}

export default ListRegisPenyimpanan