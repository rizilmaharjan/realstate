import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  
  return (
    <>
      <div className="p-3 max-w-sm mx-auto">
        <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
        <form className="flex flex-col gap-4">
          <input
            autoComplete="off"
            type="text"
            placeholder="Username"
            {...register("username",{
              required: true
            })}
            className="bg-slate-100 p-3 rounded-lg"
          />
          {
            errors.username && (
              <p className="text-red-500">Username is required</p>
            )
          }
          <input
            autoComplete="off"
            type="text"
            placeholder="Email"
            {...register("email",{
              required: true
            })}
            className="bg-slate-100 p-3 rounded-lg"
          />
          {
            errors.email && (
              <p className="text-red-500">Email is required</p>
            )
          }
          <input
            autoComplete="off"
            type="password"
            placeholder="Password"
            {...register("password",{
              required: true
            })}
            className="bg-slate-100 p-3 rounded-lg"
          />
          {
            errors.password && (
              <p className="text-red-500">password is required</p>
            )
          }
          <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
            Sign up
          </button>
        </form>
        <div className="flex gap-2 mt-5">
          <p>Have an account?</p>
          <NavLink to="/sign-in">
            <span className="text-blue-500">Sign in</span>
          </NavLink>
        </div>
      </div>
    </>
  );
}
