import React from 'react'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { NotificationManager } from 'react-notifications';
const Login = ({setForm , setUserData}) => {
    const navigate = useNavigate()
    const { register , handleSubmit } = useForm()

    const onSubmit = async (data) => {
        const response = await axios.post('https://mern-todo-app-taupe-iota.vercel.app/user/login' , data)
        console.log(response ,"login")
        if (response.data.username) {
            await setUserData(response.data)
            navigate('/todo');
        }else if(response.data.message || !data.username || !data.Password){ {
            NotificationManager.error("Email or Password is incorrect","");
        }
      }
    }
    

  return (
    <div className='w-[85%] md:w-[70%] mx-auto my-auto rounded-xl bg-white/60 backdrop-blur-sm p-5 md:p-10 '>
        {/* heading is here  */}
        <div className='text-orangeDark drop-shadow-md text-3xl  font-bold' >
            Login
        </div>
        <form onSubmit={handleSubmit(onSubmit)} >
            <div className='flex flex-col pt-3 ' >
                {/* email input  */}
                <lable className="pb-2" >Email</lable>
                <input type="text" placeholder='someone@example.com' {...register('email')} className='placeholder:italic px-4 md:px-7 py-2 md:py-3 text-gray-500 rounded-lg border-0 outline-none focus:outline-none focus:border-0' />
            </div>
            <div className='flex flex-col pt-3 ' >
                {/* Password input  */}
                <lable className="pb-2" >Password</lable>
                <input type="password" placeholder='Enter your password' {...register('Password')} className='placeholder:italic px-4 md:px-7 py-2 md:py-3 text-gray-500 rounded-lg border-0 outline-none focus:outline-none focus:border-0' />
            </div>
            <div>
                <button type="submit" className='text-[18px] md:text-[22px] w-full py-2 mt-7 md:mt-10 mb-6 text-white bg-orangeDark rounded-lg' >
                    Login
                </button>
            </div>
            <div className='pb-2 text-center' >
                <span className='text-gray-500' >
                    Don't have an account ! 
                </span>
                <span className='text-orangeDark cursor-pointer font-bold' onClick={() => setForm(true)} >
                    Sign Up
                </span>
            </div>

        </form>
    </div>
  )
}

export default Login