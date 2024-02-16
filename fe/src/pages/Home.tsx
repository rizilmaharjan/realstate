import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Instance } from "../config/apiInstance";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import "swiper/css/bundle";
import { Navigation } from "swiper/modules";
import ListingItem from "../components/ListingItem";

export default function Home() {
  const [offerListings, setOfferListings] = useState([])
  const [saleListings, setSaleListings] = useState([])
  const [rentListings, setRentListings] = useState([])
  SwiperCore.use([Navigation])

  // to fetch datas

  useEffect(()=>{
    const fetchOfferListings = async()=>{
      try {
        const res = await Instance.get("/v1/listing?offer=true&limit=4")
        console.log("this is response", res);
        setOfferListings(res.data.listingData);
        fetchRentListings();
      
      } catch (error) {
        console.log(error)
        
      }

    }
   const fetchRentListings = async()=>{
    try {
      const res = await Instance.get("/v1/listing?type=rent&limit=4")
      setRentListings(res.data.listingData);
      fetchSaleListings();
    
    } catch (error) {
      console.log(error)
      
    }
   }

   const fetchSaleListings = async()=>{
    try {
      const res = await Instance.get("/v1/listing?type=sale&limit=4")
      setSaleListings(res.data.listingData);
    
    } catch (error) {
      console.log(error)
      
    }

   }
    fetchOfferListings();

  },[])
  return (
    // 
    <div>
      {/* top */}
      <div className="flex flex-col gap-6 py-28 px-3 max-w-6xl mx-auto">
        <h1 className="text-slate-700 font-bold text-3xl lg:text-6xl">
          Find your next <span className="text-slate-500">perfect</span><br />place with ease
        </h1>

        <div className="text-gray-400 text-xs sm:text-sm">
          Sahand Estate is the best place to find your next perfect place to live.
          <br />
          We have a wide range of properties for you to choose from.
        </div>

        <Link className="text-xs sm:text-sm text-blue-800 font-bold hover:underline" to={"/search"}>
            Let's get started...

        </Link>

      </div>

      {/* swiper */}
      <Swiper navigation>


      {
        offerListings && offerListings.length > 0 &&(
          offerListings.map((listing)=>(
            <SwiperSlide>
              <div style={{ 
                background: `url(${listing.imageUrls[0]}) center no-repeat`,
                backgroundSize: "cover"

               }} key={listing._id} className="h-[500px]">


              </div>
            </SwiperSlide>
            
            ))
            )
          }
          </Swiper>


      {/* listing results for offer, sale and rent */}

      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10">
        {
          offerListings && offerListings.length >0 && (
            <div>
              <div className="my-3">
                <h2 className="text-2xl font-semibold text-slate-600">Recent offers</h2>
                <Link className="text-sm text-blue-800 hover:underline" to={'/search?offer=true'}>
                  Show more offers
                </Link>
              </div>
              <div className="flex flex-wrap gap-4">
                {
                  offerListings.map((listing)=>(
                    <ListingItem listing={listing} key={listing._id} />

                  ))
                }

              </div>
            </div>
          )
        }
        {
          rentListings && rentListings.length >0 && (
            <div>
              <div className="my-3">
                <h2 className="text-2xl font-semibold text-slate-600">Recent place for rent</h2>
                <Link className="text-sm text-blue-800 hover:underline" to={'/search?type=rent'}>
                  Show more places for rent
                </Link>
              </div>
              <div className="flex flex-wrap gap-4">
                {
                  rentListings.map((listing)=>(
                    <ListingItem listing={listing} key={listing._id} />

                  ))
                }

              </div>
            </div>
          )
        }
        {
          saleListings && saleListings.length >0 && (
            <div>
              <div className="my-3">
                <h2 className="text-2xl font-semibold text-slate-600">Recent Places for sale</h2>
                <Link className="text-sm text-blue-800 hover:underline" to={'/search?type=sale'}>
                  Show more places for sale
                </Link>
              </div>
              <div className="flex flex-wrap gap-4">
                {
                  saleListings.map((listing)=>(
                    <ListingItem listing={listing} key={listing._id} />

                  ))
                }

              </div>
            </div>
          )
        }

      </div>
      </div>
  )
}
