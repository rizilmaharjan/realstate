import { useForm } from "react-hook-form";
import { Instance } from "../config/apiInstance";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Search() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [listing, setListing] = useState([]);

  const urlParmas = new URLSearchParams(location.search);

  const {
    register,
    handleSubmit,
    watch,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      type: urlParmas.get("type")?.split(" ") || ["all"],
      offer: urlParmas.get("offer") === "true" || false,
      parking: urlParmas.get("parking") === "true" || false,
      furnished: urlParmas.get("furnished") === "true" || false,
      sort_order: "regularPrice_desc",
      searchTerm: urlParmas.get("searchTerm") || "",
    },
  });

  // console.log("i am rendered")
  // const offers = getValues("offer")
  // console.log("from url",typeof(offers))

  const onSubmit = async (data: any) => {
    console.log(data);
    console.log(data.type);
    const { sort_order, offer } = data;
    console.log(typeof offer);
    const sort = sort_order.split("_")[0];
    const order = sort_order.split("_")[1];

    const urlParams = new URLSearchParams();
    urlParams.set("searchTerm", data.searchTerm);
    urlParams.set("type", data.type[0]);
    urlParams.set("parking", data.parking);
    urlParams.set("furnished", data.furnished);
    urlParams.set("offer", data.offer);
    urlParams.set("sort", sort);
    urlParams.set("order", order);

    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);

    // const response = await Instance.post("/v1/listing")
  };

  useEffect(() => {
    const fetchListings = async () => {
      try {
        setLoading(true);
        const searchQuery = urlParmas.toString();
        const res = await Instance.get(`/v1/listing/?${searchQuery}`, {
          withCredentials: true,
        });
        setListing(res.data.listingData);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchListings();
  }, [location.search]);

  console.log("inside listing state", listing)

  return (
    <>
      <div className="flex flex-col md:flex-row">
        {/* form */}
        <div className="p-7 border-b-2 md:border-r-2 md:min-h-screen">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-8"
            action=""
          >
            <div className="flex items-center gap-2">
              <label className="whitespace-nowrap font-semibold">
                Search Term:
              </label>
              <input
                type="text"
                placeholder="Search..."
                className="border rounded-lg p-3 w-full"
                {...register("searchTerm")}
              />
            </div>
            <div className="flex items-center gap-2">
              <label className="font-semibold">Type:</label>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  value={"all"}
                  {...register("type")}
                  className="w-4"
                />
                <span>Rent & Sale</span>

                <input
                  type="checkbox"
                  value={"rent"}
                  {...register("type")}
                  className="w-4"
                />
                <span>Rent</span>

                <input
                  type="checkbox"
                  value={"sale"}
                  {...register("type")}
                  className="w-4"
                />
                <span>Sale</span>

                <input type="checkbox" {...register("offer")} className="w-4" />
                <span>Offer</span>
              </div>
            </div>
            {/* amenities */}
            <div className="flex items-center gap-2">
              <label className="font-semibold">Amenities:</label>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  {...register("parking")}
                  className="w-4"
                />
                <span>Parking</span>
                <input
                  type="checkbox"
                  {...register("furnished")}
                  className="w-4"
                />
                <span>Furnished</span>
              </div>
            </div>

            {/* sorting */}
            <div className="flex items-center gap-2">
              <label className="font-semibold">Sort:</label>
              <select
                className="border rounded-lg p-3 outline-none cursor-pointer"
                {...register("sort_order")}
              >
                <option value="regularPrice_desc">Price high to low</option>
                <option value="regularPrice_asc">Price low to high</option>
                <option value="createdAt_desc">Latest</option>
                <option value="createdAt_asc">Oldest</option>
              </select>
            </div>
            <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95">
              Search
            </button>
          </form>
          {watch("type")?.length > 1 && (
            <p className="font-semibold text-red-500">
              You cannot select multiple types
            </p>
          )}
        </div>

        {/* listings */}
        <div className="">
          <h1 className="text-3xl font-semibold border-b p-3 text-slate-700 mt-5">
            Listing results:
          </h1>
        </div>
      </div>
    </>
  );
}
