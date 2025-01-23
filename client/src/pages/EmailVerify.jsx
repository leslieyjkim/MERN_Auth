import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios'
import { AppContext } from '../context/AppContext'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const EmailVerify = () => {

  axios.defaults.withCredentials = true; //allows to send with cookies in the request
  const {backendUrl, isLoggedin, userData, getUserData} = useContext(AppContext)

  const navigate = useNavigate()

  const inputRefs = React.useRef([]) 

  const handleInput = (e, index) => {
    if(e.target.value.length > 0 && index < inputRefs.current.length -1) { //if anything was already written in input value
      inputRefs.current[index + 1].focus();//cursor will move to the next input field automatically.
    }  
  }

  const handleKeyDown = (e, index) => {    //Delete the wrong number in input fields and move to previous one
    if(e.key === 'Backspace' && e.target.value === '' && index > 0 ){
      inputRefs.current[index - 1].focus();
    }
  }

  const handlePaste = (e) => {//Copy & paste 6 digits OTP at once
    const paste = e.clipboardData.getData('text')
    const pasteArray = paste.split('');
    pasteArray.forEach((char, index)=>{  //put the splitted 6 numbers into each fields.
      if(inputRefs.current[index]){
        inputRefs.current[index].value = char;
      }
    })
  }


  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault() //prevent reloading page when we submit this form to backend
      const otpArray = inputRefs.current.map(e => e.value) //all the input values will store this 'otpArray'
      const otp = otpArray.join('')

      //API CALL
      const {data} = await axios.post(backendUrl + '/api/auth/verify-account', {otp})

      if(data.success){
        toast.success(data.message);
        getUserData()
        navigate('/')
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div className='flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-200 to-amber-200'>
      <img onClick={()=>navigate('/')} src={assets.logo} alt="" className='absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer' />
      <form onSubmit={onSubmitHandler} className='bg-amber-300 p-8 rounded-lg shadow-lg w-107 text-sm'>
        <h1 className='text-blue-500 text-2xl font-semibold text-center mb-4'>Email Verify OTP</h1>
        <p className='text-center mb-6 text-blue-500'>Enter the 6-digit code sent to your email id.</p>
        <div className='flex justify-between mb-8' onPaste={handlePaste}>
          {Array(6).fill(0).map((_, index)=>(
            <input type="text" maxLength='1' key={index} required className='w-12 h-12 bg-blue-500 text-white text-center text-xl rounded-md '
            ref={e => inputRefs.current[index] = e}
            onInput = {(e) => handleInput(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            />
          ))}
        </div>
        <button className='w-full py-3 bg-gradient-to-r from-indigo-500 to-indigo-900 text-white rounded-full'>Verify Email</button>
      </form>
    </div>
  )
}

export default EmailVerify
