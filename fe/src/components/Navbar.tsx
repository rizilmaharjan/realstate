import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import ProfilePicture from "./ProfilePicture";
export default function Navbar() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const { currentUser } = useAppSelector((state) => state.user);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    console.log("searchQuery", searchQuery);
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  

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

          <form
            onSubmit={handleSubmit}
            className="bg-slate-100 p-3 rounded-lg flex items-center"
          >
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent outline-none w-24 sm:w-64"
              onChange={(e) => setSearchTerm(e.target.value)}
              value={searchTerm}
            />
            <button>
              <FaSearch className="text-slate-600" />
            </button>
          </form>
          <ul className="flex items-center gap-4">
            <NavLink to="/">
              {" "}
              <li className="hidden sm:inline text-slate-700 hover:underline cursor-pointer">
                Home
              </li>
            </NavLink>
            <NavLink to="/about">
              {" "}
              <li className="hidden sm:inline text-slate-700 hover:underline cursor-pointer">
                About
              </li>
            </NavLink>
            {currentUser ? (
              <ProfilePicture />
            ) : (
              <NavLink to="/sign-in">
                <li className="sm:inline text-slate-700 hover:underline cursor-pointer">
                  Sign In
                </li>
              </NavLink>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
}
