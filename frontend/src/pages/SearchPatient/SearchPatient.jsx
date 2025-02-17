import "./SearchPatient.css";
import { useState } from "react";
import CustomForm from "../../components/CustomForm/CustomForm";

const SearchPatient = () => {
  const [idnumber, setIdNumber] = useState("");

  return (
    <div className="searchpatient-container">
      <h2>Search</h2>
      <CustomForm>
        <CustomForm.IDNumber
          value={idnumber}
          onChange={(e) => setIdNumber(e.target.value)}
        />
      </CustomForm>
    </div>
  );
};

export default SearchPatient;
