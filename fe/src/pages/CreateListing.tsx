import { useForm } from "react-hook-form";
import { app } from "../firebase";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useState } from "react";
export default function CreateListing() {
  const [formData, setFormData] = useState({
    imageUrls: [],
  });
  const [imageUploadError, setImageUploadError] = useState<boolean | string>(
    false
  );
  const [uploading, setUploading] = useState(false)
  console.log(formData);
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: Record<string, any>) => {
    console.log(data);
  };
  const handleImageSubmit = () => {
    const images = getValues("imageUrls");
    if (images.length > 0 && images.length + formData.imageUrls.length < 7) {
        setUploading(true)
        setImageUploadError(false)
      const promises = [];

      for (let i = 0; i < images.length; i++) {
        promises.push(storeImage(images[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setImageUploadError(false);
          setUploading(false)
        })
        .catch((err) => {
          setImageUploadError("Image upload failed (2 mb max per error)");
          setUploading(false)
        });
    } else {
      setImageUploadError("You can only upload 6 images per listing");
      setUploading(false)
    }
  };

  const storeImage = async (file: File) => {
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

  const handleRemoveImage = (id:number)=>{
    setFormData({
        ...formData,
        imageUrls: formData.imageUrls.filter((_, i)=>i !== id)
    })
  }
  return (
    <>
      <main className="p-3 max-w-4xl mx-auto">
        <h1 className="text-3xl font-semibold text-center my-7">
          Create a Listing
        </h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col sm:flex-row gap-4"
        >
          <div className="flex flex-col gap-4 flex-1">
            <input
              type="text"
              placeholder="Name"
              {...register("name", {
                required: true,
              })}
              className="rounded-lg border p-3"
              maxLength={62}
            />
            {errors.name && <p>Name is required</p>}
            <textarea
              placeholder="Description"
              {...register("description", {
                required: true,
              })}
              className="rounded-lg border p-3"
            />
            {errors.description && <p>Description is required</p>}
            <input
              type="text"
              placeholder="Address"
              {...register("address", {
                required: true,
              })}
              className="rounded-lg border p-3"
            />
            {errors.address && <p>Name is required</p>}

            <div className="flex gap-6 flex-wrap">
              <div className="flex gap-2">
                <input type="checkbox" {...register("sale")} className="w-5" />
                <span>Sell</span>
              </div>
              <div className="flex gap-2">
                <input type="checkbox" {...register("rent")} className="w-5" />
                <span>Rent</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  {...register("parking")}
                  className="w-5"
                />
                <span>Parking spot</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  {...register("furnished")}
                  className="w-5"
                />
                <span>Furnished</span>
              </div>
              <div className="flex gap-2">
                <input type="checkbox" {...register("offer")} className="w-5" />
                <span>Offer</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  {...register("bedrooms", {
                    required: true,
                  })}
                  min={1}
                  max={10}
                  className="p-3 border border-gray-300 rounded-lg"
                />
                <p>Beds</p>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  {...register("bathrooms", {
                    required: true,
                  })}
                  min={1}
                  max={10}
                  className="p-3 border border-gray-300 rounded-lg"
                />
                <p>Baths</p>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  {...register("regularPrice", {
                    required: true,
                  })}
                  className="p-3 border border-gray-300 rounded-lg"
                />
                <div className="flex flex-col items-center">
                  <p>Regular Price</p>
                  <span className="text-sm">($ / month)</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  {...register("discountPrice", {
                    required: true,
                  })}
                  className="p-3 border border-gray-300 rounded-lg"
                />
                <div className="flex flex-col items-center">
                  <p>Discounted price</p>
                  <span className="text-sm">($ / month)</span>
                </div>
              </div>
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
                className="p-3 border border-gray rounded w-full"
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
            <p className="text-red-500 text-sm">
              {imageUploadError && imageUploadError}
            </p>
            {
                formData.imageUrls.length > 0 && formData.imageUrls.map((url, index)=>(
                    <div key={index} className="flex justify-between p-3 border items-center">

                    <img src={url} alt="listing image" className="w-20 h-20 object-contain rounded-lg" />
                    <button type="button" onClick={()=>handleRemoveImage(index)} className="p-3 text-red-700 rounded-lg uppercase hover:opactiy-75">Delete</button>
                    </div>
                ))
            }

            <button className="p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
              Create Listing
            </button>
          </div>
        </form>
      </main>
    </>
  );
}
