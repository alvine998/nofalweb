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
                        <img src={logo_biru} style={{ width: 250, height: 80 }} />
                        <div>
                            <h5 style={{ textAlign: "right" }}>
                                No. CIN-FM-EDP-01-01 <br />
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
                    </div>
                </div>
            </div>
        </>
    )
})

export { PrintComponent }