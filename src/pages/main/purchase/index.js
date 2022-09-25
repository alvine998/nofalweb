import { MinusCircleIcon, PlusCircleIcon } from '@heroicons/react/solid';
import React, { useEffect, useState } from 'react'
import { Button, Col, Modal, Row, Table } from 'react-bootstrap';
import { Input, InputArea, Select } from '../../../components/Input';
import Layout from '../../../components/Layout'

const PurchaseRequest = () => {

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

    const [total, setTotal] = useState(0)

    useEffect(() => {

    }, [total])

    return (
        <>
            <Layout>
                <div style={{ padding: 20 }}>
                    <h2 style={{ fontSize: 30 }}>Buat Purchase Request</h2>
                    <div style={{ padding: 20 }}>
                        {/* Button */}
                        <Button size='sm' onClick={() => { setShow(!show); setSelected(); setSelectedStatus() }}>Tambah Data Purchase Request</Button>

                        <div>
                            <Table striped bordered hover responsive className='mt-2'>
                                <thead>
                                    <tr className='justify-content-center align-items-center'>
                                        <th>No</th>
                                        <th>Pemohon</th>
                                        <th>Dept</th>
                                        <th>Pemesanan</th>
                                        <th>Jumlah</th>
                                        <th>Estimasi Harga</th>
                                        <th>Total</th>
                                        <th>Status</th>
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
                                <Modal.Title>Tambah Data Purchase Request</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Input title={"Request By"} placeholder="Masukkan Nama Pengguna" name={"req_by"} handleChange={handleChange} />
                                <Input title={"Dept/Section"} placeholder="Masukkan Dept/Section" name={"dept"} handleChange={handleChange} />
                                {/* <Select title={"Status Perangkat"} name={"status"} handleChange={(e) => setSelectedStatus(e.target.value)} data={StatusOptions} value={selectedStatus} /> */}
                                <InputArea title={"Kind of Service"} placeholder="Silahkan Tulis Disini" name={"kind"} handleChange={handleChange} />
                                <div style={{ marginTop: 20 }}>
                                    <div className='row g-2'>
                                        <div className='col-md-1'>
                                            <button onClick={() => { total < 0 ? setTotal(0) : setTotal(total - 1) }}>
                                                <MinusCircleIcon width={30} height={30} />
                                            </button>
                                        </div>
                                        <div className='col-md-2'>
                                            <input value={total} style={{marginLeft:'auto', marginRight:'auto'}} readOnly className='form-control text-center' />
                                        </div>
                                        <div className='col-md'>
                                            <button onClick={() => { setTotal(total + 1) }}>
                                                <PlusCircleIcon width={30} height={30} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <Input title={"Estimasi Harga"} placeholder="Rp 0" name={"estimation"} handleChange={handleChange} />
                                <Input title={"Total Harga"} placeholder="Rp 0" name={"total"} handleChange={handleChange} />
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

export default PurchaseRequest