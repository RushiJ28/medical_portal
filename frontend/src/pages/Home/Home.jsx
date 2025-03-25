import { useSelector } from "react-redux";
import "./Home.css";
import { Link } from "react-router-dom";

const Home = () => {
  const userSelector = useSelector((state) => state.user);

  return (
    <div className="home-container">
      <h2>Welcome to Patient Management System</h2>
      <h3>
        {userSelector.username ? (
          <p>
            Welcome <span>{userSelector.username}</span>
          </p>
        ) : (
          <p>You are not Logged In...</p>
        )}
      </h3>
      <div className="features">
        <div className="feature">
          <h3>Patient Register</h3>
          <p>Register new patients into the system</p>
          <Link to="/registerpatient">Register Patient</Link>
        </div>
        <div className="feature">
          <h3>Search Patient</h3>
          <p>View and Manage medical history of patients</p>
          <Link to="/searchpatient">View Medical History</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
