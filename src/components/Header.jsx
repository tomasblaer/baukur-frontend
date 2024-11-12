export default function Header() {
    return (
        <div className="fixed top-0 w-full h-14 px-4 shadow-lg bg-pink-500 flex items-center right-0">
            <h1 className="text-3xl text-white font-semibold">Baukur🐷</h1>
            <div className="md:max-w-screen-2xl mx-auto flex w-full justify-between">
                <div></div> {/* Empty div to push the buttons to the right */}
                <div>
                    <a href="/login" className="text-white p-2 rounded-md mr-5 bg-pink-800">Login</a>
                    <a href="/register" className="text-pink-800 p-2 rounded-md bg-white">Register</a>
                </div>
            </div>
        </div>
    )
}