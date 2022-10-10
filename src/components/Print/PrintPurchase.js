import { ChartSquareBarIcon, CheckIcon } from '@heroicons/react/solid'
import React, { forwardRef, useEffect, useState } from 'react'
import { logo_biru } from '../../assets'
import './print.css'

const PrintComponentPurchase = forwardRef((props, ref) => {
    const [payload, setPayload] = useState()
    useEffect(() => {
        setPayload(props.data)
        console.log("payload : ", props.data)
    }, [])
    return (
        <>
            <div className="contacts">
                <div ref={ref} className="container-box">

                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                        <div>
                            <img src={logo_biru} style={{ width: 200, height: 50 }} />
                            <div style={{ marginTop: 40, borderWidth: 1, borderStyle: "solid", width: 150, height: 30 }}>
                                <h5 style={{ textAlign: "center" }}>Normal / Urgent</h5>
                            </div>
                        </div>
                        <div>
                            <h5 style={{ textAlign: "left" }}>
                                No. CIN-FM-EDP-01-02<br />
                                Rev.00
                            </h5>

                            <br />
                            <h5>
                                PT.CRESTEC INDONESIA<br />
                                Kawasan Industri MM 2100<br />
                                Jl. Lombok I Blok N-2, 17, 18<br />
                                Cikarang Barat<br />
                                Bekasi 17520 Jawa Barat<br />
                                Telp: 62(21)898-0258
                            </h5>
                        </div>
                    </div>
                    <div style={{marginTop:20}}>
                        <h2 style={{ textAlign: 'center', fontWeight: "bold", textDecorationLine: "underline", textDecorationWidth: 1, fontSize: 20 }}>
                            FORM NON MATERIAL / SERVICE REQUEST (NM/SR)
                        </h2>
                    </div>

                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                        <div>
                            <h2>Departement/Sect : {payload?.dept}</h2>
                        </div>
                        <div>
                            <h2>Date : {payload?.created_on.substr(0, 10)}</h2>
                        </div>
                    </div>

                    <div>
                        <table className='table  table-striped'>
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Kind Of Service</th>
                                    <th>Quantity</th>
                                    <th>Estimated Price</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th>1</th>
                                    <td>{payload?.in_kind}</td>
                                    <td>{payload?.total}</td>
                                    <td>{payload?.estimation_price}</td>
                                    <td>{payload?.total_price}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div style={{ marginBottom: 50 }}>
                        <h2>Remarks :</h2>
                    </div>

                    <div>
                        <table className='table table-bordered' style={{ borderCollapse: "collapse", borderWidth: 1, borderStyle: "solid" }}>
                            <thead>
                                <tr style={{ textAlign: "center" }}>
                                    <th>Request By</th>
                                    <th colSpan={"2"}>Checked By</th>
                                    <th colSpan={"3"}>Approved By</th>
                                    <th>Received By</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr style={{ height: 70 }}>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <th>{payload?.req_by}</th>
                                    <td>Supervisor</td>
                                    <td>Manager Dept</td>
                                    <td>HRD & GA</td>
                                    <td>Accounting</td>
                                    <td>Vice President</td>
                                    <td>Purchasing</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div style={{ marginTop: 20 }}>
                        <h2>The reason was refused :</h2>
                        <div style={{ paddingLeft: 20 }}>
                            <div style={{ width: '100%', borderBottomWidth: 1, borderBottomStyle: "solid", height: 40 }} />
                            <div style={{ width: '100%', borderBottomWidth: 1, borderBottomStyle: "solid", height: 40 }} />
                        </div>
                    </div>
                    <div style={{ marginTop: 50 }}>
                        <h5>Sheet 1 (Original) : Accounting<br />Sheet 2 (Re ) : Purchasing<br />Sheet 3 (Green) : User<br />Sheet 4 (Blue) : HRD & GA</h5>
                    </div>
                </div>
            </div>
        </>
    )
})

export { PrintComponentPurchase }