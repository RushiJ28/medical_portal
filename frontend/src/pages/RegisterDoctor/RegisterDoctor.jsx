import "./RegisterDoctor.css";
import CustomForm from "../../components/CustomForm/CustomForm";
import { useState } from "react";

const RegisterDoctor = () => {
  //define state with different variables and assigned them with empty string
  //   const [image, setImage] = useState(null);
  const [idnumber, setIDNumber] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  return (
    <div className="registerdoctor-container">
      <CustomForm>
        <span>Doctor Image:</span>
        <br />
        {/* <CustomForm.Image onChange={(e)=> setImage(e.target.files[0])} /> */}
        <br />
        <br />
        <CustomForm.IDNumber
          value={idnumber}
          onChange={(e) => setIDNumber(e.target.value)}
        />
        <CustomForm.UserName
          value={username}
          onChange={(e) => setUserName(e.target.value)}
        />
        <CustomForm.Email
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <CustomForm.Password
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <CustomForm.Phone
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </CustomForm>
    </div>
  );
};

export default RegisterDoctor;
