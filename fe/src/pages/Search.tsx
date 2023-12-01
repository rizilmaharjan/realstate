import { useForm } from "react-hook-form";

export default function Search() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <>
      <div className="flex flex-col md:flex-row">
        {/* form */}
        <div className="p-7 border-b-2 md:border-r-2 md:min-h-screen">
          <form className="flex flex-col gap-8" action="">
            <div className="flex items-center gap-2">
              <label className="whitespace-nowrap font-semibold">Search Term:</label>
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
                  value={"sale"}
                  {...register("all")}
                  className="w-4"
                  defaultChecked={false}
                />
                <span>Rent & Sale</span>

                <input
                  type="checkbox"
                  value={"sale"}
                  {...register("rent")}
                  className="w-4"
                  defaultChecked={false}
                />
                <span>Rent</span>

                <input
                  type="checkbox"
                  value={"sale"}
                  {...register("sale")}
                  className="w-4"
                  defaultChecked={false}
                />
                <span>Sale</span>

                <input
                  type="checkbox"
                  value={"sale"}
                  {...register("offer")}
                  className="w-4"
                  defaultChecked={false}
                />
                <span>Offer</span>
              </div>
            </div>
            {/* amenities */}
            <div className="flex items-center gap-2">
              <label className="font-semibold">Amenities:</label>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  value={"sale"}
                  {...register("parking")}
                  className="w-4"
                  defaultChecked={false}
                />
                <span>Parking</span>
                <input
                  type="checkbox"
                  value={"sale"}
                  {...register("furnished")}
                  className="w-4"
                  defaultChecked={false}
                />
                <span>Furnished</span>
              </div>
            </div>

            {/* sorting */}
            <div className="flex items-center gap-2">
                <label className="font-semibold">Sort:</label>
                <select className="border rounded-lg p-3 outline-none cursor-pointer" name="sort_order">
                    <option>Price high to low</option>
                    <option>Price low to high</option>
                    <option>Latest</option>
                    <option>Oldest</option>
                </select>
            </div>
            <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95">Search</button>
          </form>
        </div>

        {/* listings */}
        <div className="">
          <h1 className="text-3xl font-semibold border-b p-3 text-slate-700 mt-5">Listing results:</h1>
        </div>
      </div>
    </>
  );
}
