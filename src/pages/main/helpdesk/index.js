import { MinusCircleIcon, PlusCircleIcon } from '@heroicons/react/solid';
import React, { useEffect, useState } from 'react'
import { Button, Col, Modal, Row, Table } from 'react-bootstrap';
import { Input, InputArea, RichText, Select } from '../../../components/Input';
import Layout from '../../../components/Layout'

const Helpdesk = () => {

    const [show, setShow] = useState(false)
    const [payload, setPayload] = useState()
    const [selected, setSelected] = useState()
    const [selectedStatus, setSelectedStatus] = useState()

    const StatusOptions = [
        { value: '', label: 'Silahkan Pilih' },
        { value: 'Masalah Hardware', label: 'Masalah Hardware' },
        { value: 'Masalah Software', label: 'Masalah Software' },
        { value: 'Masalah Printer', label: 'Masalah Printer' },
        { value: 'Preventif', label: 'Preventif' },
        { value: 'Masalah Lainnya', label: 'Masalah Lainnya' },
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

    const [total, setTotal] = useState(0)

    useEffect(() => {

    }, [total])

    return (
        <>
            <Layout>
                <div style={{ padding: 20 }}>
                    <h2 style={{ fontSize: 30 }}>Buat Postingan Bantuan</h2>
                    <div style={{ padding: 20 }}>
                        {/* Button */}
                        <Button size='sm' onClick={() => { setShow(!show); setSelected(); setSelectedStatus() }}>Tambah Data Postingan Bantuan</Button>

                        <div>
                            <Table striped bordered hover responsive className='mt-2'>
                                <thead>
                                    <tr className='justify-content-center align-items-center'>
                                        <th>No</th>
                                        <th>Created By</th>
                                        <th>Dept/Section</th>
                                        <th>Judul</th>
                                        <th>Kategori</th>
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
                                <Modal.Title>Tambah Data Postingan Bantuan</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Input title={"Created By"} placeholder="Masukkan Nama Penulis" name={"created_by"} handleChange={handleChange} />
                                <Input title={"Dept/Section"} placeholder="Masukkan Dept/Section" name={"dept"} handleChange={handleChange} />
                                <Input title={"Judul"} placeholder="Masukkan Judul" name={"title"} handleChange={handleChange} />
                                <Input title={"Slug"} placeholder="Masukkan Slug" name={"slug"} handleChange={handleChange} />
                                <Select title={"Kategori"} name={"category"} handleChange={(e) => setSelectedStatus(e.target.value)} data={StatusOptions} value={selectedStatus} />
                                <div className='mt-2'>
                                    <RichText />
                                </div>
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

export default Helpdesk