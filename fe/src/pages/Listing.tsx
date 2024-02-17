import { useEffect, useState } from "react";
import { Instance } from "../config/apiInstance";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import { IoLocationSharp } from "react-icons/io5";
import { FaBed, FaBath, FaParking, FaChair } from "react-icons/fa";
import { useAppSelector } from "../redux/hooks";
import Contact from "../components/Contact";

export default function Listing() {
  SwiperCore.use([Navigation]);
  const { listingId } = useParams();
  const [listing, setListing] = useState<Record<string, any> | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [contact, setContact] = useState(false);

  const { currentUser } = useAppSelector((state) => state.user);

  useEffect(() => {
    const fetchListing = async () => {
      setIsLoading(true);
      try {
        const response = await Instance.get(`/v1/listing/${listingId}`, {
          withCredentials: true,
        });
        console.log("listing response", response);
        setListing(response.data.listingData);
        setIsLoading(false);
      } catch (error) {
        setIsError(true);
        setIsLoading(false);
      }
    };
    fetchListing();
  }, []);
  return (
    <>
      <div>
        {isLoading && <p className="text-center">Loading...</p>}
        {isError && (
          <p className="font-semibold text-red-500 text-center">
            Something went wrong
          </p>
        )}
        {listing && !isLoading && !isError && (
          <>
            <Swiper navigation>
              {listing.imageUrls.map((url: string) => (
                <SwiperSlide key={url}>
                  <div className="h-[500px] flex justify-center">
                    <img
                      className="object-cover object-center w-full"
                      src={url}
                      alt="houses"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* descriptions */}
            <div className="p-4 max-w-screen-xl mx-auto">
              <h1 className="capitalize font-semibold text-2xl">
                {listing.name}{" "}
                <span className="lowercase">
                  {listing.type[0] === "rent"
                    ? `$ ${listing.regularPrice} / month`
                    : ""}
                </span>
              </h1>
              {/* location */}
              <p className="flex items-center gap-1 text-gray-600 font-semibold mt-2">
                <IoLocationSharp className="text-gray-600" /> {listing.address}
              </p>

              {/* interactions */}
              <div className="w-fit mt-2 flex gap-4">
                {listing.type[0] === "rent" ? (
                  <button className="bg-red-900 w-28 py-1 rounded-lg text-white font-semibold">
                    For Rent
                  </button>
                ) : (
                  <button className="bg-red-900 w-28 py-1 rounded-lg text-white font-semibold">
                    For Sale
                  </button>
                )}

                {listing.discountPrice > 0 && (
                  <button className="bg-green-800 w-28 py-1 rounded-lg text-white font-semibold">
                    ${listing.discountPrice} off
                  </button>
                )}
              </div>

              {/*property description */}
              <p className=" text-slate-800 mt-2">
                <span className="font-semibold  text-black"> Description-</span>
                {listing.description}
              </p>

              {/* essences */}
              <ul className="text-green-900 font-semibold text-sm flex flex-wrap items-center gap-4 mt-2 sm:gap-6">
                <li className="flex items-center gap-1 whitespace-nowrap">
                  <FaBed className="text-lg" />
                  {listing.bedrooms > 1
                    ? `${listing.bedrooms} bedrooms`
                    : `${listing.bedrooms} bedroom`}
                </li>
                <li className="flex items-center gap-1 whitespace-nowrap">
                  <FaBath className="text-lg" />
                  {listing.bathrooms > 1
                    ? `${listing.bathrooms} bathrooms`
                    : `${listing.bathrooms} bathroom`}
                </li>
                <li className="flex items-center gap-1 whitespace-nowrap">
                  <FaParking />
                  {listing.parking ? "Parking spot" : "No parking"}
                </li>
                <li className="flex items-center gap-1 whitespace-nowrap">
                  <FaChair />
                  {listing.parking ? "Furnished" : "Unfurnished"}
                </li>
              </ul>
              {currentUser &&
                currentUser._id !== listing.userRef &&
                !contact && (
                  <button
                    onClick={() => setContact(true)}
                    className="bg-slate-700 text-white rounded-lg mt-6 w-full uppercase hover:opacity-95 p-3"
                  >
                    Contact landlord
                  </button>
                )}
              {contact && <Contact listing={listing} />}
            </div>
          </>
        )}
      </div>
    </>
  );
}
