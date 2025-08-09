import React from "react";
import { BASE_URL } from "../utils/constants";
import { removeFeedUser } from "../utils/feedSlice";
import { useDispatch } from "react-redux";
import axios from "axios";

const FeedCard = ({ user }) => {
  const { _id, firstName, lastName, bio, photoUrl } = user;
  const dispatch = useDispatch();
  const handleRequest = async (status, id) => {
    const res = await axios.post(
      BASE_URL + "/request/create/" + status + "/" + id,
      {},
      { withCredentials: true }
    );
    dispatch(removeFeedUser(id));
  };

  return (
    <div className="card bg-base-300 w-96 shadow-sm">
      <figure>
        <img
          className="w-100 h-100"
          src={
            photoUrl ||
            "https://www.google.com/url?sa=i&url=https%3A%2F%2Fphotosnow.org%2Fno-dp%2F&psig=AOvVaw1NAObw6xZlvf1_7hWQWDog&ust=1754563558997000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCLjC7t-A9o4DFQAAAAAdAAAAABAV"
          }
          alt="photo of user"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        <p>{bio}</p>
        <div className="card-actions justify-end">
          <button
            className="btn btn-red"
            onClick={() => handleRequest("ignore", _id)}
          >
            Ignore
          </button>

          <button
            className="btn btn-secondary"
            onClick={() => handleRequest("interested", _id)}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedCard;
