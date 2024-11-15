import axios from "axios";
import useUser from "./hooks/UseUser";

export default function Header() {
  const user = useUser();

  const logout = () => {
    axios.post('/logout').then(() => {
      window.location.href = '/';
    });
  }

    return (
        <div className="fixed top-0 w-full h-14 px-4 shadow-lg bg-pink-500 flex items-center right-0">
            <a href={user ? '/dashboard' : '/'} className="text-3xl text-white font-semibold w-fit text-nowrap hover:text-white">Baukur🐷</a>
            <div className="md:max-w-screen-2xl mx-auto flex w-full justify-between">
                <div></div> {/* Empty div to push the buttons to the right */}
                <div>
                  {user ? (
                    <div className="flex gap-2 bg-pink-200 rounded-md p-1">
                      <a href="/user" className="my-auto font-semibold bg-pink-300 p-2 rounded-md text-white hover:text-white hover:bg-pink-200 transition-all">{user.email}</a>
                      <a onClick={logout} className="transition-all text-white hover:text-white hover:bg-pink-400 p-2 rounded-md bg-pink-500 cursor-pointer">Logout</a>
                    </div>
                  ) : (
                    <>
                      <a href="/login" className="text-white p-2 rounded-md mr-5 bg-pink-800">Login</a>
                      <a href="/register" className="text-pink-800 p-2 rounded-md bg-white">Register</a>
                    </>
                  )}
                </div>
            </div>
        </div>
    )
}