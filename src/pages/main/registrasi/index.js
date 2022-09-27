import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Modal, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { ModalApproval } from '../../../components/Approval';
import { Input, InputArea, Select } from '../../../components/Input';
import Layout from '../../../components/Layout'

const RegisPenyimpanan = () => {

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

    const save = async () => {
        const data = {
            user_id: user?.id,
            dept: payload?.dept,
            device_status: payload?.device_status,
            detail: payload?.detail,
            pic_name: payload?.pic_name,
            type: payload?.type,
        }
        console.log(data)
        try {
            const result = await axios.post(`http://localhost:6001/storages/`, data, { headers: 'Access-Control-Allow-Origin : *', withCredentials: false })
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
            id: id
        }
        console.log(data)
        try {
            const result = await axios.patch(`http://localhost:6001/storages/`, data, { headers: 'Access-Control-Allow-Origin : *', withCredentials: false })
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
            const result = await axios.delete(`http://localhost:6001/storages?id=${id}`)
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

    return (
        <>
            <Layout>
                <div style={{ padding: 20 }}>
                    <h2 style={{ fontSize: 30 }}>Registrasi Penyimpanan</h2>
                    <div style={{ padding: 20 }}>
                        {/* Button */}
                        <Button size='sm' onClick={() => { setShow(!show); setSelected(); setSelectedStatus() }}>Tambah Data Registrasi Penyimpanan</Button>

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
                                        <Modal.Title>Hapus Data Registrasi Penyimpanan</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <p>Anda yakin ingin menghapus data {payload?.detail} - {payload?.type}</p>
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
                                    <ModalApproval toggle={accToggle} setToggle={setAccToggle} title={"Registrasi Penyimpanan"} body={"Registrasi Penyimpanan anda telah disetujui dan sedang dalam proses pekerjaan"} />
                                    :
                                    payload?.status == 3 ?
                                        <ModalApproval toggle={accToggle} setToggle={setAccToggle} title={"Registrasi Penyimpanan"} body={"Registrasi Penyimpanan anda telah selesai"} />
                                        :
                                        <ModalApproval toggle={accToggle} setToggle={setAccToggle} title={"Registrasi Penyimpanan"} body={"Registrasi Penyimpanan anda ditolak, silahkan melakukan pengajuan ulang"} /> : ''
                        }

                        {
                            editToggle ? (
                                <Modal show={editToggle} onHide={() => { setEditToggle(!editToggle) }}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Edit Data Registrasi Penyimpanan</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <Input title={"Jenis Registrasi"} defaultValue={payload?.type} placeholder="Masukkan Jenis Registrasi" name={"type"} handleChange={handleChange} />
                                        <Input title={"Nama PIC"} defaultValue={payload?.pic_name} placeholder="Nama Pengguna" name={"pic_name"} handleChange={handleChange} />
                                        <Select data={divisionOptions} defaultValue={payload?.dept} name="dept" title={"Dept/Section"} required handleChange={handleChange} />
                                        <Select title={"Status Perangkat"} defaultValue={payload?.device_status} name={"device_status"} handleChange={handleChange} data={StatusOptions} />
                                        <InputArea title={"Detail Spesifikasi"} defaultValue={payload?.detail} placeholder="Silahkan Tulis Spesifikasi Disini" name={"detail"} handleChange={handleChange} />
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
                                <Modal.Title>Tambah Data Regis Penyimpanan</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Input title={"Jenis Registrasi"} placeholder="Masukkan Jenis Registrasi" name={"type"} handleChange={handleChange} />
                                <Input title={"Nama PIC"} placeholder="Nama Pengguna" name={"pic_name"} handleChange={handleChange} />
                                <Select data={divisionOptions} name="dept" title={"Dept/Section"} required handleChange={handleChange} />
                                <Select title={"Status Perangkat"} name={"device_status"} handleChange={handleChange} data={StatusOptions} />
                                <InputArea title={"Detail Spesifikasi"} placeholder="Silahkan Tulis Spesifikasi Disini" name={"detail"} handleChange={handleChange} />
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

export default RegisPenyimpanan