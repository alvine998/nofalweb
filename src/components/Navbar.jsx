import { BellIcon, UserIcon } from '@heroicons/react/solid'
import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Button, Dropdown, Modal } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { logo_biru } from '../assets'

const Navbar = () => {

    const [user, setuser] = useState()
    const [toggle, setToggle] = useState(false)
    const [notif, setNotif] = useState()
    const [toggleNotif, setToggleNotif] = useState(false)
    const navigate = useNavigate()
    const getSession = async () => {
        const data = await JSON.parse(localStorage.getItem('logSession'))
        console.log("Session : ", data);
        setuser(data)
        getNotification(data?.id)
    }

    const getNotification = async (id) => {
        try {
            const result = await axios.get(`http://localhost:6001/notification/list?user_id=${id}`)
            setNotif(result.data)
        } catch (error) {
            console.log(error)
        }
    }

    const removeSession = async () => {
        await localStorage.removeItem('logSession')
        navigate('/')
    }

    useEffect(() => {
        getSession()
    }, [])
    return (
        <div>
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <div class="container-fluid">
                    <a class="navbar-brand" href="#"><img src={logo_biru} className={'w-100'} style={{ height: 50 }} /></a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                                <a class={window.location.pathname == '/' ? "nav-link active" : "nav-link"} aria-current="page" href="/">Home</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="http://crestec.co.id/">About</a>
                            </li>
                            <li class="nav-item">
                                <a class={window.location.pathname == '/help' ? "nav-link active" : "nav-link"} href="/help">Bantuan</a>
                            </li>


                        </ul>

                        <form class="d-flex">

                            {
                                user ? (
                                    <>
                                        <div>
                                            {
                                                notif ?
                                                    <div>
                                                        <div style={{ width: 15, height: 15, backgroundColor: 'red', borderRadius: 15, zIndex: -999, marginRight: 10 }}>
                                                            <p style={{ color: "white", fontSize: 10, marginLeft: 5 }}>
                                                                {notif.filter((value) => value.read == 0).length}
                                                            </p>
                                                        </div>
                                                        <a href='#'>
                                                            <BellIcon onClick={() => { setToggleNotif(!toggleNotif) }} color='black' style={{ width: 30, height: 30, marginTop: -15 }} />
                                                        </a>
                                                    </div>
                                                    :
                                                    <a href='#'>
                                                        <BellIcon onClick={() => { setToggleNotif(!toggleNotif) }} color='black' style={{ width: 30, height: 30, marginTop: 10 }} />
                                                    </a>
                                            }
                                            {
                                                toggleNotif ?
                                                    <Modal show={toggleNotif} onHide={() => setToggleNotif(!toggleNotif)}>
                                                        <Modal.Header closeButton>
                                                            <Modal.Title>Notifikasi</Modal.Title>
                                                        </Modal.Header>
                                                        <Modal.Body>
                                                            {
                                                                notif?.length > 0 ?
                                                                    notif.map((val, i) => (
                                                                        <>
                                                                            <div key={i} style={{ padding: 10 }}>
                                                                                <div style={{ borderWidth: 1, width: '100%', height: 100, borderStyle: "solid", borderRadius: 10, borderColor: val?.status == 0 ? 'black' : val?.status == 1 ? 'blue' : val?.status == 2 ? 'red' : 'green' }}>
                                                                                    <p style={{ margin: 10 }}>
                                                                                        {val.content}
                                                                                    </p>
                                                                                </div>
                                                                            </div>
                                                                        </>
                                                                    ))
                                                                    : <p>Tidak ada notifikasi untuk kamu</p>
                                                            }
                                                        </Modal.Body>
                                                    </Modal> : ''
                                            }
                                        </div>
                                        &nbsp;
                                        <p style={{ marginTop: 10 }} className="pe-3">Welcome, {user?.fullname}</p>
                                        <Modal show={toggle} onHide={() => setToggle(!toggle)}>
                                            <Modal.Header closeButton>
                                                <Modal.Title>Logout</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>Apakah kamu yakin ingin keluar dari dashboard admin ?</Modal.Body>
                                            <Modal.Footer>
                                                <Button variant="warning" onClick={() => setToggle(!toggle)}>
                                                    Kembali
                                                </Button>
                                                <Button variant="danger" onClick={removeSession}>
                                                    Ya
                                                </Button>
                                            </Modal.Footer>
                                        </Modal>
                                        <Dropdown>
                                            <Dropdown.Toggle size='sm' variant="" id="dropdown-basic">
                                                <UserIcon height={20} width={20} color={"black"} />
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu>
                                                <Dropdown.Item href="/main/dashboard">Dashboard</Dropdown.Item>
                                                <Dropdown.Item href="/main/profil/user">Profil</Dropdown.Item>
                                                <Dropdown.Item href="/main/profil/edit">Pengaturan Akun</Dropdown.Item>
                                                <Dropdown.Item onClick={() => { setToggle(true) }}>Keluar</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </>
                                ) : (
                                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                                        <li class="nav-item">
                                            <a class="nav-link" href="/login">Masuk</a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link" href="/register">Daftar</a>
                                        </li>
                                    </ul>
                                )
                            }
                            {/* <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" /> */}
                        </form>
                    </div>
                </div>
            </nav >
        </div >
    )
}

export default Navbar