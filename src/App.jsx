import './App.css'

function App() {


  return (
    <div className="">
            <h1 className="text-3xl mt-20 mb-4 md:text-6xl text-center bg-gradient-to-r from-rose-500 to-rose-500 text-white font-semibold p-4 rounded-md w-fit">
              Sparaðu með Bauk🐷
            </h1>
            <a href="/login"><button>Login</button></a>
            <br/>
            <a href="/register"><button className="text-4xl hover:opacity-85 hover:scale-110 transition duration-300 mt-6 bg-gradient-to-r from-rose-600 to-rose-600" size="lg">Prófaðu núna</button></a>
            <br/>
            <a href="/categories"><button>Categories</button></a>
            <br/>
            <a href="/expenses"><button>Expenses</button></a>
        </div>
  )
}

export default App
