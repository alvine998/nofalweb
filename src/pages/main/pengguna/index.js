import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Form, Modal, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Input, InputArea, Select } from '../../../components/Input';
import Layout from '../../../components/Layout'

const ListUser = () => {

    const [show, setShow] = useState(false)
    const [payload, setPayload] = useState()
    const [selected, setSelected] = useState()
    const [user, setuser] = useState()
    const [listJobs, setListJobs] = useState([])
    const [toggle, setToggle] = useState(false)
    const [editToggle, setEditToggle] = useState(false)

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
            const result = await axios.get(`http://localhost:6001/jobs/list?user_id=${id}`)
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
            user_id: user?.id,
            req_by: user?.fullname
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
            getSession()
        } catch (error) {
            console.log(error);
            Swal.fire({
                text: "Gagal Menyimpan Data",
                icon: "error"
            })
        }
    }

    const update = async (id) => {
        const data = {
            ...payload,
            subject: selected,
            user_id: user?.id,
            req_by: user?.fullname,
            id: id
        }
        console.log(data)
        try {
            const result = await axios.patch(`http://localhost:6001/jobs/`, data, { headers: 'Access-Control-Allow-Origin : *', withCredentials: false })
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
            const result = await axios.delete(`http://localhost:6001/jobs?id=${id}`)
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
                    <h2 style={{ fontSize: 30 }}>Job Request</h2>
                    <div style={{ padding: 20 }}>
                        {/* Button */}
                        <Button size='sm' onClick={() => { setShow(!show); setSelected() }}>Tambah Data Job Request</Button>

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
                            toggle ? (
                                <Modal show={toggle} onHide={() => { setToggle(!toggle) }}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Hapus Data Job Request</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <p>Anda yakin ingin menghapus data {payload?.subject} {payload?.detail}</p>
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

                        {
                            editToggle ? (
                                <Modal show={editToggle} onHide={() => { setEditToggle(!editToggle) }}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Edit Data Job Request</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <Form>
                                            {/* <Input title={"Request By"} defaultValue={payload?.} placeholder="Nama Pengguna" name={"req_by"} handleChange={handleChange} /> */}
                                            <input type='hidden' name='user_id' value={user?.id} onChange={handleChange} />
                                            <Select data={divisionOptions} defaultValue={payload?.dept} name="dept" title={"Dept/Section"} required handleChange={handleChange} />
                                            <Select title={"Subject"} name={"subject"} handleChange={(e) => setSelected(e.target.value)} data={subjectOptions} defaultValue={payload?.subject || selected} />
                                            {
                                                selected !== 'Masalah Lainnya' ?
                                                    <Select defaultValue={payload?.detail} title={"Detail"} name={"detail"} handleChange={handleChange} data={selected == 'Masalah Software' ? SoftwareOptions : selected == 'Masalah Printer' ? PrinterOptions : HardwareOptions} />
                                                    : ''
                                            }
                                            <InputArea title={"Keterangan"} placeholder="Silahkan Tulis Keterangan Disini" name={"notes"} defaultValue={payload?.notes} handleChange={handleChange} />
                                        </Form>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={() => { setEditToggle(!editToggle) }}>
                                            Batalkan
                                        </Button>
                                        <Button variant="primary" onClick={()=>{update(payload?.id)}}>
                                            Simpan
                                        </Button>
                                    </Modal.Footer>
                                </Modal>
                            ) : ""
                        }

                        <Modal show={show} onHide={() => { setShow(!show) }}>
                            <Modal.Header closeButton>
                                <Modal.Title>Tambah Data Job Request</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form>
                                    {/* <Input title={"Request By"} defaultValue={payload?.} placeholder="Nama Pengguna" name={"req_by"} handleChange={handleChange} /> */}
                                    <input type='hidden' name='user_id' value={user?.id} onChange={handleChange} />
                                    <Select data={divisionOptions} defaultValue={payload?.dept} name="dept" title={"Dept/Section"} required handleChange={handleChange} />
                                    <Select title={"Subject"} name={"subject"} handleChange={(e) => setSelected(e.target.value)} data={subjectOptions} value={selected} />
                                    {
                                        selected !== 'Masalah Lainnya' ?
                                            <Select title={"Detail"} name={"detail"} handleChange={handleChange} data={selected == 'Masalah Software' ? SoftwareOptions : selected == 'Masalah Printer' ? PrinterOptions : HardwareOptions} />
                                            : ''
                                    }
                                    <InputArea title={"Keterangan"} placeholder="Silahkan Tulis Keterangan Disini" name={"notes"} handleChange={handleChange} />
                                </Form>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={() => { setShow(!show) }}>
                                    Batalkan
                                </Button>
                                <Button variant="primary" onClick={save}>
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

export default ListUser