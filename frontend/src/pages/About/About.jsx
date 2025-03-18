import "./About.css";
import { useSelector } from "react-redux";

const About = () => {
  const userSelector = useSelector((state) => state.user);

  console.log(userSelector.username);
  return (
    <div className="about-container">
      <h2>About</h2>
      <p>This is patient registration system.</p>
    </div>
  );
};

export default About;
