import { useEffect, useState } from "react";
import { Instance } from "../config/apiInstance";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";

export default function Listing() {
  SwiperCore.use([Navigation]);
  const { listingId } = useParams();
  const [listing, setListing] = useState<Record<string, any> | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
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
                  <div
                    className="h-[500px] bg-red-700 flex justify-center"
                  >
                    <img className="object-cover object-center w-full" src={url} alt="houses" />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </>
        )}
      </div>
    </>
  );
}
