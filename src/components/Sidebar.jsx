import React, { useEffect, useState } from 'react'
import { Accordion } from 'react-bootstrap'
import { logo, logo_rajawali } from '../assets'
import './style.css'

export default function Sidebar() {
  const [openKey, setOpenKey] = useState()

  useEffect(() => {
    console.log("Open key: ", openKey);
  }, [])
  return (
    <div className='bg-white w-100 h-100vh'>
      <center>
        <img src={logo_rajawali} className="w-50" />
      </center>
      <div className='m-2'>
        <a className='text-decoration-none text-black text-center' href="/main/dashboard"><h5>Dashboard</h5></a>
      </div>
      <div>
        <Accordion alwaysOpen defaultActiveKey={
          window.location.pathname == '/main/user' ? ['1']
            : window.location.pathname == '/main/user/banned' ? ['1']
              : window.location.pathname == '/main/product' ? ['2']
                : window.location.pathname == '/main/product/verification' ? ['2']
                : window.location.pathname == '/main/progress' ? ['3']
                : window.location.pathname == '/main/progress/verification' ? ['3']
                : window.location.pathname == '/main/services' ? ['4']
                : window.location.pathname == '/main/services/verification' ? ['4']
                  : window.location.pathname == '/main/settings/profile' ? ['5']
                  : window.location.pathname == '/main/settings/security' ? ['5'] : ['']
      }>
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
            <Accordion.Header>Progress</Accordion.Header>
            <Accordion.Body className={window.location.pathname == '/main/progress' ? 'bg-primary p-2' : 'p-2 bg-primary-hover'}>
              <a href='/main/progress' className={window.location.pathname == '/main/progress' ? 'text-decoration-none text-white' : 'text-decoration-none text-black'}>Data Progress</a>
            </Accordion.Body>
            <Accordion.Body className={window.location.pathname == '/main/progress/verification' ? 'bg-primary p-2' : 'p-2 bg-primary-hover'}>
              <a href='/main/progress/verification' className={window.location.pathname == '/main/progress/verification' ? 'text-decoration-none text-white' : 'text-decoration-none text-black'}>Verifikasi Progress</a>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey={'4'}>
            <Accordion.Header>Jasa</Accordion.Header>
            <Accordion.Body className={window.location.pathname == '/main/services' ? 'bg-primary p-2' : 'p-2 bg-primary-hover'}>
              <a href='/main/services' className={window.location.pathname == '/main/services' ? 'text-decoration-none text-white' : 'text-decoration-none text-black'}>Data Jasa</a>
            </Accordion.Body>
            <Accordion.Body className={window.location.pathname == '/main/services/verification' ? 'bg-primary p-2' : 'p-2 bg-primary-hover'}>
              <a href='/main/services/verification' className={window.location.pathname == '/main/services/verification' ? 'text-decoration-none text-white' : 'text-decoration-none text-black'}>Verifikasi Jasa</a>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey={'5'}>
            <Accordion.Header>Settings</Accordion.Header>
            <Accordion.Body className={window.location.pathname == '/main/settings/profile' ? 'bg-primary p-2' : 'p-2 bg-primary-hover'}>
              <a href='/main/settings/profile' className={window.location.pathname == '/main/settings/profile' ?'text-decoration-none text-white' : 'text-decoration-none text-black'}>Profil</a>
            </Accordion.Body>
            <Accordion.Body className={window.location.pathname == '/main/settings/security' ? 'bg-primary p-2' : 'p-2 bg-primary-hover'}>
              <a href='/main/settings/security' className={window.location.pathname == '/main/settings/security' ?'text-decoration-none text-white' : 'text-decoration-none text-black'}>Kemanan</a>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    </div>
  )
}
