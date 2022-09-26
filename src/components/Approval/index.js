import React from 'react'
import { Button, Modal } from 'react-bootstrap'

const ModalApproval = ({ toggle, setToggle, title, body }) => {
    return (
        <>
            <Modal show={toggle} onHide={() => { setToggle(!toggle) }}>
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>{body}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => { setToggle(!toggle) }}>
                        Tutup
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export {ModalApproval}