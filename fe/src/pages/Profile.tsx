import { useForm } from "react-hook-form";
import { useAppSelector } from "../redux/hooks";
export default function Profile() {
  const {currentUser} = useAppSelector(state=>state.user)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      username: currentUser?.username,
      email: currentUser?.email,
      password: "",
    },
  });
  return (
    <>
      <div className="p-3 max-w-lg mx-auto">
        <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
        <form className="flex flex-col gap-6">
          <img
            className="h-24 w-24 rounded-full self-center cursor-pointer"
            src={currentUser?.profilePicture}
            alt="profile-picture"
          />
          <input
            type="text"
            placeholder="Username"
            className="bg-slate-100 rounded-lg p-3 outline-blue-500"
            {...register("username")}
          />
          <input
            type="email"
            placeholder="Email"
            className="bg-slate-100 rounded-lg p-3 outline-blue-500 "
            {...register("email")}
          />
          <input
            type="password"
            placeholder="Password"
            className="bg-slate-100 rounded-lg p-3 outline-blue-500 "
            {...register("password")}
          />
          <button
            disabled={isSubmitting}
            className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
          >
            update
          </button>
        </form>
        <div className="flex justify-between mt-5">
          <span className="text-red-700 cursor-pointer font-semibold">Delete Account</span>
          <span className="text-red-700 cursor-pointer font-semibold">Sign out</span>
        </div>
      </div>
    </>
  );
}