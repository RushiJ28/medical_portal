import "./RegisterPatient.css";
import CustomForm from "../../components/CustomForm/CustomForm";
import Button from "../../components/Button/Button";
import { useState } from "react";
import { useSelector } from "react-redux";
import { makePOSTrequest } from "../../utils/api";

const RegisterPatient = () => {
  //define state with different variables and assigned them with empty string
  const [idnumber, setIDNumber] = useState("");
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [medicalrecord, setMedicalRecord] = useState("");
  const [message, setMessage] = useState("");

  const userSelector = useSelector((state) => state.user);

  const registerPatient = async (e) => {
    e.preventDefault();

    const res = await makePOSTrequest(
      "http://localhost:5000/patients/registerpatient",
      { idnumber, username, email, address, phone, medicalrecord },
      localStorage.getItem("token")
    );
    setMessage(res.msg);
  };

  return (
    <div className="registerpatient-container">
      <h2>RegisterPatient</h2>
      <CustomForm>
        <label>ID Number</label>
        <CustomForm.IDNumber
          value={idnumber}
          onChange={(e) => setIDNumber(e.target.value)}
        />

        <label>Full Name</label>
        <CustomForm.UserName
          value={username}
          onChange={(e) => setUserName(e.target.value)}
        />

        <label>Email Address</label>
        <CustomForm.Email
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Home Address</label>
        <CustomForm.Address
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <label>Phone Number</label>
        <CustomForm.Phone
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        {userSelector.doctor && (
          <>
            <label>Medical Record</label>
            <CustomForm.MedicalRecord
              value={medicalrecord}
              onChange={(e) => setMedicalRecord(e.target.value)}
            />
          </>
        )}

        <Button value="Register Patient" onClick={registerPatient} />
      </CustomForm>
      {message && <p className="response-message">{message}</p>}
    </div>
  );
};

export default RegisterPatient;
