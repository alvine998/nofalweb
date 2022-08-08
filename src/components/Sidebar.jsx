import React, { useEffect, useState } from 'react'
import { Accordion } from 'react-bootstrap'
import { logo, logo_rajawali } from '../assets'
import './style.css'

export default function Sidebar() {
  const [openKey, setOpenKey] = useState()

  useEffect(()=>{
    console.log("Open key: ",openKey);
  },[])
  return (
    <div className='bg-white w-100 h-100vh'>
      <center>
        <img src={logo_rajawali} className="w-50" />
      </center>
      <div className='m-2'>
        <a className='text-decoration-none text-black text-center' href="/main/dashboard"><h5>Dashboard</h5></a>
      </div>
      <div>
        <Accordion alwaysOpen defaultActiveKey={window.location.pathname == '/main/user' ? ['1'] 
        : window.location.pathname == '/main/user/banned' ? ['1'] : window.location.pathname == '/main/product' ? ['2'] : ['2'] }>
          <Accordion.Item eventKey={'1'}>
            <Accordion.Header>Pengguna</Accordion.Header>
            <Accordion.Body className={window.location.pathname == '/main/user' ? 'bg-primary p-2' : 'p-2 bg-primary-hover'}>
              <a href='/main/user' onClick={() => setOpenKey(1)} className={window.location.pathname == '/main/user' ? 'text-decoration-none text-white' : 'text-decoration-none text-black'}>Data Pengguna</a>
            </Accordion.Body>
            <Accordion.Body className={window.location.pathname == '/main/user/banned' ? 'bg-primary p-2' : 'p-2 bg-primary-hover'}>
              <a href='/main/user/banned' onClick={() => setOpenKey(1)} className={window.location.pathname == '/main/user/banned' ? 'text-decoration-none text-white' : 'text-decoration-none text-black'}>Pengguna Ditolak</a>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey={'2'}>
            <Accordion.Header>Produk</Accordion.Header>
            <Accordion.Body className={window.location.pathname == '/main/product' ? 'bg-primary p-2' : 'p-2 bg-primary-hover'}>
              <a href='/main/product' onClick={() => setOpenKey(2)} className={window.location.pathname == '/main/product' ? 'text-decoration-none text-white' : 'text-decoration-none text-black'}>Data Produk</a>
            </Accordion.Body>
            <Accordion.Body className={window.location.pathname == '/main/product/verification' ? 'bg-primary p-2' : 'p-2 bg-primary-hover'}>
              <a href='/main/product/verification' onClick={() => setOpenKey(2)} className={window.location.pathname == '/main/product/verification' ? 'text-decoration-none text-white' : 'text-decoration-none text-black'}>Verifikasi Produk</a>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey={'3'}>
            <Accordion.Header>Transaction</Accordion.Header>
            <Accordion.Body>
              <a href='#report' className='text-decoration-none text-black'>Transaction Data</a>
            </Accordion.Body>
            <Accordion.Body>
              <a href='#data' className='text-decoration-none text-black'>Transaction Report</a>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey={'4'}>
            <Accordion.Header>Customer</Accordion.Header>
            <Accordion.Body>
              <a href='#data' className='text-decoration-none text-black'>Customer Data</a>
            </Accordion.Body>
            <Accordion.Body>
              <a href='#report' className='text-decoration-none text-black'>Customer Report</a>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey={'5'}>
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

          <Accordion.Item eventKey={'6'}>
            <Accordion.Header>Warehouse</Accordion.Header>
            <Accordion.Body>
              <a href='#report' className='text-decoration-none text-black'>Warehouse Report</a>
            </Accordion.Body>
            <Accordion.Body>
              <a href='#data' className='text-decoration-none text-black'>Warehouse Data</a>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey={'7'}>
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
