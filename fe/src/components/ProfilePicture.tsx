import { useState } from "react";
import { useAppSelector } from "../redux/hooks"
import ProfileDropdown from "./ProfileDropdown";
export default function ProfilePicture() {
    const {currentUser} = useAppSelector((state)=>state.user);
    console.log("currentUser", currentUser)
    const [profileDropdown, setProfileDropDown] = useState(false)

    const handleClick = ()=>{
        setProfileDropDown(true)

    }
  return (
    <>
    <div className="relative cursor-pointer">

        {
            profileDropdown && <ProfileDropdown profileDropdown={profileDropdown} setProfileDropDown={setProfileDropDown} />
        }
        <img onClick={handleClick} src={currentUser?.profilePicture} alt="profile picture" className="w-10 h-10 rounded-full object-cover" />
        </div>
    </>
  )
}