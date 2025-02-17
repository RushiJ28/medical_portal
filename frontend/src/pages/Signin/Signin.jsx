import "./Signin.css";
import { useState } from "react";
import CustomForm from "../../components/CustomForm/CustomForm";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="signin-container">
      <h2>Sign In</h2>
      <CustomForm>
        <CustomForm.Email
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <CustomForm.Password
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </CustomForm>
    </div>
  );
};

export default Signin;
