import { LINKEDIN_LINK } from "../../utils/constants";
import "./Footer.scss";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>
          🍽️ Made with <span className="heart">❤️ </span> by{" "}
          <a href={LINKEDIN_LINK} target="_blank">
            Umang Joshi
          </a>
        </p>
        <p>
          © {year} <strong>Dishcovery</strong> 🚀 | All Rights Reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
