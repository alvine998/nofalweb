import React, { useEffect, useState } from 'react'
import { img1 } from '../../assets'
import './verification.css'
import { PaperAirplaneIcon } from '@heroicons/react/solid'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

export default function Verification() {
  const [payload, setPayload] = useState()
  const onchange = (e) => {
    setPayload({ ...payload, [e.target.name]: e.target.value })
  }

  const navigate = useNavigate()

  const getSession = async () => {
    const mail = await localStorage.getItem('logSession')
    console.log(mail);
    if (mail !== null) {
      navigate("/main/dashboard")
    }
  }

  useEffect(()=>{
    getSession()
  },[])

  const onSubmit = async (e) => {
    e.preventDefault()
    if (payload?.code == 123456) {
      Swal.fire({
        text: "Verification Successfull",
        icon: "success"
      })
      navigate('/main/dashboard')
      return
    }
    Swal.fire({
      text: "Your Code Is Wrong",
      icon: "error"
    })
    return

  }
  return (
    <div className="bg-blue">
      <div className="row g-0">
        <div className="col">
          <div className="box">
            <h2 className="text-center mt-5 text-white">CRMFYOU</h2>
            <div>
              <p className="text-white text-center">
                We care about you and your business, so we keep your privacy and data
                safe in our system
              </p>
              <center>
                <PaperAirplaneIcon color='white' className='icon-style' />
              </center>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="box2">
            <h2 className="text-center mt-5">Email Verification</h2>
            {/* <p className='text-center'>Check your email, we sent you a code to verification here</p> */}
            <form onSubmit={onSubmit} className='mt-4'>
              <div>
                <label className="form-label">Code</label>
                <input onChange={onchange} placeholder="* * * * * *" value={payload?.code} name="code" type={'number'} maxLength={6} className="form-control" required />
              </div>
              <button className="btn btn-primary w-100 mt-3" type={'submit'}>Verification</button>
            </form>
            <div className="mt-3">
              <p className="text-center">
                Didn't receive an email from us? <a href="#resend" className="text-decoration-none text-primary">Resend here</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
