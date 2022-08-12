import React, { useEffect, useState } from 'react'
import Layout from '../../../components/Layout'
import './dashboard.css'
import axios from 'axios'

export default function Dashboard() {
  const [data, setData] = useState()
  const [users, setUsers] = useState([])
  const [product, setProduct] = useState([])
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
      const result = await axios.get(`https://api.rajawali-pro.kinikumuda.id/users/list`, {
        withCredentials: false,
        headers: { 'x-admin-token': session?.token, 'Access-Control-Allow-Origin': '*' }
      })
      setUsers(result.data)

      const resultProduct = await axios.get(`https://api.rajawali-pro.kinikumuda.id/products`, {
        withCredentials: false,
        headers: { 'x-admin-token': session?.token, 'Access-Control-Allow-Origin': '*' }
      })
      setProduct(resultProduct.data)

      const resultServices = await axios.get(`https://api.rajawali-pro.kinikumuda.id/services/list`, {
        withCredentials: false,
        headers: { 'x-admin-token': session?.token, 'Access-Control-Allow-Origin': '*' }
      })
      setServices(resultServices.data)

      const resultPartners = await axios.get(`https://api.rajawali-pro.kinikumuda.id/partners/list`, {
        withCredentials: false,
        headers: { 'x-admin-token': session?.token, 'Access-Control-Allow-Origin': '*' }
      })
      setPartners(resultPartners.data)
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
                  <h5 className='text-white'>Pengguna :</h5>
                </div>
                <div className='col-md'>
                  <h5 className='text-white float-end'>{users.length}</h5>
                </div>
              </div>
            </div>
          </div>
          <div className='col-md'>
            <div className='box-dash'>
              <div className='row'>
                <div className='col-md'>
                  <h5 className='text-white'>Produk :</h5>
                </div>
                <div className='col-md'>
                  <h5 className='text-white float-end'>{product.length}</h5>
                </div>
              </div>
            </div>
          </div>
          <div className='col-md'>
            <div className='box-dash'>
              <div className='row'>
                <div className='col-md'>
                  <h5 className='text-white'>Jasa :</h5>
                </div>
                <div className='col-md'>
                  <h5 className='text-white float-end'>{services.length}</h5>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='row mt-5'>
          <div className='col-md'>
            <div className='box-dash'>
              <div className='row'>
                <div className='col-md'>
                  <h5 className='text-white'>Mitra :</h5>
                </div>
                <div className='col-md'>
                  <h5 className='text-white float-end'>{partners.length}</h5>
                </div>
              </div>
            </div>
          </div>
          <div className='col-md'>

          </div>
          <div className='col-md'>
            
          </div>
        </div>
      </div>
    </Layout>
  )
}
