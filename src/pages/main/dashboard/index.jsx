import React, { useEffect } from 'react'
import Layout from '../../../components/Layout'
import './dashboard.css'

export default function Dashboard() {

  return (
    <Layout>
      <div className='container mt-5'>
        <div className='row'>
          <div className='col-md'>
            <div className='box-dash'>
              <div className='row'>
                <div className='col-md'>
                  <h5 className='text-white'>Customers :</h5>
                </div>
                <div className='col-md'>
                  <h5 className='text-white float-end'>20</h5>
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
