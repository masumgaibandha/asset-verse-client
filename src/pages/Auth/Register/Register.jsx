import React from 'react'
import { useForm } from 'react-hook-form'
import useAuth from '../../../hooks/useAuth'
import { toast } from 'react-toastify'
import { Link } from 'react-router'
import SocialLogin from '../SocialLogin/SocialLogin'
import axios from 'axios'

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const { registerUser, updateUserProfile } = useAuth()

    const handleRegistration = (data) => {
        console.log('After register', data)

    const profileImg = data.photo[0];


        registerUser(data.email, data.password)
            .then(result => {
                console.log(result.user)
           
            const formData = new FormData();
            formData.append('image', profileImg)

            const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`
            axios.post(image_API_URL, formData)
            .then(res =>{
                console.log('Image uploded Successfully', res.data.data.url)
                const userProfile = {
                    displayName: data.name,
                    photoURL: res.data.data.url
                }
                updateUserProfile(userProfile)
                .then(() =>{
                    console.log('User profile updated')
                })
                .catch(error=>console.log(error))
                //  toast.success('Image uploded Successfully', res.data)
            })
            
            })
            .catch(error => {
                console.log(error)
               
            })
    }
    return (
        <div className='card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl'>
            <h3 className="text-3xl text-center py-5">Welcome Back</h3>
            <p className='text-center'>Please Login</p>
            <form onSubmit={handleSubmit(handleRegistration)} className='card-body'>
                <fieldset className="fieldset">
                    {/* Name Field */}
                    <label className="label">Name</label>
                    <input type="text"
                        {...register('name',
                            { required: true })} className="input" placeholder="Your Name" />
                    {errors.name?.type === 'required' && <p className='text-red-500'>Please input your name</p>}

                    {/* Photo Field */}
                <label className="label">Your Photo</label>
                <input type="file" 
                {...register('photo', {required: true})}
                className="file-input" />

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
                    <SocialLogin></SocialLogin>
                </fieldset>
                <p>Already have account? <Link className='text-blue-500' to={'/login'}>Login</Link></p>
            </form>
        </div>
    )
}

export default Register