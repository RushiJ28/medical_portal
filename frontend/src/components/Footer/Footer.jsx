import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h4>About Us</h4>
          <p>
            We provide top-notch medical services, connecting patients with
            doctors efficiently.
          </p>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li>
              <a href="/about">About</a>
            </li>
            <li>
              <a href="/contact">Contact</a>
            </li>
            <li>
              <a href="/privacy-policy">Privacy Policy</a>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Contact</h4>
          <p>Email: support@medicalportal.com</p>
          <p>Phone: +1 (800) 555-1234</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          &copy; {new Date().getFullYear()} Medical Portal. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
