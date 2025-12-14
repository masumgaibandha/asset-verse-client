import React from 'react'
import { useForm } from 'react-hook-form'

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm()

    const handleRegistration = (data) => {
        console.log('After register', data)
    }
    return (
        <div>
            <form onSubmit={handleSubmit(handleRegistration)}>
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
            </form>
        </div>
    )
}

export default Register