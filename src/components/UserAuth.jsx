import React ,{useState} from 'react'
import Signup from './Signup'
import  bird from '../assets/images/jentri.png'
import Login from './Login'

const UserAuth = ({setUserData}) => {
  const [ form , setForm ] = useState(true)
  return (
    <div className='flex justify-center items-center h-[100vh]' >
        <div className='w-full absolute md:relative md:w-[50%]' >
            {
              form ?
              <Signup setForm={setForm} setUserData={setUserData} ></Signup>
              :
              <Login setForm={setForm} setUserData={setUserData} ></Login>
            }
        </div>
        <div className='md:w-[50%]' >
            <img src={bird} alt="Bubbly Bird" width="500px" />
        </div>
    </div>
  )
}

export default UserAuth