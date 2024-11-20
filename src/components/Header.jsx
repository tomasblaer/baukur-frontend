import useUser from "./hooks/UseUser";
import { LuPiggyBank } from "react-icons/lu";
import { FaChartBar, FaHome, FaUser } from "react-icons/fa";

export default function Header() {
  const user = useUser();

  return (
    <div className={`fixed top-0 w-full h-fit ${user ? 'pb-8' : 'pb-4'} border-b flex-1 items-center right-0`}>
      <div className="w-full flex max-md:hidden justify-start px-8 pt-4 ">
        <p
          href={user ? "/dashboard" : "/"}
          className="flex gap-2 text-3xl pointer-events-none text-pink-400 select-none font-semibold w-fit text-nowrap my-auto hover:text-white"
        >
          <LuPiggyBank size={40} className="my-auto" />
          baukur
        </p>
      </div>
      {user && (
        <div className="mx-auto relative w-full flex justify-center">
          <div>
            <div className="flex">
              <a href="/dashboard" className="border py-4 px-14 hover:text-black rounded-l-2xl border-r transition-all duration-300  hover:bg-pink-300 cursor-pointer">
                <FaHome />
              </a>
              <a href="/stats" className="border-y py-4 px-14 hover:text-black transition-all duration-500 hover:bg-pink-300 cursor-pointer ">
                <FaChartBar />
              </a>
              <a href="/user" className="border py-4 px-14 border-l hover:text-black transition-all duration-500 rounded-r-2xl hover:bg-pink-300 cursor-pointer">
                <FaUser />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
