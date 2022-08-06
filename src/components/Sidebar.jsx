import React, { useState } from 'react'
import { Accordion } from 'react-bootstrap'
import { logo } from '../assets'
import './style.css'

export default function Sidebar() {
  const [openKey, setOpenKey] = useState()
  return (
    <div className='bg-white w-100 h-100vh'>
      <center>
        <img src={logo} className="w-50" />
      </center>
      <div className='m-2'>
        <a className='text-decoration-none text-black text-center' href="/main/dashboard"><h5>Dashboard</h5></a>
      </div>
      <div>
        <Accordion alwaysOpen defaultActiveKey={openKey == 1 ? [0] : [1]}>
          <Accordion.Item eventKey={1}>
            <Accordion.Header>Pengguna</Accordion.Header>
            <Accordion.Body className={window.location.pathname == '/main/user' ? 'bg-primary p-2' : 'p-2 bg-primary-hover'}>
              <a href='/main/user' onClick={()=>setOpenKey(1)} className='text-decoration-none text-black'>Data Pengguna</a>
            </Accordion.Body>
            <Accordion.Body className={window.location.pathname == '/main/user/banned' ? 'bg-primary p-2' : 'p-2 bg-primary-hover'}>
              <a href='/main/user/banned' onClick={()=>setOpenKey(1)} className='text-decoration-none text-black'>Pengguna Ditolak</a>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey={2}>
            <Accordion.Header>Merchant</Accordion.Header>
            <Accordion.Body>
              <a href='#report' onClick={()=>setOpenKey(2)} className='text-decoration-none text-black'>Merchant Data</a>
            </Accordion.Body>
            <Accordion.Body>
              <a href='#data' onClick={()=>setOpenKey(1)} className='text-decoration-none text-black'>Merchant Report</a>
            </Accordion.Body>
            <Accordion.Body>
              <a href='#data' className='text-decoration-none text-black'>Product Stock</a>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey={3}>
            <Accordion.Header>Transaction</Accordion.Header>
            <Accordion.Body>
              <a href='#report' className='text-decoration-none text-black'>Transaction Data</a>
            </Accordion.Body>
            <Accordion.Body>
              <a href='#data' className='text-decoration-none text-black'>Transaction Report</a>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey={4}>
            <Accordion.Header>Customer</Accordion.Header>
            <Accordion.Body>
              <a href='#data' className='text-decoration-none text-black'>Customer Data</a>
            </Accordion.Body>
            <Accordion.Body>
              <a href='#report' className='text-decoration-none text-black'>Customer Report</a>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey={5}>
            <Accordion.Header>Employee</Accordion.Header>
            <Accordion.Body>
              <a href='#data' className='text-decoration-none text-black'>Employee Data</a>
            </Accordion.Body>
            <Accordion.Body>
              <a href='#report' className='text-decoration-none text-black'>Employee Division</a>
            </Accordion.Body>
            <Accordion.Body>
              <a href='#report' className='text-decoration-none text-black'>Employee Report</a>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey={6}>
            <Accordion.Header>Warehouse</Accordion.Header>
            <Accordion.Body>
              <a href='#report' className='text-decoration-none text-black'>Warehouse Report</a>
            </Accordion.Body>
            <Accordion.Body>
              <a href='#data' className='text-decoration-none text-black'>Warehouse Data</a>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey={7}>
            <Accordion.Header>Settings</Accordion.Header>
            <Accordion.Body>
              <a href='/main/settings/profile' className='text-decoration-none text-black'>Profile</a>
            </Accordion.Body>
            <Accordion.Body>
              <a href='#data' className='text-decoration-none text-black'>Security</a>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    </div>
  )
}
