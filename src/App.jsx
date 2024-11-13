import { useEffect } from 'react';
import './App.css'
import useUser from './components/hooks/UseUser'

function App() {
  const user = useUser();

  useEffect(() => {
    if (user) window.location.href = '/dashboard';
  }, [user]);


  return (
    <div className='border rounded-lg pb-10'>
        <div className="transition-all text-center bg-gradient-to-br from-rose-400 to-pink-200 *:hover:scale-105 text-white font-semibold p-4 rounded-tl-md rounded-tr-md w-fit mb-10 cursor-pointer" onClick={() => window.location.href = '/register'}>
          <h1 className="text-3xl md:text-4xl transition-all">Sparaðu með Bauk🐷</h1>
        </div>
        <div className="flex flex-col justify-center gap-8">
          {user ? (
            <>
              <a href="/categories" className='w-1/2 mx-auto'><button className='w-full'>Categories</button></a>
              <a href="/expenses" className='w-1/2 mx-auto'><button className='w-full'>Expenses</button></a>
            </>
          ) : (
            <>
              <a href="/login" className='w-1/2 mx-auto'><button className='w-full'>Login</button></a>
              <a href="/register" className='w-1/2 mx-auto'><button className='w-full'>Register</button></a>
            </>
          )}
        </div>
    </div>
  )
}

export default App
