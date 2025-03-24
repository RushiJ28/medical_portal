import "./SearchPatient.css";
import { useState } from "react";
import CustomForm from "../../components/CustomForm/CustomForm";
import Button from "../../components/Button/Button";
import { makeGETrequest, makePOSTrequest } from "../../utils/api";
import { useSelector } from "react-redux";

const SearchPatient = () => {
  const [idnumber, setIdNumber] = useState("");
  const [message, setMessage] = useState("");
  const [patient, setPatient] = useState(null);
  const [newMedicalRecord, setNewMedicalRecord] = useState("");
  const [updatedEmail, setUpdatedEmail] = useState("");
  const [updatedPhone, setUpdatedPhone] = useState("");
  const [showNewMedicalField, setShowNewMedicalField] = useState(false);
  const [showUpdateContactField, setShowUpdateContactField] = useState(false);

  const userSelector = useSelector((state) => state.user);

  async function submitSearch(e) {
    e.preventDefault();
    const res = await makeGETrequest(
      `http://localhost:5000/patients/search?idnumber=${idnumber}`
    );

    setMessage(res.msg);
    setPatient(res.patient ? JSON.parse(res.patient) : null);
  }

  async function submitNewMedicalRecord(e) {
    e.preventDefault();
    if (!newMedicalRecord) return;

    const res = await makePOSTrequest(
      "http://localhost:5000/patients/addnewmedicalrecord",
      { medicalrecord: newMedicalRecord, idnumber: patient.idnumber },
      localStorage.getItem("token")
    );

    if (res.status === 201) {
      setNewMedicalRecord("");
      setShowNewMedicalField(false);
      setPatient(JSON.parse(res.patient));
    }
    setMessage(res.msg);
  }

  async function updateContact(e) {
    e.preventDefault();
    if (!updatedEmail && !updatedPhone) return;

    const res = await makePOSTrequest(
      "http://localhost:5000/patients/updatecontact",
      { idnumber: patient.idnumber, email: updatedEmail, phone: updatedPhone },
      localStorage.getItem("token")
    );

    if (res.status === 201) {
      setShowUpdateContactField(false);
      setPatient(JSON.parse(res.patient));
    }
    setMessage(res.msg);
  }

  return (
    <div className="searchpatient-container">
      <h2>Search Patient</h2>
      <CustomForm>
        <CustomForm.IDNumber
          value={idnumber}
          onChange={(e) => setIdNumber(e.target.value)}
        />
        <Button value="Search" onClick={submitSearch} />
      </CustomForm>

      {patient && (
        <div className="patient-details">
          <p>
            <strong>ID:</strong> {patient.idnumber}
          </p>
          <p>
            <strong>Patient:</strong> {patient.username}
          </p>
          <p>
            <strong>Email:</strong> {patient.email}
          </p>
          <p>
            <strong>Phone:</strong> {patient.phone}
          </p>
          <p>
            <strong>Address:</strong> {patient.address}
          </p>

          <ul>
            <strong>Medical Records:</strong>
            {patient.medicalrecord?.map((item, index) => (
              <li key={index}>
                {item.date}: {item.record}
              </li>
            ))}
          </ul>

          {userSelector.doctor && (
            <Button
              value="Add New Record"
              onClick={() => setShowNewMedicalField(!showNewMedicalField)}
            />
          )}

          {userSelector.admin && (
            <Button
              value="Update Patient Details"
              onClick={() => setShowUpdateContactField(!showUpdateContactField)}
            />
          )}

          {showUpdateContactField && (
            <CustomForm>
              <CustomForm.Email
                value={updatedEmail}
                onChange={(e) => setUpdatedEmail(e.target.value)}
              />
              <CustomForm.Phone
                value={updatedPhone}
                onChange={(e) => setUpdatedPhone(e.target.value)}
              />
              <Button value="Update" onClick={updateContact} />
            </CustomForm>
          )}

          {showNewMedicalField && (
            <CustomForm>
              <CustomForm.MedicalRecord
                value={newMedicalRecord}
                onChange={(e) => setNewMedicalRecord(e.target.value)}
              />
              <Button value="Save" onClick={submitNewMedicalRecord} />
            </CustomForm>
          )}
        </div>
      )}
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default SearchPatient;
