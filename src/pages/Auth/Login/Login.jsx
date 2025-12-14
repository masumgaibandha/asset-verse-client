import React from 'react'
import { useForm } from 'react-hook-form'
import useAuth from '../../../hooks/useAuth'
import { toast } from 'react-toastify'
import { Link } from 'react-router'

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const {signInUser} = useAuth()

  const handleLogin = (data) => {
    console.log('Login Form Data', data)
    signInUser(data.email, data.password)
    .then(result => {
      toast.success('Log in Success')
    })
    .catch(error =>{
      toast.error('Login failed')
    })

  }

  return (
    <div className="card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl">
      <h3 className="text-3xl text-center py-5">Welcome Back</h3>
      <p className='text-center'>Please Login</p>
      <form onSubmit={handleSubmit(handleLogin)} className='card-body'>

        <fieldset className="fieldset">
          {/* Email Field */}
          <label className="label">Email</label>
          <input type="email" {...register('email', { required: true })} className="input" placeholder="Email" />

          {
            errors.email?.type === "required" && <p className='text-red-500'>Email is required</p>
          }

          {/* Pasword Field */}
          <label className="label">Password</label>
          <input type="password" {...register('password', { required: true })} className="input" placeholder="Password" />
          
          {
            errors.password?.type === 'required' && <p className='text-red-500'> Input Valid Password</p>
          }

          <div><a className="link link-hover">Forgot password?</a></div>
          <button className="btn btn-neutral bg-accent mt-4">Login</button>
        </fieldset>
          <p>New to AssetVerse? <Link className='text-blue-500' to={'/register'}>Register</Link></p>
      </form>
    </div>
  )
}

export default Login