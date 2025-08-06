import React from "react";

const FeedCard = ({ user }) => {
  const { firstName, lastName, bio, photoUrl } = user;
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
          <button className="btn btn-red">Ignore</button>
          <button className="btn btn-secondary">Interested</button>
        </div>
      </div>
    </div>
  );
};

export default FeedCard;
