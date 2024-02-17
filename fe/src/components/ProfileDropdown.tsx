import { useNavigate } from "react-router-dom";
import { Instance } from "../config/apiInstance";
import { useDispatch } from "react-redux";
import { signOut } from "../redux/user/userSlice";
import { RefObject, useEffect, useRef, useState } from "react";

type props = {
  profileDropdown: boolean;
  setProfileDropDown: React.Dispatch<React.SetStateAction<boolean>>;
};
export default function ProfileDropdown({
  profileDropdown,
  setProfileDropDown,
}: props) {
  const ref: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      const logout = await Instance.get("/v1/auth/signout", {
        withCredentials: true,
      });
      console.log("logout details", logout);
      if (logout.status === 200) {
        dispatch(signOut());
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let handler = (e: any) => {
      console.log("etarget", e.target);
      console.log("refcurrent", ref.current);
      if (!ref.current?.contains(e.target)) {
        setProfileDropDown(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, [profileDropdown]);
  return (
    <>
      <div
        ref={ref}
        className="shadow-lg absolute top-12 bg-white w-32 h-fit rounded-lg"
      >
        <ul>
          <li
            onClick={() => {
              navigate("/profile");
              setProfileDropDown(false);
            }}
            className="hover:bg-blue-100 p-2 cursor-pointer"
          >
            Profile
          </li>
          <li
            onClick={handleLogout}
            className="hover:bg-blue-100 p-2 cursor-pointer"
          >
            Logout
          </li>
        </ul>
      </div>
    </>
  );
}
