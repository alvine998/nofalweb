import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Row } from 'react-bootstrap'
import Navbar from '../../components/Navbar'
import DOMPurify from 'dompurify';

const Help = () => {
    const [search, setSearch] = useState()
    const [lists, setLists] = useState([])
    const createMarkup = (html) => {
        return {
            __html: DOMPurify.sanitize(html)
        }
    }
    const getData = async () => {
        try {
            const result = await axios.get(`http://localhost:6001/helpdesks/list?search=${search || ''}`)
            setLists(result.data)
            console.log(result.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getData()
    }, [search])
    return (
        <>
            <div>
                <Navbar />
                <div className='m-3' style={{ paddingInline: 400 }}>
                    <input placeholder='Cari disini...' value={search} onChange={(e) => { setSearch(e.target.value) }} className='form-control' />
                </div>
                <div className='m-3'>
                    <div className='row g-0'>
                        {
                            lists.map((value, i) => (
                                <div className='col-md-3' key={i}>
                                    <Card style={{ width: '18rem' }}>
                                        <Card.Img variant="top" src="holder.js/100px180" />
                                        <Card.Body>
                                            <Card.Title>{value?.title}</Card.Title>
                                            <Card.Text>
                                                <div dangerouslySetInnerHTML={createMarkup(value?.body)} />
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </div>
                            ))
                        }
                    </div>

                </div>
            </div>
        </>
    )
}

export default Help