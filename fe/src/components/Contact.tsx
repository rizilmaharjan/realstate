import { useEffect, useState } from "react";
import { Instance } from "../config/apiInstance";
import { Link } from "react-router-dom";

type TContactProps = {
  listing: Record<string, any>;
};
export default function Contact({ listing }: TContactProps) {
  const [landlord, setLandLord] = useState<Record<string, any> | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");
  useEffect(() => {
    const fetchLandLord = async () => {
      setIsLoading(true);
      try {
        const response = await Instance.get(`/users/${listing.userRef}`, {
          withCredentials: true,
        });
        console.log("land lord", response);
        setLandLord(response.data.user);

        setIsLoading(false);
      } catch (error) {
        setIsError(true);
        setIsLoading(false);
      }
    };
    fetchLandLord();
  }, [listing.userRef]);
  return (
    <>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Something went wrong</p>}
      {landlord && (
        <div className="flex flex-col gap-3 mt-3">
          <p>
            Contact <span className="font-semibold">{landlord.username}</span>{" "}
            for{" "}
            <span className="font-semibold">{listing.name.toLowerCase()}</span>{" "}
          </p>
          <textarea
            placeholder="Enter your message here..."
            className="border rounded-lg w-full text-sm p-3"
            onChange={(e) => setMessage(e.target.value)}
            name="message"
            rows={2}
          ></textarea>

          <Link
            className="bg-slate-700 text-center p-3 text-white uppercase rounded-lg hover:opacity-95"
            to={`mailto:${landlord.email}?subject=Regarding ${listing.name}&body=${message}`}
          >
            Send Message
          </Link>
        </div>
      )}
    </>
  );
}
