import React, { useState } from 'react'
import { assets } from '../assets/assets'

const Login = () => {

  const [state, setState] = useState('Sign Up') //initial value is sign up

  return (
    <div className='flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-cyan-200 to-amber-200'>
      <img src={assets.logo} alt="" className='absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer'/>
      <div>
        <h2>{state === 'Sign Up' ? 'Create account' : 'Login'}</h2>
        <p>{state === 'Sign Up' ? 'Create your account' : 'Login to your account'}</p>
      </div>
    </div>
  )
}

export default Login
