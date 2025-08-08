import React, { useState } from "react";
import FeedCard from "./FeedCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfileForm = ({ user }) => {
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);
  const [bio, setBio] = useState(user.bio);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [skills, setSkills] = useState(user.skills);
  const [error, setError] = useState("");

  const saveProfile = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.patch(
        BASE_URL + "/profile/update",
        { firstName, lastName, bio, photoUrl, skills },
        {
          withCredentials: true,
        }
      );
      dispatch(addUser(res.data.data));
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center my-20">
      <form
        onSubmit={saveProfile}
        className="bg-base-300 max-w-xl p-6 sm:p-8 space-y-6 rounded-xl shadow-md"
      >
        <h2 className="text-2xl font-semibold text-center">Edit Profile</h2>

        {/* First Name */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">First Name</span>
          </label>
          <input
            type="text"
            className="input input-bordered w-full"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>

        {/* Last Name */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Last Name</span>
          </label>
          <input
            type="text"
            className="input input-bordered w-full"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>

        {/* Email */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            className="input input-bordered w-full"
            value={email}
            disabled
          />
        </div>

        {/* Bio */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Bio</span>
          </label>
          <input
            type="text"
            className="input input-bordered w-full"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </div>

        {/* Skills */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Skills (comma separated)</span>
          </label>
          <input
            type="text"
            className="input input-bordered w-full"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
          />
        </div>

        {/* Photo URL */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Photo URL</span>
          </label>
          <input
            type="text"
            className="input input-bordered w-full"
            value={photoUrl}
            onChange={(e) => setPhotoUrl(e.target.value)}
          />
        </div>

        {/* Submit */}
        <div className=" btn-primary form-control pt-4">
          <button type="submit" className="btn w-full">
            Save Changes
          </button>
        </div>
      </form>
      <div className="max-w-xl mx-8">
        <FeedCard
          user={{ firstName, lastName, email, bio, photoUrl, skills }}
        />
      </div>
    </div>
  );
};

export default EditProfileForm;
