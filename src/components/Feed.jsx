import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import FeedCard from "./FeedCard";
import axios from "axios";
import { useEffect } from "react";
import { addFeed } from "../utils/feedSlice";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  const feedUser = async () => {
    if (feed) return;
    const res = await axios.get(BASE_URL + "/feed", {
      withCredentials: true,
    });
    dispatch(addFeed(res.data));
  };

  useEffect(() => {
    feedUser();
  }, []);

  return (
    <div className="flex flex-wrap justify-center gap-4 my-10 mb-30">
      {feed?.map((user) => (
        <FeedCard user={user} key={user._id} />
      ))}
    </div>
  );
};

export default Feed;
