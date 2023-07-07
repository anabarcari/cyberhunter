import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import backgroundVideo from "../../video.mp4";
import videoCyb from "../../assets/videoCyb.mp4";
import "../../styles.css";
import Modal from "react-modal";

const Dashboard = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isVideoFullScreen, setVideoFullScreen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setVideoFullScreen(false);
  };

  useEffect(() => {
    // HINT:Clean up the modal state when the component unmounts
    return () => {
      setModalIsOpen(false);
    };
  }, []);

  return (
    <div className="home">
      <div className="content-container">
        <h1>Welcome to cybersecurity training</h1>

        <div>
          <button type="button" onClick={openModal}>
            <span></span>Watch Video
          </button>
          <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
            <div
              className={`video-modal ${isVideoFullScreen ? "fullscreen" : ""}`}
            >
              <video
                src={videoCyb}
                controls
                autoPlay
                className={`${isVideoFullScreen ? "fullscreen" : ""}`}
              />
              <button className="modal-close-button" onClick={closeModal}>
                Close
              </button>
            </div>
          </Modal>
          <Link to="/table-content">
            <button type="button">
              <span></span>Table Content
            </button>
          </Link>
        </div>

        <div className="video-container">
          <video autoPlay loop muted id="video">
            <source src={backgroundVideo} type="video/mp4" />
          </video>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
