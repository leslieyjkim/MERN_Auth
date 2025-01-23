import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const ResetPassword = () => {
  //to make API CALL
  const {backendUrl} = useContext(AppContext)
  //sending cookies also
  axios.defaults.withCredentials = true;

  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [isEmailSent, setIsEmailSent] = useState('')
  const [otp, setOtp] = useState(0)
  const [isOtpSubmited, setIsOtpSubmited] = useState(false)

  const inputRefs = React.useRef([])
 
  const handleInput = (e, index) => {
    if (e.target.value.length > 0 && index < inputRefs.current.length - 1) { //if anything was already written in input value
      inputRefs.current[index + 1].focus();//cursor will move to the next input field automatically.
    }
  }

  const handleKeyDown = (e, index) => {    //Delete the wrong number in input fields and move to previous one
    if (e.key === 'Backspace' && e.target.value === '' && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  }

  const handlePaste = (e) => {//Copy & paste 6 digits OTP at once
    const paste = e.clipboardData.getData('text')
    const pasteArray = paste.split('');
    pasteArray.forEach((char, index) => {  //put the splitted 6 numbers into each fields.
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = char;
      }
    })
  }

  const onSubmitEmail = async (e)=>{
    e.preventDefault();
    try {
      const {data} = await axios.post(backendUrl + '/api/auth/send-reset-otp', {email})
      data.success ? toast.success(data.message) : toast.error(data.message)
      data.success && setIsEmailSent(true)
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div className='flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-200 to-amber-200'>
      <img onClick={() => navigate('/')} src={assets.logo} alt="" className='absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer' />
      {/* enter email id */}

      {!isEmailSent && 
      <form onSubmit={onSubmitEmail} className='bg-amber-300 p-8 rounded-lg shadow-lg w-107 text-sm'>
        <h1 className='text-blue-500 text-2xl font-semibold text-center mb-4'>Reset Password</h1>
        <p className='text-center mb-6 text-blue-500'>Enter your registered email address.</p>
        <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#1d4ed8]'>
          <img src={assets.mail_icon} alt="" className='w-3 h-3' />
          <input type="email" placeholder='Email id'
            className='bg-transparent outline-none text-white'
            value={email} onChange={e => setEmail(e.target.value)} required />
        </div>
        <button className='w-full py-2.5 bg-gradient-to-r from-indigo-500 to-indigo-900 text-white rounded-full mt-3'>Submit</button>
      </form>
      }

      {/* otp input form */}

      {!isOtpSubmited && isEmailSent && 
      <form className='bg-amber-300 p-8 rounded-lg shadow-lg w-107 text-sm'>
        <h1 className='text-blue-500 text-2xl font-semibold text-center mb-4'>Reset Password OTP</h1>
        <p className='text-center mb-6 text-blue-500'>Enter the 6-digit code sent to your email id</p>
        <div className='flex justify-between mb-8' onPaste={handlePaste}>
          {Array(6).fill(0).map((_, index) => (
            <input type="text" maxLength='1' key={index} required className='w-12 h-12 bg-blue-500 text-white text-center text-xl rounded-md '
              ref={e => inputRefs.current[index] = e}
              onInput={(e) => handleInput(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
            />
          ))}
        </div>
        <button className='w-full py-2.5 bg-gradient-to-r from-indigo-500 to-indigo-900 text-white rounded-full'>Submit</button>
      </form>
      }

      {/* enter new password */}

      {isOtpSubmited && isEmailSent &&
      <form className='bg-amber-300 p-8 rounded-lg shadow-lg w-107 text-sm'>
        <h1 className='text-blue-500 text-2xl font-semibold text-center mb-4'>New Password</h1>
        <p className='text-center mb-6 text-blue-500'>Enter the new password below.</p>
        <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#1d4ed8]'>
          <img src={assets.lock_icon} alt="" className='w-3 h-3' />
          <input type="password" placeholder='Password'
            className='bg-transparent outline-none text-white'
            value={newPassword} onChange={e => setNewPassword(e.target.value)} required />
        </div>
        <button className='w-full py-2.5 bg-gradient-to-r from-indigo-500 to-indigo-900 text-white rounded-full mt-3'>Submit</button>
      </form>
      }
    </div>
  )
}

export default ResetPassword
