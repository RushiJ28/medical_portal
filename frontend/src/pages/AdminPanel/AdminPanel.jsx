import { useEffect, useState } from "react";
import { makeGETrequest } from "../../utils/api";
import { useNavigate, Link } from "react-router-dom";
import "./AdminPanel.css";

const AdminPanel = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  //useEffect runs everytime component updates if you don't pass a dependency array. So pass a function or properties to the dependecy array if want to run useEffect only if that function or property changes
  useEffect(() => {
    async function checkIfAdmin() {
      try {
        const res = await makeGETrequest(
          "http://localhost:5000/users/checkifloggedin",
          localStorage.getItem("token")
        );
        console.log(res);

        //If you are not admin, redirect to the home page
        if (!res.admin) {
          navigate("/");
        }
      } catch (err) {
        console.log("Error checking admin status", err);
        navigate("/");
      } finally {
        setLoading(false);
      }
    }
    checkIfAdmin();
  }, [navigate]);

  if (loading) {
    return <p className="loading">Checking Admin Access...</p>;
  }

  return (
    <div className="adminpanel-container">
      <h2>Admin Panel</h2>
      <div className="features">
        <div className="feature">
          <h2>Register Doctor</h2>
          <p>Register new Doctors into the system</p>
          <Link to="/registerdoctor">Register Doctors</Link>
        </div>
        <div className="feature">
          <h2>Search Doctor</h2>
          <p>View and Manage Doctors</p>
          <Link to="/searchdoctor">View Doctors</Link>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
