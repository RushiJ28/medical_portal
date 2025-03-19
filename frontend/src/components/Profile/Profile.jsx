import { useSelector } from "react-redux";
import "./Profile.css";

const Profile = () => {
  const userSelector = useSelector((state) => state.user);
  const imageSrc = localStorage.getItem("image");

  return (
    <div className="profile-container">
      <div className="profile-card">
        {imageSrc ? (
          <img className="profile-image" src={imageSrc} alt="Profile" />
        ) : (
          <div className="default-profile">No Image</div>
        )}

        <h2>{userSelector?.username || "User"}</h2>
        <p className="profile-detail">
          <span>ID Number:</span> {userSelector?.idnumber || "N/A"}
        </p>
        <p className="profile-detail">
          <span>Phone:</span> {userSelector?.phone || "N/A"}
        </p>
        <p className="profile-detail">
          <span>Email:</span> {userSelector?.email || "N/A"}
        </p>

        <button className="edit-btn">Edit Profile</button>
      </div>
    </div>
  );
};

export default Profile;
