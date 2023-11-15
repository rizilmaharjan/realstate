import { FaSearch } from "react-icons/fa";
import {NavLink} from "react-router-dom"
export default function Navbar() {
  return (
    <>
      <nav className="bg-slate-200 shadow-md">
        <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
            <NavLink to="/">

          <h1 className="text-sm font-bold sm:text-xl flex flex-wrap items-center">
            <span className="text-slate-500">Sahand</span>
            <span className="text-slate-700">Estate</span>
          </h1>
            </NavLink>

          <form className="bg-slate-100 p-3 rounded-lg flex items-center">
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent outline-none w-24 sm:w-64"
            />
            <FaSearch className="text-slate-600" />
          </form>
          <ul className="flex gap-4">
           <NavLink to="/"> <li className="hidden sm:inline text-slate-700 hover:underline cursor-pointer">Home</li></NavLink>
           <NavLink to="/about"> <li className="hidden sm:inline text-slate-700 hover:underline cursor-pointer">About</li></NavLink>
           <NavLink to="/sign-in"> <li className="sm:inline text-slate-700 hover:underline cursor-pointer">Sign in</li></NavLink>
          </ul>
        </div>
      </nav>
    </>
  );
}
