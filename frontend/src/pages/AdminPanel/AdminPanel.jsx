import { useEffect } from "react";
import { makeGETrequest } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import "./AdminPanel.css";

const AdminPanel = () => {
  const navigate = useNavigate();

  //useEffect runs everytime component updates if you don't pass a dependency array. So pass a function or properties to the dependecy array if want to run useEffect only if that function or property changes
  useEffect(() => {
    async function checkIfAdmin() {
      const res = await makeGETrequest(
        "http://localhost:5000/users/checkifloggedin",
        localStorage.getItem("token")
      );
      console.log(res);

      //If you are not admin, redirect to the home page
      if (!res.admin) {
        navigate("/");
      }
    }
    checkIfAdmin();
  }, [navigate]);

  return (
    <div className="adminpanel-container">
      <div className="features">
        <div className="feature">
          <h2>Register Doctor</h2>
          <p>Register new Doctors into the system</p>
          <a href="/registerdoctor">Register Doctors</a>
        </div>
        <div className="feature">
          <h2>Search Doctor</h2>
          <p>View and Manage Doctors</p>
          <a href="/searchdoctor">View Doctors</a>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
