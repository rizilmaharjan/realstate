import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { Instance } from "../config/apiInstance";
import { useState } from "react";

export default function SignIn() {
  const navigate = useNavigate()
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();
  const onSubmit = async(data: Record<string,string>)=>{
    try {
      setLoading(true)
      const res = await Instance.post("/v1/auth/signin", data)
      reset()
      setLoading(false)
      setError(false)
      navigate("/")
      
    } catch (error:any) {
      setLoading(false)
      setError(true)
      
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
        {error && <p className="text-red-600 font-semibold">Something went wrong</p>}
      </div>
    </>
  )}
    