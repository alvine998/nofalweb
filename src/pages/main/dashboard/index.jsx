import React, { useEffect, useState } from 'react'
import Layout from '../../../components/Layout'
import './dashboard.css'
import axios from 'axios'

export default function Dashboard() {
  const [data, setData] = useState()
  const [users, setUsers] = useState([])

  const getSession = async () => {
    const data = await JSON.parse(localStorage.getItem('logSession'))
    const session = await JSON.parse(localStorage.getItem('session'))
    setData(data)
    getDashboard(session)
  }

  const getDashboard = async (session) => {
    try {
      const result = await axios.get(`http://localhost:6001/users/list`, {
        withCredentials: false,
        headers: { 'x-admin-token': session?.token, 'Access-Control-Allow-Origin': '*' }
      })
      setUsers(result.data)
      console.log(result.data);
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
                  <h5 className='text-white'>Users :</h5>
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
                  <h5 className='text-white'>Products :</h5>
                </div>
                <div className='col-md'>
                  <h5 className='text-white float-end'>50</h5>
                </div>
              </div>
            </div>
          </div>
          <div className='col-md'>
            <div className='box-dash'>
              <div className='row'>
                <div className='col-md'>
                  <h5 className='text-white'>Users :</h5>
                </div>
                <div className='col-md'>
                  <h5 className='text-white float-end'>20</h5>
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
                  <h5 className='text-white'>Merchants :</h5>
                </div>
                <div className='col-md'>
                  <h5 className='text-white float-end'>10</h5>
                </div>
              </div>
            </div>
          </div>
          <div className='col-md'>
            <div className='box-dash'>
              <div className='row'>
                <div className='col-md'>
                  <h5 className='text-white'>Transactions :</h5>
                </div>
                <div className='col-md'>
                  <h5 className='text-white float-end'>100</h5>
                </div>
              </div>
            </div>
          </div>
          <div className='col-md'>
            <div className='box-dash'>
              <div className='row'>
                <div className='col-md'>
                  <h5 className='text-white'>Profit :</h5>
                </div>
                <div className='col-md'>
                  <h5 className='text-white float-end'>Rp 0</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
