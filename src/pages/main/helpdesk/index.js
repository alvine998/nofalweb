import { MinusCircleIcon, PlusCircleIcon } from '@heroicons/react/solid';
import { convertToRaw, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import React, { useEffect, useState } from 'react'
import { Button, Col, Modal, Row, Table } from 'react-bootstrap';
import { Editor } from 'react-draft-wysiwyg';
import { Input, InputArea, RichText, Select } from '../../../components/Input';
import Layout from '../../../components/Layout'
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import DOMPurify from 'dompurify';
import { convertToHTML } from 'draft-convert';

const Helpdesk = () => {

    const [show, setShow] = useState(false)
    const [payload, setPayload] = useState()
    const [selected, setSelected] = useState()
    const [selectedStatus, setSelectedStatus] = useState()
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty())
    const [convertedContent, setConvertedContent] = useState(null);
    const handleEditorChange = (state) => {
        setEditorState(state);
        convertContentToHTML();
    }
    const convertContentToHTML = () => {
        let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
        setConvertedContent(currentContentAsHTML);
    }
    const createMarkup = (html) => {
        return {
            __html: DOMPurify.sanitize(html)
        }
    }
    const [listJobs, setListJobs] = useState([])
    const [toggle, setToggle] = useState(false)
    const [editToggle, setEditToggle] = useState(false)
    const [accToggle, setAccToggle] = useState(false)
    const [user, setuser] = useState()

    const navigate = useNavigate()
    const getSession = async () => {
        const data = await JSON.parse(localStorage.getItem('logSession'))
        console.log("Session : ", data);
        if (!data) {
            return navigate("/")
        } else {
            setuser(data)
        }
        getData(data?.id)
    }

    const getData = async (id) => {
        try {
            const result = await axios.get(`http://localhost:6001/helpdesks/list`)
            setListJobs(result.data)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getSession()
    }, [])

    const StatusOptions = [
        { value: '', label: 'Silahkan Pilih' },
        { value: 'Masalah Hardware', label: 'Masalah Hardware' },
        { value: 'Masalah Software', label: 'Masalah Software' },
        { value: 'Masalah Printer', label: 'Masalah Printer' },
        { value: 'Preventif', label: 'Preventif' },
        { value: 'Masalah Lainnya', label: 'Masalah Lainnya' },
    ]
    const wrapperStyle = {
        border: '1px solid #969696',
        borderRadius: 10,
        padding: 10
    }
    const editorStyle = {
        height: '10rem',
        padding: '1rem'
    }

    const save = async () => {
        const data = {
            created_by: payload?.created_by,
            title: payload?.title,
            slug: payload?.slug,
            category: payload?.category,
            body: convertedContent,
        }
        console.log(data)
        try {
            const result = await axios.post(`http://localhost:6001/helpdesks/`, data, { headers: 'Access-Control-Allow-Origin : *', withCredentials: false })
            setShow(false)
            setPayload()
            Swal.fire({
                text: "Berhasil Menyimpan Data",
                icon: "success"
            })
            getSession()
        } catch (error) {
            console.log(error);
            Swal.fire({
                text: "Gagal Menyimpan Data",
                icon: "error"
            })
        }
    }

    const update = async (id) => {
        const data = {
            ...payload,
            id: id
        }
        console.log(data)
        try {
            const result = await axios.patch(`http://localhost:6001/helpdesks/`, data, { headers: 'Access-Control-Allow-Origin : *', withCredentials: false })
            setEditToggle(false)
            setPayload()
            Swal.fire({
                text: "Berhasil Mengubah Data",
                icon: "success"
            })
            getSession()
        } catch (error) {
            console.log(error);
            Swal.fire({
                text: "Gagal Mengubah Data",
                icon: "error"
            })
        }
    }

    const removing = async (id) => {
        try {
            const result = await axios.delete(`http://localhost:6001/helpdesks?id=${id}`)
            setPayload()
            setToggle(!toggle)
            Swal.fire({
                text: "Berhasil Menghapus Data",
                icon: "success"
            })
            getSession()
        } catch (error) {
            console.log(error);
            Swal.fire({
                text: "Gagal Menghapus Data",
                icon: "error"
            })
        }
    }

    const logging = () => {
        const data = {
            ...payload,
            status: selectedStatus
        }
        console.log(data);
    }
    const handleChange = (e) => {
        setPayload({ ...payload, [e.target.name]: e.target.value })
    }

    const [total, setTotal] = useState(0)

    useEffect(() => {

    }, [total])

    return (
        <>
            <Layout>
                <div style={{ padding: 20 }}>
                    <h2 style={{ fontSize: 30 }}>Buat Postingan Helpdesk</h2>
                    <div style={{ padding: 20 }}>
                        {/* Button */}
                        <Button size='sm' onClick={() => { setShow(!show); setSelected(); setSelectedStatus() }}>Tambah Data Postingan Bantuan</Button>

                        <div>
                            <Table striped bordered hover responsive className='mt-2'>
                                <thead>
                                    <tr className='justify-content-center align-items-center'>
                                        <th>No</th>
                                        <th>Created By</th>
                                        <th>Slug</th>
                                        <th>Judul</th>
                                        <th>Kategori</th>
                                        <th>Content</th>
                                        <th>Opsi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        listJobs?.map((value, i) => (
                                            <tr key={i}>
                                                <td>{i + 1}</td>
                                                <td>{value?.created_by}</td>
                                                <td>{value?.slug}</td>
                                                <td>{value?.title}</td>
                                                <td>{value?.category}</td>
                                                <td>
                                                    <div dangerouslySetInnerHTML={createMarkup(value?.body)}></div>
                                                </td>
                                                {/* <td>{value?.status == 0 ? 'Menunggu' : value?.status == 1 ? 'Disetujui' : value?.status == 3 ? 'Selesai' : 'Ditolak'}</td> */}
                                                <td>
                                                    <button onClick={() => { setEditToggle(!editToggle); setPayload(value) }} className='btn btn-warning btn-sm w-100'>Edit</button>
                                                    <div className='mt-1' />
                                                    <button onClick={() => { setToggle(!toggle); setPayload(value) }} className='btn btn-danger btn-sm w-100'>Hapus</button>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </Table>
                        </div>

                        {
                            editToggle ? (
                                <Modal show={editToggle} onHide={() => { setEditToggle(!editToggle) }}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Edit Data Helpdesk</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <Input title={"Created By"} defaultValue={payload?.created_by} placeholder="Masukkan Nama Penulis" name={"created_by"} handleChange={handleChange} />
                                        <Input title={"Judul"} defaultValue={payload?.title} placeholder="Masukkan Judul" name={"title"} handleChange={handleChange} />
                                        <Input title={"Slug"} defaultValue={payload?.slug} placeholder="Masukkan Slug" name={"slug"} handleChange={handleChange} />
                                        <Select title={"Kategori"} defaultValue={payload?.category} name={"category"} handleChange={handleChange} data={StatusOptions} />
                                        <div className='mt-2'>
                                            <label className='form-label'>Body</label>
                                            <Editor
                                                defaultEditorState={editorState}
                                                wrapperClassName='wrapper-class'
                                                wrapperStyle={wrapperStyle}
                                                editorStyle={editorStyle}
                                                editorClassName="demo-editor"
                                                toolbar={{
                                                    options: ['inline', 'blockType', 'fontSize', 'textAlign',
                                                        'history', 'colorPicker'],
                                                    inline: {
                                                        options: ['italic', 'bold'],
                                                        bold: { className: 'demo-option-custom' },
                                                        italic: { className: 'demo-option-custom' },
                                                        underline: { className: 'demo-option-custom' },
                                                        strikethrough: { className: 'demo-option-custom' },
                                                        monospace: { className: 'demo-option-custom' },
                                                        superscript: { className: 'demo-option-custom' },
                                                        subscript: { className: 'demo-option-custom' }
                                                    },
                                                    blockType: {
                                                        className: 'demo-option-custom-wide',
                                                        dropdownClassName: 'demo-dropdown-custom'
                                                    },
                                                    fontSize: { className: 'demo-option-custom-medium' }
                                                }}
                                                onEditorStateChange={handleEditorChange}
                                            />
                                        </div>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={() => { setEditToggle(!editToggle) }}>
                                            Batalkan
                                        </Button>
                                        <Button variant="primary" onClick={() => { update(payload?.id) }}>
                                            Simpan
                                        </Button>
                                    </Modal.Footer>
                                </Modal>
                            ) : ""
                        }

                        {
                            toggle ? (
                                <Modal show={toggle} onHide={() => { setToggle(!toggle) }}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Hapus Data Helpdesk</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <p>Anda yakin ingin menghapus data {payload?.title}?</p>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={() => { setToggle(!toggle) }}>
                                            Batalkan
                                        </Button>
                                        <Button variant="danger" onClick={() => { removing(payload?.id) }}>
                                            Hapus
                                        </Button>
                                    </Modal.Footer>
                                </Modal>
                            ) : ""
                        }

                        <Modal show={show} onHide={() => { setShow(!show) }}>
                            <Modal.Header closeButton>
                                <Modal.Title>Tambah Data Helpdesk</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Input title={"Created By"} placeholder="Masukkan Nama Penulis" name={"created_by"} handleChange={handleChange} />
                                <Input title={"Judul"} placeholder="Masukkan Judul" name={"title"} handleChange={handleChange} />
                                <Input title={"Slug"} placeholder="Masukkan Slug" name={"slug"} handleChange={handleChange} />
                                <Select title={"Kategori"} name={"category"} handleChange={handleChange} data={StatusOptions} />
                                <div className='mt-2'>
                                    <label className='form-label'>Body</label>
                                    <Editor
                                        editorState={editorState}
                                        wrapperClassName='wrapper-class'
                                        wrapperStyle={wrapperStyle}
                                        editorStyle={editorStyle}
                                        editorClassName="demo-editor"
                                        toolbar={{
                                            options: ['inline', 'blockType', 'fontSize', 'textAlign',
                                                'history', 'colorPicker'],
                                            inline: {
                                                options: ['italic', 'bold'],
                                                bold: { className: 'demo-option-custom' },
                                                italic: { className: 'demo-option-custom' },
                                                underline: { className: 'demo-option-custom' },
                                                strikethrough: { className: 'demo-option-custom' },
                                                monospace: { className: 'demo-option-custom' },
                                                superscript: { className: 'demo-option-custom' },
                                                subscript: { className: 'demo-option-custom' }
                                            },
                                            blockType: {
                                                className: 'demo-option-custom-wide',
                                                dropdownClassName: 'demo-dropdown-custom'
                                            },
                                            fontSize: { className: 'demo-option-custom-medium' }
                                        }}
                                        onEditorStateChange={handleEditorChange}
                                    />
                                </div>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={() => { setShow(!show) }}>
                                    Batalkan
                                </Button>
                                <Button variant="primary" onClick={() => { save() }}>
                                    Simpan
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </div>
                </div>
            </Layout>
        </>
    )
}

export default Helpdesk