import React, { useState } from 'react'
import { Button, Modal, Table } from 'react-bootstrap';
import { Input, InputArea, Select } from '../../../components/Input';
import Layout from '../../../components/Layout'

const ListMails = () => {

    const [show, setShow] = useState(false)
    const [payload, setPayload] = useState()
    const [selected, setSelected] = useState()
    const [selectedStatus, setSelectedStatus] = useState()

    const subjectOptions = [
        { value: '', label: 'Silahkan Pilih' },
        { value: 'Email', label: "Email" },
        { value: 'FTP', label: "FTP" },
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
                                        <th>Dept</th>
                                        <th>Subject</th>
                                        <th>Detail</th>
                                        <th>Status Email</th>
                                        <th>Alasan</th>
                                        <th>Opsi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>Test</td>
                                    </tr>
                                    {/* {
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
                                    } */}
                                </tbody>
                            </Table>
                        </div>

                        <Modal show={show} onHide={() => { setShow(!show) }}>
                            <Modal.Header closeButton>
                                <Modal.Title>Tambah Data Email Request</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Input title={"Dept"} placeholder="Nama Pengguna" name={"request_by"} handleChange={handleChange} />
                                <Select title={"Subject"} name={"subject"} handleChange={(e) => setSelected(e.target.value)} data={subjectOptions} value={selected} />
                                <Select title={"Status Email"} name={"status"} handleChange={(e) => setSelectedStatus(e.target.value)} data={StatusOptions} value={selectedStatus} />
                                <Input title={"Detail"} placeholder="Nama Pengguna" name={"email_name"} handleChange={handleChange} />
                                <Input title={""} placeholder="Akun Email" name={"email_acc"} handleChange={handleChange} />
                                <Input title={""} placeholder="Email Quota" name={"email_quo"} handleChange={handleChange} />
                                <InputArea title={"Keterangan"} placeholder="Silahkan Tulis Keterangan Disini" name={"notes"} handleChange={handleChange} />
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={() => { setShow(!show) }}>
                                    Batalkan
                                </Button>
                                <Button variant="primary" onClick={() => { setShow(!show); logging() }}>
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