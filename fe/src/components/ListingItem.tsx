import { Link } from "react-router-dom"
import { IoLocationSharp } from "react-icons/io5";


export default function ListingItem({listing}:any) {
  return (
    <>
        <div className="bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg basis-72 grow">
          <Link to={`/listing/${listing._id}`}>
            <img className="h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300" src={listing.imageUrls} alt={listing.name} />
            <div className="p-3 flex flex-col gap-2 w-full">
              <p className="text-lg font-semibold text-slate-700 truncate">{listing.name}</p>
              <div className="flex items-center gap-1">
                <IoLocationSharp className="h-4 w-4 text-green-700" />
                <p className="truncate text-sm text-gray-600">{listing.address}</p>

              </div>
                <p className="text-justify line-clamp-3 text-sm text-gray-600">{listing.description}</p>
                <p className="text-slate-500 mt-2 font-semibold">

               
                Rs {
                  listing.offer ? listing.discountPrice.toLocaleString("en-IN") : listing.regularPrice.toLocaleString("en-IN")
                }
                {
                  listing.type[0] === "rent" && " / month"
                }
                </p>
                <div className="text-slte-700 flex gap-4">
                  <div className="font-bold text-xs">
                    {listing.bedrooms > 1 ? `${listing.bedrooms} beds` : `${listing.bedrooms} bed`}
                  </div>
                  <div className="font-bold text-xs">
                    {listing.bathrooms > 1 ? `${listing.bathrooms} baths` : `${listing.bathrooms} bath`}
                  </div>
                </div>
            </div>
          </Link>

        </div>
    </>
  )
}
