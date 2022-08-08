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
import { ChevronDownIcon } from '@heroicons/react/solid'
import { useNavigate } from 'react-router-dom';
import { Button, Modal } from 'react-bootstrap';


export default function Topbar({ children }) {
    const navigate = useNavigate()
    const [toggle, setToggle] = useState(false)
    const [user, setuser] = useState()

    const getSession = async () => {
        const data = await JSON.parse(localStorage.getItem('logSession'))
        const session = await JSON.parse(localStorage.getItem('session'))
        console.log("Session : ", session);
        if (!session) {
            return navigate("/")
        } else {
            setuser(data.name)
        }
    }

    const removeSession = async () => {
        await localStorage.removeItem('logSession')
        await localStorage.removeItem('session')
        navigate('/')
    }

    useEffect(() => {
        getSession()
    }, [])

    return (
        <div>
            <nav class="navbar navbar-expand-lg navbar-light fixed-top bg-light">
                <div class="container-fluid px-5">
                    <a class="navbar-brand" href="#">Rajawali-Pro</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                        </ul>
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
                            <button class="btn btn-danger btn-sm" onClick={() => setToggle(true)}>Keluar</button>
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
