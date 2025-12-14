import React from 'react'
import { useForm } from 'react-hook-form'
import useAuth from '../../../hooks/useAuth'
import { toast } from 'react-toastify'
import { Link } from 'react-router'

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const { registerUser } = useAuth()

    const handleRegistration = (data) => {
        console.log('After register', data)
        registerUser(data.email, data.password)
            .then(result => {
                console.log(result.user)
                toast.success('Register Successfully')
            })
            .catch(error => {
                console.log(error)
                toast.error('Error Register')
            })
    }
    return (
        <div className='card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl'>
            <h3 className="text-3xl text-center py-5">Welcome Back</h3>
            <p className='text-center'>Please Login</p>
            <form onSubmit={handleSubmit(handleRegistration)} className='card-body'>
                <fieldset className="fieldset">
                    {/* Email Field */}
                    <label className="label">Email</label>
                    <input type="email"
                        {...register('email',
                            { required: true })} className="input" placeholder="Email" />
                    {errors.email?.type === 'required' && <p className='text-red-500'>Please input valid email</p>}

                    {/* Password Field */}
                    <label className="label">Password</label>
                    <input type="password"
                        {...register('password',
                            {
                                required: true,
                                minLength: 6,
                                pattern:
                                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]+$/,
                            })} className="input" placeholder="Password" />

                    {errors.password?.type === "minLength" && (
                        <p className="text-red-500">
                            Password must be 6 or longer
                        </p>
                    )}
                    {errors.password?.type === "pattern" && (
                        <p className="text-red-500">
                            Password must contain lowercase, uppercase, and a number
                        </p>
                    )}

                    <div><a className="link link-hover">Forgot password?</a></div>
                    <button className="btn btn-accent text-white mt-4">Login</button>
                </fieldset>
                <p>Already have account? <Link className='text-blue-500' to={'/login'}>Login</Link></p>
            </form>
        </div>
    )
}

export default Register