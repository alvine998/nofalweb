import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Form, Modal, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Input, InputArea, Select } from '../../../components/Input';
import Layout from '../../../components/Layout'
import { jsPDF } from 'jspdf'
import { logo_biru } from '../../../assets';

const JobList = () => {

    const [show, setShow] = useState(false)
    const [payload, setPayload] = useState()
    const [selected, setSelected] = useState()
    const [user, setuser] = useState()
    const [listJobs, setListJobs] = useState([])
    const [toggle, setToggle] = useState(false)

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
            const result = await axios.get(`http://localhost:6001/jobs/list`)
            setListJobs(result.data)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getSession()
    }, [])

    const handleOptions = [
        { value: 'EDP', label: "EDP" },
        { value: 'Service', label: "Service" },
        { value: 'Maintenance', label: "Maintenance" },
        { value: 'Sendiri', label: "Sendiri" },
    ]

    const SoftwareOptions = [
        { value: '', label: 'Detail Software' },
        { value: 'OS/Office', label: 'OS/Office' },
        { value: 'Anti Virus', label: 'Anti Virus' },
        { value: 'OPIS Sistem', label: 'OPIS Sistem' },
        { value: 'ACCPAC', label: 'ACCPAC' },
    ]

    const HardwareOptions = [
        { value: '', label: 'Detail Hardware' },
        { value: 'CPU', label: 'CPU' },
        { value: 'Monitor', label: 'Monitor' },
        { value: 'Masalah Printer', label: 'Masalah Printer' },
        { value: 'Lainnya', label: 'Lainnya' },
    ]

    const PrinterOptions = [
        { value: '', label: 'Detail Printer' },
        { value: 'Paper Jam', label: 'Paper Jam' },
        { value: 'Head Printer', label: 'Head Printer' },
        { value: 'Lainnya', label: 'Lainnya' }
    ]

    const approval = async (id) => {
        const data = {
            status: 1
        }
        console.log(data)
        try {
            const result = await axios.patch(`http://localhost:6001/jobs/status?id=${id}`, data, { headers: 'Access-Control-Allow-Origin : *', withCredentials: false })
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
            status: 2
        }
        console.log(data)
        try {
            const result = await axios.patch(`http://localhost:6001/jobs/status?id=${id}`, data, { headers: 'Access-Control-Allow-Origin : *', withCredentials: false })
            setShow(false)
            setPayload()
            Swal.fire({
                text: "Data Berhasil Ditolak",
                icon: "success"
            })
            getData()
        } catch (error) {
            console.log(error);
            Swal.fire({
                text: "Data Gagal Ditolak",
                icon: "error"
            })
        }
    }

    const ondone = async (id, name) => {
        const data = {
            accepted_by: name,
            result: payload?.result,
            work_by: payload?.work_by,
            notes: payload?.notes,
            status: 3
        }
        try {
            const result = await axios.patch(`http://localhost:6001/jobs/done?id=${id}`, data, { headers: 'Access-Control-Allow-Origin : *', withCredentials: false })
            setToggle(false)
            setPayload()
            Swal.fire({
                text: "Data Berhasil Diupdate",
                icon: "success"
            })
            getData()
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

    const handleChange = (e) => {
        setPayload({ ...payload, [e.target.name]: e.target.value })
    }

    const resultOptions = [
        { value: '', label: 'Pilih Hasil' },
        { value: 'Ok', label: 'Ok' },
        { value: 'Not Ok', label: 'Not Ok' },
    ]

    return (
        <>
            <Layout>
                <div style={{ padding: 20 }}>
                    <h2 style={{ fontSize: 30 }}>List Job Request</h2>
                    <div style={{ padding: 20 }}>

                        <div>
                            <Table striped bordered hover responsive className='mt-2'>
                                <thead>
                                    <tr className='justify-content-center align-items-center'>
                                        <th>No</th>
                                        <th>Pemohon</th>
                                        <th>Dept</th>
                                        <th>Subject</th>
                                        <th>Detail</th>
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
                                                <td>{value?.req_by}</td>
                                                <td>{value?.dept}</td>
                                                <td>{value?.subject}</td>
                                                <td>{value?.detail}</td>
                                                <td>{value?.notes}</td>
                                                <td>{value?.status == 0 ? 'Menunggu' : value?.status == 1 ? 'Disetujui' : value?.status == 3 ? 'Selesai' : value?.status == 3 ? 'Selesai' : 'Ditolak'}</td>
                                                <td>
                                                    {
                                                        value?.status == 0 ?
                                                            <button onClick={() => { setShow(true); setPayload(value) }} className='btn btn-warning btn-sm w-100'>Lihat</button>
                                                            :
                                                            value?.status == 1 ?
                                                                <button onClick={() => { setToggle(true); setPayload(value) }} className='btn btn-warning btn-sm w-100'>Update</button>
                                                                : value?.status == 3 ?
                                                                    <button onClick={() => { print(value) }} className='btn btn-warning btn-sm w-100'>Print</button>
                                                                    : ''
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
                                            <Modal.Title>Update Data Job Request</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            <Form>
                                                {/* <Input title={"Request By"} defaultValue={payload?.} placeholder="Nama Pengguna" name={"req_by"} handleChange={handleChange} /> */}
                                                <input type='hidden' name='user_id' value={user?.id} onChange={handleChange} />
                                                <Select data={resultOptions} defaultValue={payload?.result} name="result" title={"Hasil"} required handleChange={handleChange} />
                                                <Select title={"Diperbaiki/Dipasang Oleh"} name={"work_by"} handleChange={handleChange} data={handleOptions} />
                                                <InputArea title={"Keterangan"} placeholder="Silahkan Tulis Keterangan Disini" name={"notes"} handleChange={handleChange} />
                                            </Form>
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
                                <Modal.Title>Detail Data Job Request</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form>
                                    <p>Request By : {payload?.req_by}</p>
                                    <p>Dept/Section : {payload?.dept}</p>
                                    <p>Subject : {payload?.subject}</p>
                                    <p>Detail : {payload?.detail}</p>
                                    <p>Keterangan : {payload?.notes}</p>
                                </Form>
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

export default JobList