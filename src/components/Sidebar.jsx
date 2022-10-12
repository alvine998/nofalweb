import { InformationCircleIcon, QuestionMarkCircleIcon } from '@heroicons/react/solid'
import React, { useEffect, useState } from 'react'
import { Accordion } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { logo, logo_bulat1, logo_bulat2, logo_rajawali } from '../assets'
import { BiHelpCircle } from "react-icons/gi"; 
import './style.css'

export default function Sidebar() {
  const [openKey, setOpenKey] = useState()
  const navigate = useNavigate()
  const [toggle, setToggle] = useState(false)
  const [user, setuser] = useState()

  const getSession = async () => {
    const data = await JSON.parse(localStorage.getItem('logSession'))
    console.log("Session : ", data);
    if (!data) {
      return navigate("/")
    } else {
      setuser(data)
    }
  }

  useEffect(() => {
    getSession()
  }, [])

  useEffect(() => {
    console.log("Open key: ", openKey);
  }, [])
  return (
    <div className='bg-white w-100 h-100vh'>
      <center>
        <img src={logo_bulat1} className="w-50" />
      </center>
      <div className='m-2'>
        <a className='text-decoration-none text-black text-center' href="/main/dashboard"><h5>Dashboard</h5></a>
      </div>
      <div>
        <Accordion alwaysOpen defaultActiveKey={
          window.location.pathname == '/main/user/list' ? ['1']
            : window.location.pathname == '/main/mail/list' ? ['1']
              : window.location.pathname == '/main/regis/penyimpanan' ? ['1']
                : window.location.pathname == '/main/purchase/request' ? ['2']
                  : window.location.pathname == '/main/work/helpdesk' ? ['2']
                    : window.location.pathname == '/main/work/job/list' ? ['2']
                      : window.location.pathname == '/main/work/mail/list' ? ['2']
                        : window.location.pathname == '/main/work/regis/list' ? ['2']
                          : ['']
        }>
          {console.log(user)}
          {
            user?.role == "user" ? (
              <>
                <Accordion.Item eventKey={'1'}>
                  <Accordion.Header>Pengguna</Accordion.Header>
                  <Accordion.Body className={window.location.pathname == '/main/user/list' ? 'bg-primary p-2' : 'p-2 bg-primary-hover'}>
                    <a href='/main/user/list' onClick={() => setOpenKey(1)} className={window.location.pathname == '/main/user/list' ? 'text-decoration-none text-white' : 'text-decoration-none text-black'}>Job Request</a>
                  </Accordion.Body>
                  <Accordion.Body className={window.location.pathname == '/main/mail/list' ? 'bg-primary p-2' : 'p-2 bg-primary-hover'}>
                    <a href='/main/mail/list' onClick={() => setOpenKey(1)} className={window.location.pathname == '/main/mail/list' ? 'text-decoration-none text-white' : 'text-decoration-none text-black'}>Email Request</a>
                  </Accordion.Body>
                  <Accordion.Body className={window.location.pathname == '/main/regis/penyimpanan' ? 'bg-primary p-2' : 'p-2 bg-primary-hover'}>
                    <a href='/main/regis/penyimpanan' onClick={() => setOpenKey(1)} className={window.location.pathname == '/main/regis/penyimpanan' ? 'text-decoration-none text-white' : 'text-decoration-none text-black'}>Registrasi Penyimpanan</a>
                  </Accordion.Body>
                </Accordion.Item>
              </>
            ) : (
              <>
                <Accordion.Item eventKey={'1'}>
                  <Accordion.Header>Pengguna</Accordion.Header>
                  <Accordion.Body className={window.location.pathname == '/main/user/list' ? 'bg-primary p-2' : 'p-2 bg-primary-hover'}>
                    <a href='/main/user/list' onClick={() => setOpenKey(1)} className={window.location.pathname == '/main/user/list' ? 'text-decoration-none text-white' : 'text-decoration-none text-black'}>Job Request</a>
                  </Accordion.Body>
                  <Accordion.Body className={window.location.pathname == '/main/mail/list' ? 'bg-primary p-2' : 'p-2 bg-primary-hover'}>
                    <a href='/main/mail/list' onClick={() => setOpenKey(1)} className={window.location.pathname == '/main/mail/list' ? 'text-decoration-none text-white' : 'text-decoration-none text-black'}>Email Request</a>
                  </Accordion.Body>
                  <Accordion.Body className={window.location.pathname == '/main/regis/penyimpanan' ? 'bg-primary p-2' : 'p-2 bg-primary-hover'}>
                    <a href='/main/regis/penyimpanan' onClick={() => setOpenKey(1)} className={window.location.pathname == '/main/regis/penyimpanan' ? 'text-decoration-none text-white' : 'text-decoration-none text-black'}>Registrasi Penyimpanan</a>
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey={'2'}>
                  <Accordion.Header>Daftar Kerja</Accordion.Header>
                  <Accordion.Body className={window.location.pathname == '/main/work/job/list' ? 'bg-primary p-2' : 'p-2 bg-primary-hover'}>
                    <a href='/main/work/job/list' onClick={() => setOpenKey(2)} className={window.location.pathname == '/main/work/job/list' ? 'text-decoration-none text-white' : 'text-decoration-none text-black'}>List Job Request</a>
                  </Accordion.Body>
                  <Accordion.Body className={window.location.pathname == '/main/work/mail/list' ? 'bg-primary p-2' : 'p-2 bg-primary-hover'}>
                    <a href='/main/work/mail/list' onClick={() => setOpenKey(2)} className={window.location.pathname == '/main/work/mail/list' ? 'text-decoration-none text-white' : 'text-decoration-none text-black'}>List Email Request</a>
                  </Accordion.Body>
                  <Accordion.Body className={window.location.pathname == '/main/work/regis/list' ? 'bg-primary p-2' : 'p-2 bg-primary-hover'}>
                    <a href='/main/work/regis/list' onClick={() => setOpenKey(2)} className={window.location.pathname == '/main/work/regis/list' ? 'text-decoration-none text-white' : 'text-decoration-none text-black'}>List Regis Penyimpanan</a>
                  </Accordion.Body>
                  <Accordion.Body className={window.location.pathname == '/main/work/helpdesk' ? 'bg-primary p-2' : 'p-2 bg-primary-hover'}>
                    <a href='/main/work/helpdesk' onClick={() => setOpenKey(2)} className={window.location.pathname == '/main/work/helpdesk' ? 'text-decoration-none text-white' : 'text-decoration-none text-black'}>Post Helpdesk</a>
                  </Accordion.Body>
                  <Accordion.Body className={window.location.pathname == '/main/purchase/request' ? 'bg-primary p-2' : 'p-2 bg-primary-hover'}>
                    <a href='/main/purchase/request' onClick={() => setOpenKey(2)} className={window.location.pathname == '/main/purchase/request' ? 'text-decoration-none text-white' : 'text-decoration-none text-black'}>Purchase Request</a>
                  </Accordion.Body>
                </Accordion.Item>
              </>
            )
          }
        </Accordion>
        <div style={{marginTop:20, marginLeft:10}}>
                  <QuestionMarkCircleIcon color='slate' style={{ width: 20, height: 20}}/>
                  <a href='/help' className={'text-decoration-none text-black'}>Bantuan</a>
                </div>
      </div>
    </div>
  )
}
