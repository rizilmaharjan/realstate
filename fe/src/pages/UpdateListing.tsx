import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useAppSelector } from "../redux/hooks";
import { app } from "../firebase";
import { useNavigate, useParams } from "react-router-dom";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useState } from "react";
import { Instance } from "../config/apiInstance";
type FormValues = {
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
};
export default function UpdateListing() {
  const { listId } = useParams();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    imageUrls: [],
  });
  const { currentUser } = useAppSelector((state) => state.user);
  const [imageUploadError, setImageUploadError] = useState<boolean | string>(
    false
  );

  console.log(formData.imageUrls);
  const navigate = useNavigate();
  const [uploading, setUploading] = useState(false);
  const {
    register,
    watch,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = async (data: Record<string, any>) => {
    const postData = {
      ...data,
      imageUrls: formData.imageUrls,
      userRef: currentUser?._id,
    };

    try {
      setLoading(true);
      setError(false);
      const res = await Instance.post(`/v1/listing/${listId}`, postData, {
        withCredentials: true,
      });
      reset();
      navigate(`/listing/${res.data?.listingData._id}`);
      console.log(res);

      setLoading(false);
    } catch (error) {
      setError(true);
      setLoading(false);
    }
  };
  const handleImageSubmit = () => {
    const images = getValues("imageUrls");
    console.log("this is images", images);
    if (images.length > 0 && images.length + formData.imageUrls.length < 7) {
      setUploading(true);
      setImageUploadError(false);
      const promises = [];

      for (let i = 0; i < images.length; i++) {
        promises.push(storeImage(images[i]));
      }
      Promise.all(promises)
        .then((urls: any) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setImageUploadError(false);
          setUploading(false);
        })
        .catch((err) => {
          setImageUploadError("Image upload failed (2 mb max per error)");
          setUploading(false);
        });
    } else {
      setImageUploadError("You can only upload 6 images per listing");
      setUploading(false);
    }
  };

  const storeImage = async (file: any) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(progress);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleRemoveImage = (listingId: number) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== listingId),
    });
  };

  useEffect(() => {
    const getIndividualListingData = async () => {
      const response = await Instance.get(`/v1/listing/${listId}`, {
        withCredentials: true,
      });
      console.log(
        "these are the listings informations",
        response.data.listingData
      );
        reset(response.data.listingData);
        // console.log("for image",response.data.listingData.imageUrls)
        setFormData({
          ...formData,
          imageUrls: formData.imageUrls.concat(response.data.listingData.imageUrls),
        });
    };
    getIndividualListingData();
  }, []);

  return (
    <>
      <main className="p-3 max-w-4xl mx-auto">
        <h1 className="text-3xl font-semibold text-center my-7">
          Update a Listing
        </h1>
        {
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col mt-14 sm:flex-row gap-4"
          >
            <div className="flex flex-col gap-4 flex-1">
              <input
                type="text"
                placeholder="Name"
                {...register("name", {
                  required: {
                    value: true,
                    message: "Name is required",
                  },
                  maxLength: 62,
                })}
                className={`rounded-lg border p-3 ${
                  errors.name?.message ? " border-red-500 outline-red-500" : ""
                }   `}
              />
              <p className="text-sm font-semibold text-red-600">
                {errors.name?.message}
              </p>
              <textarea
                placeholder="Description"
                {...register("description", {
                  required: {
                    value: true,
                    message: "Description is required",
                  },
                })}
                className={`rounded-lg border p-3 ${
                  errors.name?.message ? " border-red-500 outline-red-500" : ""
                }   `}
              />
              <p className="text-sm font-semibold text-red-600">
                {errors.description?.message}
              </p>

              <input
                type="text"
                placeholder="Address"
                {...register("address", {
                  required: {
                    value: true,
                    message: "Address is required",
                  },
                })}
                className={`rounded-lg border p-3 ${
                  errors.name?.message ? " border-red-500 outline-red-500" : ""
                }   `}
              />
              <p className="text-sm font-semibold text-red-600">
                {errors.address?.message}
              </p>

              <div className="flex gap-6 flex-wrap">
                <div className="flex gap-2">
                  <input
                    type="checkbox"
                    value={"sale"}
                    {...register("type")}
                    className="w-5"
                    defaultChecked={false}
                  />
                  <span>Sell</span>
                </div>
                <div className="flex gap-2">
                  <input
                    value={"rent"}
                    type="checkbox"
                    {...register("type")}
                    className="w-5"
                    defaultChecked={false}
                  />
                  <span>Rent</span>
                </div>
                <div className="flex gap-2">
                  <input
                    type="checkbox"
                    {...register("parking")}
                    defaultChecked={false}
                    className="w-5"
                  />
                  <span>Parking spot</span>
                </div>
                <div className="flex gap-2">
                  <input
                    type="checkbox"
                    {...register("furnished")}
                    defaultChecked={false}
                    className="w-5"
                  />
                  <span>Furnished</span>
                </div>
                <div className="flex gap-2">
                  <input
                    type="checkbox"
                    {...register("offer")}
                    defaultChecked={false}
                    className="w-5"
                  />
                  <span>Offer</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    {...register("bedrooms", {
                      valueAsNumber: true,
                      required: true,
                      minLength: 1,
                      maxLength: 10,
                    })}
                    className="p-3 border border-gray-300 rounded-lg"
                  />
                  <p>Beds</p>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    {...register("bathrooms", {
                      valueAsNumber: true,
                      required: true,
                      minLength: 1,
                      maxLength: 10,
                    })}
                    className="p-3 border border-gray-300 rounded-lg"
                  />
                  <p>Baths</p>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    {...register("regularPrice", {
                      valueAsNumber: true,
                      min: {
                        value: 50,
                        message: "Minimum value must be 50",
                      },
                      max: 100000000,
                    })}
                    className={`rounded-lg border p-3 ${
                      errors.regularPrice?.message
                        ? " border-red-500 outline-red-500"
                        : ""
                    }   `}
                  />
                  {/* <div className="flex flex-col items-center">
                    <p>Regular Price</p>
                    {watch("type")[0] === "sale" ? (
                      ""
                    ) : (
                      <span className="text-sm">($ / month)</span>
                    )}
                  </div> */}
                </div>
                <p className="text-sm font-semibold text-red-600">
                  {errors.regularPrice?.message}
                </p>

                {watch("offer") && (
                  <div>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        {...register("discountPrice", {
                          valueAsNumber: true,

                          min: {
                            value: 50,
                            message: "Minimum discount should be 50",
                          },
                          validate: (field) => {
                            return (
                              field < watch("regularPrice") ||
                              "Discounted price cannot be more than regular price"
                            );
                          },
                        })}
                        className="p-3 border border-gray-300 rounded-lg"
                      />
                      <div className="flex flex-col items-center">
                        <p>Discounted price</p>
                        {watch("type")[0] === "sale" ? (
                          ""
                        ) : (
                          <span className="text-sm">($ / month)</span>
                        )}
                      </div>
                    </div>
                    <p className="text-red-600 text-sm font-semibold">
                      {errors.discountPrice?.message}
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col flex-1 gap-4">
              <p className="font-semibold">
                Images:
                <span className="font-normal text-gray-600 ml-2">
                  The first image will be the cover (max 6)
                </span>
              </p>

              <div className="flex gap-4">
                <input
                  className={`p-3 border border-gray rounded w-full ${
                    errors.imageUrls?.message
                      ? "border-red-500 outline-red-500"
                      : ""
                  } `}
                  type="file"
                  {...register("imageUrls")}
                  accept="image/*"
                  multiple
                />
                <button
                  onClick={handleImageSubmit}
                  disabled={uploading}
                  type="button"
                  className="p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80"
                >
                  {uploading ? "uploading" : "upload"}
                </button>
              </div>
              <p className="text-sm font-semibold text-red-600">
                {errors.imageUrls?.message}
              </p>
              <p className="text-red-600 font-semibold text-sm">
                {imageUploadError && imageUploadError}
              </p>
              {formData.imageUrls.length > 0 &&
                formData.imageUrls.map((url, index) => (
                  <div
                    key={index}
                    className="flex justify-between p-3 border items-center"
                  >
                    <img
                      src={url}
                      alt="listing image"
                      className="w-20 h-20 object-contain rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      className="p-3 text-red-700 rounded-lg uppercase hover:opactiy-75"
                    >
                      Delete
                    </button>
                  </div>
                ))}

                {
                  formData.imageUrls.length === 0 && <p className="font-semibold text-red-500">Please choose an image</p>
                }

              <button className="p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
                {loading ? "Updating..." : "Update listing"}
              </button>
              {error && (
                <p className="text-red-500 text-sm font-semibold">
                  Something went wrong
                </p>
              )}
              {/* {
              watch("type").length === 2 && (
                <p className="text-red-500 font-semibold text-sm">Either rent or sell should be selected</p>
              )
            } */}
            </div>
          </form>
        }
      </main>
    </>
  );
}
