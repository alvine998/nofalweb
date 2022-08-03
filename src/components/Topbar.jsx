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
        console.log(data);
        setuser(data.name)
        if (data == null) {
            navigate("/")
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
                                    <Modal.Title>Sign Out</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>Do you want to leave ?</Modal.Body>
                                <Modal.Footer>
                                    <Button variant="warning" onClick={() => setToggle(!toggle)}>
                                        Cancel
                                    </Button>
                                    <Button variant="danger" onClick={removeSession}>
                                        Leave
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                            <button class="btn btn-danger" onClick={() => setToggle(true)}>Sign Out</button>
                        </div>
                    </div>
                </div>
            </nav>
            <div style={{marginTop:80}}>
                {children}
            </div>
        </div>
    )
}
