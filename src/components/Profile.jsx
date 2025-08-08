import React from "react";
import EditProfileForm from "./EditProfileForm";
import { useSelector } from "react-redux";
import FeedCard from "./FeedCard";

const Profile = () => {
  const user = useSelector((store) => store.user);
  return (
    user && (
      <div>
        <EditProfileForm user={user} />
      </div>
    )
  );
};

export default Profile;
