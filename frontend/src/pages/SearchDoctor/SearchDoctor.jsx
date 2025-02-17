import "./SearchDoctor.css";
import { useState } from "react";
import CustomForm from "../../components/CustomForm/CustomForm";

const SearchDoctor = () => {
  const [idnumber, setIdNumber] = useState("");

  return (
    <div className="searchdoctor-container">
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

export default SearchDoctor;
