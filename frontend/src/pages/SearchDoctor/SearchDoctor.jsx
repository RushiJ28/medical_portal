import "./SearchDoctor.css";
import { useState } from "react";
import CustomForm from "../../components/CustomForm/CustomForm";
import Button from "../../components/Button/Button";
import { makeGETrequest, makePOSTrequest } from "../../utils/api";
import { useSelector } from "react-redux";

const SearchDoctor = () => {
  const [idnumber, setIdNumber] = useState("");
  const [messageDoc, setMessageDoc] = useState("");
  const [doctor, setDoctor] = useState({});
  const [updatedContact, setUpdatedContact] = useState({
    email: "",
    phone: "",
  });
  const [showUpdateFields, setShowUpdateFields] = useState(false);
  const [showUpdateBtn, setShowUpdateBtn] = useState(false);

  const userSelector = useSelector((state) => state.user);

  const handleInputChange = (e) => {
    setUpdatedContact({ ...updatedContact, [e.target.name]: e.target.value });
  };

  async function submitSearch(e) {
    e.preventDefault();

    if (!idnumber.trim()) {
      setMessageDoc("Please enter a valid ID number.");
      return;
    }

    const res = await makeGETrequest(
      `http://localhost:5000/doctors/search?idnumber=${idnumber}`
    );
    setMessageDoc(res.msg);

    if (userSelector.admin) setShowUpdateBtn(!showUpdateBtn);

    setDoctor(res.doctor ? JSON.parse(res.doctor) : null);
  }

  async function updateContact(e) {
    e.preventDefault();
    const res = await makePOSTrequest(
      "http://localhost:5000/doctors/updatecontact",
      {
        idnumber: doctor.idnumber,
        ...updatedContact,
      },
      localStorage.getItem("token")
    );

    if (res.status === 201) {
      setShowUpdateFields(!showUpdateFields);
      setDoctor(JSON.parse(res.doctor));
    }
    setMessageDoc(res.msg);
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
      </CustomForm>
      {messageDoc && <p className="error-message">{messageDoc}</p>}

      {doctor.username && (
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
      )}
      <br />

      {/*Only admin can update constact info*/}
      {showUpdateBtn && (
        <Button
          value="Update Contact Info"
          onClick={() => setShowUpdateFields(!showUpdateFields)}
        />
      )}
      <br />
      {doctor && showUpdateFields && (
        <CustomForm>
          <CustomForm.Email
            name="email"
            value={updatedContact.email}
            onChange={handleInputChange}
          />
          <CustomForm.Phone
            name="phone"
            value={updatedContact.phone}
            onChange={handleInputChange}
          />
          <Button value="Update" onClick={updateContact} />
        </CustomForm>
      )}
    </div>
  );
};

export default SearchDoctor;
