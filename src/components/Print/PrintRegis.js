import { ChartSquareBarIcon, CheckIcon } from '@heroicons/react/solid'
import React, { forwardRef, useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { logo_biru } from '../../assets'
import './print.css'

const PrintComponentRegis = forwardRef((props, ref) => {
    const [payload, setPayload] = useState()
    useEffect(() => {
        setPayload(props.data)
        console.log("payload : ", props.data)
    }, [])
    return (
        <>
            <div className="contacts">
                <div ref={ref} className="container-box">

                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end" }}>
                        <img src={logo_biru} style={{ width: 150, height: 50 }} />
                        <div>
                            <h5 style={{ textAlign: "right" }}>
                                No.CIN-FM-EDP-01-05<br />
                                Rev.00
                            </h5>
                        </div>
                    </div>
                    <div className='borderline'>
                        <div className='container1'>
                            <h2 style={{ textAlign: 'center' }}>
                                FORMULIR REGISTRASI NOTEBOOK, FLASHDISK, DAN MEDIA
                                PENYIMPANAN PT.CRESTEC INDONESIA
                            </h2>
                        </div>
                        <div className='container1'>
                            <div style={{ display: 'flex', flexDirection: "row", marginInline: 20 }}>
                                <Row>
                                    <Col>
                                        <h5>Jenis Penyimpanan</h5>
                                        <h5>No Registrasi</h5>
                                        <h5>Nama PIC</h5>
                                        <h5>Departemen</h5>
                                        <h5>Tanggal Registrasi</h5>
                                        <h5>Status</h5>
                                    </Col>
                                    <Col style={{ width: 250 }}>
                                        <h5>: {payload?.type}</h5>
                                        <h5>: 0{payload?.id}</h5>
                                        <h5>: {payload?.pic_name}</h5>
                                        <h5>: {payload?.dept}</h5>
                                        <h5>: {payload?.created_on.substr(0, 10)}</h5>
                                        <h5>: {payload?.device_status}</h5>
                                    </Col>
                                </Row>
                            </div>
                        </div>

                        {/* Detail */}
                        <div className='container1'>
                            <div style={{ marginInline: 20 }}>
                                <h2>Detail Spesifikasi :</h2>
                                <h5>{payload?.detail}</h5>
                            </div>
                        </div>

                        {/* TTD */}
                        <div className='container1'>
                            <div style={{ display: 'flex', flexDirection: "row", alignItems: "center", justifyContent: "center", marginInline: 20 }}>
                                <div style={{ textAlign: "center" }}>
                                    <h2>Dibuat Oleh, PIC</h2>
                                    <h5 style={{ marginTop: 50 }}>{`(${payload?.pic_name})`}</h5>
                                </div>

                                <div style={{ textAlign: "center", paddingInline: 80 }}>
                                    {/* <h2>Accepted By</h2>
                                    <h5 style={{ marginTop: 50 }}>{`(${payload?.accepted_by})`}</h5> */}
                                </div>

                                <div style={{ textAlign: "center" }}>
                                    <h2>Diketahui Oleh</h2>
                                    <h5 style={{ marginTop: 50 }}>{`(${payload?.approved_by || 'EDP Manager'})`}</h5>
                                </div>
                            </div>
                        </div>

                        {/* Keterangan */}
                        <div style={{ padding: 20 }}>
                            <h2>Keterangan :</h2>
                            <h5>
                                1. Merah (red) CIN hanya boleh digunakan didalam CIN<br />
                                2. Kuning (yellow) CIN boleh digunakan diluar dan didalam CIN<br />
                                3. Hijau (green) Pribadi boleh digunakan di CIN dengan akses terbatas dan dilaporkan ke EDP
                            </h5>
                            <br/>
                            <h2>Catatan :</h2>
                            <h5>
                                - Mohon digunakan untuk kepentingan perusahaan dan apabila digunakan untuk kepentingan Pribadi
                                yang tidak berhubungan dengan pekerjaan akan dikenai sanksi yang sesuai dengan peraturan perusahaan.<br /><br />
                                - Apabila hilang atau rusak mohon dilaporkan ke departemen EDP dan HRD/Legal serta penganggung jawab
                                membuat kronologi kejadian.
                            </h5>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
})

export { PrintComponentRegis }