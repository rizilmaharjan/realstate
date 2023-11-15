import {GoogleAuthProvider, signInWithPopup, getAuth} from "@firebase/auth"
import { app } from "../firebase";
import { Instance } from "../config/apiInstance";
import { useAppDispatch } from "../redux/hooks";
import { signInSuccess } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

export default function OAuth() {
  const navigate = useNavigate()
    const dispatch = useAppDispatch()
  const handleGoogleClick = async () => {
    try {
        const provider = new GoogleAuthProvider()
        const auth = getAuth(app)
        const result = await signInWithPopup(auth, provider)
        const res = await Instance.post("/v1/auth/google",{
            name: result.user.displayName,
            email: result.user.email,
            imageUrl: result.user.photoURL
        },{
            withCredentials: true
        }) 
        dispatch(signInSuccess(res.data.user))
        navigate("/")

    } catch (error) {
      console.log("could not login with google", error);
    }
  };
  return (
    <>
      <button
        type="button"
        onClick={handleGoogleClick}
        className="bg-red-700 text-white rounded-lg p-3 uppercase hover:opacity-95"
      >
        Continue with google
      </button>
    </>
  );
}