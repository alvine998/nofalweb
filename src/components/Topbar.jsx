/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useEffect, useState } from 'react'
import { Popover, Transition } from '@headlessui/react'
import {
    BookmarkAltIcon,
    CalendarIcon,
    ChartBarIcon,
    CursorClickIcon,
    MenuIcon,
    PhoneIcon,
    PlayIcon,
    RefreshIcon,
    ShieldCheckIcon,
    SupportIcon,
    ViewGridIcon,
    XIcon,
} from '@heroicons/react/outline'
import { BellIcon, ChevronDownIcon, UserIcon } from '@heroicons/react/solid'
import { useNavigate } from 'react-router-dom';
import { Button, Dropdown, Modal } from 'react-bootstrap';


export default function Topbar({ children }) {
    const navigate = useNavigate()
    const [toggle, setToggle] = useState(false)
    const [user, setuser] = useState()

    const getSession = async () => {
        const data = await JSON.parse(localStorage.getItem('logSession'))
        console.log("Session : ", data);
        if (!data) {
            return navigate("/")
        } else {
            setuser(data?.fullname)
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
            <nav class="navbar navbar-expand-lg navbar-light fixed-top bg-light">
                <div class="container-fluid px-5">
                    <a class="navbar-brand" href="#">Crestec Indonesia</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                        </ul>
                        <BellIcon color='black' style={{ width: 30, height: 30 }} />
                        &nbsp;
                        <p style={{ marginTop: 10 }} className="pe-3">Welcome, {user}</p>
                        <div className="d-flex">
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
                                    <Dropdown.Item href="/main/profil/user">Profil</Dropdown.Item>
                                    <Dropdown.Item href="/main/profil/edit">Pengaturan Akun</Dropdown.Item>
                                    <Dropdown.Item onClick={()=>{setToggle(true)}}>Keluar</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            {/* <button class="btn btn-danger btn-sm" onClick={() => setToggle(true)}>Keluar</button> */}
                        </div>
                    </div>
                </div>
            </nav>
            <div style={{ marginTop: 80 }}>
                {children}
            </div>
        </div>
    )
}
