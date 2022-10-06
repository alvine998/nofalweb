import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Modal, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { ModalApproval } from '../../../components/Approval';
import { Input, InputArea, Select } from '../../../components/Input';
import Layout from '../../../components/Layout'

const ListMails = () => {

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

    const save = async () => {
        const data = {
            user_id: user?.id,
            detail: {
                email_quo: payload?.email_quo,
                email_name: payload?.email_name,
                email_acc: payload?.email_acc,
            },
            mail_status: payload?.mail_status,
            notes: payload?.notes,
            dept: user?.division,
            subject: payload?.subject
        }
        console.log(data)
        try {
            const result = await axios.post(`http://localhost:6001/mails/`, data, { headers: 'Access-Control-Allow-Origin : *', withCredentials: false })
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
            user_id: user?.id,
            req_by: user?.fullname,
            dept: user?.division,
            id: id
        }
        console.log(data)
        try {
            const result = await axios.patch(`http://localhost:6001/mails/`, data, { headers: 'Access-Control-Allow-Origin : *', withCredentials: false })
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
            const result = await axios.delete(`http://localhost:6001/mails?id=${id}`)
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

    const subjectOptions = [
        { value: '', label: 'Silahkan Pilih' },
        { value: 'email', label: "Email" },
        { value: 'ftp', label: "FTP" },
    ]

    const StatusOptions = [
        { value: '', label: 'Silahkan Pilih' },
        { value: 'Baru', label: 'Baru' },
        { value: 'Diubah', label: 'Diubah' },
        { value: 'Dihapus', label: 'Dihapus' },
        { value: 'Auto Forward', label: 'Auto Forward' },
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
                    <h2 style={{ fontSize: 30 }}>Email Request</h2>
                    <div style={{ padding: 20 }}>
                        {/* Button */}
                        <Button size='sm' onClick={() => { setShow(!show); setSelected(); setSelectedStatus() }}>Tambah Data Email Request</Button>

                        <div>
                            <Table striped bordered hover responsive className='mt-2'>
                                <thead>
                                    <tr className='justify-content-center align-items-center'>
                                        <th>No</th>
                                        <th>Tanggal Terbit</th>
                                        <th>Dept</th>
                                        <th>Subject</th>
                                        <th>Detail</th>
                                        <th>Status Email</th>
                                        <th>Alasan</th>
                                        <th>Status</th>
                                        <th>Tanggal Update</th>
                                        <th>Opsi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        listJobs?.map((value, i) => (
                                            <tr key={i}>
                                                <td>{i + 1}</td>
                                                <td>{new Date(value?.created_on).getDate() + " - " + new Date(value?.created_on).getMonth() + " - " + new Date(value?.created_on).getFullYear() + " . " + new Date(value?.created_on).getHours() + ":" + new Date(value?.created_on).getMinutes() + ":" + new Date(value?.created_on).getSeconds()}</td>
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
                                                <td>{value?.status == 0 ? 'Menunggu' : value?.status == 1 ? 'Proses Pengerjaan' : value?.status == 3 ? 'Selesai' : 'Ditolak'}</td>
                                                <td>{value?.modified_on == null ? "-" : new Date(value?.modified_on).getDate() + " - " + new Date(value?.modified_on).getMonth() + " - " + new Date(value?.modified_on).getFullYear() + " . " + new Date(value?.modified_on).getHours() + ":" + new Date(value?.modified_on).getMinutes() + ":" + new Date(value?.modified_on).getSeconds()}</td>
                                                <td>
                                                    {
                                                        value?.status == 0 ? (
                                                            <>
                                                                <button onClick={() => { setEditToggle(!editToggle); setPayload(value) }} className='btn btn-warning btn-sm w-100'>Edit</button>
                                                                <div className='mt-1' />
                                                                <button onClick={() => { setToggle(!toggle); setPayload(value) }} className='btn btn-danger btn-sm w-100'>Hapus</button>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <button onClick={() => {
                                                                    setAccToggle(true)
                                                                    setPayload(value)
                                                                }} className='btn btn-warning btn-sm w-100'>Lihat</button>
                                                            </>
                                                        )
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
                                <Modal show={toggle} onHide={() => { setToggle(!toggle) }}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Hapus Data Email Request</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <p>Anda yakin ingin menghapus data {payload?.subject} {`${payload?.detail.email_name} - ${payload?.detail.email_acc} - ${payload?.detail.email_quo}`}</p>
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
                            accToggle ?
                                payload?.status == 1 ?
                                    <ModalApproval toggle={accToggle} setToggle={setAccToggle} title={"Email Request"} body={"Email Request anda telah disetujui dan sedang dalam proses pekerjaan"} />
                                    :
                                    payload?.status == 3 ?
                                        <ModalApproval toggle={accToggle} setToggle={setAccToggle} title={"Email Request"} body={"Email Request anda telah selesai"} />
                                        :
                                        <ModalApproval toggle={accToggle} setToggle={setAccToggle} title={"Email Request"} body={"Email Request anda ditolak, silahkan melakukan pengajuan ulang"} /> : ''
                        }

                        {
                            editToggle ? (
                                <Modal show={editToggle} onHide={() => { setEditToggle(!editToggle) }}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Edit Data Email Request</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <Input read={true} value={user?.division} name="dept" title={"Dept/Section"} required />
                                        <Select title={"Subject"} defaultValue={payload?.subject} name={"subject"} handleChange={handleChange} data={subjectOptions} />
                                        <Select title={"Status Email"} defaultValue={payload?.mail_status} name={"mail_status"} handleChange={handleChange} data={StatusOptions} />
                                        <Input title={"Detail"} defaultValue={payload?.detail.email_name} placeholder="Nama Pengguna" name={"detail.email_name"} handleChange={handleChange} />
                                        <Input title={""} defaultValue={payload?.detail.email_acc} placeholder="Akun Email" name={"detail.email_acc"} handleChange={handleChange} />
                                        <Input title={""} defaultValue={payload?.detail.email_quo} placeholder="Email Quota" name={"detail.email_quo"} handleChange={handleChange} />
                                        <InputArea title={"Keterangan"} defaultValue={payload?.notes} placeholder="Silahkan Tulis Keterangan Disini" name={"notes"} handleChange={handleChange} />
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

                        <Modal show={show} onHide={() => { setShow(!show) }}>
                            <Modal.Header closeButton>
                                <Modal.Title>Tambah Data Email Request</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Input read={true} value={user?.division} name="dept" title={"Dept/Section"} required />
                                <Select title={"Subject"} name={"subject"} handleChange={handleChange} data={subjectOptions} />
                                <Select title={"Status Email"} name={"mail_status"} handleChange={handleChange} data={StatusOptions} />
                                <Input title={"Detail"} placeholder="Nama Pengguna" name={"email_name"} handleChange={handleChange} />
                                <Input title={""} placeholder="Akun Email" name={"email_acc"} handleChange={handleChange} />
                                <Input title={""} placeholder="Email Quota" name={"email_quo"} handleChange={handleChange} />
                                <InputArea title={"Keterangan"} placeholder="Silahkan Tulis Keterangan Disini" name={"notes"} handleChange={handleChange} />
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

export default ListMails