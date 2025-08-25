import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionsSlice";
import { Link } from "react-router-dom";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));
    } catch (error) {
      console.error("Error fetching connections:", error);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  return (
    <div className="min-h-screen  py-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">My Connections</h1>

      {connections?.length === 0 ? (
        <p className="text-center text-gray-500">No connections found.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {connections?.map((connection, index) => {
            const { _id, firstName, lastName, bio, photoUrl, skills } =
              connection;

            return (
              <div
                key={index}
                className="bg-base-300 shadow-lg rounded-xl overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <img
                  src={photoUrl || "https://via.placeholder.com/400x200"}
                  alt={`${firstName} ${lastName}`}
                  className="w-full h-48 object-cover"
                />

                <div className="p-5">
                  <h2 className="text-xl font-semibold text-gray-800">
                    {firstName} {lastName}
                  </h2>
                  <p className="text-gray-600 text-sm mt-1 line-clamp-3">
                    {bio || "No bio available"}
                  </p>

                  {skills && skills.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {skills.map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <Link to={`/chat/${_id}`}>
                  <button className="btn btn-warning text-black m-5">
                    Chat
                  </button>
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Connections;
