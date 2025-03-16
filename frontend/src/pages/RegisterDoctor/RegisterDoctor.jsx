import "./RegisterDoctor.css";
import CustomForm from "../../components/CustomForm/CustomForm";
import { useState } from "react";
import Button from "../../components/Button/Button";
import { makePOSTrequestForMultipleFormData } from "../../utils/api";

const RegisterDoctor = () => {
  // define state with different variables and assigned them with empty string
  const [image, setImage] = useState(null);
  const [idnumber, setIDNumber] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const submitDoctor = async (e) => {
    e.preventDefault();

    if (!image) {
      setMessage("No image selected");
      return;
    }

    const formData = new FormData();
    // file below will then be received from the backend using formidable, 'file' below is a made up key name so it is a form data key.A formData in JavaScript is an instance of the FormData class, which is used to construct a set of key/value pairs representing form fields and their values. It's commonly used to construct data to be sent in an HTTP request, particularly when dealing with forms or file uploads.
    formData.append("file", image);

    //data below will then be recieved from the backend using res.body.data, 'data' below is a form data key, a made up name
    formData.append(
      "data",
      JSON.stringify({
        idnumber,
        username,
        password,
        email,
        phone,
      })
    );

    console.log(formData);

    try {
      const res = await makePOSTrequestForMultipleFormData(
        "http://localhost:5000/doctors/registerdoctor",
        formData,
        localStorage.getItem("token")
      );

      console.log("API Response:", res);

      if (res && res.msg) {
        setMessage(res.msg);
        setIDNumber("");
        setUserName("");
        setPassword("");
        setEmail("");
        setPhone("");
        setImage(null);
      } else {
        setMessage("Failed to register doctor.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Something went wrong, please try again.");
    }
  };

  return (
    <div className="registerdoctor-container">
      <h2>Register Doctor</h2>
      <CustomForm>
        <label>Doctor Image:</label>
        <CustomForm.Image onChange={(e) => setImage(e.target.files[0])} />

        <label>ID Number:</label>
        <CustomForm.IDNumber
          value={idnumber}
          onChange={(e) => setIDNumber(e.target.value)}
        />

        <label>Username:</label>
        <CustomForm.UserName
          value={username}
          onChange={(e) => setUserName(e.target.value)}
        />

        <label>Email:</label>
        <CustomForm.Email
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Password:</label>
        <CustomForm.Password
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <label>Phone:</label>
        <CustomForm.Phone
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <Button value="Register Doctor" onClick={submitDoctor} />
      </CustomForm>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default RegisterDoctor;
