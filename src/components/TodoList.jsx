import React, { useEffect , useState } from 'react'
import { AiOutlineDelete } from "react-icons/ai";
import { RiRecycleFill } from "react-icons/ri";
import { FaRegCheckCircle } from "react-icons/fa";
import axios from 'axios'
import { useForm } from 'react-hook-form';
import { NotificationManager } from 'react-notifications';
import { Link } from 'react-router-dom';

const TodoList = ({userData}) => {
    const { register, handleSubmit ,reset } = useForm();
    const [todos , setTodos] = useState([])
    const [ done , setDone ] = useState()
    const [ update , setUpdate ] = useState(null)

    
    const getTodos = async () =>{
        const response = await axios.post('https://mern-todo-app-lake.vercel.app/todo/getTodos' , userData)
        console.log(todos)
        setTodos(response.data , 'user Todos are here')
        console.log(userData , 'user data is here')
    }

    const onSubmit = async (data) => {
        if(update === null){
            const response = await axios.post('https://mern-todo-app-lake.vercel.app/todo/createTodo',data)
            if(response.data.title){
                NotificationManager.success("Todo added successfully","");
            }
            getTodos()
        }else{
            const response = await axios.put(`https://mern-todo-app-lake.vercel.app/todo/update/${update?._id}`,data)
            setUpdate(null)
            if(response.data.title){
                NotificationManager.success("Todo Updated successfully","");
            }
            getTodos()
        }
        getTodos()
        reset()
    }

    const deleteTodo = async (id) =>{
        const response = await axios.delete(`https://mern-todo-app-lake.vercel.app/todo/delete/${id}`)
        console.log(response)
        if(response.status === 200){
            NotificationManager.success("Todo Deleted successfully","");
        }else{
            NotificationManager.success("There is an error in deletion process","");
        }
        getTodos()
    }

    useEffect((() => {
        getTodos()
    }),[update])
  return (
    <div > 
        <Link to='/'>
            <div className='w-fit   bg-red-500 text-white font-bold rounded p-1 gap-3 mx-2'  >
                Logout
            </div>
        </Link>
        <div className='pt-5 text-orangeDark text-[30px] text-center font-bold drop-shadow-md' >Welcome ,{ userData ? userData.username : " " }  Your Daily Todos</div>
        <div className='w-[85%] md:w-[70%] mx-auto my-auto rounded-xl bg-white/90 backdrop-blur-sm p-5 md:p-10 ' >
            <form  onSubmit={handleSubmit(onSubmit)} className='flex flex-col md:flex-row gap-2 mb-2 md:gap-4 justify-center items-center' >
                {/* Todo input  */}
                <div>
                    <input defaultValue={update === null ? null : update?.title } type="text" {...register('title')} placeholder='Enter the title' className='bg-orangeLite placeholder:italic my-1 px-4 md:px-7 py-1 text-gray-500 rounded-lg border-0 outline-none focus:outline-none focus:border-0' />
                </div>
                <div>
                    <input defaultValue={update === null ? null : update?.description } type="text" {...register('description')} placeholder='Write down the details' className='bg-orangeLite placeholder:italic my-1 px-4 md:px-7 py-1 text-gray-500 rounded-lg border-0 outline-none focus:outline-none focus:border-0' />
                </div>
                <div className='hidden' >
                    <input defaultValue={  userData._id  } value={userData._id} type="text" {...register('_id')} />
                </div>
                <div className='text-center bg-orangeDark w-full md:w-fit rounded-md py-1 px-2' >
                    <button className='text-[16px] md:text-[13px] text-white ' >
                        {update === null ? 'Add' : 'Update'}
                    </button>
                </div>
            </form>

            {/* Todo list will be here  */}

            {
                todos.map((todo ,ind )=>{
                  return(
                    <div className='flex justify-between items-center bg-orangeDark rounded-lg p-3 my-3' >
                        {/* Todo content  */}
                        <div>
                            <div className='text-white text-[20px]' >
                                {
                                    done === todo._id ? <del>{todo.title}</del> : todo.title
                                }
                            </div>
                            <div className='text-gray-200 text-[12px]' >
                                {
                                    done === todo._id ? <del>{todo.description}</del> : todo.description
                                }
                            </div>
                        </div>
                        {/* Todo actions  */}
                        <div className='flex items-center justify-center gap-1 md:gap-4 w-[40%] flex-wrap' >
                            
                                <div onClick={() => deleteTodo(todo._id)} className='bg-orangeLite rounded-full text-[18px] md:text-[25px] p-2 hover:cursor-pointer' >
                                    <AiOutlineDelete />
                                </div>
                            
                            {
                                done === todo._id ?
                                null
                                :
                                <div onClick={() => setUpdate(todo)} className='bg-orangeLite rounded-full text-[18px] md:text-[25px] p-2 hover:cursor-pointer' >
                                    <RiRecycleFill  />

                                </div> 

                            }
                            
                            <div onClick={() => setDone(todo._id)} className={`${done === todo._id ? 'bg-white text-orangeDark' : 'bg-orangeLite'} rounded-full text-[18px] md:text-[25px] p-2 hover:cursor-pointer`} >
                                <FaRegCheckCircle />
                            </div>
                        </div>
                    </div>
                  )  
                })
            }
        </div>
    </div>
  )
}

export default TodoList
