import React, { useState } from 'react'
import { Button, Modal, Table } from 'react-bootstrap';
import { Input, InputArea, Select } from '../../../components/Input';
import Layout from '../../../components/Layout'

const ListRegisPenyimpanan = () => {

    const [show, setShow] = useState(false)
    const [payload, setPayload] = useState()
    const [selected, setSelected] = useState()
    const [selectedStatus, setSelectedStatus] = useState()

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

    return (
        <>
            <Layout>
                <div style={{ padding: 20 }}>
                    <h2 style={{ fontSize: 30 }}>Registrasi Penyimpanan</h2>
                    <div style={{ padding: 20 }}>
                        <div>
                            <Table striped bordered hover responsive className='mt-2'>
                                <thead>
                                    <tr className='justify-content-center align-items-center'>
                                        <th>No</th>
                                        <th>Jenis Regis</th>
                                        <th>Nama PIC</th>
                                        <th>Dept</th>
                                        <th>Status</th>
                                        <th>Tanggal</th>
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
                                <Modal.Title>Tambah Data Regis Penyimpanan</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Input title={"Jenis Registrasi"} placeholder="Masukkan Jenis Registrasi" name={"type"} handleChange={handleChange} />
                                <Input title={"Nama PIC"} placeholder="Nama Pengguna" name={"name"} handleChange={handleChange} />
                                <Input title={"Dept"} placeholder="Divisi Pengguna" name={"dept"} handleChange={handleChange} />
                                <Select title={"Status Perangkat"} name={"status"} handleChange={(e) => setSelectedStatus(e.target.value)} data={StatusOptions} value={selectedStatus} />
                                <InputArea title={"Detail Spesifikasi"} placeholder="Silahkan Tulis Spesifikasi Disini" name={"detail"} handleChange={handleChange} />
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

export default ListRegisPenyimpanan