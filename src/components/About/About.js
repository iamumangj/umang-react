import React from "react";
import {
  FaGithub,
  FaLinkedin,
  FaFileDownload,
  FaEnvelope,
} from "react-icons/fa";
import { GITHUB_LINK, LINKEDIN_LINK, EMAIL_LINK } from "../../utils/constants";
import "./About.scss";

class About extends React.Component {
  render() {
    return (
      <div className="about-container">
        <div className="about-card">
          <div className="about-left">
            <h1>
              Hi, I'm <span>Umang Joshi</span>
            </h1>

            <p className="about-role">
              Frontend Developer | JavaScript | React.js | SDE-2
              @HashedInByDeloitte
            </p>

            <p className="about-description">
              Passionate about building scalable and high-performance web
              applications using modern technologies like React and JavaScript.
              This project <strong>Dishcovery</strong> showcases my ability to
              design clean UI, integrate APIs, and build reusable component
              architecture for real-world applications.
            </p>

            <div className="about-info">
              <p>
                <strong>Name:</strong> Umang Joshi
              </p>
              <p>
                <strong>Location:</strong> Jaipur, India
              </p>
              <p>
                <strong>Contact:</strong> +91 12345 67899
              </p>

              <p>
                <strong>Email:</strong>{" "}
                <a href={EMAIL_LINK} className="email-link">
                  <FaEnvelope /> umangjoshi1221@gmail.com
                </a>
              </p>
            </div>

            <div className="about-buttons">
              <a
                href="https://yourportfolio.com"
                target="_blank"
                rel="noreferrer"
                className="portfolio-btn"
              >
                Portfolio
              </a>

              <a
                href="/resume.pdf"
                target="_blank"
                rel="noreferrer"
                className="resume-btn"
              >
                <FaFileDownload /> Resume
              </a>
            </div>

            <div className="social-links">
              <a href={GITHUB_LINK} target="_blank" rel="noreferrer">
                <FaGithub />
              </a>

              <a href={LINKEDIN_LINK} target="_blank" rel="noreferrer">
                <FaLinkedin />
              </a>
            </div>
          </div>

          <div className="about-right">
            <img
              src="https://cdn-icons-png.flaticon.com/512/4140/4140048.png"
              alt="Developer"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default About;
