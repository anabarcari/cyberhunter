import backgroundVideo from "../../video.mp4";
import "../../styles.css";
import "../about/About.css"
import { useState } from "react";

function About() {
  const [showPopup, setShowPopup] = useState(false);

  const handleContactClick = () => {
    setShowPopup(true);
  };

  const handleCloseClick = () => {
    setShowPopup(false);
  };

  return (
    <div className="about">
      <div className="content-container">
        <div className="text-container">
          <p>
            Our mission is to empower you with the knowledge and tools necessary
            to navigate the ever-evolving landscape of cyber threats. Through
            our curated manual, we offer practical insights and recommendations
            to create a secure work environment and mitigate potential risks.
            From physical and network security measures to data protection and
            device security, we cover all aspects of digital security. By
            implementing our recommended practices, you can safeguard your
            organization against unauthorized access and potential breaches.
          </p>
          <p>
            We emphasize the importance of training, compliance with
            regulations, and continuous monitoring and evaluation. Our goal is
            to equip you with the skills and awareness needed to stay vigilant
            and respond effectively to security incidents. Join us in creating a
            culture of digital security. Explore our manual, adopt our best
            practices, and contribute to the protection of your organizations
            digital assets and data. Stay informed, stay secure! [Ana & Sergiu]
            Team
          </p>
          <div>
            <button className="btn btn-secondary" onClick={handleContactClick}>
              <span></span>Contact Us
            </button>
          </div>
        </div>

        <div className="video-container">
          <video autoPlay loop muted id="video">
            <source src={backgroundVideo} type="video/mp4" />
          </video>
          {showPopup && (
            <div className="popup-message">
              <p> Ana: anabarcari1991@gmail.com
              <br />
                Sergiu: nucavani@gmail.com
              </p>
              <a className="close" href="#" onClick={handleCloseClick}>&times;</a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default About;
