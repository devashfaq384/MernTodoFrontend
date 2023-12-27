import './App.css';
import TodoList from './components/TodoList';
import UserAuth from './components/UserAuth';
import { BrowserRouter , Routes , Route } from 'react-router-dom';
import { NotificationContainer } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import { useState } from 'react';


function App() {
  const [ userData , setUserData ] = useState()
  return (
    <BrowserRouter>
      <NotificationContainer/>
      <div className='bg-orangeLite h-[100vh] w-full ' >
        {/* <UserAuth></UserAuth> */}
        
        <Routes>
          <Route path='/' element={<UserAuth  setUserData={setUserData} />} />
          <Route path='/todo' element={<TodoList userData={userData} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
