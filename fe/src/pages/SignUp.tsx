import { useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { Instance } from "../config/apiInstance";
import OAuth from "../components/OAuth";
export default function SignUp() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const onSubmit = async (data: Record<string, string>) => {
    try {
      setLoading(true);
      const res = await Instance.post("/v1/auth/signup",data);
      reset();
      setLoading(false);
      setError(false);
      navigate("/sign-in")
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };

  return (
    <>
      <div className="p-3 max-w-sm mx-auto">
        <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <input
            autoComplete="off"
            type="text"
            placeholder="Username"
            {...register("username", {
              required: true,
            })}
            className="bg-slate-100 p-3 rounded-lg outline-blue-500"
          />
          {errors.username && (
            <p className="text-red-500">Username is required</p>
          )}
          <input
            autoComplete="off"
            type="text"
            placeholder="Email"
            {...register("email", {
              required: true,
            })}
            className="bg-slate-100 p-3 rounded-lg outline-blue-500"
          />
          {errors.email && <p className="text-red-500">Email is required</p>}
          <input
            autoComplete="off"
            type="password"
            placeholder="Password"
            {...register("password", {
              required: true,
            })}
            className="bg-slate-100 p-3 rounded-lg outline-blue-500"
          />
          {errors.password && (
            <p className="text-red-500">password is required</p>
          )}
          <button disabled={isSubmitting} className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
            {
              loading ? "Loading..." : "Sign Up"
            }
          </button>
        <OAuth />
        </form>
        <div className="flex gap-2 mt-5">
          <p>Have an account?</p>
          <NavLink to="/sign-in">
            <span className="text-blue-500">Sign in</span>
          </NavLink>
        </div>
        {error && <p className="text-red-600">Something went wrong</p> }
      </div>
    </>
  );
}
