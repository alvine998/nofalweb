import { ChartSquareBarIcon, CheckIcon } from '@heroicons/react/solid'
import React, { forwardRef, useEffect, useState } from 'react'
import { logo_biru } from '../../assets'
import './print.css'

const PrintComponent = forwardRef((props, ref) => {
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
                                No.CIN-FM-EDP-01-01<br />
                                Rev.03
                            </h5>
                        </div>
                    </div>
                    <div className='borderline'>
                        <div className='container1'>
                            <h2 style={{ textAlign: "center" }}>
                                EDP JOB REQUEST<br />
                                HARDWARE AND SOFTWARE<br />
                                NO: 0{payload?.id}/EDP/2022
                            </h2>
                            <h2 style={{ marginInline: 20, marginBottom: 20 }}>
                                DATE : {new Date(payload?.created_on).getDate() + " - " + new Date(payload?.created_on).getMonth() + " - " + new Date(payload?.created_on).getFullYear()}<br />
                                DEPT / SECTION : {payload?.dept.toUpperCase()}
                            </h2>
                        </div>
                        <div className='container1'>
                            <div style={{ display: 'flex', flexDirection: "row", marginInline: 20 }}>
                                <h2>SUBJECT : </h2>
                                <div style={{ display: 'flex', flexDirection: "row" }}>
                                    <div>
                                        <div style={{ display: 'flex', flexDirection: "row", alignItems: "center" }}>
                                            <div className='square'>
                                                {
                                                    payload?.subject == 'Masalah Hardware' ? <CheckIcon color='green' width={30} height={30} /> : ''
                                                }
                                            </div>
                                            <h5 style={{ marginLeft: 10 }}>Masalah Hardware</h5>
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: "row", alignItems: "center", marginTop: 20 }}>
                                            <div className='square'>
                                                {
                                                    payload?.subject == 'Masalah Software' ? <CheckIcon color='green' width={30} height={30} /> : ''
                                                }
                                            </div>
                                            <h5 style={{ marginLeft: 10 }}>Masalah Software</h5>
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: "row", alignItems: "center", marginTop: 20 }}>
                                            <div className='square'>
                                                {
                                                    payload?.subject == 'Preventif' && <CheckIcon color='green' width={30} height={30} />
                                                }
                                            </div>
                                            <h5 style={{ marginLeft: 10 }}>Preventif</h5>
                                        </div>
                                    </div>

                                    <div>
                                        <div style={{ display: 'flex', flexDirection: "row", alignItems: "center" }}>
                                            <div className='square'>
                                                {
                                                    payload?.subject == 'Masalah Printer' && <CheckIcon color='green' width={30} height={30} />
                                                }
                                            </div>
                                            <h5 style={{ marginLeft: 10 }}>Masalah Printer</h5>
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: "row", alignItems: "center", marginTop: 20 }}>
                                            <div className='square'>
                                                {
                                                    payload?.subject == 'Masalah Lainnya' && <CheckIcon color='green' width={30} height={30} />
                                                }
                                            </div>
                                            <h5 style={{ marginLeft: 10 }}>Masalah Lain-lain</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Detail */}
                        <div className='container1'>
                            <h2 style={{ marginLeft: 20 }}>Detail :</h2>
                            <div style={{ display: 'flex', justifyContent: "center", alignItems: "center" }}>
                                <div style={{ display: 'flex', flexDirection: "row" }}>
                                    <div>
                                        <h2>Hardware</h2>
                                        <div>
                                            <div style={{ display: 'flex', flexDirection: "row", alignItems: "center" }}>
                                                <div className='sm-square'>
                                                    {
                                                        payload?.detail == 'CPU' ? <CheckIcon color='green' width={20} height={20} /> : ''
                                                    }
                                                </div>
                                                <h5 style={{ marginLeft: 10 }}>CPU</h5>
                                            </div>
                                            <div style={{ display: 'flex', flexDirection: "row", alignItems: "center", marginTop: 10 }}>
                                                <div className='sm-square'>
                                                    {
                                                        payload?.detail == 'Monitor' ? <CheckIcon color='green' width={20} height={20} /> : ''
                                                    }
                                                </div>
                                                <h5 style={{ marginLeft: 10 }}>Monitor</h5>
                                            </div>
                                            <div style={{ display: 'flex', flexDirection: "row", alignItems: "center", marginTop: 10 }}>
                                                <div className='sm-square'>
                                                    {
                                                        payload?.detail == 'LAN' && <CheckIcon color='green' width={20} height={20} />
                                                    }
                                                </div>
                                                <h5 style={{ marginLeft: 10 }}>LAN (Jaringan)</h5>
                                            </div>
                                            <div style={{ display: 'flex', flexDirection: "row", alignItems: "center", marginTop: 10 }}>
                                                <div className='sm-square'>
                                                    {
                                                        payload?.detail == 'DLL' && <CheckIcon color='green' width={20} height={20} />
                                                    }
                                                </div>
                                                <h5 style={{ marginLeft: 10 }}>DLL</h5>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='mx-5'>
                                        <h2>Software</h2>
                                        <div>
                                            <div style={{ display: 'flex', flexDirection: "row", alignItems: "center" }}>
                                                <div className='sm-square'>
                                                    {
                                                        payload?.detail == 'OS/Office' ? <CheckIcon color='green' width={20} height={20} /> : ''
                                                    }
                                                </div>
                                                <h5 style={{ marginLeft: 10 }}>OS/Office</h5>
                                            </div>
                                            <div style={{ display: 'flex', flexDirection: "row", alignItems: "center", marginTop: 10 }}>
                                                <div className='sm-square'>
                                                    {
                                                        payload?.detail == 'Anti Virus' ? <CheckIcon color='green' width={20} height={20} /> : ''
                                                    }
                                                </div>
                                                <h5 style={{ marginLeft: 10 }}>Anti Virus</h5>
                                            </div>
                                            <div style={{ display: 'flex', flexDirection: "row", alignItems: "center", marginTop: 10 }}>
                                                <div className='sm-square'>
                                                    {
                                                        payload?.detail == 'OPIS Sistem' && <CheckIcon color='green' width={20} height={20} />
                                                    }
                                                </div>
                                                <h5 style={{ marginLeft: 10 }}>OPIS Sistem</h5>
                                            </div>
                                            <div style={{ display: 'flex', flexDirection: "row", alignItems: "center", marginTop: 10 }}>
                                                <div className='sm-square'>
                                                    {
                                                        payload?.detail == 'ACCPAC' && <CheckIcon color='green' width={20} height={20} />
                                                    }
                                                </div>
                                                <h5 style={{ marginLeft: 10 }}>ACCPAC</h5>
                                            </div>
                                            <div style={{ display: 'flex', flexDirection: "row", alignItems: "center", marginTop: 10 }}>
                                                <div className='sm-square'>
                                                    {
                                                        payload?.detail == 'DLL' && <CheckIcon color='green' width={20} height={20} />
                                                    }
                                                </div>
                                                <h5 style={{ marginLeft: 10 }}>DLL</h5>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <h2>Printer</h2>
                                        <div>
                                            <div style={{ display: 'flex', flexDirection: "row", alignItems: "center" }}>
                                                <div className='sm-square'>
                                                    {
                                                        payload?.detail == 'Paper Jam' ? <CheckIcon color='green' width={20} height={20} /> : ''
                                                    }
                                                </div>
                                                <h5 style={{ marginLeft: 10 }}>Paper Jam</h5>
                                            </div>
                                            <div style={{ display: 'flex', flexDirection: "row", alignItems: "center", marginTop: 10 }}>
                                                <div className='sm-square'>
                                                    {
                                                        payload?.detail == 'Head Printer' ? <CheckIcon color='green' width={20} height={20} /> : ''
                                                    }
                                                </div>
                                                <h5 style={{ marginLeft: 10 }}>Head Printer</h5>
                                            </div>
                                            <div style={{ display: 'flex', flexDirection: "row", alignItems: "center", marginTop: 10 }}>
                                                <div className='sm-square'>
                                                    {
                                                        payload?.detail == 'DLL' && <CheckIcon color='green' width={20} height={20} />
                                                    }
                                                </div>
                                                <h5 style={{ marginLeft: 10 }}>DLL</h5>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>

                        {/* Keterangan */}
                        <div className='container1 px-2'>
                            <h2>Keterangan :</h2>
                            <p>
                                {payload?.notes}
                            </p>
                        </div>

                        {/* Diperbaiki & Hasil */}
                        <div className='container1 px-2'>
                            <h2>Diperbaiki / Dipasang Oleh :</h2>
                            <div style={{ display: 'flex', flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                                <div style={{ display: 'flex', flexDirection: "row", alignItems: "center" }}>
                                    <div className='square'>
                                        {
                                            payload?.work_by == 'EDP' && <CheckIcon color='green' width={30} height={30} />
                                        }
                                    </div>
                                    <h5 style={{ marginLeft: 10 }}>EDP</h5>
                                </div>
                                <div style={{ display: 'flex', flexDirection: "row", alignItems: "center" }}>
                                    <div className='square'>
                                        {
                                            payload?.work_by == 'Service' && <CheckIcon color='green' width={30} height={30} />
                                        }
                                    </div>
                                    <h5 style={{ marginLeft: 10 }}>Service</h5>
                                </div>
                                <div style={{ display: 'flex', flexDirection: "row", alignItems: "center" }}>
                                    <div className='square'>
                                        {
                                            payload?.work_by == 'Maintenance' && <CheckIcon color='green' width={30} height={30} />
                                        }
                                    </div>
                                    <h5 style={{ marginLeft: 10 }}>Maintenance</h5>
                                </div>
                                <div style={{ display: 'flex', flexDirection: "row", alignItems: "center" }}>
                                    <div className='square'>
                                        {
                                            payload?.work_by == 'Sendiri' && <CheckIcon color='green' width={30} height={30} />
                                        }
                                    </div>
                                    <h5 style={{ marginLeft: 10 }}>Sendiri</h5>
                                </div>
                            </div>
                            <div style={{ display: 'flex', flexDirection: "row", alignItems: "center", marginTop: 10 }}>
                                <h2>Hasil : </h2>
                                <div style={{ display: 'flex', flexDirection: "row", alignItems: "center" }}>
                                    <div className='square'>
                                        {
                                            payload?.result == 'Ok' && <CheckIcon color='green' width={30} height={30} />
                                        }
                                    </div>
                                    <h5 style={{ marginLeft: 10 }}>Ok</h5>
                                </div>
                                <div style={{ display: 'flex', flexDirection: "row", alignItems: "center" }}>
                                    <div className='square'>
                                        {
                                            payload?.result == 'Not Ok' && <CheckIcon color='green' width={30} height={30} />
                                        }
                                    </div>
                                    <h5 style={{ marginLeft: 10 }}>No</h5>
                                </div>
                            </div>
                        </div>

                        {/* TTD */}
                        <div className='px-2'>
                            <div style={{ display: 'flex', flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                                <div style={{textAlign:"center"}}>
                                    <h2>Request By</h2>
                                    <h5 style={{marginTop:50}}>{`(${payload?.req_by})`}</h5>
                                </div>

                                <div style={{textAlign:"center", paddingInline:50}}>
                                    <h2>Accepted By</h2>
                                    <h5 style={{marginTop:50}}>{`(${payload?.req_by})`}</h5>
                                </div>

                                <div style={{textAlign:"center"}}>
                                    <h2>Approved By</h2>
                                    <h5 style={{marginTop:50}}>{`(${payload?.approved_by})`}</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
})

export { PrintComponent }