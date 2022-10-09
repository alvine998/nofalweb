import { ChartSquareBarIcon, CheckIcon } from '@heroicons/react/solid'
import React, { forwardRef, useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { logo_biru } from '../../assets'
import './print.css'

const PrintComponentMail = forwardRef((props, ref) => {
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
                                No.CIN-FM-EDP-01-04<br />
                                Rev.01
                            </h5>
                        </div>
                    </div>
                    <div className='borderlineMail'>
                        <div className='container1'>
                            <h2 style={{ textAlign: "center" }}>
                                FORMULIR EMAIL & FTP REQUEST<br />
                                NO: 0{payload?.id}/EDP/2022
                            </h2>
                            <h2 style={{ marginInline: 20, marginBottom: 20 }}>
                                DATE : {new Date(payload?.created_on).getDate() + " - " + new Date(payload?.created_on).getMonth() + " - " + new Date(payload?.created_on).getFullYear()}<br />
                                DEPT / SECTION : {payload?.dept.toUpperCase()}
                            </h2>
                        </div>
                        <div className='container1'>
                            <div style={{ display: 'flex', flexDirection: "row", marginInline: 20, alignItems: "center" }}>
                                <h2>SUBJECT : </h2>
                                <div style={{ display: 'flex', flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                                    <div style={{ display: 'flex', flexDirection: "row", alignItems: "center", marginLeft: 20 }}>
                                        <h5 style={{ marginRight: 10 }}>Email</h5>
                                        <div className='sm-square'>
                                            {
                                                payload?.subject == 'email' ? <CheckIcon color='green' width={30} height={30} /> : ''
                                            }
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: "row", alignItems: "center", marginLeft: 20 }}>
                                        <h5 style={{ marginRight: 10 }}>FTP</h5>
                                        <div className='sm-square'>
                                            {
                                                payload?.subject == 'ftp' ? <CheckIcon color='green' width={30} height={30} /> : ''
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div style={{ display: 'flex', flexDirection: "row", marginInline: 20, alignItems: "center", marginTop: 10 }}>
                                <h2>STATUS : </h2>
                                <div style={{ display: 'flex', flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                                    <div style={{ display: 'flex', flexDirection: "row", alignItems: "center", marginLeft: 20 }}>
                                        <h5 style={{ marginRight: 10 }}>New</h5>
                                        <div className='sm-square'>
                                            {
                                                payload?.mail_status == 'Baru' ? <CheckIcon color='green' width={30} height={30} /> : ''
                                            }
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: "row", alignItems: "center", marginLeft: 20 }}>
                                        <h5 style={{ marginRight: 10 }}>Modified</h5>
                                        <div className='sm-square'>
                                            {
                                                payload?.mail_status == 'Diubah' ? <CheckIcon color='green' width={30} height={30} /> : ''
                                            }
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: "row", alignItems: "center", marginLeft: 20 }}>
                                        <h5 style={{ marginRight: 10 }}>Delete</h5>
                                        <div className='sm-square'>
                                            {
                                                payload?.mail_status == 'Dihapus' ? <CheckIcon color='green' width={30} height={30} /> : ''
                                            }
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: "row", alignItems: "center", marginLeft: 20 }}>
                                        <h5 style={{ marginRight: 10 }}>Autoforward</h5>
                                        <div className='sm-square'>
                                            {
                                                payload?.mail_status == 'Auto Forward' ? <CheckIcon color='green' width={30} height={30} /> : ''
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div style={{ marginInline: 20, marginTop: 10 }}>
                                <h2>DETAIL : </h2>
                                <Row>
                                    <Col>
                                        <h5>Name</h5>
                                        <h5>Account Name</h5>
                                        <h5>Email Quota</h5>
                                    </Col>
                                    <Col>
                                        <h5>: {payload?.detail?.email_name}</h5>
                                        <h5>: {payload?.detail?.email_acc}</h5>
                                        <h5>: {payload?.detail?.email_quo}</h5>
                                    </Col>
                                </Row>
                            </div>
                        </div>

                        {/* Keterangan */}
                        <div className='container1' style={{ paddingInline: 20 }}>
                            <h2>Keterangan :</h2>
                            <p>
                                {payload?.notes}
                            </p>
                        </div>

                        {/* TTD */}
                        <div className='px-2 py-2'>
                            <div style={{ display: 'flex', flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                                <div style={{ textAlign: "center" }}>
                                    <h2>Request By</h2>
                                    <h5 style={{ marginTop: 50 }}>{`(${payload?.detail?.email_name})`}</h5>
                                </div>

                                <div style={{ textAlign: "center", paddingInline: 80 }}>
                                    {/* <h2>Accepted By</h2>
                                    <h5 style={{ marginTop: 50 }}>{`(${payload?.accepted_by})`}</h5> */}
                                </div>

                                <div style={{ textAlign: "center" }}>
                                    <h2>Approved By</h2>
                                    <h5 style={{ marginTop: 50 }}>{`(${payload?.approved_by})`}</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
})

export { PrintComponentMail }