import "./Signin.css";
import { useState } from "react";
import CustomForm from "../../components/CustomForm/CustomForm";
import Button from "../../components/Button/Button";
import { makePOSTrequest } from "../../utils/api";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const submitData = async (e) => {
    e.preventDefault(); //Do not refresh the browser as it may cause issues while passing data to backend
    const res = await makePOSTrequest("http://localhost:5000/users/signin", {
      email,
      password,
    });

    //Save the token coming back from the backend only if the status code is 200
    if (res.status === 200) {
      localStorage.setItem("token", res.token);
    }
    setMessage(res.msg);
  };

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
        <Button onClick={submitData} value="Sign In" />
      </CustomForm>
      {message}
    </div>
  );
};

export default Signin;
