import "./SearchDoctor.css";
import { useState } from "react";
import CustomForm from "../../components/CustomForm/CustomForm";
import Button from "../../components/Button/Button";
import { makeGETrequest } from "../../utils/api";

const SearchDoctor = () => {
  const [idnumber, setIdNumber] = useState("");
  const [messageDoc, setMessageDoc] = useState("");
  const [doctor, setDoctor] = useState({});
  //   const [updatedEmail, setUpdatedEmail] = useState("");
  //   const [updatedPhone, setUpdatedPhone] = useState("");

  async function submitSearch(e) {
    e.preventDefault();
    const res = await makeGETrequest(
      `http://localhost:5000/doctors/search?idnumber=${idnumber}`
    );
    setMessageDoc(res.msg);

    if (res.doctor) {
      setDoctor(JSON.parse(res.doctor));
    } else {
      setDoctor({});
    }
  }

  return (
    <div className="searchdoctor-container">
      <h2>Search for a Doctor</h2>
      <CustomForm>
        <CustomForm.IDNumber
          value={idnumber}
          onChange={(e) => setIdNumber(e.target.value)}
        />
        <Button value="Search" onClick={submitSearch} />
        <br />
      </CustomForm>

      {doctor.username ? (
        <div className="doctor-card">
          <h3>Doctor Details</h3>
          <p>
            <strong>ID:</strong> {doctor.idnumber}
          </p>
          <p>
            <strong>Name:</strong> {doctor.username}
          </p>
          <p>
            <strong>Email:</strong> {doctor.email}
          </p>
          <p>
            <strong>Phone No.:</strong> {doctor.phone}
          </p>
        </div>
      ) : (
        <p className="error-message">{messageDoc}</p>
      )}
    </div>
  );
};

export default SearchDoctor;
