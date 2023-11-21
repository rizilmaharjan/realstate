import { useForm } from "react-hook-form";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import {
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
  deleteUserFailure,
  deleteUserSuccess,
  deleteUserStart,
  signOut,
} from "../redux/user/userSlice";
import { useRef, useState, useEffect } from "react";
import { Instance } from "../config/apiInstance";
import { useNavigate, NavLink } from "react-router-dom";
import {
  getDownloadURL,
  getStorage,
  ref,
  updateMetadata,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
type TImageData = {
  profilePicture?: string;
};
type TListings = {
  name: string;
  description: string;
  address: string;
  regularPrice: number;
  discountPrice: number;
  bathrooms: number;
  bedrooms: number;
  furnished: boolean;
  parking: boolean;
  type: string[];
  offer: boolean;
  imageUrls: string[];
  _id: string;
};
export default function Profile() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [image, setImage] = useState<File | undefined>(undefined);
  const [imagePercent, setImagePercent] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [listingError, setListingError] = useState(false);
  const [formData, setFormData] = useState<TImageData>({});
  const [userListings, setUserListings] = useState<TListings[] | null>(null);
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

  const onSubmit = async (data: Record<string, any>) => {
    console.log(data);
    const updatedData = { ...data, profilePicture: formData.profilePicture };
    try {
      dispatch(updateUserStart());
      const response = await Instance.put(
        `/v1/users/${currentUser?._id}`,
        updatedData,
        {
          withCredentials: true,
        }
      );
      dispatch(updateUserSuccess(response.data.user));
    } catch (error: any) {
      dispatch(updateUserFailure(error.response.data.message));
    }
  };

  const handleDelete = async () => {
    try {
      dispatch(deleteUserStart());
      const response = await Instance.delete(`/users/${currentUser?._id}`, {
        withCredentials: true,
      });
      dispatch(deleteUserSuccess());
      navigate("/sign-in");
    } catch (error: any) {
      dispatch(deleteUserFailure(error.response.data.message));
    }
  };

  const handleSignout = async () => {
    try {
      const response = await Instance.get(`/v1/auth/signout`, {
        withCredentials: true,
      });
      dispatch(signOut());
      navigate("/sign-in");
    } catch (error) {
      console.log(error);
    }
  };

  const handleShowListings = async () => {
    try {
      setListingError(false);
      const response = await Instance.get(`/v1/listing/${currentUser?._id}`, {
        withCredentials: true,
      });
      setUserListings(response.data.listingData);
    } catch (error) {
      setListingError(true);
    }
  };

  const handleListingDelete = async (id: string) => {
    try {
      const response = await Instance.delete(`/v1/listing/${id}`, {
        withCredentials: true,
      });
      if (response) {
        const updatedListings = userListings?.filter((listing) => {
          return listing._id !== id;
        });
        if (updatedListings) {
          setUserListings(updatedListings);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="p-3 max-w-lg mx-auto">
        <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
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
          <NavLink
            className={
              "bg-green-700 text-white p-3 rounded-lg uppercase text-center hover:opacity-95"
            }
            to="/create-listing"
          >
            Create Listing
          </NavLink>
        </form>
        <div className="flex justify-between mt-5">
          <span
            onClick={handleDelete}
            className="text-red-700 cursor-pointer font-semibold"
          >
            Delete Account
          </span>
          <span
            onClick={handleSignout}
            className="text-red-700 cursor-pointer font-semibold"
          >
            Sign out
          </span>
        </div>
        <button className="text-green-700 w-full" onClick={handleShowListings}>
          Show Listings
        </button>
        <p className="text-red-500 text-sm font-semibold">
          {listingError ? "Error showing listings" : ""}
        </p>
        <div className="flex flex-col gap-4">
          <h1 className="text-center mb-8 text-2xl font-semibold">
            Your Listings
          </h1>
          {userListings &&
            userListings.length > 0 &&
            userListings.map((listing) => (
              <div
                key={listing._id}
                className="border rounded-lg p-3 flex items-center justify-between gap-4"
              >
                <NavLink to={`/listing/${listing._id}`}>
                  <img
                    className="h-16 w-16 object-contain"
                    src={listing.imageUrls[0]}
                    alt={listing.name}
                  />
                </NavLink>
                <NavLink
                  className="text-slate-700 font-semibold flex-1 hover:underline truncate"
                  to={`/listing/${listing._id}`}
                >
                  <p>{listing.name}</p>
                </NavLink>
                <div className="flex flex-col items-center">
                  <button
                    onClick={() => handleListingDelete(listing._id)}
                    className="text-red-700 uppercase"
                  >
                    Delete
                  </button>
                  <button className="text-green-700 uppercase">Edit</button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
