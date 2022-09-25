import React, { useState } from 'react'
import { Button, Modal, Table } from 'react-bootstrap';
import { Input, InputArea, Select } from '../../../components/Input';
import Layout from '../../../components/Layout'

const ListUser = () => {

    const [show, setShow] = useState(false)
    const [payload, setPayload] = useState()
    const [selected, setSelected] = useState()

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

    const logging = () => {
        console.log(payload);
    }
    const handleChange = (e) => {
        setPayload({ ...payload, [e.target.name]: e.target.value })
    }

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
                                <Modal.Title>Tambah Data Job Request</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Input title={"Request By"} placeholder="Nama Pengguna" name={"request_by"} handleChange={handleChange} />
                                <Input title={"Dept/Sectin"} placeholder="Divisi Pengguna" name={"dept"} handleChange={handleChange} />
                                <Select title={"Subject"} name={"subject"} handleChange={(e) => setSelected(e.target.value)} data={subjectOptions} value={selected} />
                                {
                                    selected !== 'Masalah Lainnya' ?
                                        <Select title={"Detail"} name={"detail"} handleChange={(e) => setSelected(e.target.value)} data={selected == 'Masalah Software' ? SoftwareOptions : selected == 'Masalah Printer' ? PrinterOptions : HardwareOptions}/>
                                        : ''
                                }
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

export default ListUser