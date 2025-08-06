import React, { useState } from "react";

const EditProfileForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("example@example.com");
  const [bio, setBio] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [skills, setSkills] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault(); // prevent page reload

    const skillsArray = skills
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s !== "");

    const updatedProfile = {
      firstName,
      lastName,
      email,
      bio,
      photoUrl,
      skills: skillsArray,
    };

    console.log("Form submitted:", updatedProfile);
    // Add API call or logic here
  };

  return (
    <div className="min-h-[calc(100vh-80px)]">
      <form
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto p-6 sm:p-8 space-y-6 bg-base-100 rounded-xl shadow-md"
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
        <div className="form-control pt-4">
          <button type="submit" className="btn w-full">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfileForm;
