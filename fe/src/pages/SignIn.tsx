import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { Instance } from "../config/apiInstance";
import { signInStart, signInSuccess, signInFailure } from "../redux/user/userSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

export default function SignIn() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const {error, loading, errMsg} = useAppSelector(state=>state.user)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();
  const onSubmit = async(data: Record<string,string>)=>{
    try {
      dispatch(signInStart())
      const res = await Instance.post("/v1/auth/signin", data,{
        withCredentials: true
      })
      reset()
      dispatch(signInSuccess(res.data.user))
      navigate("/")
      
    } catch (error:any) {
      dispatch(signInFailure(error.response.data.message))
      
    }
  }
  return (
    <>
      <div className="p-3 max-w-sm mx-auto">
        <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <input
            autoComplete="off"
            type="text"
            placeholder="Email"
            {...register("email", {required: true})}
            className="bg-slate-100 p-3 rounded-lg outline-blue-500"
          />
          {errors.email && <p className="text-red-500 font-semibold">Email is required</p>}
          <input
            autoComplete="off"
            type="password"
            placeholder="Password"
            {...register("password",{required: true})}
            className="bg-slate-100 p-3 rounded-lg outline-blue-500"
          />
          {errors.password && <p className="text-red-500 font-semibold">Password is required</p>}
          <button disabled={isSubmitting} className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
           {loading ? "Loading..." : "Sign In"}
          </button>
        </form>
        <div className="flex gap-2 mt-5">
          <p>Dont have an account?</p>
          <NavLink to="/sign-up">
            <span className="text-blue-500">Sign up</span>
          </NavLink>
        </div>
        {error && <p className="text-red-600 font-semibold">{errMsg}</p>}
      </div>
    </>
  )}
    