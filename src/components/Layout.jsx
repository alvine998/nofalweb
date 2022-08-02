import React from 'react'
import Sidebar from './Sidebar'
import Topbar from './Topbar'

export default function Layout({ children }) {
    return (
        <>
            <Topbar>
                <div className='row g-0'>
                    <div className='col-md-2'>
                        <Sidebar />
                    </div>
                    <div className='col-md'>
                        <div className='container'>
                            {children}
                        </div>
                    </div>
                </div>
            </Topbar>
        </>
    )
}
