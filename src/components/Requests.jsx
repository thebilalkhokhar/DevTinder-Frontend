import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestsSlice";
import { useEffect } from "react";
import { BASE_URL } from "../utils/constants";

const Requests = () => {
  const requests = useSelector((store) => store.requests || []);
  const dispatch = useDispatch();

  const handleRequest = async (status, _id) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/respond/" + status + "/" + _id,
        {},
        {
          withCredentials: true,
        }
      );
      dispatch(removeRequest(_id));
    } catch (err) {
      console.error("Error handling request:", err);
    }
  };

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      console.log("data", res);
      dispatch(addRequests(res.data.data));
    } catch (err) {
      console.error("Error fetching requests:", err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div className="min-h-screen bg-base-100-50 py-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-8 ">
        Connection Requests
      </h1>

      {requests.length === 0 ? (
        <p className="text-center ">No pending requests found.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {requests.map((req) => {
            const { _id, status, fromUserId } = req;
            const { firstName, lastName, photoUrl } = fromUserId || {};

            return (
              <div
                key={_id}
                className="bg-base-300 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
              >
                <div className="flex flex-col items-center p-6">
                  <img
                    src={
                      photoUrl ||
                      "https://via.placeholder.com/150?text=No+Photo"
                    }
                    alt={`${firstName} ${lastName}`}
                    className="w-24 h-24 rounded-full object-cover border-4 "
                  />
                  <h2 className="mt-4 text-lg font-semibold ">
                    {firstName} {lastName}
                  </h2>
                  <p
                    className={`mt-1 text-sm font-medium ${
                      status === "interested"
                        ? "text-green-600"
                        : "text-yellow-600"
                    }`}
                  >
                    Status: {status}
                  </p>

                  {/* Action Buttons */}
                  <div className="mt-5 flex gap-3">
                    <button
                      className="px-4 py-2 bg-green-500 text-white text-sm font-medium rounded-lg hover:bg-green-600 transition-colors"
                      onClick={() => handleRequest("accepted", _id)}
                    >
                      Accept
                    </button>
                    <button
                      className="px-4 py-2 bg-red-500 text-white text-sm font-medium rounded-lg hover:bg-red-600 transition-colors"
                      onClick={() => handleRequest("rejected", _id)}
                    >
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Requests;
