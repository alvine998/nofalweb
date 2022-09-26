import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Form, Modal, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Input, InputArea, Select } from '../../../components/Input';
import Layout from '../../../components/Layout'

const JobList = () => {

    const [show, setShow] = useState(false)
    const [payload, setPayload] = useState()
    const [selected, setSelected] = useState()
    const [user, setuser] = useState()
    const [listJobs, setListJobs] = useState([])

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

    const subjectOptions = [
        { value: 'Masalah Hardware Preventif', label: "Masalah Hardware Preventif" },
        { value: 'Masalah Software', label: "Masalah Software" },
        { value: 'Masalah Printer', label: "Masalah Printer" },
        { value: 'Masalah Lainnya', label: "Masalah Lainnya" },
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

    const save = async () => {
        const data = {
            ...payload,
            subject: selected,
            user_id: user?.id
        }
        console.log(data)
        try {
            const result = await axios.post(`http://localhost:6001/jobs/`, data, { headers: 'Access-Control-Allow-Origin : *', withCredentials: false })
            setShow(false)
            setPayload()
            Swal.fire({
                text: "Berhasil Menyimpan Data",
                icon: "success"
            })
            getData()
        } catch (error) {
            console.log(error);
            Swal.fire({
                text: "Gagal Menyimpan Data",
                icon: "error"
            })
        }
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
                                                <td>
                                                    <button onClick={()=>{setShow(true); setPayload(value)}} className='btn btn-warning btn-sm w-100'>Lihat</button>
                                                    <div className='mt-1' />
                                                    <button className='btn btn-danger btn-sm w-100'>Hapus</button>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </Table>
                        </div>

                        <Modal show={show} onHide={() => { setShow(!show) }}>
                            <Modal.Header closeButton>
                                <Modal.Title>Detail Data Job Request</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form>
                                    <Input title={"Request By"} defaultValue={payload?.req_by} placeholder="Nama Pengguna" name={"req_by"} handleChange={handleChange} />
                                    <input type='hidden' name='user_id' value={user?.id} onChange={handleChange} />
                                    <Select data={divisionOptions} defaultValue={payload?.dept} name="dept" title={"Dept/Section"} required handleChange={handleChange} />
                                    <Select title={"Subject"} name={"subject"} handleChange={(e) => setSelected(e.target.value)} data={subjectOptions} value={selected} />
                                    {
                                        selected !== 'Masalah Lainnya' ?
                                            <Select title={"Detail"} name={"detail"} handleChange={handleChange} data={selected == 'Masalah Software' ? SoftwareOptions : selected == 'Masalah Printer' ? PrinterOptions : HardwareOptions} />
                                            : ''
                                    }
                                    <InputArea title={"Keterangan"} value={payload?.notes} placeholder="Silahkan Tulis Keterangan Disini" name={"notes"} handleChange={handleChange} />
                                </Form>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={() => { setShow(!show) }}>
                                    Batalkan
                                </Button>
                                <Button variant="danger">
                                    Tolak
                                </Button>
                                <Button variant="success">
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