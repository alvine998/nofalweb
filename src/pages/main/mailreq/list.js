import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Modal, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Input, InputArea, Select } from '../../../components/Input';
import Layout from '../../../components/Layout'
import { jsPDF } from 'jspdf'

const ListMailReq = () => {

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
            const result = await axios.get(`http://localhost:6001/mails/list?user_id=${id}`)
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
            status: 1
        }
        console.log(data)
        try {
            const result = await axios.patch(`http://localhost:6001/mails/status?id=${id}`, data, { headers: 'Access-Control-Allow-Origin : *', withCredentials: false })
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
            const result = await axios.patch(`http://localhost:6001/mails/status?id=${id}`, data, { headers: 'Access-Control-Allow-Origin : *', withCredentials: false })
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
            status: 3
        }
        try {
            const result = await axios.patch(`http://localhost:6001/mails/done?id=${id}`, data, { headers: 'Access-Control-Allow-Origin : *', withCredentials: false })
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
                                        <th>Dept</th>
                                        <th>Subject</th>
                                        <th>Detail</th>
                                        <th>Status Email</th>
                                        <th>Alasan</th>
                                        <th>Status</th>
                                        <th>Opsi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        listJobs?.map((value, i) => (
                                            <tr key={i}>
                                                <td>{i + 1}</td>
                                                <td>{value?.dept}</td>
                                                <td>{value?.subject}</td>
                                                <td>
                                                    <p>
                                                        Nama : {value?.detail.email_name}<br />
                                                        Email : {value?.detail.email_acc}<br />
                                                        Quota : {value?.detail.email_quo}
                                                    </p>
                                                </td>
                                                <td>{value?.mail_status}</td>
                                                <td>{value?.notes}</td>
                                                <td>{value?.status == 0 ? 'Menunggu' : value?.status == 1 ? 'Disetujui' : value?.status == 3 ? 'Selesai' : 'Ditolak'}</td>
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
                                            <Modal.Title>Update Data Email Request</Modal.Title>
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
                                <Modal.Title>Detail Data Email Request</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <p>Dept/Section : {payload?.dept}</p>
                                <p>Subject : {payload?.subject}</p>
                                <p>Detail : <br />
                                    Nama : {payload?.detail.email_name}<br />
                                    Email : {payload?.detail.email_acc}<br />
                                    Quota : {payload?.detail.email_quo}
                                </p>
                                <p>Status Email : {payload?.mail_status}</p>
                                <p>Keterangan : {payload?.notes}</p>
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

export default ListMailReq