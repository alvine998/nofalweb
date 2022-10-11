import React, { useEffect, useState } from 'react'
import Layout from '../../../components/Layout'
import './dashboard.css'
import axios from 'axios'

export default function Dashboard() {
  const [data, setData] = useState()
  const [users, setUsers] = useState([])
  const [product, setProduct] = useState()
  const [services, setServices] = useState([])
  const [partners, setPartners] = useState([])

  const getSession = async () => {
    const data = await JSON.parse(localStorage.getItem('logSession'))
    const session = await JSON.parse(localStorage.getItem('session'))
    setData(data)
    getDashboard(session)
  }

  const getDashboard = async (session) => {
    try {
      const result = await axios.get(`http://localhost:6001/mails/list`, {
        withCredentials: false,
        headers: { 'x-admin-token': session?.token, 'Access-Control-Allow-Origin': '*' }
      })
      setUsers(result.data)

      const resultProduct = await axios.get(`http://localhost:6001/jobs/list?status=0`, {
        withCredentials: false,
        headers: { 'x-admin-token': session?.token, 'Access-Control-Allow-Origin': '*' }
      })
      const resultProduct2 = await axios.get(`http://localhost:6001/jobs/list?status=1`, {
        withCredentials: false,
        headers: { 'x-admin-token': session?.token, 'Access-Control-Allow-Origin': '*' }
      })
      setProduct(resultProduct.data.length + resultProduct2.data.length)

      const resultServices = await axios.get(`http://localhost:6001/storages/list`, {
        withCredentials: false,
        headers: { 'x-admin-token': session?.token, 'Access-Control-Allow-Origin': '*' }
      })
      setServices(resultServices.data)
    } catch (error) {

    }
  }

  useEffect(() => {
    getSession()
  }, [])
  return (
    <Layout>
      <div className='container mt-5'>
        <div className='row'>
          <div className='col-md'>
            <div className='box-dash'>
              <div className='row'>
                <div className='col-md'>
                  <h5 className='text-white'>Total Job Request Masuk :</h5>
                </div>
                <div className='col-md-2'>
                  <h5 className='text-white float-end'>{product}</h5>
                </div>
              </div>
            </div>
          </div>
          <div className='col-md'>
            <div className='box-dash'>
              <div className='row'>
                <div className='col-md'>
                  <h5 className='text-white'>Total Email Request :</h5>
                </div>
                <div className='col-md-2'>
                  <h5 className='text-white float-end'>{users.length}</h5>
                </div>
              </div>
            </div>
          </div>
          <div className='col-md'>
            <div className='box-dash'>
              <div className='row'>
                <div className='col-md'>
                  <h5 className='text-white'>Total Regis Penyimpanan :</h5>
                </div>
                <div className='col-md-2'>
                  <h5 className='text-white float-end'>{services.length}</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
