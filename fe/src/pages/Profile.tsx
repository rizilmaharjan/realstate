import { useForm } from "react-hook-form";
import { useAppSelector } from "../redux/hooks";
import { useRef, useState, useEffect } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
type TImageData = {
  profilePicture?: string;
};
export default function Profile() {
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [image, setImage] = useState<File | undefined>(undefined);
  const [imagePercent, setImagePercent] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [formData, setFormData] = useState<TImageData>({});
  const { currentUser } = useAppSelector((state) => state.user);
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
  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
  }, [image]);
  const handleFileUpload = async (image: File) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(progress);
        setImagePercent(Math.round(progress));
      },
      (error) => {
        setImageError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({
            ...FormData,
            profilePicture: downloadURL,
          });
        });
      }
    );
  };
  return (
    <>
      <div className="p-3 max-w-lg mx-auto">
        <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
        <form className="flex flex-col gap-6">
          <input
            type="file"
            ref={fileRef}
            hidden
            accept="image/*"
            onChange={(e) => setImage(e.target.files?.[0])}
          />
          {/* firebase storage rules */}
          {/* allow read;
      allow write: if
      request.resource.size < 4 * 1024 * 1024 &&
      request.resource.contentType.matches('image/.*') */}
          <img
            className="h-24 w-24 rounded-full object-cover object-center self-center cursor-pointer"
            src={formData.profilePicture || currentUser?.profilePicture}
            alt="profile-picture"
            onClick={() => fileRef.current?.click()}
          />
          <p className="text-sm self-center">
            {imageError ? (
              <span className="text-red-700">
                Error uploading image (file size must be less than 4MB){" "}
              </span>
            ) : imagePercent > 0 && imagePercent < 100 ? (
              <span className="text-slate-700">{`uploading: ${imagePercent} %`}</span>
            ) : imagePercent === 100 ? (
              <span className="text-green-700">
                Image uploaded successfully
              </span>
            ) : (
              ""
            )}
          </p>

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
          <span className="text-red-700 cursor-pointer font-semibold">
            Delete Account
          </span>
          <span className="text-red-700 cursor-pointer font-semibold">
            Sign out
          </span>
        </div>
      </div>
    </>
  );
}
